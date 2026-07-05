import { Schema, model, models, type InferSchemaType } from "mongoose";

const NoteSchema = new Schema(
  {
    content: { type: String, required: true },
    author: String,
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
    pinned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

NoteSchema.index({ leadId: 1, createdAt: -1 });
NoteSchema.index({ customerId: 1, createdAt: -1 });

export type NoteDocument = InferSchemaType<typeof NoteSchema>;

const Note = models.Note || model("Note", NoteSchema);

export default Note;
