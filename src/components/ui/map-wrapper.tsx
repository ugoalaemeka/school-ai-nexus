
import React, { Suspense } from 'react';

// Use React's lazy loading instead of Next.js dynamic imports
const LazyMap = React.lazy(() => import('./map').then(mod => ({ default: mod.Map })));

interface MapWrapperProps {
  className?: string;
  location?: { lat: number; lng: number };
  zoom?: number;
}

export const MapWrapper = (props: MapWrapperProps) => {
  return (
    <Suspense fallback={
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg bg-muted/20 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading map...</div>
      </div>
    }>
      <LazyMap {...props} />
    </Suspense>
  );
};
