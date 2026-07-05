import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/utils";
import BlogPost from "@/models/BlogPost";

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  await connectDB();
  const posts = await BlogPost.find().sort({ publishedAt: -1, createdAt: -1 }).lean();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  const body = await request.json();
  await connectDB();
  const post = await BlogPost.create({
    ...body,
    slug: body.slug || slugify(body.title)
  });

  return NextResponse.json({ post }, { status: 201 });
}
