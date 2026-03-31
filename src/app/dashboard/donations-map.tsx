"use client";

import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { donations } from "@/lib/placeholder-data";
import type { Donation } from "@/lib/types";
import { Button } from "@/components/ui/button";

// Mock geocoding. In a real app, you'd use a geocoding service.
const getDonationPosition = (donationId: string) => {
  const hash = donationId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    lat: 34.052235 + (hash % 100) * 0.001,
    lng: -118.243683 + (hash % 100) * 0.001,
  };
};

export default function DonationsMap({ donations }: { donations: any[] }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <p className="text-muted-foreground text-center">
          Google Maps API key is missing. <br />
          Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={{ lat: 34.052235, lng: -118.243683 }}
        defaultZoom={11}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="food_waste_system_map"
        className="w-full h-full"
      >
        {donations.map((donation) => (
          <AdvancedMarker
            key={donation.id}
            position={getDonationPosition(donation.id)}
            onClick={() => setSelectedDonation(donation)}
          >
            <Pin
              background={"hsl(var(--primary))"}
              borderColor={"hsl(var(--primary-foreground))"}
              glyphColor={"hsl(var(--primary-foreground))"}
            />
          </AdvancedMarker>
        ))}
        {selectedDonation && (
          <InfoWindow
            position={getDonationPosition(selectedDonation.id)}
            onCloseClick={() => setSelectedDonation(null)}
          >
            <div className="p-2 w-64">
                <h3 className="font-headline font-bold text-md mb-1">{selectedDonation.foodType}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedDonation.address}</p>
                <p className="text-sm"><strong>Quantity:</strong> {selectedDonation.quantity}</p>
                <p className="text-sm"><strong>Pickup:</strong> {selectedDonation.pickupTime}</p>
                <Button size="sm" className="mt-2 w-full">View Details</Button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
