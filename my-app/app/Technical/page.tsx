"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card1"
import { Button } from "@/components/ui/button1"
import { BriefcaseIcon, UserIcon, ArrowRightIcon } from "lucide-react"
import JobSeekerView from "./components/job-seeker-view"
import HRView from "./components/hr-view"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const handleCardClick = (card: string) => {
    setActiveCard(card)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-100 rounded-bl-full opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-50 rounded-tr-full"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-orange-500">
            VikasYatra
          </h1>
          <Sidebar />
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">Eliminating systemic bias in the hiring process</p>
        </motion.div>

        {!activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card
                className="cursor-pointer h-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => handleCardClick("jobseeker")}
              >
                <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                  <UserIcon className="h-16 w-16 text-orange-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Seeker</h2>
                  <p className="text-gray-600 text-center">
                    Browse job opportunities and apply for positions that match your skills
                  </p>
                  <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
                    Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card
                className="cursor-pointer h-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => handleCardClick("hr")}
              >
                <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                  <BriefcaseIcon className="h-16 w-16 text-orange-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">HR Professional</h2>
                  <p className="text-gray-600 text-center">
                    Post job listings and review applicants through our bias-free platform
                  </p>
                  <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
                    Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {activeCard === "jobseeker" && (
            <motion.div
              key="jobseeker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <JobSeekerView onBack={() => setActiveCard(null)} />
            </motion.div>
          )}

          {activeCard === "hr" && (
            <motion.div
              key="hr"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HRView onBack={() => setActiveCard(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

