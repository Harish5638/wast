import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  description?: string;
  role: "donor" | "volunteer" | "organization";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    description: { type: String, default: "" },
    role: { type: String, enum: ["donor", "volunteer", "organization"], default: "donor" },
  },
  { timestamps: true }
);

UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
