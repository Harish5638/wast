import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Donation from "@/lib/models/Donation";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) {
        redirect("/login");
    }

    await dbConnect();
    const rawDonations = await Donation.find({ status: { $in: ["available", "claimed"] } })
        .populate("donor", "name avatarUrl")
        .sort({ createdAt: -1 })
        .select("foodType quantity status address imageUrl donor category createdAt claimedBy pickedUpBy")
        .lean();

    const donations = rawDonations.map((d: any) => ({
        ...d,
        _id: d._id.toString(),
        id: d._id.toString(),
        donor: d.donor ? {
            ...d.donor,
            _id: d.donor._id.toString(),
        } : null,
        claimedBy: d.claimedBy?.toString(),
        pickedUpBy: d.pickedUpBy?.toString(),
        createdAt: d.createdAt?.toISOString(),
    }));

    const currentUser = { id: userId, role: (session?.user as any)?.role, name: session?.user?.name };

    return <DashboardClient initialDonations={donations} currentUser={currentUser} />;
}
