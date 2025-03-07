"use client"

import { useEffect, useRef, useState } from "react"
import { Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-vikas-black text-white py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-vikas-orange"></div>
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-vikas-orange/10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-vikas-orange/5 animate-float"></div>

      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="text-gradient">VikasYatra</span>
              <Heart className="ml-2 h-4 w-4 text-vikas-orange animate-pulse" />
            </h3>
            <p className="text-gray-400 mb-6">
              Empowering communities to overcome poverty and reduce inequality through sustainable development.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map((social, index) => (
                <Link
                  key={social.label}
                  href="#"
                  className="text-gray-400 hover:text-vikas-orange transition-colors transform hover:-translate-y-1 hover:scale-110 duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div
            className="transition-all duration-1000 delay-200"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
          >
            <h3 className="text-lg font-semibold mb-6 text-vikas-orange">Initiatives</h3>
            <ul className="space-y-3">
              {[
                { name: "Daily Wage", link: "/daily-wage" },
                { name: "Tech Professionals", link: "/tech-professionals" },
                { name: "FoodShare", link: "/food-share" },
                { name: "Community Building", link: "/community" },
              ].map((item, index) => (
                <li key={item.name} style={{ transitionDelay: `${index * 100 + 200}ms` }}>
                  <Link
                    href={item.link}
                    className="text-gray-400 hover:text-vikas-orange transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-vikas-orange mr-0 group-hover:w-3 group-hover:mr-2 transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="transition-all duration-1000 delay-400"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
          >
            <h3 className="text-lg font-semibold mb-6 text-vikas-orange">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", link: "/about" },
                { name: "Our Team", link: "/team" },
                { name: "Careers", link: "/careers" },
                { name: "Contact Us", link: "/contact" },
                { name: "Blog", link: "/blog" },
              ].map((item, index) => (
                <li key={item.name} style={{ transitionDelay: `${index * 100 + 400}ms` }}>
                  <Link
                    href={item.link}
                    className="text-gray-400 hover:text-vikas-orange transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-vikas-orange mr-0 group-hover:w-3 group-hover:mr-2 transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="transition-all duration-1000 delay-600"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
          >
            <h3 className="text-lg font-semibold mb-6 text-vikas-orange">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", link: "/privacy" },
                { name: "Terms of Service", link: "/terms" },
                { name: "Cookie Policy", link: "/cookies" },
                { name: "Accessibility", link: "/accessibility" },
              ].map((item, index) => (
                <li key={item.name} style={{ transitionDelay: `${index * 100 + 600}ms` }}>
                  <Link
                    href={item.link}
                    className="text-gray-400 hover:text-vikas-orange transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-vikas-orange mr-0 group-hover:w-3 group-hover:mr-2 transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="flex items-center justify-center">
            &copy; {new Date().getFullYear()} VikasYatra. All rights reserved.
            <span className="inline-block ml-2 text-vikas-orange animate-pulse">♥</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

