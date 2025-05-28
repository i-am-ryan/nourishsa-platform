"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Heart, ShoppingCart, Filter, Search, Leaf, Package, Truck, Shield } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [cart, setCart] = useState<number[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])

  const products = [
    {
      id: 1,
      name: "Organic Baby Spinach",
      farmer: "Sipho's Garden",
      category: "Vegetables",
      price: 15,
      originalPrice: 25,
      discount: 40,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=200&width=200",
      description: "Fresh organic baby spinach, perfect for salads and smoothies",
      inStock: true,
      quantity: 50,
      unit: "bunch",
      certifications: ["Organic", "Local"],
      deliveryTime: "Same day",
      location: "Roodepoort, Gauteng",
    },
    {
      id: 2,
      name: "Heritage Tomatoes",
      farmer: "Green Valley Farm",
      category: "Vegetables",
      price: 35,
      originalPrice: 45,
      discount: 22,
      rating: 4.9,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=200",
      description: "Heirloom variety tomatoes with exceptional flavor",
      inStock: true,
      quantity: 30,
      unit: "kg",
      certifications: ["Organic", "Heirloom"],
      deliveryTime: "Next day",
      location: "Pretoria, Gauteng",
    },
    {
      id: 3,
      name: "Sweet Potatoes",
      farmer: "Ubuntu Cooperative",
      category: "Vegetables",
      price: 20,
      originalPrice: 28,
      discount: 29,
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=200",
      description: "Naturally sweet and nutritious orange sweet potatoes",
      inStock: true,
      quantity: 100,
      unit: "kg",
      certifications: ["Local", "Fair Trade"],
      deliveryTime: "2-3 days",
      location: "Johannesburg, Gauteng",
    },
    {
      id: 4,
      name: "Mixed Herb Bundle",
      farmer: "City Herbs",
      category: "Herbs",
      price: 12,
      originalPrice: 18,
      discount: 33,
      rating: 4.6,
      reviews: 67,
      image: "/placeholder.svg?height=200&width=200",
      description: "Fresh basil, parsley, and coriander bundle",
      inStock: true,
      quantity: 25,
      unit: "pack",
      certifications: ["Organic"],
      deliveryTime: "Same day",
      location: "Sandton, Gauteng",
    },
    {
      id: 5,
      name: "Free-Range Eggs",
      farmer: "Happy Hens Farm",
      category: "Dairy & Eggs",
      price: 45,
      originalPrice: 55,
      discount: 18,
      rating: 4.9,
      reviews: 203,
      image: "/placeholder.svg?height=200&width=200",
      description: "Fresh free-range eggs from pasture-raised hens",
      inStock: true,
      quantity: 40,
      unit: "dozen",
      certifications: ["Free-Range", "Local"],
      deliveryTime: "Same day",
      location: "Krugersdorp, Gauteng",
    },
    {
      id: 6,
      name: "Artisan Bread",
      farmer: "Community Bakery",
      category: "Bakery",
      price: 25,
      originalPrice: 35,
      discount: 29,
      rating: 4.4,
      reviews: 91,
      image: "/placeholder.svg?height=200&width=200",
      description: "Freshly baked sourdough bread made with local flour",
      inStock: false,
      quantity: 0,
      unit: "loaf",
      certifications: ["Artisan", "Local"],
      deliveryTime: "Next day",
      location: "Melville, Gauteng",
    },
  ]

  const categories = [
    { name: "All", value: "all", count: products.length },
    { name: "Vegetables", value: "vegetables", count: products.filter((p) => p.category === "Vegetables").length },
    { name: "Fruits", value: "fruits", count: 0 },
    { name: "Herbs", value: "herbs", count: products.filter((p) => p.category === "Herbs").length },
    { name: "Dairy & Eggs", value: "dairy", count: products.filter((p) => p.category === "Dairy & Eggs").length },
    { name: "Bakery", value: "bakery", count: products.filter((p) => p.category === "Bakery").length },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "discount":
        return b.discount - a.discount
      default:
        return 0
    }
  })

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id])
  }

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

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
                <Heart className="w-4 h-4 mr-2" />
                Wishlist ({wishlist.length})
              </Button>
              <Button size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Local Farmer Marketplace</h1>
          <p className="text-gray-600">Fresh, local produce directly from South African farmers</p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
            <Shield className="w-8 h-8 text-emerald-500" />
            <div>
              <div className="font-semibold">Quality Guaranteed</div>
              <div className="text-sm text-gray-600">Fresh from farm</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
            <Truck className="w-8 h-8 text-blue-500" />
            <div>
              <div className="font-semibold">Fast Delivery</div>
              <div className="text-sm text-gray-600">Same day available</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
            <Leaf className="w-8 h-8 text-green-500" />
            <div>
              <div className="font-semibold">Sustainable</div>
              <div className="text-sm text-gray-600">Eco-friendly farming</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
            <Package className="w-8 h-8 text-orange-500" />
            <div>
              <div className="font-semibold">Direct Trade</div>
              <div className="text-sm text-gray-600">Support local farmers</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.value ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-gray-500">({category.count})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Price Range: R{priceRange[0]} - R{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="discount">Biggest Discount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                  {sortedProducts.filter((p) => p.inStock).length} in stock
                </Badge>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-red-500 text-white font-bold">{product.discount}% OFF</Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/80 backdrop-blur-sm hover:bg-white"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                          />
                        </Button>
                      </div>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-gray-600 text-sm">by {product.farmer}</p>
                          <p className="text-gray-600 text-sm">{product.location}</p>
                        </div>

                        <p className="text-gray-700 text-sm">{product.description}</p>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {product.certifications.map((cert, certIndex) => (
                            <Badge key={certIndex} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-emerald-600">R{product.price}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  R{product.originalPrice}
                                </span>
                              )}
                              <span className="text-sm text-gray-600 ml-1">/{product.unit}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Delivery</div>
                              <div className="text-sm font-medium">{product.deliveryTime}</div>
                            </div>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600"
                          disabled={!product.inStock}
                          onClick={() => addToCart(product.id)}
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setPriceRange([0, 200])
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
