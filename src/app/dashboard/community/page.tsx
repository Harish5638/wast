import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import CommunityPost from "@/lib/models/CommunityPost";
import { redirect } from "next/navigation";
import { CommunityClient } from "./community-client";

export default async function CommunityPage() {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) {
        redirect("/login");
    }

    await dbConnect();
    const rawPosts = await CommunityPost.find()
        .populate("author", "name avatarUrl")
        .sort({ createdAt: -1 })
        .lean();

    const posts = JSON.parse(JSON.stringify(rawPosts)).map((p: any) => ({ ...p, id: p._id }));
    const currentUser = { id: userId, name: session?.user?.name, avatarUrl: "https://picsum.photos/seed/user/100/100" };

    return <CommunityClient initialPosts={posts} currentUser={currentUser} />;
}
