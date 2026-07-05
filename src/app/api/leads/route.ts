import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdmin } from "@/lib/api-auth";
import { connectDB } from "@/lib/db";
import { notifyLeadTeam, sendLeadConfirmation } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientMetadata, sanitizeEmail, sanitizeText } from "@/lib/security";
import { leadSchema } from "@/lib/validation";
import ConsentLog from "@/models/ConsentLog";
import Customer from "@/models/Customer";
import Lead from "@/models/Lead";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  await connectDB();
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const query = url.searchParams.get("q");
  const filter: Record<string, unknown> = {};

  if (status) {
    filter.status = status;
  }

  if (query) {
    filter.$or = [
      { name: new RegExp(query, "i") },
      { email: new RegExp(query, "i") },
      { serviceInterested: new RegExp(query, "i") }
    ];
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, { key: "lead", limit: 8, windowMs: 60_000 });

  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = leadSchema.parse(body);
    const { ip, browser } = getClientMetadata(request);
    const leadData = {
      ...parsed,
      name: sanitizeText(parsed.name),
      email: sanitizeEmail(parsed.email),
      phone: sanitizeText(parsed.phone),
      whatsapp: sanitizeText(parsed.whatsapp),
      serviceInterested: sanitizeText(parsed.serviceInterested),
      budget: sanitizeText(parsed.budget),
      eventDate: sanitizeText(parsed.eventDate),
      location: sanitizeText(parsed.location),
      message: sanitizeText(parsed.message),
      leadSource: sanitizeText(parsed.leadSource),
      ip,
      browser
    };

    await connectDB();
    const customer = await Customer.findOneAndUpdate(
      { email: leadData.email },
      {
        $set: {
          name: leadData.name,
          phone: leadData.phone,
          whatsapp: leadData.whatsapp,
          location: leadData.location,
          consentAccepted: leadData.consentAccepted
        },
        $addToSet: {
          tags: leadData.serviceInterested || "Website lead"
        }
      },
      { new: true, upsert: true }
    );

    const lead = await Lead.create({
      ...leadData,
      customerId: customer._id
    });

    await Customer.findByIdAndUpdate(customer._id, { $addToSet: { leadIds: lead._id } });

    const consentLogs = [];

    if (leadData.marketingConsent) {
      consentLogs.push({
        email: leadData.email,
        category: "marketing",
        accepted: true,
        source: leadData.leadSource,
        ip,
        browser,
        policyVersion: "2026-07"
      });
    }

    if (leadData.newsletterConsent) {
      consentLogs.push({
        email: leadData.email,
        category: "newsletter",
        accepted: true,
        source: leadData.leadSource,
        ip,
        browser,
        policyVersion: "2026-07"
      });
    }

    if (consentLogs.length) {
      await ConsentLog.insertMany(consentLogs);
    }

    await Promise.allSettled([notifyLeadTeam(parsed), sendLeadConfirmation(parsed)]);

    return NextResponse.json({ leadId: String(lead._id) }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Lead could not be created" }, { status: 500 });
  }
}
