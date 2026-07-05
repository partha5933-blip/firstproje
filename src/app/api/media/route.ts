import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { connectDB } from "@/lib/db";
import { saveUpload } from "@/lib/storage";
import MediaAsset from "@/models/MediaAsset";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  await connectDB();
  const assets = await MediaAsset.find().sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ assets });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();

  if (!auth.authorized) {
    return auth.response;
  }

  const formData = await request.formData();
  const folder = String(formData.get("folder") || "general");
  const files = formData.getAll("files").filter((item): item is File => item instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  await connectDB();
  const uploaded = await Promise.all(files.map((file) => saveUpload(file, folder)));
  const assets = await MediaAsset.insertMany(
    uploaded.map((asset, index) => ({
      ...asset,
      originalName: files[index].name,
      folder,
      uploadedBy: auth.session?.user.email
    }))
  );

  return NextResponse.json({ assets }, { status: 201 });
}
