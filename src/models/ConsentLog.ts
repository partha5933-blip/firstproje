import { Schema, model, models, type InferSchemaType } from "mongoose";

const ConsentLogSchema = new Schema(
  {
    email: String,
    category: {
      type: String,
      enum: ["necessary", "analytics", "marketing", "newsletter"],
      required: true
    },
    accepted: { type: Boolean, required: true },
    source: { type: String, default: "website" },
    ip: String,
    browser: String,
    policyVersion: String
  },
  { timestamps: true }
);

ConsentLogSchema.index({ email: 1, createdAt: -1 });
ConsentLogSchema.index({ category: 1, accepted: 1 });

export type ConsentLogDocument = InferSchemaType<typeof ConsentLogSchema>;

const ConsentLog = models.ConsentLog || model("ConsentLog", ConsentLogSchema);

export default ConsentLog;
