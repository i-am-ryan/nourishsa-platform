"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Heart, Leaf, Star, TrendingUp, Clock, ShoppingCart, BookOpen, Award, Bell } from "lucide-react"
import Link from "next/link"

export default function IndividualDashboard() {
  const [notifications] = useState([
    { id: 1, message: "New food available 0.5km away", time: "5 min ago", type: "food" },
    { id: 2, message: "Community garden workshop tomorrow", time: "1 hour ago", type: "event" },
    { id: 3, message: "You earned a new badge!", time: "2 hours ago", type: "achievement" },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      {/* Header */}
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
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">T</span>
                </div>
                <span className="text-sm font-medium">Thandi M.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Thandi!</h1>
          <p className="text-gray-600">Here's what's happening in your community today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Meals Accessed</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <Heart className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Points Earned</p>
                  <p className="text-2xl font-bold">1,250</p>
                </div>
                <Star className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Community Rank</p>
                  <p className="text-2xl font-bold">#23</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Badges</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Award className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="food-map" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="food-map">
                  <Link href="/food-map" className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Food Map</span>
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="garden">Garden</TabsTrigger>
                <TabsTrigger value="marketplace">
                  <Link href="/marketplace" className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Market</span>
                  </Link>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="food-map" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5" />
                      <span>Available Food Near You</span>
                    </CardTitle>
                    <CardDescription>Real-time food availability within 2km of your location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Roodepoort Community Center",
                          distance: "0.5km",
                          items: "Fresh vegetables, bread",
                          time: "Available now",
                          type: "pickup",
                        },
                        {
                          name: "Local Bakery Surplus",
                          distance: "1.2km",
                          items: "Pastries, sandwiches",
                          time: "Until 6 PM",
                          type: "rescue",
                        },
                        {
                          name: "Community Garden Harvest",
                          distance: "1.8km",
                          items: "Spinach, tomatoes, herbs",
                          time: "Weekend pickup",
                          type: "garden",
                        },
                      ].map((location, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold">{location.name}</h4>
                              <Badge
                                variant={
                                  location.type === "pickup"
                                    ? "default"
                                    : location.type === "rescue"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {location.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{location.items}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{location.distance}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{location.time}</span>
                              </span>
                            </div>
                          </div>
                          <Button size="sm" className="ml-4">
                            Reserve
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nutrition" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition Assistant</CardTitle>
                    <CardDescription>Personalized meal planning and nutritional guidance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-emerald-50 to-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">💡 What can I cook with R50?</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Based on current local prices and available surplus food
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-medium">Vegetable Curry</h5>
                            <p className="text-xs text-gray-600">Serves 4 • R45</p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <h5 className="font-medium">Bean Stew</h5>
                            <p className="text-xs text-gray-600">Serves 6 • R38</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Weekly Nutrition Goals</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Protein</span>
                              <span>75%</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Vegetables</span>
                              <span>60%</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Fruits</span>
                              <span>40%</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="garden" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Leaf className="w-5 h-5" />
                      <span>Community Gardens</span>
                    </CardTitle>
                    <CardDescription>Join local gardens and learn sustainable growing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-emerald-800 mb-2">🌱 Your Garden Progress</h4>
                        <p className="text-sm text-emerald-700 mb-3">Roodepoort Community Garden - Plot #12</p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-emerald-600">3</div>
                            <div className="text-xs text-emerald-600">Crops Growing</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-emerald-600">2</div>
                            <div className="text-xs text-emerald-600">Weeks to Harvest</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-emerald-600">15kg</div>
                            <div className="text-xs text-emerald-600">Expected Yield</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Upcoming Workshops</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium">Composting Basics</p>
                              <p className="text-sm text-gray-600">Tomorrow, 2 PM</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Join
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium">Water-Saving Techniques</p>
                              <p className="text-sm text-gray-600">Saturday, 10 AM</p>
                            </div>
                            <Button size="sm" variant="outline">
                              Join
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="marketplace" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Local Marketplace</span>
                    </CardTitle>
                    <CardDescription>Fresh produce from local farmers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Fresh Spinach", price: "R15/bunch", farmer: "Sipho's Garden", rating: 4.8 },
                        { name: "Tomatoes", price: "R25/kg", farmer: "Green Valley", rating: 4.9 },
                        { name: "Sweet Potatoes", price: "R20/kg", farmer: "Ubuntu Farm", rating: 4.7 },
                        { name: "Herbs Bundle", price: "R12/pack", farmer: "City Herbs", rating: 4.6 },
                      ].map((product, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="aspect-square bg-gray-100 rounded mb-2"></div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.farmer}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-emerald-600">{product.price}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "food"
                            ? "bg-emerald-500"
                            : notification.type === "event"
                              ? "bg-blue-500"
                              : "bg-orange-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "First Meal", icon: "🍽️", earned: true },
                    { name: "Garden Helper", icon: "🌱", earned: true },
                    { name: "Community Star", icon: "⭐", earned: true },
                    { name: "Eco Warrior", icon: "🌍", earned: false },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg ${
                        badge.earned ? "bg-gradient-to-r from-emerald-50 to-orange-50" : "bg-gray-50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className={`text-xs font-medium ${badge.earned ? "text-emerald-700" : "text-gray-500"}`}>
                        {badge.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Continue Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Food Preservation</h4>
                    <p className="text-sm text-blue-600 mb-2">Learn to make food last longer</p>
                    <Progress value={60} className="h-2 mb-2" />
                    <Button size="sm" variant="outline" className="w-full">
                      Continue
                    </Button>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Urban Farming</h4>
                    <p className="text-sm text-green-600 mb-2">Grow food in small spaces</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Start Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
