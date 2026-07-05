import { Schema, model, models, type InferSchemaType } from "mongoose";

export const leadStatusValues = [
  "New",
  "Contacted",
  "Interested",
  "Quoted",
  "Follow Up",
  "Won",
  "Lost",
  "Spam"
];

const LeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: String,
    whatsapp: String,
    serviceInterested: String,
    budget: String,
    eventDate: String,
    location: String,
    message: String,
    leadSource: { type: String, default: "Website" },
    utmSource: String,
    utmCampaign: String,
    utmMedium: String,
    ip: String,
    browser: String,
    status: { type: String, enum: leadStatusValues, default: "New" },
    assignedTo: String,
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    notes: [
      {
        content: String,
        author: String,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    marketingConsent: { type: Boolean, default: false },
    newsletterConsent: { type: Boolean, default: false },
    consentAccepted: { type: Boolean, default: false },
    value: Number
  },
  { timestamps: true }
);

LeadSchema.index({ email: 1, createdAt: -1 });
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ leadSource: 1 });

export type LeadDocument = InferSchemaType<typeof LeadSchema>;

const Lead = models.Lead || model("Lead", LeadSchema);

export default Lead;
