"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Users, Leaf, TrendingUp, MapPin, Heart, Star, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import GamificationTracker from "@/components/GamificationTracker";



export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                NourishSA
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Features
              </a>
              <a href="#impact" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Impact
              </a>
              <a href="#community" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Community
              </a>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                  🌍 Fighting Food Insecurity in South Africa
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                    AI-Powered
                  </span>
                  <br />
                  Food Security
                  <br />
                  Platform
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connecting surplus food with communities in need through intelligent matching, real-time geo-mapping,
                  and sustainable food production networks across South Africa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
                  >
                    Join the Movement
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">20M+</div>
                  <div className="text-sm text-gray-600">People Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">10M Tons</div>
                  <div className="text-sm text-gray-600">Food Rescued</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">2,500+</div>
                  <div className="text-sm text-gray-600">Communities</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Live Food Map</div>
                        <div className="text-sm text-gray-600">Real-time availability</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/50 border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-5 h-5 text-red-500" />
                          <div>
                            <div className="font-semibold">1,247</div>
                            <div className="text-xs text-gray-600">Meals Today</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/50 border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-semibold">89</div>
                            <div className="text-xs text-gray-600">Active Donors</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
                Revolutionizing Food Security
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform connects communities, reduces waste, and builds sustainable food networks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "AI-Powered Matching",
                description: "Intelligent algorithms predict surplus food 24hrs in advance and optimize distribution",
                color: "emerald",
              },
              {
                icon: MapPin,
                title: "Real-Time Geo-Mapping",
                description:
                  "Hyper-localized distribution optimized for townships, rural areas, and informal settlements",
                color: "orange",
              },
              {
                icon: Users,
                title: "Community Gardens",
                description: "Comprehensive network supporting sustainable food production and skill-building",
                color: "blue",
              },
              {
                icon: TrendingUp,
                title: "Farmer Marketplace",
                description: "Direct farmer-to-consumer platform empowering small-scale producers",
                color: "green",
              },
              {
                icon: Star,
                title: "Gamification Engine",
                description: "NFT badges and rewards to incentivize participation and community engagement",
                color: "purple",
              },
              {
                icon: Leaf,
                title: "Blockchain Traceability",
                description: "100% transparent tracking of donations and impact measurement",
                color: "teal",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Rescue Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Food Rescue in Real-Time</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Save perfectly good food from going to waste while helping your community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Live Food Rescue Map</h3>
                <div className="space-y-4">
                  {[
                    {
                      store: "Woolworths Sandton",
                      items: "Fresh produce, dairy",
                      time: "Available now",
                      distance: "0.8km",
                      savings: "60% off",
                    },
                    {
                      store: "Pick n Pay Roodepoort",
                      items: "Bakery items",
                      time: "Until 8 PM",
                      distance: "1.2km",
                      savings: "50% off",
                    },
                    {
                      store: "Checkers Randburg",
                      items: "Ready meals",
                      time: "Available now",
                      distance: "2.1km",
                      savings: "70% off",
                    },
                  ].map((rescue, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{rescue.store}</h4>
                        <Badge className="bg-green-500 text-white">{rescue.savings}</Badge>
                      </div>
                      <p className="text-white/80 text-sm mb-2">{rescue.items}</p>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>{rescue.time}</span>
                        <span>{rescue.distance} away</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-Time Tracking</h4>
                    <p className="text-white/80">Get instant notifications when food becomes available near you</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Quality Guaranteed</h4>
                    <p className="text-white/80">All rescued food is fresh and safe, just approaching sell-by dates</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Community Impact</h4>
                    <p className="text-white/80">Every rescue helps reduce waste and feeds families in need</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-r from-emerald-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Impact Across South Africa</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "20M+", label: "People Food-Secure", icon: Users },
                { number: "10M Tons", label: "Food Waste Prevented", icon: Leaf },
                { number: "2,500+", label: "Communities Connected", icon: Globe },
                { number: "30%", label: "Waste Reduction", icon: TrendingUp },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-white/80" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

<section className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">
      🎮 Your Gamified Impact
    </h2>
    <GamificationTracker />
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of South Africans fighting food insecurity through technology and community action.
            </p>
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NourishSA</span>
              </div>
              <p className="text-gray-400">
                AI-powered food security platform transforming communities across South Africa.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Food Rescue
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community Gardens
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Farmer Marketplace
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Impact Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Volunteer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partner with Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NourishSA. All rights reserved. Fighting food insecurity through innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
