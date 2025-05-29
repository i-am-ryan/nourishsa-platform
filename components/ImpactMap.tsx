"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import type { LatLngTuple } from "leaflet";

// Dynamically import React-Leaflet components so they only load in the browser
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function ImpactMap() {
  const sampleMarkers: { position: LatLngTuple; title: string; description: string }[] = [
    {
      position: [-26.2041, 28.0473],
      title: "Donor: Pick n Pay, JHB",
      description: "Donated 100kg of surplus fruit to Soweto Children's Home.",
    },
    {
      position: [-26.2485, 27.854],
      title: "NGO: Soweto Children's Home",
      description: "Received food bundle on 28 May.",
    },
    {
      position: [-25.7479, 28.2293],
      title: "Donor: Local Farm, PTA",
      description: "Delivered 40kg of spinach and tomatoes to community kitchen.",
    },
  ];

  useEffect(() => {
    // Only in the browser, fix the default Leaflet icon URLs
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    });
  }, []);

  return (
    <div className="rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <h2 className="text-xl font-semibold px-4 pt-4 pb-2">🌍 Food Impact Map</h2>
      <MapContainer
        center={[-26.2, 28.0]}
        zoom={8}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sampleMarkers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>
              <strong>{marker.title}</strong>
              <br />
              {marker.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
