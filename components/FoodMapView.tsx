// components/FoodMapView.tsx
"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import Countdown from "@/components/Countdown";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix the default icon URLs in the browser
useEffect(() => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
  });
}, []);

export default function FoodMapView({
  items,
}: {
  items: {
    id: number;
    store: string;
    expiresAt: Date;
    coordinates: LatLngTuple;
  }[];
}) {
  return (
    <MapContainer
      center={[-26.2041, 28.0473]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Marker key={item.id} position={item.coordinates}>
          <Popup>
            <strong>{item.store}</strong>
            <br />
            <Countdown expiresAt={item.expiresAt} />
            <br />
            <Link href={`/food-map/${item.id}`} className="text-blue-600">
              View details
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
