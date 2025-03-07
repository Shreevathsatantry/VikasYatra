"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { useState } from "react"
import { ChevronUp, Briefcase, FileText, MessageSquare } from "lucide-react"

export default function DailyWageWorkersPage() {
  const [activeTab, setActiveTab] = useState<"schemes" | "jobs" | "chatbot" | null>(null)

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-black">Vikas</span>
              <span className="text-[#FF9D2E]">Yatra</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">Empowering Daily Wage Workers</h2>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-[#FF9D2E] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#e88c1e] transition-colors">
              Learn More <ChevronUp className="h-4 w-4 rotate-180" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-[#FFF8F0]/80 rounded-xl p-6 mb-12 max-w-3xl mx-auto text-center">
          <h3 className="inline-block px-6 py-2 bg-[#FFE8CC] text-[#FF9D2E] rounded-full font-medium mb-4">
            Our Support Programs
          </h3>
          <Sidebar />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Resources for Daily Wage Workers</h2>
          <p className="text-gray-700 text-lg">
            VikasYatra is committed to supporting daily wage workers through access to government schemes, job
            opportunities, and personalized assistance to ensure economic stability and growth.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card
            icon={<FileText className="h-8 w-8 text-[#FF9D2E]" />}
            title="Schemes"
            description="Access government schemes designed to support daily wage workers"
            isActive={activeTab === "schemes"}
            onClick={() => setActiveTab(activeTab === "schemes" ? null : "schemes")}
          />
          <Card
            icon={<Briefcase className="h-8 w-8 text-[#FF9D2E]" />}
            title="Job Opportunities"
            description="Find fair-pay job opportunities in your area"
            isActive={activeTab === "jobs"}
            onClick={() => setActiveTab(activeTab === "jobs" ? null : "jobs")}
          />
          <Card
            icon={<MessageSquare className="h-8 w-8 text-[#FF9D2E]" />}
            title="Chatbot Assistant"
            description="Get personalized help and answers to your questions"
            isActive={activeTab === "chatbot"}
            onClick={() => setActiveTab(activeTab === "chatbot" ? null : "chatbot")}
          />
        </div>

        {/* Content Area */}
        <div className="mt-12 max-w-5xl mx-auto">
          {activeTab === "schemes" && <SchemesContent />}
          {activeTab === "jobs" && <JobsContent />}
          {activeTab === "chatbot" && <ChatbotContent />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#FFF8F0] border-t border-[#FFE8CC] py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <div className="bg-[#FFE8CC] text-[#FF9D2E] px-4 py-2 rounded-full flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#FF9D2E] rounded-full"></span>
              Compassion
            </div>
            <div className="bg-[#FFE8CC] text-[#FF9D2E] px-4 py-2 rounded-full flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#FF9D2E] rounded-full"></span>
              Security
            </div>
            <div className="bg-[#FFE8CC] text-[#FF9D2E] px-4 py-2 rounded-full flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-[#FF9D2E] rounded-full"></span>
              Community
            </div>
          </div>
          <p className="text-gray-600">© {new Date().getFullYear()} VikasYatra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
  isActive: boolean
  onClick: () => void
}

function Card({ icon, title, description, isActive, onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border-2 ${
        isActive ? "border-[#FF9D2E]" : "border-transparent"
      }`}
      onClick={onClick}
    >
      <div className="bg-[#FFE8CC] p-4 rounded-full inline-block mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-[#FF9D2E] font-medium">
        {isActive ? "Hide details" : "View details"}
        <ChevronUp className={`ml-2 h-4 w-4 transition-transform ${isActive ? "" : "rotate-180"}`} />
      </div>
    </div>
  )
}

function SchemesContent() {
  const schemes = [
    {
      id: 1,
      title: "PM-KISAN",
      category: "Agriculture",
      description: "Financial support for farmers and agricultural workers",
    },
    {
      id: 2,
      title: "MGNREGA",
      category: "Employment",
      description: "Guaranteed wage employment for rural households",
    },
    {
      id: 3,
      title: "PM Awas Yojana",
      category: "Housing",
      description: "Affordable housing for economically weaker sections",
    },
    {
      id: 4,
      title: "Ayushman Bharat",
      category: "Healthcare",
      description: "Health insurance coverage for low-income families",
    },
    {
      id: 5,
      title: "PM Shram Yogi Maandhan",
      category: "Pension",
      description: "Pension scheme for unorganized sector workers",
    },
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Government Schemes</h2>
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">{scheme.title}</h3>
                <span className="inline-block bg-[#FFE8CC] text-[#FF9D2E] text-sm px-3 py-1 rounded-full mt-1">
                  {scheme.category}
                </span>
              </div>
              <button className="text-[#FF9D2E] hover:underline">Apply</button>
            </div>
            <p className="text-gray-600 mt-2">{scheme.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function JobsContent() {
  const jobs = [
    {
      id: 1,
      title: "Construction Worker",
      location: "Delhi NCR",
      wage: "₹500-600/day",
      duration: "3 months",
    },
    {
      id: 2,
      title: "Farm Labor",
      location: "Punjab",
      wage: "₹450-550/day",
      duration: "Seasonal",
    },
    {
      id: 3,
      title: "Factory Helper",
      location: "Gurgaon",
      wage: "₹12,000/month",
      duration: "Permanent",
    },
    {
      id: 4,
      title: "Housekeeping Staff",
      location: "Noida",
      wage: "₹13,500/month",
      duration: "Permanent",
    },
    {
      id: 5,
      title: "Delivery Associate",
      location: "Multiple Locations",
      wage: "₹15,000-18,000/month",
      duration: "Permanent",
    },
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Opportunities</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">{job.title}</h3>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className="inline-block bg-[#FFE8CC] text-[#FF9D2E] text-sm px-3 py-1 rounded-full">
                    {job.location}
                  </span>
                  <span className="inline-block bg-[#E6F7FF] text-[#0091FF] text-sm px-3 py-1 rounded-full">
                    {job.wage}
                  </span>
                  <span className="inline-block bg-[#F0F0F0] text-gray-600 text-sm px-3 py-1 rounded-full">
                    {job.duration}
                  </span>
                </div>
              </div>
              <button className="text-[#FF9D2E] hover:underline">Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChatbotContent() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm your VikasYatra assistant. How can I help you today?", isUser: false },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { text: input, isUser: true }])

    // Simulate bot response
    setTimeout(() => {
      let response = "Thank you for your message. Our team will help you with this query soon."

      if (input.toLowerCase().includes("scheme") || input.toLowerCase().includes("government")) {
        response =
          "We have several government schemes available. You can check the Schemes section for more details, or ask me specific questions about eligibility."
      } else if (input.toLowerCase().includes("job") || input.toLowerCase().includes("work")) {
        response =
          "We regularly update our job listings. Please check the Job Opportunities section for the latest openings in your area."
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 1000)

    setInput("")
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">VikasYatra Assistant</h2>

      <div className="bg-gray-50 rounded-lg p-4 h-80 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 ${message.isUser ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                message.isUser ? "bg-[#FF9D2E] text-white" : "bg-[#FFE8CC] text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your question here..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9D2E]"
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#FF9D2E] text-white px-4 py-2 rounded-lg hover:bg-[#e88c1e] transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}

