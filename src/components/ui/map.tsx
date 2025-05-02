
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

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
  useEffect(() => {
    // This is needed to properly load the marker icons
    const L = require('leaflet');
    
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className={`relative w-full h-96 rounded-lg overflow-hidden shadow-lg ${className || ''}`}>
      <MapContainer 
        center={[location.lat, location.lng]} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            Our Office in Lagos
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
