"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button1"
import Image, { StaticImageData } from "next/image"
import img1 from "../public/image.jpeg"

export function HeroSection() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-vikas-orange/10 to-transparent"></div>
        <div className="absolute inset-0 bg-pattern opacity-50"></div>
        <div className="noise-pattern"></div>

        {/* Animated background blobs */}
        <div className="blob-animation" style={{ top: "10%", left: "10%", animationDelay: "0s" }}></div>
        <div className="blob-animation" style={{ top: "60%", right: "10%", animationDelay: "5s" }}></div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-[10%] w-20 h-20 rounded-full border-4 border-vikas-orange/20 animate-rotate-slow"></div>
        <div
          className="absolute bottom-20 right-[10%] w-32 h-32 rounded-full border-4 border-vikas-orange/10 animate-rotate-slow"
          style={{ animationDirection: "reverse" }}
        ></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h1
                className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0 -translate-y-10"
                }`}
              >
                <span className="text-vikas-black">Vikas</span>
                <span className="text-vikas-orange">Yatra</span>
              </h1>

              <div
                className={`h-1 w-24 bg-vikas-orange mb-6 mx-auto md:mx-0 transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
                }`}
              ></div>

              <p
                className={`text-xl md:text-2xl text-gray-700 mb-8 max-w-xl transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100" : "opacity-0 -translate-y-10"
                }`}
              >
                Empowering communities to overcome poverty and reduce inequality through sustainable development and
                equal opportunities.
              </p>

              <Button
                onClick={scrollToCards}
                size="lg"
                className={`bg-vikas-orange text-white hover:bg-vikas-orangeLight transition-all duration-1000 delay-700 animate-bounce ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Get Started
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div
              className={`md:w-1/2 transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
            >
              <Image
                src={img1}
                alt="Vikas Yatra"
                className="rounded-2xl shadow-lg"
                width={475} // Adjust the width as needed
                height={400} // Adjust the height as needed
              />
              <div className="relative">
              {/* Decorative elements around the image */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-vikas-orange rounded-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-vikas-black/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave animation at bottom */}
        <div className="wave-animation">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      <div ref={cardsRef}></div>
    </>
  )
}

