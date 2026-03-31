import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { availableBadges } from "@/lib/placeholder-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Donation from "@/lib/models/Donation";
import CommunityPost from "@/lib/models/CommunityPost";
import { redirect } from "next/navigation";

export default async function RewardsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  
  if (!userId) {
    redirect("/login");
  }

  await dbConnect();

  const donationsMade = await Donation.countDocuments({ donor: userId });
  const pickupsCompleted = await Donation.countDocuments({ pickedUpBy: userId, status: "completed" });
  const claimsMade = await Donation.countDocuments({ claimedBy: userId });
  const userPosts = await CommunityPost.find({ author: userId }).lean();
  
  const postsMade = userPosts.length;
  const maxLikes = userPosts.reduce((max, post) => Math.max(max, post.likes), 0);

  const xp = (donationsMade * 10) + (pickupsCompleted * 20) + (claimsMade * 5) + (postsMade * 5);

  let currentLevel = 1;
  let nextLevelXp = 50;
  let prevLevelXp = 0;

  if (xp >= 50) { currentLevel = 2; nextLevelXp = 150; prevLevelXp = 50; }
  if (xp >= 150) { currentLevel = 3; nextLevelXp = 300; prevLevelXp = 150; }
  if (xp >= 300) { currentLevel = 4; nextLevelXp = 500; prevLevelXp = 300; }
  if (xp >= 500) { currentLevel = 5; nextLevelXp = 1000; prevLevelXp = 500; }
  if (xp >= 1000) { currentLevel = "Max"; nextLevelXp = xp; prevLevelXp = 1000; }

  const progress = currentLevel === "Max" ? 100 : Math.min(100, Math.max(0, ((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100));

  const earnedBadgeIds: string[] = [];
  if (donationsMade >= 1) earnedBadgeIds.push('b1');
  if (maxLikes >= 10) earnedBadgeIds.push('b2');
  if (pickupsCompleted >= 1) earnedBadgeIds.push('b3');
  if (donationsMade >= 5 || xp >= 150) earnedBadgeIds.push('b4');

  const unlockedBadges = availableBadges.filter(b => earnedBadgeIds.includes(b.id));
  const lockedBadges = availableBadges.filter(b => !earnedBadgeIds.includes(b.id));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            You are currently Level {currentLevel}. Keep up the great work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Level {currentLevel}</span>
            <span>{currentLevel === "Max" ? "Max Level" : `Level ${currentLevel + 1}`}</span>
          </div>
          <Progress value={progress} className="w-full h-3" />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {currentLevel === "Max" ? "You have reached the maximum level!" : `${Math.round(100 - progress)}% to the next level`}
          </p>
          <p className="text-center text-xs text-muted-foreground mt-1">
            Total XP: {xp}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Badges</CardTitle>
          <CardDescription>
            A collection of your achievements on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <TooltipProvider>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {unlockedBadges.map((badge) => (
                        <Tooltip key={badge.id}>
                            <TooltipTrigger>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                                        <badge.icon className="w-12 h-12 text-primary" />
                                    </div>
                                    <p className="text-sm font-medium text-center">{badge.name}</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{badge.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                     {lockedBadges.map((badge) => (
                        <Tooltip key={badge.id}>
                            <TooltipTrigger>
                                <div className="flex flex-col items-center gap-2 opacity-40">
                                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                                        <badge.icon className="w-12 h-12 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-medium text-center">{badge.name}</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{badge.description} (Locked)</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
