"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Leaf, DollarSign, Package, Users, Thermometer, Droplets, Sun, Bell, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"

export default function FarmerDashboard() {
  const [newListing, setNewListing] = useState(false)

  const salesData = [
    { month: "Jan", revenue: 2400, orders: 12 },
    { month: "Feb", revenue: 3200, orders: 18 },
    { month: "Mar", revenue: 2800, orders: 15 },
    { month: "Apr", revenue: 4100, orders: 22 },
    { month: "May", revenue: 3800, orders: 20 },
    { month: "Jun", revenue: 4500, orders: 25 },
  ]

  const cropData = [
    { name: "Tomatoes", planted: 100, harvested: 85, revenue: 1200 },
    { name: "Spinach", planted: 80, harvested: 75, revenue: 800 },
    { name: "Carrots", planted: 60, harvested: 55, revenue: 600 },
    { name: "Herbs", planted: 40, harvested: 38, revenue: 450 },
  ]

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
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">S</span>
                </div>
                <span className="text-sm font-medium">Sipho's Garden</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sipho!</h1>
          <p className="text-gray-600">Manage your farm, track sales, and connect with your community</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Monthly Revenue</p>
                  <p className="text-3xl font-bold">R4,500</p>
                  <p className="text-emerald-200 text-sm">+18% from last month</p>
                </div>
                <DollarSign className="w-10 h-10 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Listings</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-blue-200 text-sm">3 new this week</p>
                </div>
                <Package className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Total Orders</p>
                  <p className="text-3xl font-bold">25</p>
                  <p className="text-orange-200 text-sm">This month</p>
                </div>
                <Users className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Crops Growing</p>
                  <p className="text-3xl font-bold">8</p>
                  <p className="text-green-200 text-sm">4 ready to harvest</p>
                </div>
                <Leaf className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="crops">My Crops</TabsTrigger>
                <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Weather & Farm Conditions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Conditions</CardTitle>
                    <CardDescription>Current weather and soil conditions for your farm</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Sun className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">24°C</div>
                        <div className="text-sm text-gray-600">Sunny</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">65%</div>
                        <div className="text-sm text-gray-600">Soil Moisture</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Thermometer className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">22°C</div>
                        <div className="text-sm text-gray-600">Soil Temp</div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-emerald-800 mb-2">🌱 Today's Recommendations</h4>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>• Perfect conditions for transplanting tomato seedlings</li>
                        <li>• Consider watering the herb garden this evening</li>
                        <li>• Harvest spinach before afternoon heat</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Sales */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                    <CardDescription>Your revenue and order trends over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue (R)" />
                        <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={3} name="Orders" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="crops" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Crop Management</CardTitle>
                        <CardDescription>Monitor and manage your growing crops</CardDescription>
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Crop
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Cherry Tomatoes",
                          variety: "Roma",
                          planted: "2024-04-15",
                          status: "Flowering",
                          progress: 75,
                          harvest: "2 weeks",
                          health: "Excellent",
                        },
                        {
                          name: "Baby Spinach",
                          variety: "Space",
                          planted: "2024-05-01",
                          status: "Growing",
                          progress: 60,
                          harvest: "1 week",
                          health: "Good",
                        },
                        {
                          name: "Mixed Herbs",
                          variety: "Basil, Parsley",
                          planted: "2024-03-20",
                          status: "Ready",
                          progress: 100,
                          harvest: "Now",
                          health: "Excellent",
                        },
                        {
                          name: "Carrots",
                          variety: "Nantes",
                          planted: "2024-04-01",
                          status: "Maturing",
                          progress: 85,
                          harvest: "1 week",
                          health: "Good",
                        },
                      ].map((crop, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{crop.name}</h4>
                              <p className="text-sm text-gray-600">
                                {crop.variety} • Planted {crop.planted}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  crop.status === "Ready"
                                    ? "default"
                                    : crop.status === "Flowering"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {crop.status}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div>
                              <div className="text-sm text-gray-600">Progress</div>
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-emerald-500 h-2 rounded-full"
                                    style={{ width: `${crop.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{crop.progress}%</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Harvest</div>
                              <div className="font-medium">{crop.harvest}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Health</div>
                              <div
                                className={`font-medium ${
                                  crop.health === "Excellent" ? "text-green-600" : "text-yellow-600"
                                }`}
                              >
                                {crop.health}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="marketplace" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>My Marketplace Listings</CardTitle>
                        <CardDescription>Manage your products and orders</CardDescription>
                      </div>
                      <Button onClick={() => setNewListing(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Listing
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {newListing ? (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Create New Listing</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input id="product-name" placeholder="e.g., Fresh Spinach" />
                          </div>
                          <div>
                            <Label htmlFor="price">Price per kg</Label>
                            <Input id="price" placeholder="R25" />
                          </div>
                          <div>
                            <Label htmlFor="quantity">Available Quantity</Label>
                            <Input id="quantity" placeholder="10 kg" />
                          </div>
                          <div>
                            <Label htmlFor="harvest-date">Harvest Date</Label>
                            <Input id="harvest-date" type="date" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Describe your product..." />
                        </div>
                        <div className="flex space-x-2">
                          <Button>Create Listing</Button>
                          <Button variant="outline" onClick={() => setNewListing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {[
                          {
                            name: "Fresh Spinach",
                            price: "R15/bunch",
                            stock: "25 bunches",
                            orders: 8,
                            status: "Active",
                          },
                          {
                            name: "Cherry Tomatoes",
                            price: "R35/kg",
                            stock: "12 kg",
                            orders: 5,
                            status: "Active",
                          },
                          {
                            name: "Mixed Herbs",
                            price: "R12/pack",
                            stock: "18 packs",
                            orders: 12,
                            status: "Active",
                          },
                          {
                            name: "Baby Carrots",
                            price: "R28/kg",
                            stock: "Out of stock",
                            orders: 0,
                            status: "Inactive",
                          },
                        ].map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold">{product.name}</h4>
                                <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                                  {product.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">Price: </span>
                                  {product.price}
                                </div>
                                <div>
                                  <span className="font-medium">Stock: </span>
                                  {product.stock}
                                </div>
                                <div>
                                  <span className="font-medium">Orders: </span>
                                  {product.orders}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Crop Performance Analytics</CardTitle>
                    <CardDescription>Analyze your crop yields and revenue by type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={cropData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#10b981" name="Revenue (R)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Yield Efficiency</CardTitle>
                    <CardDescription>Compare planted vs harvested quantities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cropData.map((crop, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{crop.name}</span>
                            <span>{Math.round((crop.harvested / crop.planted) * 100)}% efficiency</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-emerald-500 h-3 rounded-full"
                              style={{ width: `${(crop.harvested / crop.planted) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Planted: {crop.planted} units</span>
                            <span>Harvested: {crop.harvested} units</span>
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
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { customer: "Sarah M.", product: "Spinach", amount: "R45", status: "Delivered" },
                    { customer: "John D.", product: "Tomatoes", amount: "R70", status: "Pending" },
                    { customer: "Mary K.", product: "Herbs", amount: "R24", status: "Processing" },
                    { customer: "Peter L.", product: "Carrots", amount: "R56", status: "Delivered" },
                  ].map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.amount}</p>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Processing"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Farm Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Farm Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <h4 className="font-medium text-emerald-800">🌱 Planting Tip</h4>
                    <p className="text-sm text-emerald-700 mt-1">
                      Plant lettuce seeds every 2 weeks for continuous harvest
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">💧 Watering Tip</h4>
                    <p className="text-sm text-blue-700 mt-1">Water early morning to reduce evaporation and disease</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800">🐛 Pest Control</h4>
                    <p className="text-sm text-orange-700 mt-1">Companion plant marigolds to naturally repel pests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Farmers Market</h4>
                    <p className="text-sm text-gray-600">Saturday, 8 AM - 2 PM</p>
                    <p className="text-sm text-gray-600">Roodepoort Community Center</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Sustainable Farming Workshop</h4>
                    <p className="text-sm text-gray-600">Next Tuesday, 6 PM</p>
                    <p className="text-sm text-gray-600">Online via NourishSA</p>
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
