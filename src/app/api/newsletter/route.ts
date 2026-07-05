import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { connectDB } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientMetadata, sanitizeEmail } from "@/lib/security";
import { newsletterSchema } from "@/lib/validation";
import ConsentLog from "@/models/ConsentLog";
import Lead from "@/models/Lead";

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, { key: "newsletter", limit: 6, windowMs: 60_000 });

  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = newsletterSchema.parse(await request.json());
    const { ip, browser } = getClientMetadata(request);
    const email = sanitizeEmail(body.email);

    await connectDB();
    await Lead.create({
      name: email.split("@")[0],
      email,
      leadSource: "Newsletter",
      status: "New",
      newsletterConsent: true,
      consentAccepted: true,
      ip,
      browser
    });

    await ConsentLog.create({
      email,
      category: "newsletter",
      accepted: true,
      source: "newsletter",
      ip,
      browser,
      policyVersion: "2026-07"
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Newsletter signup failed" }, { status: 500 });
  }
}
