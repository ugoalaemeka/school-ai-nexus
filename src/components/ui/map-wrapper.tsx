
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component with no SSR
const DynamicMap = dynamic(() => import('./map').then(mod => ({ default: mod.Map })), { 
  ssr: false,
  loading: () => (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg bg-muted/20 flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading map...</div>
    </div>
  )
});

interface MapWrapperProps {
  className?: string;
  location?: { lat: number; lng: number };
  zoom?: number;
}

export const MapWrapper = (props: MapWrapperProps) => {
  return <DynamicMap {...props} />;
};
