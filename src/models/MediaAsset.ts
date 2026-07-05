import { Schema, model, models, type InferSchemaType } from "mongoose";

const MediaAssetSchema = new Schema(
  {
    filename: { type: String, required: true },
    originalName: String,
    url: { type: String, required: true },
    mimeType: String,
    size: Number,
    folder: { type: String, default: "general" },
    alt: String,
    caption: String,
    width: Number,
    height: Number,
    uploadedBy: String
  },
  { timestamps: true }
);

MediaAssetSchema.index({ folder: 1, createdAt: -1 });
MediaAssetSchema.index({ filename: "text", alt: "text", caption: "text" });

export type MediaAssetDocument = InferSchemaType<typeof MediaAssetSchema>;

const MediaAsset = models.MediaAsset || model("MediaAsset", MediaAssetSchema);

export default MediaAsset;
