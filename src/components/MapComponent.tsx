import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocateFixed } from 'lucide-react';
import { POI } from '../types';
import { THEME } from '../constants';

// Fix for default marker icons in Leaflet + React
// @ts-ignore
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapComponentProps {
  pois: POI[];
  onSelectPOI: (poi: POI) => void;
  visitedIds: string[];
  userLocation: [number, number] | null;
}

const RecenterMap = ({ coords, zoom = 15, trigger }: { coords: [number, number] | null, zoom?: number, trigger: any }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [trigger, map]); // Use a separate trigger to avoid fighting dependencies
  return null;
};

export default function MapComponent({ pois, onSelectPOI, visitedIds, userLocation }: MapComponentProps) {
  const center: [number, number] = [25.04, 102.71]; // Kunming Center
  const [mapTarget, setMapTarget] = useState<{ coords: [number, number], zoom: number, id: number } | null>(null);

  const createCustomIcon = (poi: POI) => {
    const isVisited = visitedIds.includes(poi.id);
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="relative group">
          <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg"
               style="background-color: ${isVisited ? THEME.primary : 'white'}; border-color: ${THEME.primary};">
            <span class="text-lg">${poi.stamp}</span>
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm border border-gray-100">
            ${poi.name}
          </div>
          ${isVisited ? '<div class="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border border-white flex items-center justify-center text-[8px]">✨</div>' : ''}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `
      <div class="relative">
        <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
        <div class="absolute -inset-2 bg-blue-500/30 rounded-full animate-ping"></div>
        <div class="absolute -inset-4 bg-blue-500/10 rounded-full animate-pulse"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
        maxZoom={18}
        minZoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <RecenterMap coords={mapTarget?.coords || null} zoom={mapTarget?.zoom} trigger={mapTarget?.id} />
        
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.coords}
            icon={createCustomIcon(poi)}
            eventHandlers={{
              click: () => {
                onSelectPOI(poi);
                setMapTarget({ coords: poi.coords, zoom: 15, id: Date.now() });
              },
            }}
          />
        ))}

        {userLocation && (
          <Marker position={userLocation} icon={userIcon} />
        )}
      </MapContainer>
      
      {/* Custom Zoom & Locate Controls */}
      <div className="absolute bottom-24 right-4 z-[1000] flex flex-col gap-3">
        <button 
          aria-label="Locate Me"
          className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 active:scale-90 transition-all border border-gray-100 hover:bg-gray-50"
          onClick={() => {
            if (userLocation) {
              setMapTarget({ coords: userLocation, zoom: 16, id: Date.now() });
            } else {
              alert('无法获取您的位置，请检查定位权限。');
            }
          }}
        >
          <LocateFixed size={24} />
        </button>
      </div>
    </div>
  );
}
