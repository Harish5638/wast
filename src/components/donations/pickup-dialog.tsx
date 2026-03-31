
"use client";

import { useState } from "react";
import { Donation } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapWithMarker } from "./map-with-marker";
import { MapPin, Clock, Calendar as CalendarIcon, Building, HandHeart, Navigation } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type PickupDialogProps = {
  donation: Donation;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
};

export function PickupDialog({ donation, onOpenChange, onSubmit }: PickupDialogProps) {
  const [pickupDate, setPickupDate] = useState<Date>();
  
  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Pickup</DialogTitle>
          <DialogDescription>
            Confirm your details to transport this donation.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
            <div className="h-48 w-full rounded-md overflow-hidden border">
                <MapWithMarker donationId={donation.id} />
            </div>

            <div className="text-sm space-y-2">
                <p><strong>Donation:</strong> {donation.foodType}</p>
                <p className="flex items-start gap-2">
                    <HandHeart className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <span><strong>From:</strong> {donation.donor.name} at {donation.address}</span>
                </p>
                <p className="flex items-start gap-2">
                    <Building className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <span><strong>To:</strong> {donation.claimedBy?.name} at {donation.destinationAddress}</span>
                </p>
                <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span><strong>Window:</strong> {donation.pickupTime}</span>
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(donation.address)}&destination=${encodeURIComponent(donation.destinationAddress || '')}`} target="_blank" rel="noopener noreferrer">
                        <Navigation className="mr-2 h-4 w-4" />
                        Get Directions
                    </a>
                </Button>
            </div>
          <div className="space-y-2">
            <Label htmlFor="contactName">Your Name</Label>
            <Input id="contactName" placeholder="Your Name" required />
          </div>
           <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input id="contactPhone" type="tel" placeholder="Your Phone Number" required />
          </div>
           <div className="space-y-2">
             <Label>Estimated Pickup Date</Label>
              <Popover>
                  <PopoverTrigger asChild>
                  <Button
                      variant={"outline"}
                      className={cn(
                      "w-full justify-start text-left font-normal",
                      !pickupDate && "text-muted-foreground"
                      )}
                  >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                  <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                  />
                  </PopoverContent>
              </Popover>
           </div>
           <div className="space-y-2">
             <Label>Estimated Pickup Window</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="pickupTimeStart" type="text" placeholder="e.g. 09:00 AM" required />
                <Input id="pickupTimeEnd" type="text" placeholder="e.g. 05:00 PM" required />
              </div>
           </div>
          <Button type="submit" className="w-full">
            Schedule Pickup
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
