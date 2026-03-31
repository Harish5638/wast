import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Donation from "@/lib/models/Donation";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Package, Leaf, Heart } from "lucide-react";

export default async function MyDonationsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) {
    redirect("/login");
  }

  await dbConnect();
  // Fetch from DB, lean() returns plain JS objects
  const rawDonations = await Donation.find({ donor: userId })
    .populate("claimedBy", "name")
    .sort({ createdAt: -1 })
    .lean();

  // Convert ObjectIds/Dates to strings for client components if necessary, but this is a Server Component.
  const myDonations = rawDonations as any[];
  
  const totalDonations = myDonations.length;
  const edibleDonations = myDonations.filter(d => d.category === 'Edible').length;
  const impact = totalDonations * 12; // Mock impact calculation

  return (
    <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{totalDonations}</div>
            <p className="text-xs text-muted-foreground">items listed</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Edible Donations</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{edibleDonations}</div>
            <p className="text-xs text-muted-foreground">suitable for consumption</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meals Provided (est.)</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">~{impact}</div>
            <p className="text-xs text-muted-foreground">lives impacted</p>
            </CardContent>
        </Card>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>My Donation History</CardTitle>
          <CardDescription>A record of all your generous contributions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food Name</TableHead>
                <TableHead>Food Type</TableHead>
                <TableHead>Date Listed</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Claimed By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.imageHint || "Untitled"}</TableCell>
                  <TableCell>{donation.foodType}</TableCell>
                  <TableCell>{format(donation.createdAt, "PPP")}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{donation.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={donation.status === "completed" ? "default" : "secondary"} className={donation.status === 'completed' ? 'bg-primary/80' : ''}>
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{donation.claimedBy?.name || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
