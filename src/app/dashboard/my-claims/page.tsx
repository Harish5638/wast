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

  const myClaims = JSON.parse(JSON.stringify(rawClaims));

  return <ClaimsClient myClaims={myClaims} />;
}
