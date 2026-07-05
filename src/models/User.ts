import { Schema, model, models, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "viewer"], default: "viewer" },
    active: { type: Boolean, default: true },
    avatarUrl: String,
    lastLoginAt: Date
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export type UserDocument = InferSchemaType<typeof UserSchema>;

const User = models.User || model("User", UserSchema);

export default User;
