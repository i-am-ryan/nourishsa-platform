"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, TrendingUp, MapPin, Calendar, Package, Heart, Leaf, Bell, Download, Plus, Eye } from "lucide-react"
import Link from "next/link"

export default function OrganizationDashboard() {
  const [timeRange, setTimeRange] = useState("week")

  const distributionData = [
    { name: "Mon", meals: 120, people: 45 },
    { name: "Tue", meals: 150, people: 62 },
    { name: "Wed", meals: 180, people: 78 },
    { name: "Thu", meals: 140, people: 55 },
    { name: "Fri", meals: 200, people: 89 },
    { name: "Sat", meals: 250, people: 112 },
    { name: "Sun", meals: 180, people: 76 },
  ]

  const impactData = [
    { name: "Food Rescued", value: 2500, color: "#10b981" },
    { name: "Meals Distributed", value: 1800, color: "#f59e0b" },
    { name: "Families Helped", value: 450, color: "#3b82f6" },
    { name: "Volunteers Active", value: 89, color: "#8b5cf6" },
  ]

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"]

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
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">FF</span>
                </div>
                <span className="text-sm font-medium">FoodForward SA</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Dashboard</h1>
          <p className="text-gray-600">Monitor your impact and manage food distribution operations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Total Meals</p>
                  <p className="text-3xl font-bold">12,847</p>
                  <p className="text-emerald-200 text-sm">+15% this month</p>
                </div>
                <Package className="w-10 h-10 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">People Served</p>
                  <p className="text-3xl font-bold">3,245</p>
                  <p className="text-blue-200 text-sm">+8% this month</p>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Active Volunteers</p>
                  <p className="text-3xl font-bold">89</p>
                  <p className="text-orange-200 text-sm">+12% this month</p>
                </div>
                <Heart className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Distribution Points</p>
                  <p className="text-3xl font-bold">47</p>
                  <p className="text-purple-200 text-sm">+3 new this month</p>
                </div>
                <MapPin className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="analytics" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="space-y-6">
                {/* Distribution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Distribution Overview</CardTitle>
                    <CardDescription>Meals distributed and people served this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={distributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="meals" fill="#10b981" name="Meals" />
                        <Bar dataKey="people" fill="#f59e0b" name="People" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Impact Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Breakdown</CardTitle>
                    <CardDescription>Your organization's impact this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={impactData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {impactData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-3">
                        {impactData.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-lg font-bold">{item.value.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="operations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Active Operations</CardTitle>
                        <CardDescription>Current food rescue and distribution activities</CardDescription>
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Operation
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "OP-001",
                          title: "Woolworths Surplus Pickup",
                          location: "Sandton City",
                          status: "In Progress",
                          volunteer: "Team Alpha",
                          items: "Fresh produce, dairy",
                          time: "2 hours ago",
                        },
                        {
                          id: "OP-002",
                          title: "Community Garden Distribution",
                          location: "Roodepoort",
                          status: "Scheduled",
                          volunteer: "Team Beta",
                          items: "Vegetables, herbs",
                          time: "Tomorrow 9 AM",
                        },
                        {
                          id: "OP-003",
                          title: "Bakery Rescue Mission",
                          location: "Johannesburg CBD",
                          status: "Completed",
                          volunteer: "Team Gamma",
                          items: "Bread, pastries",
                          time: "Yesterday",
                        },
                      ].map((operation, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold">{operation.title}</h4>
                              <Badge
                                variant={
                                  operation.status === "In Progress"
                                    ? "default"
                                    : operation.status === "Scheduled"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {operation.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{operation.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{operation.volunteer}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Package className="w-3 h-3" />
                                <span>{operation.items}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{operation.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm">Manage</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Volunteer Management</CardTitle>
                        <CardDescription>Manage your volunteer network and assignments</CardDescription>
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Invite Volunteers
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-emerald-50 rounded-lg">
                          <div className="text-2xl font-bold text-emerald-600">89</div>
                          <div className="text-sm text-emerald-700">Active Volunteers</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">156</div>
                          <div className="text-sm text-blue-700">Hours This Week</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">23</div>
                          <div className="text-sm text-orange-700">New This Month</div>
                        </div>
                      </div>

                      {[
                        {
                          name: "Sarah Johnson",
                          role: "Team Leader",
                          hours: "24 hrs",
                          status: "Active",
                          lastActive: "2 hours ago",
                        },
                        {
                          name: "Michael Chen",
                          role: "Driver",
                          hours: "18 hrs",
                          status: "Active",
                          lastActive: "1 day ago",
                        },
                        {
                          name: "Priya Patel",
                          role: "Coordinator",
                          hours: "32 hrs",
                          status: "Active",
                          lastActive: "30 min ago",
                        },
                        {
                          name: "David Williams",
                          role: "Volunteer",
                          hours: "12 hrs",
                          status: "Inactive",
                          lastActive: "1 week ago",
                        },
                      ].map((volunteer, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {volunteer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold">{volunteer.name}</h4>
                              <p className="text-sm text-gray-600">{volunteer.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <div className="font-semibold">{volunteer.hours}</div>
                              <div className="text-xs text-gray-600">This month</div>
                            </div>
                            <Badge variant={volunteer.status === "Active" ? "default" : "secondary"}>
                              {volunteer.status}
                            </Badge>
                            <div className="text-sm text-gray-600">{volunteer.lastActive}</div>
                            <Button size="sm" variant="outline">
                              Contact
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Reports</CardTitle>
                    <CardDescription>Generate and download detailed impact reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Quick Reports</h4>
                        {[
                          { name: "Weekly Summary", description: "Overview of this week's activities" },
                          { name: "Monthly Impact", description: "Comprehensive monthly report" },
                          { name: "Volunteer Hours", description: "Volunteer contribution summary" },
                          { name: "Food Waste Reduction", description: "Environmental impact metrics" },
                        ].map((report, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h5 className="font-medium">{report.name}</h5>
                              <p className="text-sm text-gray-600">{report.description}</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Custom Reports</h4>
                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                          <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-3">
                            Create custom reports with specific date ranges and metrics
                          </p>
                          <Button variant="outline">Build Custom Report</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-time Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      message: "New surplus food available at Pick n Pay Sandton",
                      time: "5 min ago",
                      type: "opportunity",
                      urgent: true,
                    },
                    {
                      message: "Volunteer team completed Roodepoort distribution",
                      time: "15 min ago",
                      type: "success",
                      urgent: false,
                    },
                    {
                      message: "Low volunteer availability for tomorrow",
                      time: "1 hour ago",
                      type: "warning",
                      urgent: true,
                    },
                    {
                      message: "Monthly impact report ready for download",
                      time: "2 hours ago",
                      type: "info",
                      urgent: false,
                    },
                  ].map((alert, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        alert.type === "opportunity"
                          ? "bg-emerald-50 border-emerald-500"
                          : alert.type === "success"
                            ? "bg-green-50 border-green-500"
                            : alert.type === "warning"
                              ? "bg-yellow-50 border-yellow-500"
                              : "bg-blue-50 border-blue-500"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-sm flex-1">{alert.message}</p>
                        {alert.urgent && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Pickup
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Assign Volunteers
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Add Distribution Point
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month's Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Goal Achievement</span>
                    <span className="font-semibold text-emerald-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">↑ 15%</div>
                      <div className="text-xs text-gray-600">Meals vs Last Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">↑ 8%</div>
                      <div className="text-xs text-gray-600">People Reached</div>
                    </div>
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
