import { Schema, model, models, type InferSchemaType } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    heroImage: String,
    gallery: [String],
    faqs: [
      {
        question: String,
        answer: String
      }
    ],
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    seo: {
      title: String,
      description: String,
      keywords: [String]
    }
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ category: 1, active: 1 });

export type ServiceDocument = InferSchemaType<typeof ServiceSchema>;

const Service = models.Service || model("Service", ServiceSchema);

export default Service;
