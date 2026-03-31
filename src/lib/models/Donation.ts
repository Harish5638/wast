import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  foodType: string;
  quantity: string;
  storageCondition: string;
  pickupTime: string;
  address: string;
  destinationAddress?: string;
  imageUrl?: string;
  imageHint?: string;
  donor: mongoose.Types.ObjectId;
  status: "available" | "claimed" | "completed";
  category: "Edible" | "Usable" | "Compost";
  claimedBy?: mongoose.Types.ObjectId;
  pickedUpBy?: mongoose.Types.ObjectId;
  completedAt?: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    foodType: { type: String, required: true },
    quantity: { type: String, required: true },
    storageCondition: { type: String, required: true },
    pickupTime: { type: String, required: true },
    address: { type: String, required: true },
    destinationAddress: { type: String },
    imageUrl: { type: String },
    imageHint: { type: String },
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["available", "claimed", "completed"], default: "available" },
    category: { type: String, enum: ["Edible", "Usable", "Compost"], required: true },
    claimedBy: { type: Schema.Types.ObjectId, ref: "User" },
    pickedUpBy: { type: Schema.Types.ObjectId, ref: "User" },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema);
