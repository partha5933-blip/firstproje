import { Schema, model, models, type InferSchemaType } from "mongoose";

const EmailLogSchema = new Schema(
  {
    to: { type: String, required: true },
    from: String,
    subject: { type: String, required: true },
    html: String,
    status: { type: String, enum: ["draft", "sent", "failed"], default: "draft" },
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    campaign: String,
    error: String,
    sentAt: Date
  },
  { timestamps: true }
);

EmailLogSchema.index({ to: 1, createdAt: -1 });
EmailLogSchema.index({ leadId: 1 });

export type EmailLogDocument = InferSchemaType<typeof EmailLogSchema>;

const EmailLog = models.EmailLog || model("EmailLog", EmailLogSchema);

export default EmailLog;
