"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Briefcase,
  Utensils,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"


export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen transition-all duration-500 ease-in-out",
        isOpen ? "w-64" : "w-0",
      )}
    >
      <div className="h-full bg-vikas-black text-vikas-white shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2
            className={cn(
              "text-xl font-bold text-vikas-orange transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            VikasYatra
          </h2>
        </div>

        {/* Auth buttons at the top */}
        <div
          className={cn(
            "flex gap-2 p-4 border-b border-gray-800 transition-all duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <Link
            href="/login"
            className="flex-1 flex items-center justify-center gap-1 bg-transparent border border-vikas-orange text-vikas-orange rounded-lg py-2 px-3 text-sm hover:bg-vikas-orange hover:text-white transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>
          <Link
            href="/signup"
            className="flex-1 flex items-center justify-center gap-1 bg-vikas-orange text-white rounded-lg py-2 px-3 text-sm hover:bg-vikas-orangeLight transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { name: "Home", icon: Home, href: "/" },
              { name: "Daily Wage", icon: Briefcase, href: "/DW" },
              { name: "Tech Professionals", icon: Users, href: "/Technical" },
              { name: "FoodShare", icon: Utensils, href: "/FoodPOV" },
              { name: "Settings", icon: Settings, href: "/settings" },
              { name: "Help", icon: HelpCircle, href: "/help" },
              { name: "About", icon: Info, href: "/about" },
            ].map((item, index) => (
              <li
                key={item.name}
                className={cn(
                  "transition-all duration-300",
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                  // Add staggered animation delay
                  `transition-delay-${index * 50}`,
                )}
              >
                <Link
                  href={item.href}
                  className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-vikas-orange transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 w-full px-4">
          <button
            className={cn(
              "flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-vikas-orange transition-colors w-full",
              "transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 bg-vikas-orange text-white p-2 rounded-lg shadow-lg hover:bg-vikas-orangeLight transition-colors animate-pulse"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
    </div>
  )
}

