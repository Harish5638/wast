"use client";

import { useState } from "react";
import Image from "next/image";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FileCheck, Heart, Users, MapPin, Clock, Tag, Package, Archive } from "lucide-react";
import { MapWithMarker } from "@/components/donations/map-with-marker";

export function ClaimsClient({ myClaims }: { myClaims: any[] }) {
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  const totalClaims = myClaims.length;
  const mealsReceived = totalClaims * 15; // Mock calculation
  const uniqueDonors = new Set(myClaims.map(d => d.donor?._id || d.donor?.id)).size;

  return (
    <Dialog onOpenChange={(open) => !open && setSelectedDonation(null)}>
    <div className="flex flex-col gap-6">
       <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{totalClaims}</div>
            <p className="text-xs text-muted-foreground">donations claimed</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meals Received (est.)</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">~{mealsReceived}</div>
            <p className="text-xs text-muted-foreground">meals provided to your community</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donors Supported</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{uniqueDonors}</div>
            <p className="text-xs text-muted-foreground">different donors connected with</p>
            </CardContent>
        </Card>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>My Claimed Donations</CardTitle>
          <CardDescription>
            A list of food donations you have claimed for your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food Name</TableHead>
                <TableHead>Food Type</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Date Claimed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myClaims.map((donation) => (
                <TableRow key={donation._id}>
                  <TableCell className="font-medium">{donation.imageHint || "Untitled"}</TableCell>
                  <TableCell>{donation.foodType}</TableCell>
                  <TableCell>{donation.donor?.name || "Unknown Donor"}</TableCell>
                  <TableCell>{format(new Date(donation.createdAt), "PPP")}</TableCell>
                  <TableCell>
                    <Badge variant={donation.status === "completed" ? "default" : "secondary"}>
                      {donation.status === "claimed" ? "Awaiting Pickup" : donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedDonation(donation)}>View Details</Button>
                      </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        {selectedDonation && (
          <>
            <DialogHeader>
              <DialogTitle>{selectedDonation.foodType}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                     <div className="relative h-64 w-full rounded-md overflow-hidden border">
                        {selectedDonation.imageUrl ? (
                          <Image
                              src={selectedDonation.imageUrl}
                              alt={selectedDonation.foodType}
                              fill
                              className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">No Image</div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Donor Information</h3>
                        <p className="text-sm text-muted-foreground">
                            <strong>Name:</strong> {selectedDonation.donor?.name || "Unknown"}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Donation Details</h3>
                         <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Tag className="w-4 h-4" /><strong>Category:</strong> <Badge variant="outline">{selectedDonation.category}</Badge></p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Package className="w-4 h-4" /><strong>Quantity:</strong> {selectedDonation.quantity}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Archive className="w-4 h-4" /><strong>Storage:</strong> {selectedDonation.storageCondition}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Clock className="w-4 h-4" /><strong>Pickup Window:</strong> {selectedDonation.pickupTime}</p>
                        <p className="text-sm text-muted-foreground"><strong>Status:</strong> <Badge variant={selectedDonation.status === "completed" ? "default" : "secondary"}>{selectedDonation.status}</Badge></p>
                    </div>
                </div>
                <div className="space-y-4">
                     <div>
                        <h3 className="font-semibold mb-2">Pickup Location</h3>
                        <p className="text-sm text-muted-foreground flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{selectedDonation.address}</span>
                        </p>
                    </div>
                    <div className="h-64 rounded-md overflow-hidden border">
                       <MapWithMarker donationId={selectedDonation._id} />
                    </div>
                    <Button className="w-full" asChild>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedDonation.address)}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
                    </Button>
                </div>
            </div>
          </>
        )}
      </DialogContent>
    </div>
    </Dialog>
  );
}
