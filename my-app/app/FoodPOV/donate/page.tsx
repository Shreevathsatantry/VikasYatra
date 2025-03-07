"use client"

import { useState } from "react"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button2"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card2"
import { Input } from "@/components/ui/input1"
import { Label } from "@/components/ui/label1"
import { Textarea } from "@/components/ui/textarea1"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function DonatePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Donation Submitted",
        description: "Thank you for your generous donation! Your item has been added to our listings.",
      })

      // Reset form (in a real app, you'd use a form library like react-hook-form)
      e.target.reset()
      setSelectedFiles([])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#FFF6E9]">
      <Toaster />
      <header className="border-b bg-[#FFF6E9] sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Link href="/" className="inline-block">
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="text-black">Food</span>
                <span className="text-[#F5A742]">Share</span>
              </h1>
            </Link>
            <p className="text-sm md:text-base text-gray-600">Bridging Gaps, Sharing Abundance</p>
          </div>
          <Button
            variant="ghost"
            asChild
            className="hover:bg-[#F5A742]/10 hover:text-[#F5A742] transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Listings
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto border-[#F5A742]/20 animate-in fade-in-50 duration-500 shadow-md">
          <CardHeader className="bg-[#F5A742]/10">
            <CardTitle className="text-2xl">Donate Food Item</CardTitle>
            <CardDescription>Share your surplus food with those who need it</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                <Label htmlFor="title">Item Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Fresh Vegetables Assortment"
                  required
                  className="focus-visible:ring-[#F5A742] border-[#F5A742]/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger id="category" className="focus-visible:ring-[#F5A742] border-[#F5A742]/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="produce">Produce</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="non-perishable">Non-perishable</SelectItem>
                      <SelectItem value="prepared-food">Prepared Food</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="e.g., 5 kg, 10 items"
                    required
                    className="focus-visible:ring-[#F5A742] border-[#F5A742]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    type="date"
                    required
                    className="focus-visible:ring-[#F5A742] border-[#F5A742]/30"
                  />
                </div>

                <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                  <Label htmlFor="location">Pickup Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Downtown Community Center"
                    required
                    className="focus-visible:ring-[#F5A742] border-[#F5A742]/30"
                  />
                </div>
              </div>

              <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the food items, condition, special instructions, etc."
                  rows={4}
                  required
                  className="focus-visible:ring-[#F5A742] border-[#F5A742]/30"
                />
              </div>

              <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                <Label>Upload Images</Label>
                <div className="border-2 border-dashed border-[#F5A742]/30 rounded-lg p-8 text-center hover:border-[#F5A742]/50 transition-colors duration-300">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-[#F5A742]" />
                    <p className="text-sm text-gray-600">Drag and drop images here, or click to browse</p>
                    <Input id="images" type="file" multiple className="hidden" onChange={handleFileChange} />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2 border-[#F5A742] text-[#F5A742] hover:bg-[#F5A742]/10"
                      onClick={() => document.getElementById("images").click()}
                    >
                      Select Files
                    </Button>

                    {selectedFiles.length > 0 && (
                      <div className="mt-4 w-full">
                        <p className="text-sm font-medium mb-2">{selectedFiles.length} file(s) selected</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="bg-[#F5A742]/10 px-3 py-1 rounded-full text-xs text-[#F5A742]">
                              {file.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 transition-all duration-300 hover:translate-y-[-2px]">
                <Label htmlFor="contact">Contact Information</Label>
                <Input
                  id="contact"
                  placeholder="Phone number or email"
                  required
                  className="focus-visible:ring-[#F5A742] border-[#F5A742]/30"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F5A742] hover:bg-[#E09632] text-white transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Donation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

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
              <Button
                variant="outline"
                className="border-[#F5A742] text-[#F5A742] hover:bg-[#F5A742]/10 transition-all duration-300"
              >
                About Us
              </Button>
              <Button
                variant="outline"
                className="border-[#F5A742] text-[#F5A742] hover:bg-[#F5A742]/10 transition-all duration-300"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

