"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { CardsSection } from "@/components/cards-section"
import { Footer } from "@/components/footer"


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen relative">
      {/* Noise pattern overlay */}
      <div className="noise-pattern"></div>

      {isLoading ? (
        <div className="fixed inset-0 bg-vikas-white flex items-center justify-center z-50">
          <div className="text-4xl font-bold flex items-center">
            <span className="text-vikas-black">Vikas</span>
            <span className="text-vikas-orange">Yatra</span>
            <span className="ml-2 inline-block w-3 h-3 bg-vikas-orange rounded-full animate-pulse"></span>
            <span
              className="ml-1 inline-block w-3 h-3 bg-vikas-orange rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="ml-1 inline-block w-3 h-3 bg-vikas-orange rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>
      ) : (
        <>
          <Sidebar />
          <div className="transition-all duration-300">
            <HeroSection />
            <CardsSection />
            <Footer />
          </div>
        </>
      )}
    </main>
  )
}

