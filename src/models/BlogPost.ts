import { Schema, model, models, type InferSchemaType } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    category: { type: String, required: true },
    image: String,
    tags: [String],
    author: String,
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: Date,
    comments: [
      {
        name: String,
        email: String,
        content: String,
        approved: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    seo: {
      title: String,
      description: String,
      keywords: [String]
    }
  },
  { timestamps: true }
);

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ title: "text", excerpt: "text", tags: "text" });

export type BlogPostDocument = InferSchemaType<typeof BlogPostSchema>;

const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);

export default BlogPost;
