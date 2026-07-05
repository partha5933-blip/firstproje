import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/utils";
import Service from "@/models/Service";

export async function GET() {
  await connectDB();
  const services = await Service.find({ active: true }).sort({ featured: -1, createdAt: -1 }).lean();
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  const body = await request.json();
  await connectDB();
  const service = await Service.create({
    ...body,
    slug: body.slug || slugify(body.title)
  });

  return NextResponse.json({ service }, { status: 201 });
}
