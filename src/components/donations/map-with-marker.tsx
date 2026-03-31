
"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

// Mock geocoding. In a real app, you'd use a geocoding service.
const getDonationPosition = (donationId: string) => {
  const hash = donationId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    lat: 34.052235 + (hash % 100) * 0.001,
    lng: -118.243683 + (hash % 100) * 0.001,
  };
};

type MapWithMarkerProps = {
    donationId: string;
}

export function MapWithMarker({ donationId }: MapWithMarkerProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <p className="text-muted-foreground text-center text-xs px-2">
          Google Maps API key is missing.
        </p>
      </div>
    );
  }

  const position = getDonationPosition(donationId);

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={position}
        defaultZoom={14}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="food_waste_system_map_marker"
        className="w-full h-full"
      >
        <AdvancedMarker position={position}>
            <Pin
              background={"hsl(var(--primary))"}
              borderColor={"hsl(var(--primary-foreground))"}
              glyphColor={"hsl(var(--primary-foreground))"}
            />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
