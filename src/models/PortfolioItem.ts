import { Schema, model, models, type InferSchemaType } from "mongoose";

const PortfolioItemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    category: { type: String, required: true },
    location: String,
    image: { type: String, required: true },
    alt: { type: String, required: true },
    tags: [String],
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    seo: {
      title: String,
      description: String,
      keywords: [String]
    }
  },
  { timestamps: true }
);

PortfolioItemSchema.index({ category: 1, featured: -1, sortOrder: 1 });
PortfolioItemSchema.index({ tags: 1 });

export type PortfolioItemDocument = InferSchemaType<typeof PortfolioItemSchema>;

const PortfolioItem = models.PortfolioItem || model("PortfolioItem", PortfolioItemSchema);

export default PortfolioItem;
