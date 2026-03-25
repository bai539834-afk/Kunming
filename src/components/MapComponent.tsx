import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
}

const RecenterMap = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
};

export default function MapComponent({ pois, onSelectPOI, visitedIds }: MapComponentProps) {
  const center: [number, number] = [25.04, 102.71]; // Kunming Center

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

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.coords}
            icon={createCustomIcon(poi)}
            eventHandlers={{
              click: () => onSelectPOI(poi),
            }}
          />
        ))}
      </MapContainer>
      
      {/* Custom Zoom Controls */}
      <div className="absolute bottom-24 right-4 z-[1000] flex flex-col gap-2">
        <button 
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold text-emerald-700 active:scale-90 transition-transform"
          onClick={() => { /* Map zoom logic handled by Leaflet default or custom hook if needed */ }}
        >
          +
        </button>
        <button 
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold text-emerald-700 active:scale-90 transition-transform"
          onClick={() => {}}
        >
          -
        </button>
      </div>
    </div>
  );
}
