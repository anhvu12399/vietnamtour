'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface RoutePoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: 'jade' | 'gold' | 'red';
  region: string;
  hotel: string;
  hotelDesc: string;
}

interface Props {
  points: RoutePoint[];
}

export default function ItineraryMap({ points }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapContainerRef.current || points.length === 0) return;

    let isMounted = true;
    let L: any;

    const initMap = async () => {
      // Dynamically import Leaflet to bypass Next.js SSR issues
      L = await import('leaflet');
      
      if (!isMounted) return;

      // Clean up previous map instance if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map instance
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // Use a premium clean cartographic map tile style (CartoDB Positron)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Define color hexes matching the luxury theme
      const colors = {
        jade: '#1b4332',    // Jade green
        gold: '#c5a880',    // Gold
        red: '#8B0000'      // Lacquer red
      };

      const latlngs: any[] = [];
      const markers: any[] = [];

      // Add markers
      points.forEach((pt) => {
        const pointLatLng = [pt.lat, pt.lng];
        latlngs.push(pointLatLng);

        const circleMarker = L.circleMarker(pointLatLng, {
          radius: 8,
          fillColor: colors[pt.color] || colors.gold,
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        });

        // Add popup containing luxury hotel name and description
        const popupContent = `
          <div style="font-family: Georgia, serif; padding: 4px; min-width: 180px;">
            <span style="font-size: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; color: ${colors[pt.color]}; display: block; margin-bottom: 2px;">
              ${pt.region} Destination
            </span>
            <h4 style="font-size: 13px; font-weight: 600; color: #0e1628; margin: 0 0 4px 0; font-family: sans-serif;">
              ${pt.name}
            </h4>
            <p style="font-size: 11px; font-weight: bold; color: #9A4B33; margin: 0 0 4px 0;">
              🏨 ${pt.hotel}
            </p>
            <p style="font-size: 10px; font-weight: 300; color: #555; margin: 0; line-height: 1.3;">
              ${pt.hotelDesc}
            </p>
          </div>
        `;
        
        circleMarker.bindPopup(popupContent, {
          closeButton: false,
          offset: [0, -5]
        });

        circleMarker.addTo(map);
        markers.push(circleMarker);
      });

      // Helper function to check if path is Road or Cruise
      const isRoadOrCruise = (fromId: string, toId: string) => {
        const roadPairs = new Set([
          'hanoi-halong', 'halong-hanoi',
          'hanoi-sapa', 'sapa-hanoi',
          'hue-hoian', 'hoian-hue',
          'hue-danang', 'danang-hue',
          'hoian-danang', 'danang-hoian',
          'saigon-mekong', 'mekong-saigon',
          'camranh-nhatrang', 'nhatrang-camranh'
        ]);
        return roadPairs.has(`${fromId}-${toId}`);
      };

      // Draw paths between destinations
      for (let i = 0; i < points.length - 1; i++) {
        const from = points[i];
        const to = points[i + 1];
        const pathCoords = [[from.lat, from.lng], [to.lat, to.lng]];

        if (isRoadOrCruise(from.id, to.id)) {
          // lacquer red solid line for cruise/road
          L.polyline(pathCoords, {
            color: '#8B0000',
            weight: 3.5,
            opacity: 0.85
          }).addTo(map);
        } else {
          // dotted jade line for flights
          L.polyline(pathCoords, {
            color: '#1b4332',
            weight: 3,
            opacity: 0.75,
            dashArray: '6, 8'
          }).addTo(map);
        }
      }

      // Auto-fit bounds of the entire path
      if (latlngs.length > 0) {
        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 9
        });
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, points]);

  if (!isClient) {
    return (
      <div className="w-full h-[450px] bg-paper-dim flex items-center justify-center border border-line">
        <span className="text-xs uppercase tracking-widest text-ink-soft">Loading interactive map...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full border border-line p-1 bg-white">
      <div ref={mapContainerRef} className="w-full h-[450px] z-10" />
    </div>
  );
}
