import { Schema, model, models, type InferSchemaType } from "mongoose";

const BookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    whatsapp: String,
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    budget: String,
    message: String,
    inspirationFiles: [
      {
        name: String,
        url: String,
        mimeType: String,
        size: Number
      }
    ],
    status: {
      type: String,
      enum: ["Requested", "Confirmed", "Rescheduled", "Completed", "Cancelled"],
      default: "Requested"
    },
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    consentAccepted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

BookingSchema.index({ date: 1, status: 1 });
BookingSchema.index({ email: 1 });

export type BookingDocument = InferSchemaType<typeof BookingSchema>;

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
