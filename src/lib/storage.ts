import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { slugify } from "@/lib/utils";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "video/mp4",
  "application/pdf"
]);

export async function saveUpload(file: File, folder = "general") {
  if (!allowedTypes.has(file.type)) {
    throw new Error("Unsupported file type.");
  }

  if (file.size > 12 * 1024 * 1024) {
    throw new Error("File is too large. Maximum size is 12 MB.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = path.extname(file.name) || ".bin";
  const safeFolder = slugify(folder || "general");
  const safeName = `${slugify(path.basename(file.name, extension))}-${randomUUID()}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
  await mkdir(uploadDir, { recursive: true });
  const destination = path.join(uploadDir, safeName);
  await writeFile(destination, buffer);

  return {
    url: `/uploads/${safeFolder}/${safeName}`,
    filename: safeName,
    mimeType: file.type,
    size: file.size
  };
}
