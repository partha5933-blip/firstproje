import { Schema, model, models, type InferSchemaType } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: String,
    quote: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: String,
    videoUrl: String,
    source: { type: String, default: "Client" },
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

TestimonialSchema.index({ featured: -1, approved: 1 });

export type TestimonialDocument = InferSchemaType<typeof TestimonialSchema>;

const Testimonial = models.Testimonial || model("Testimonial", TestimonialSchema);

export default Testimonial;
