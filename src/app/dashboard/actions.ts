"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Donation from "@/lib/models/Donation";

import { revalidatePath } from "next/cache";

export async function claimDonation(donationId: string, destinationAddress: string) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return { success: false, message: "Unauthorized" };

  try {
    await dbConnect();
    await Donation.findByIdAndUpdate(donationId, {
      status: "claimed",
      claimedBy: userId,
      destinationAddress
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to claim donation:", error);
    return { success: false, message: "Failed to claim donation" };
  }
}

export async function schedulePickup(donationId: string) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) return { success: false, message: "Unauthorized" };

  try {
    await dbConnect();
    await Donation.findByIdAndUpdate(donationId, {
      status: "completed",
      pickedUpBy: userId,
      completedAt: new Date()
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to schedule pickup:", error);
    return { success: false, message: "Failed to schedule pickup" };
  }
}
