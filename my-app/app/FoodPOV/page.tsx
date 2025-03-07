"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { MapPin, Calendar, Package, Heart, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button2"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card2"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input1"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function DonationListings() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(donations)
  const [noResults, setNoResults] = useState(false)
  const [requestedItems, setRequestedItems] = useState([])
  const [savedItems, setSavedItems] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [showRequested, setShowRequested] = useState(false)

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setSearchResults(donations)
      setNoResults(false)
      return
    }

    const results = donations.filter(
      (donation) =>
        donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setSearchResults(results)
    setNoResults(results.length === 0)
  }

  // Handle request item
  const handleRequestItem = (item) => {
    if (!requestedItems.some((reqItem) => reqItem.id === item.id)) {
      setRequestedItems([...requestedItems, item])
    }
  }

  // Handle save item
  const handleSaveItem = (item) => {
    if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
      setSavedItems([...savedItems, item])
    }
  }

  // Handle request new item
  const handleRequestNewItem = () => {
    const newItem = {
      id: donations.length + requestedItems.length + 1,
      title: searchQuery,
      category: "Requested",
      quantity: "Not specified",
      expiryDate: "Not specified",
      location: "To be determined",
      description: `This item was requested by a community member: ${searchQuery}`,
      image: "/placeholder.svg?height=300&width=500",
      isRequested: true,
    }

    setRequestedItems([...requestedItems, newItem])
    setNoResults(false)
    setSearchQuery("")
  }

  // Open dialog with full description
  const openDescriptionDialog = (donation) => {
    setSelectedDonation(donation)
    setOpenDialog(true)
  }

  return (
    <div className="min-h-screen bg-[#FFF6E9]">
      <header className="border-b bg-[#FFF6E9] sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <Link href="/" className="inline-block">
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="text-black">Food</span>
                <span className="text-[#F5A742]">Share</span>
              </h1>
            </Link>
            <Sidebar />
            <p className="text-sm md:text-base text-gray-600">Bridging Gaps, Sharing Abundance</p>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-1/2 flex">
            <Input
              type="text"
              placeholder="Search for food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none focus-visible:ring-[#F5A742] border-[#F5A742]/30"
            />
            <Button type="submit" className="bg-[#F5A742] hover:bg-[#E09632] text-white rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className={`border-[#F5A742] text-[#F5A742] hover:bg-[#F5A742]/10 transition-all duration-300 ${showRequested ? "bg-[#F5A742]/10" : ""}`}
              onClick={() => setShowRequested(!showRequested)}
            >
              Requested Items
              {requestedItems.length > 0 && <Badge className="ml-2 bg-[#F5A742]">{requestedItems.length}</Badge>}
            </Button>

            <Button className="bg-[#F5A742] hover:bg-[#E09632] text-white transition-all duration-300">
              <Link href="/donate">Donate Item</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showRequested ? (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Your Requested Items</h2>
              <Button variant="ghost" className="text-[#F5A742]" onClick={() => setShowRequested(false)}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>

            {requestedItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-[#F5A742]/20 mt-4">
                <p className="text-gray-500">You haven't requested any items yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {requestedItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 border-[#F5A742]/20 animate-in fade-in-50 duration-300"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <Badge className="absolute top-3 right-3 bg-[#F5A742]">{item.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-[#F5A742]" />
                          <span>Quantity: {item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#F5A742]" />
                          <span>Expires: {item.expiryDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#F5A742]" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div
                        className="mt-3 text-gray-600 cursor-pointer hover:text-[#F5A742] transition-colors"
                        onClick={() => openDescriptionDialog(item)}
                      >
                        <p className="line-clamp-2">{item.description}</p>
                        <p className="text-xs text-[#F5A742] mt-1">Click to read more</p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button disabled className="bg-[#F5A742]/50 text-white">
                        Requested
                      </Button>
                      <Button
                        variant="outline"
                        className={
                          savedItems.some((saved) => saved.id === item.id)
                            ? "bg-[#F5A742]/10 border-[#F5A742] text-[#F5A742]"
                            : "border-[#F5A742] text-[#F5A742]"
                        }
                        onClick={() => handleSaveItem(item)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        {savedItems.some((saved) => saved.id === item.id) ? "Saved" : "Save"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Available Donations</h2>
              <p className="text-gray-600">Browse through available food donations in your community</p>
            </div>

            {noResults && (
              <div className="text-center py-8 bg-white rounded-lg border border-[#F5A742]/20 mb-8 animate-in fade-in-50 duration-300">
                <p className="text-gray-500 mb-4">No items found matching "{searchQuery}"</p>
                <Button className="bg-[#F5A742] hover:bg-[#E09632] text-white" onClick={handleRequestNewItem}>
                  Request this item
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((donation) => (
                <Card
                  key={donation.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border-[#F5A742]/20 animate-in fade-in-50 duration-300"
                >
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={donation.image || "/placeholder.svg"}
                        alt={donation.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-[#F5A742]">{donation.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{donation.title}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#F5A742]" />
                        <span>Quantity: {donation.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#F5A742]" />
                        <span>Expires: {donation.expiryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#F5A742]" />
                        <span>{donation.location}</span>
                      </div>
                    </div>
                    <div
                      className="mt-3 text-gray-600 cursor-pointer hover:text-[#F5A742] transition-colors"
                      onClick={() => openDescriptionDialog(donation)}
                    >
                      <p className="line-clamp-2">{donation.description}</p>
                      <p className="text-xs text-[#F5A742] mt-1">Click to read more</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button
                      className={
                        requestedItems.some((item) => item.id === donation.id)
                          ? "bg-[#F5A742]/50 text-white"
                          : "bg-[#F5A742] hover:bg-[#E09632] text-white"
                      }
                      onClick={() => handleRequestItem(donation)}
                      disabled={requestedItems.some((item) => item.id === donation.id)}
                    >
                      {requestedItems.some((item) => item.id === donation.id) ? "Requested" : "Request"}
                    </Button>
                    <Button
                      variant="outline"
                      className={
                        savedItems.some((saved) => saved.id === donation.id)
                          ? "bg-[#F5A742]/10 border-[#F5A742] text-[#F5A742]"
                          : "border-[#F5A742] text-[#F5A742]"
                      }
                      onClick={() => handleSaveItem(donation)}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      {savedItems.some((saved) => saved.id === donation.id) ? "Saved" : "Save"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md bg-[#FFF6E9] border-[#F5A742]/20">
          <DialogHeader>
            <DialogTitle>{selectedDonation?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 text-sm mt-2">
                <Badge className="bg-[#F5A742]">{selectedDonation?.category}</Badge>
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3 text-[#F5A742]" />
                  <span>{selectedDonation?.quantity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-[#F5A742]" />
                  <span>{selectedDonation?.expiryDate}</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="relative h-48 w-full mb-4">
            <Image
              src={selectedDonation?.image || "/placeholder.svg"}
              alt={selectedDonation?.title || "Food item"}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Location</h4>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F5A742]" />
                <span>{selectedDonation?.location}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-gray-600">{selectedDonation?.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-[#F5A742]/10 border-t border-[#F5A742]/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <Link href="/" className="inline-block">
                <h2 className="text-xl font-bold">
                  <span className="text-black">Food</span>
                  <span className="text-[#F5A742]">Share</span>
                </h2>
              </Link>
              <p className="text-sm text-gray-600">Connecting communities through food sharing</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="border-[#F5A742] text-[#F5A742]">
                About Us
              </Button>
              <Button variant="outline" className="border-[#F5A742] text-[#F5A742]">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const donations = [
  {
    id: 1,
    title: "Fresh Vegetables Assortment",
    category: "Produce",
    quantity: "5 kg",
    expiryDate: "Oct 15, 2023",
    location: "Downtown Community Center",
    description:
      "Assortment of fresh vegetables including carrots, tomatoes, and bell peppers. Harvested yesterday from local farm. These vegetables are organic and pesticide-free. Perfect for families looking for healthy meal options. The assortment includes a variety of seasonal vegetables that are at their peak freshness.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Canned Soup Collection",
    category: "Non-perishable",
    quantity: "12 cans",
    expiryDate: "Jun 20, 2024",
    location: "Westside Food Bank",
    description:
      "Variety of canned soups including tomato, chicken noodle, and vegetable. All unexpired and in good condition. These soups are perfect for emergency food supplies or for those who need quick meal options. Each can is sealed and in perfect condition with clear labeling of ingredients and nutritional information.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "Bread and Pastries",
    category: "Bakery",
    quantity: "15 items",
    expiryDate: "Oct 10, 2023",
    location: "Sunshine Bakery",
    description:
      "Assorted bread and pastries from local bakery. Includes baguettes, croissants, and dinner rolls. All items were baked fresh this morning and are of premium quality. The pastries include a mix of sweet and savory options, perfect for breakfast or as a snack. The bread is artisanal and made with organic flour.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "Rice and Grains",
    category: "Staples",
    quantity: "10 kg",
    expiryDate: "Aug 15, 2024",
    location: "Eastern Community Hub",
    description:
      "Various types of rice and grains including jasmine rice, brown rice, and quinoa. All sealed in original packaging. These staples are essential for any kitchen and provide a good base for many meals. The grains are high quality and sourced from reputable suppliers. All packages are unopened and have clear expiration dates.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "Dairy Products",
    category: "Refrigerated",
    quantity: "Various",
    expiryDate: "Oct 12, 2023",
    location: "Central Market",
    description:
      "Selection of dairy products including milk, yogurt, and cheese. All items properly refrigerated and fresh. The dairy products are from local farms and are of high quality. The selection includes both regular and low-fat options to cater to different dietary needs. All products are within their expiration dates and have been stored at proper temperatures.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    title: "Fruit Basket",
    category: "Produce",
    quantity: "4 kg",
    expiryDate: "Oct 14, 2023",
    location: "Riverside Community Garden",
    description:
      "Seasonal fruits including apples, oranges, and bananas. Freshly picked and ready for consumption. The fruits are ripe and at their peak flavor. This basket provides a good variety of essential fruits that are rich in vitamins and minerals. All fruits have been carefully selected to ensure quality and freshness.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

