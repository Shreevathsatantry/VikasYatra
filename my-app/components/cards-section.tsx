"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Briefcase, Users, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button1"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card1"
import Link from "next/link"
// import daily from "../public/dailyW.jpeg"
const cardData = [
  {
    title: "Daily Wage",
    description:
      "Connect daily wage workers with employers, ensuring fair pay and better working conditions. Our platform helps reduce exploitation and creates sustainable livelihoods.",
    icon: Briefcase,
    link: "/DW",
    color: "bg-vikas-orange",
    image: "/dailyW.jpeg",
  },
  {
    title: "Tech Skilled Professionals",
    description:
      "Empower tech professionals from underprivileged backgrounds with training, mentorship, and job opportunities in the growing digital economy.",
    icon: Users,
    link: "/Technical",
    color: "bg-vikas-orangeLight",
    image: "/Tech.jpeg",
  },
  {
    title: "FoodShare",
    description:
      "Reduce food waste and hunger by connecting food donors with those in need in your community. Help create a world where no one goes hungry.",
    icon: Utensils,
    link: "/FoodPOV",
    color: "bg-vikas-yellow",
    image: "/share.jpeg",
  },
]

export function CardsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-pattern relative">
      {/* Add a subtle dotted pattern overlay */}
      <div className="absolute inset-0 dotted-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 -translate-y-10"
            }`}
          >
            <span className="text-vikas-black">Our</span>
            <span className="text-vikas-orange ml-2">Initiatives</span>
          </h2>

          <div
            className={`h-1 w-24 bg-vikas-orange mb-6 mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 w-24" : "opacity-0 w-0"
            }`}
          ></div>

          <p
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Explore our key initiatives designed to create sustainable impact and reduce inequality across communities.
            Each program addresses specific challenges faced by vulnerable populations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <Card
              key={card.title}
              className={`border-none shadow-xl transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{
                transitionDelay: `${index * 200 + 700}ms`,
                transform: hoveredCard === index ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className={`${card.color} text-white rounded-t-lg relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full"></div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 animate-pulse">
                  <card.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">{card.title}</CardTitle>
              </CardHeader>

              <div className="relative h-40 overflow-hidden">
                <img
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{ transform: hoveredCard === index ? "scale(1.1)" : "scale(1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <CardContent className="pt-6">
                <CardDescription className="text-gray-700 text-base">{card.description}</CardDescription>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className={`p-0 hover:bg-transparent text-vikas-orange hover:text-vikas-orangeLight transition-all duration-200 group ${
                    hoveredCard === index ? "translate-x-2" : ""
                  }`}
                >
                  <Link href={card.link}>
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

