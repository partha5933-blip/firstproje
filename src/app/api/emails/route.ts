import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdmin } from "@/lib/api-auth";
import { connectDB } from "@/lib/db";
import { sendMail } from "@/lib/email";
import { emailComposeSchema } from "@/lib/validation";
import EmailLog from "@/models/EmailLog";

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  await connectDB();
  const emails = await EmailLog.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ emails });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const parsed = emailComposeSchema.parse(await request.json());
    await connectDB();
    const log = await EmailLog.create({
      ...parsed,
      from: process.env.GMAIL_USER,
      status: "draft"
    });

    try {
      await sendMail(parsed);
      log.status = "sent";
      log.sentAt = new Date();
      await log.save();
    } catch (error) {
      log.status = "failed";
      log.error = error instanceof Error ? error.message : "Unknown error";
      await log.save();
      throw error;
    }

    return NextResponse.json({ emailId: String(log._id) }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Email could not be sent" }, { status: 500 });
  }
}
