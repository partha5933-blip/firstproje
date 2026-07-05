import { Schema, model, models, type InferSchemaType } from "mongoose";

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: String,
    whatsapp: String,
    location: String,
    lifetimeValue: { type: Number, default: 0 },
    tags: [String],
    leadIds: [{ type: Schema.Types.ObjectId, ref: "Lead" }],
    bookingIds: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    notes: String,
    consentAccepted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

CustomerSchema.index({ email: 1 }, { unique: true });

export type CustomerDocument = InferSchemaType<typeof CustomerSchema>;

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;
