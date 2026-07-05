import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { connectDB } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeEmail } from "@/lib/security";
import { gdprRequestSchema } from "@/lib/validation";
import Booking from "@/models/Booking";
import ConsentLog from "@/models/ConsentLog";
import Customer from "@/models/Customer";
import Lead from "@/models/Lead";

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(request, { key: "gdpr-delete", limit: 2, windowMs: 60_000 });

  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const parsed = gdprRequestSchema.parse(await request.json());
    const email = sanitizeEmail(parsed.email);
    await connectDB();
    const [leads, bookings, customers, consentLogs] = await Promise.all([
      Lead.deleteMany({ email }),
      Booking.deleteMany({ email }),
      Customer.deleteMany({ email }),
      ConsentLog.deleteMany({ email })
    ]);

    return NextResponse.json({
      deletedAt: new Date().toISOString(),
      deleted: {
        leads: leads.deletedCount,
        bookings: bookings.deletedCount,
        customers: customers.deletedCount,
        consentLogs: consentLogs.deletedCount
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Delete request failed" }, { status: 500 });
  }
}
