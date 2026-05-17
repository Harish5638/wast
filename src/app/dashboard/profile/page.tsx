import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    redirect("/login");
  }

  await dbConnect();
  const user = await User.findById(userId).lean();

  if (!user) {
      return <div>User not found.</div>;
  }

  const serializedUser = {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      description: user.description,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>
            Update your account details and how you appear to others.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={serializedUser} />
        </CardContent>
      </Card>
      
      <Card className="bg-muted/50 border-dashed border-2">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Account Level</CardTitle>
          <CardDescription>Your current achievement status.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">You are currently a <span className="font-bold text-primary capitalize">{(session?.user as any)?.role}</span>. Complete more impact activities to rise through the ranks.</p>
        </CardContent>
      </Card>
    </div>
  );
}
