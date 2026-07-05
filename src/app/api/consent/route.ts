import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { connectDB } from "@/lib/db";
import { getClientMetadata } from "@/lib/security";
import { consentSchema } from "@/lib/validation";
import ConsentLog from "@/models/ConsentLog";

export async function POST(request: NextRequest) {
  try {
    const parsed = consentSchema.parse(await request.json());

    if (!parsed.accepted) {
      return NextResponse.json({ logged: false });
    }

    const { ip, browser } = getClientMetadata(request);
    await connectDB();
    await ConsentLog.create({
      ...parsed,
      ip,
      browser,
      policyVersion: "2026-07"
    });

    return NextResponse.json({ logged: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Consent could not be logged" }, { status: 500 });
  }
}
