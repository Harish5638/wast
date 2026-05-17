"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string; avatarUrl: string; description: string }) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await dbConnect();
    await User.findByIdAndUpdate(userId, {
      name: data.name,
      avatarUrl: data.avatarUrl,
      description: data.description,
    });

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard"); // Refresh header/nav etc.
    
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, message: "Failed to update profile. Please try again." };
  }
}
