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
import { Truck, Map, Users, MapPin, Clock, Tag, Package, Archive } from "lucide-react";
import { MapWithMarker } from "@/components/donations/map-with-marker";

export function PickupsClient({ myPickups }: { myPickups: any[] }) {
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  const totalPickups = myPickups.length;
  const distance = totalPickups * 7; // Mock calculation
  const communitiesConnected = new Set(myPickups.map(p => `${p.donor?._id}-${p.claimedBy?._id}`)).size;

  return (
    <Dialog onOpenChange={(open) => !open && setSelectedDonation(null)}>
     <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{totalPickups}</div>
            <p className="text-xs text-muted-foreground">deliveries completed</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distance Covered (est.)</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">~{distance} km</div>
            <p className="text-xs text-muted-foreground">connecting communities</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communities Connected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">{communitiesConnected}</div>
            <p className="text-xs text-muted-foreground">unique routes covered</p>
            </CardContent>
        </Card>
        </div>
        <Card>
        <CardHeader>
            <CardTitle>My Pickups</CardTitle>
            <CardDescription>A history of your volunteer pickups.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Food Name</TableHead>
                <TableHead>Food Type</TableHead>
                <TableHead>From (Donor)</TableHead>
                <TableHead>To (Organization)</TableHead>
                <TableHead>Date Completed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {myPickups.map((donation) => (
                <TableRow key={donation._id}>
                    <TableCell className="font-medium">{donation.imageHint || "Untitled"}</TableCell>
                    <TableCell>{donation.foodType}</TableCell>
                    <TableCell>{donation.donor?.name || "Unknown"} </TableCell>
                    <TableCell>{donation.claimedBy?.name || "Unknown"}</TableCell>
                    <TableCell>
                    {donation.completedAt ? format(new Date(donation.completedAt), "PPP") : "Pending"}
                    </TableCell>
                    <TableCell>
                    <Badge variant={donation.status === "completed" ? "default" : "secondary"}>
                        {donation.status}
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
                        <h3 className="font-semibold mb-2">Route Information</h3>
                        <p className="text-sm text-muted-foreground">
                            <strong>From:</strong> {selectedDonation.donor?.name || "Unknown"}
                        </p>
                         <p className="text-sm text-muted-foreground">
                            <strong>To:</strong> {selectedDonation.claimedBy?.name || "Unknown"}
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
                         <a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(selectedDonation.address)}&destination=${encodeURIComponent(selectedDonation.claimedBy?.name || selectedDonation.address)}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
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
