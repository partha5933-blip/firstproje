import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdmin } from "@/lib/api-auth";
import { connectDB } from "@/lib/db";
import { notifyBookingTeam, sendLeadConfirmation } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientMetadata, sanitizeEmail, sanitizeText } from "@/lib/security";
import { saveUpload } from "@/lib/storage";
import { bookingSchema } from "@/lib/validation";
import Booking from "@/models/Booking";
import Customer from "@/models/Customer";
import Lead from "@/models/Lead";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  await connectDB();
  const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, { key: "booking", limit: 5, windowMs: 60_000 });

  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    const parsed = bookingSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      whatsapp: formData.get("whatsapp"),
      service: formData.get("service"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      consentAccepted: formData.get("consentAccepted")
    });

    const files = formData.getAll("inspirationFiles").filter((item): item is File => item instanceof File);
    const uploadedFiles = await Promise.all(files.map((file) => saveUpload(file, "inspiration")));
    const { ip, browser } = getClientMetadata(request);

    const safeBooking = {
      ...parsed,
      name: sanitizeText(parsed.name),
      email: sanitizeEmail(parsed.email),
      phone: sanitizeText(parsed.phone),
      whatsapp: sanitizeText(parsed.whatsapp),
      service: sanitizeText(parsed.service),
      location: sanitizeText(parsed.location),
      budget: sanitizeText(parsed.budget),
      message: sanitizeText(parsed.message)
    };

    await connectDB();
    const customer = await Customer.findOneAndUpdate(
      { email: safeBooking.email },
      {
        $set: {
          name: safeBooking.name,
          phone: safeBooking.phone,
          whatsapp: safeBooking.whatsapp,
          location: safeBooking.location,
          consentAccepted: safeBooking.consentAccepted
        },
        $addToSet: { tags: safeBooking.service }
      },
      { new: true, upsert: true }
    );

    const lead = await Lead.create({
      name: safeBooking.name,
      email: safeBooking.email,
      phone: safeBooking.phone,
      whatsapp: safeBooking.whatsapp,
      serviceInterested: safeBooking.service,
      budget: safeBooking.budget,
      eventDate: safeBooking.date,
      location: safeBooking.location,
      message: safeBooking.message,
      leadSource: "Booking System",
      consentAccepted: safeBooking.consentAccepted,
      ip,
      browser
    });

    const booking = await Booking.create({
      ...safeBooking,
      inspirationFiles: uploadedFiles,
      leadId: lead._id,
      customerId: customer._id
    });

    await Customer.findByIdAndUpdate(customer._id, {
      $addToSet: { leadIds: lead._id, bookingIds: booking._id }
    });

    await Promise.allSettled([notifyBookingTeam(parsed), sendLeadConfirmation({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      whatsapp: parsed.whatsapp,
      serviceInterested: parsed.service,
      budget: parsed.budget,
      eventDate: parsed.date,
      location: parsed.location,
      message: parsed.message,
      leadSource: "Booking System",
      marketingConsent: false,
      newsletterConsent: false,
      consentAccepted: parsed.consentAccepted
    })]);

    return NextResponse.json({ bookingId: String(booking._id) }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Booking could not be created" }, { status: 500 });
  }
}
