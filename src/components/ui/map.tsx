
import React, { useEffect, useRef } from 'react';

// Add TypeScript definitions for the Google Maps API
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface MapProps {
  className?: string;
  location?: { lat: number; lng: number };
  zoom?: number;
}

export const Map = ({ 
  className, 
  location = { lat: 6.5244, lng: 3.3792 }, // Default coordinates for Lagos, Nigeria
  zoom = 13
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Function to initialize map
    const initMap = () => {
      if (!mapRef.current) return;
      
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: zoom,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "poi",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "transit",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{ "color": "#c9c9c9" }]
          }
        ]
      });

      // Add marker for the location
      new window.google.maps.Marker({
        position: location,
        map: mapInstanceRef.current,
        title: "EduNexus Location"
      });
    };

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Load Google Maps API dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Define the callback in the global scope
      window.initMap = initMap;
      
      document.head.appendChild(script);
      
      return () => {
        // Clean up
        window.initMap = undefined;
        script.remove();
      };
    }
  }, [location, zoom]);

  return (
    <div className={`relative w-full h-96 rounded-lg overflow-hidden shadow-lg ${className || ''}`}>
      <div ref={mapRef} className="absolute inset-0"></div>
      
      {/* Message for users to add their API key */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm text-center p-4">
        <div>
          <p className="text-lg font-medium mb-2">Google Maps Integration</p>
          <p>Replace 'YOUR_API_KEY_HERE' in the Map component with your Google Maps API key to see the interactive map of Lagos, Nigeria.</p>
        </div>
      </div>
    </div>
  );
};
