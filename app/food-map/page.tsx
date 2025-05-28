"use client";

import React, { useState } from "react";
import ImpactLeaderboard from "@/components/ImpactLeaderboard";
import SmartBundleBuilder from "@/components/SmartBundleBuilder"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  MapPin,
  Clock as ClockIcon,
  Star,
  Filter,
  Search,
  Navigation,
  Heart,
  Leaf,
  Bell,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Countdown from "@/components/Countdown";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

export default function FoodMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxDistance, setMaxDistance] = useState([5]);
  const [sortBy, setSortBy] = useState("distance");
  const [favorites, setFavorites] = useState<number[]>([]);
  const now = new Date();

  const foodItems = [
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                NourishSA
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Navigation className="w-4 h-4 mr-2" />
                My Location
              </Button>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <Button size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Rescue Map</h1>
          <p className="text-gray-600">Discover surplus food near you and help reduce waste</p>
        </div>

        {/* What’s New Carousel */}
        {newItems.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What’s New</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {newItems.map((item) => (
                <Card key={item.id} className="min-w-[250px] shrink-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.store}
                      loading="lazy"
                      className="w-full h-40 object-cover rounded-t"
                    />
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-white">
                      New
                    </Badge>
                  </div>
                  <CardContent>
                    <h3 className="font-bold text-lg">{item.store}</h3>
                    <p className="text-sm text-gray-600 truncate">{item.items}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-emerald-600 font-semibold">
                        R{item.discountedPrice}
                      </span>
                      <Button size="sm" variant="outline">
                        Reserve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Map View */}
        <div className="h-96 mb-8 rounded-lg overflow-hidden">
          <MapContainer
            center={[-26.2041, 28.0473]}
            zoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sortedItems.map((item) => (
              <Marker key={item.id} position={item.coordinates as [number, number]}>
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
