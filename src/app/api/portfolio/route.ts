import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/utils";
import PortfolioItem from "@/models/PortfolioItem";

export async function GET() {
  await connectDB();
  const items = await PortfolioItem.find().sort({ featured: -1, sortOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  const body = await request.json();
  await connectDB();
  const item = await PortfolioItem.create({
    ...body,
    slug: body.slug || slugify(body.title)
  });

  return NextResponse.json({ item }, { status: 201 });
}
