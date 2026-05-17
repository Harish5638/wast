import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Donation from "@/lib/models/Donation";
import { redirect } from "next/navigation";
import { ClaimsClient } from "./claims-client";

export default async function MyClaimsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) {
    redirect("/login");
  }

  await dbConnect();
  const rawClaims = await Donation.find({ claimedBy: userId })
    .populate("donor", "name")
    .sort({ createdAt: -1 })
    .lean();

  const myClaims = rawClaims.map((c: any) => ({
    ...c,
    _id: c._id.toString(),
    id: c._id.toString(),
    donor: c.donor ? { ...c.donor, _id: c.donor._id.toString() } : null,
    claimedBy: c.claimedBy ? c.claimedBy.toString() : null,
    pickedUpBy: c.pickedUpBy ? c.pickedUpBy.toString() : null,
    createdAt: c.createdAt?.toISOString(),
    completedAt: c.completedAt?.toISOString(),
  }));

  return <ClaimsClient myClaims={myClaims} />;
}
