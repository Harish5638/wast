"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import CommunityPost from "@/lib/models/CommunityPost";

export async function createCommunityPost(content: string, imageUrl?: string) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await dbConnect();
    await CommunityPost.create({
      author: userId,
      content,
      imageUrl,
      likes: 0,
      comments: []
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, message: "Failed to create post" };
  }
}
