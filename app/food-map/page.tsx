"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NextDynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Navigation, Bell, ShoppingCart } from "lucide-react";
import Countdown from "@/components/Countdown";

// Define type for items
interface FoodItem {
  id: number;
  store: string;
  category: string;
  items: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  distance: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  pickupWindow: string;
  quantity: number;
  coordinates: [number, number];
  createdAt: Date;
  expiresAt: Date;
}

// Dynamically import browser-dependent components
const ImpactLeaderboard = NextDynamic(
  () => import("@/components/ImpactLeaderboard"),
  { ssr: false }
);
const SmartBundleBuilder = NextDynamic(
  () => import("@/components/SmartBundleBuilder"),
  { ssr: false }
);
const MapContainer = NextDynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = NextDynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = NextDynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = NextDynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function FoodMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxDistance, setMaxDistance] = useState<number[]>([5]);
  const [sortBy, setSortBy] = useState<"distance" | "discount" | "rating" | "time">(
    "distance"
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const now = new Date();

  // Fix Leaflet icons in browser only
  useEffect(() => {
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
      });
    });
  }, []);

  const foodItems: FoodItem[] = [
    {
      id: 1,
      store: "Woolworths Sandton City",
      category: "Supermarket",
      items: "Fresh vegetables, dairy products, bread",
      originalPrice: 180,
      discountedPrice: 72,
      discount: 60,
      distance: 0.8,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Organic", "Fresh", "Dairy-Free Options"],
      pickupWindow: "6:00 PM - 8:00 PM",
      quantity: 5,
      coordinates: [-26.1076, 28.0568],
      createdAt: now,
      expiresAt: new Date(new Date().setHours(20, 0, 0, 0)),
    },
    {
      id: 2,
      store: "Pick n Pay Roodepoort",
      category: "Bakery",
      items: "Pastries, sandwiches, fresh bread",
      originalPrice: 120,
      discountedPrice: 60,
      discount: 50,
      distance: 1.2,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Freshly Baked", "Variety Pack"],
      pickupWindow: "5:30 PM - 7:30 PM",
      quantity: 8,
      coordinates: [-26.1998, 27.8723],
      createdAt: now,
      expiresAt: new Date(new Date().setHours(19, 30, 0, 0)),
    },
    {
      id: 3,
      store: "Checkers Randburg",
      category: "Ready Meals",
      items: "Prepared meals, salads, sushi",
      originalPrice: 200,
      discountedPrice: 60,
      discount: 70,
      distance: 2.1,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Ready to Eat", "Healthy Options"],
      pickupWindow: "7:00 PM - 9:00 PM",
      quantity: 3,
      coordinates: [-26.1165, 28.0234],
      createdAt: now,
      expiresAt: new Date(new Date().setHours(21, 0, 0, 0)),
    },
  ];

  const newItems = foodItems.filter(
    (item) => now.getTime() - item.createdAt.getTime() < 24 * 60 * 60 * 1000
  );

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDistance = item.distance <= maxDistance[0];
    return matchesSearch && matchesCategory && matchesDistance;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.distance - b.distance;
      case "discount":
        return b.discount - a.discount;
      case "rating":
        return b.rating - a.rating;
      case "time":
        return a.expiresAt.getTime() - b.expiresAt.getTime();
      default:
        return 0;
    }
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        {/* … header code … */}
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* … carousel … */}

        <div className="h-96 mb-8 rounded-lg overflow-hidden">
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
            {sortedItems.map((item) => (
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
        </div>

        <ImpactLeaderboard />
        <SmartBundleBuilder />
      </div>
    </div>
  );
}
