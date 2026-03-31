import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Donation from "@/lib/models/Donation";
import { redirect } from "next/navigation";
import { PickupsClient } from "./pickups-client";

export default async function MyPickupsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) {
    redirect("/login");
  }

  await dbConnect();
  const rawPickups = await Donation.find({ pickedUpBy: userId })
    .populate("donor", "name")
    .populate("claimedBy", "name")
    .sort({ createdAt: -1 })
    .lean();

  const myPickups = JSON.parse(JSON.stringify(rawPickups));

  return <PickupsClient myPickups={myPickups} />;
}
