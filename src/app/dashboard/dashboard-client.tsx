'use client';

import { Suspense, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { List, Map, PlusCircle } from 'lucide-react';
import DonationsList from './donations-list';
import DonationsMap from './donations-map';
import { Skeleton } from '@/components/ui/skeleton';
import { DonationForm } from './donate/donation-form';
import { ClaimDialog } from '@/components/donations/claim-dialog';
import { PickupDialog } from '@/components/donations/pickup-dialog';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from "next/navigation";
import { claimDonation, schedulePickup } from "./actions";

export function DashboardClient({ initialDonations, currentUser }: { initialDonations: any[], currentUser: any }) {
  const { toast } = useToast();
  const router = useRouter();
  const [donations, setDonations] = useState<any[]>(initialDonations);
  const [claimingDonation, setClaimingDonation] = useState<any | null>(null);
  const [pickupDonation, setPickupDonation] = useState<any | null>(null);
  
  const handleClaimSubmit = async (donation: any, address: string) => {
    // Optimistic update for UI.
    setDonations(prev => prev.filter(d => d._id !== donation._id));
    setClaimingDonation(null);
    
    // DB Call
    const result = await claimDonation(donation._id, address);
    
    if (result.success) {
        toast({
            title: "Donation Claimed!",
            description: `You have successfully claimed "${donation.foodType}".`,
        });
        router.refresh();
    } else {
        toast({ title: "Error", description: "Failed to claim donation.", variant: "destructive" });
    }
  }
  
  const handlePickupSubmit = async (donation: any) => {
    // Optimistic update for UI.
    setDonations(prev => prev.filter(d => d._id !== donation._id));
    setPickupDonation(null);
    
    // DB Call
    const result = await schedulePickup(donation._id);
    
    if (result.success) {
        toast({
            title: "Pickup Scheduled!",
            description: `You have successfully picked up "${donation.foodType}".`,
        });
        router.refresh();
    } else {
        toast({ title: "Error", description: "Failed to schedule pickup.", variant: "destructive" });
    }
  }

  return (
    <Tabs defaultValue="list" className="h-full flex flex-col">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="map">
            <Map className="mr-2 h-4 w-4" />
            Map View
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {currentUser?.role === 'donor' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Donation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create a New Donation</DialogTitle>
                  <DialogDescription>
                    Fill out the details below to list your surplus food. Our AI
                    will help categorize it.
                  </DialogDescription>
                </DialogHeader>
                <DonationForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <TabsContent value="list" className="flex-1 mt-4">
        <DonationsList donations={donations} onClaim={setClaimingDonation} onSchedulePickup={setPickupDonation} />
      </TabsContent>
      <TabsContent
        value="map"
        className="flex-1 rounded-lg overflow-hidden relative mt-4"
      >
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          {/* @ts-ignore */}
          <DonationsMap donations={donations} />
        </Suspense>
      </TabsContent>

      {claimingDonation && (
        <ClaimDialog 
            donation={claimingDonation}
            onOpenChange={() => setClaimingDonation(null)}
            onSubmit={(address) => handleClaimSubmit(claimingDonation, address)}
        />
      )}
      {pickupDonation && (
        <PickupDialog
            donation={pickupDonation}
            onOpenChange={() => setPickupDonation(null)}
            onSubmit={() => handlePickupSubmit(pickupDonation)}
        />
      )}
    </Tabs>
  );
}
