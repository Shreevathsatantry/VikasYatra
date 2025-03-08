"use client"

import type React from "react"
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { Sidebar } from "@/components/sidebar";
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
            <Sidebar />
            <h2 className="text-2xl md:text-3xl font-bold mt-2">Empowering Daily Wage Workers</h2>
          </div>
          <div className="mt-4 md:mt-0">
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-[#FFF8F0]/80 rounded-xl p-6 mb-12 max-w-3xl mx-auto text-center">
          <h3 className="inline-block px-6 py-2 bg-[#FFE8CC] text-[#FF9D2E] rounded-full font-medium mb-4">
            Our Support Programs
          </h3>
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
    </div>
  );
}

function SchemesContent() {
  const schemes = [
    {
      id: 1,
      title: "Prime Minister Awaas Yojana - Gramin",
      category: "Agriculture",
      description: "The main objective of the PM Awas Yojana Scheme is housing that is affordable for all by the year 2022. The Pradhan Mantri Awas Yojana Gramin (PMAY-G) was formerly called the Indira Awas Yojana and was renamed in March 2016. It is targeted at promoting accessibility and affordability of housing for all of rural India with the exceptions of Delhi and Chandigarh.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed/prime-minister-awaas-yojana-gramin?lgn=en"
    },
    {
      id: 2,
      title: "Udiyaman Swanirbhar Karmasansthan Prakalpa (USKP)",
      category: "Employment",
      description: "The objective of the Scheme is to assist validly registered unemployed youth to take up economically viable projects by providing subsidy from the West Bengal state government and credit on easy terms from banks and financial institutions.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed-and-poor/udiyaman-swanirbhar-karmasansthan-prakalpa-uskp?lgn=en"
    },
    {
      id: 3,
      title: "State Assisted Scheme Of Provident Fund For Unorganised Sector.",
      category: "Housing",
      description: "The Department of Labour seeks to enforce labour laws and also facilitate the worker’s fundamental rights at their workplace. Let us look in detail about the SASPFUW scheme",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed/schemes-for-unemployed-womens-schemes-for-unemployed/state-assisted-scheme-of-provident-fund-for-unorganised-sector?lgn=en"
    },
    {
      id: 4,
      title: "Udiyaman Swanirbhar Karmasansthan Prakalpa(USKP)",
      category: "Healthcare",
      description: "The objective of the Scheme is to assist validly registered unemployed youth to take up economically viable projects by providing subsidy from the state government and credit on easy terms from banks and financial institutions.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed/schemes-for-unemployed-womens-schemes-for-unemployed/udiyaman-swanirbhar-karmasansthan-prakalpauskp?lgn=en"
    },
    {
      id: 5,
      title: "Mai Bhago Istri Shakti Scheme",
      category: "Pension",
      description: "The scheme intends to help women for establishing micro and small business in rural areas. The assistance under the MBIS scheme will be available in any sector for imparting skills related to employability and entrepreneurship.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed/schemes-for-unemployed-women/mai-bhago-istri-shakti-scheme?lgn=en"
    },
    {
      id: 6,
      title: "Social security relief to dependents of workers passing away due to COVID-19",
      category: "Pension",
      description: "The Ministry of Labour and Employment has announced additional benefits for workers through ESIC and EPFO schemes to address the fear and anxiety of workers about well-being of their family members due to increase in incidences of death due to COVID -19 pandemic.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed-and-poor/social-security-relief-to-dependents-of-workers-passing-away-due-to-covid19?lgn=en"
    },
    {
      id: 7,
      title: "Ayushman Bharat",
      category: "Pension",
      description: "Ayushman Bharat, a flagship scheme of Government of India, was launched as recommended by the National Health Policy 2017, to achieve the vision of Universal Health Coverage (UHC). This initiative has been designed to meet Sustainable Development Goals (SDGs) and its underlining commitment, which is to   leave no one behind.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed/ayushman-bharat?lgn=en"
    },
    {
      id: 8,
      title: "Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan",
      category: "Pension",
      description: "The Union Cabinet during November 2023 approved Pradhan Mantri Janjati Adivasi Nyaya Maha Abhiyan (PM JANMAN) with total outlay of Rs.24,104 crore (Central Share:Rs.15,336 crore and State Share: Rs.8,768 crore) to focus on 11 critical interventions through 9 line Ministries.  The scheme is implemented during FY 2023-24 to 2025-26.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed-and-poor/pradhan-mantri-janjati-adivasi-nyaya-maha-abhiyan?lgn=en"
    },
    {
      id: 9,
      title: "Model Skill Loan Scheme",
      category: "Pension",
      description: "The Skill Loan Scheme was launched in July 2015 to provide institutional credit to individuals for skill development courses aligned to National Occupations Standards and Qualification Packs and leading to a certificate/diploma/degree by training institutes as per National Skill Qualification Framework (NSQF).Ministry of Skill Development & Entrepreneurship (MSDE) during July 2024 launched the revised Model Skill Loan Scheme. It aims at providing access to skilling courses, including high-end courses which often come with high course fee, without any financial constraints. This will empower the youth of India to be future- ready workforce.",
      url:"https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-unemployed-and-poor/model-skill-loan-scheme?lgn=en"
    },
  ];

  const handleApplyClick = (url) => {
    window.open(url, '_blank');
  };

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
              <button
                onClick={() => handleApplyClick(scheme.url)}
                className="mt-2 bg-[#FF9D2E] text-white px-4 py-2 rounded hover:bg-[#e88c1e]"
              >
                More Info
              </button>
            </div>
            <p className="text-gray-600 mt-2">{scheme.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function JobsContent() {
  const jobs = [
    {
      id: 1,
      title: "Hotel housekeeper",
      description: "Hotel housekeepers are responsible for more than just cleaning hotel rooms. They typically change sheets, make beds, provide fresh towels, shower curtains and toiletries like shampoo and soaps. Many housekeepers are also responsible for working in the laundry room to wash, dry and fold linens and towels. Oftentimes, housekeepers employ a variety of skills.",
      wage: "keep this empty for the time being",
      url: "https://careers.marriott.com/housekeeper/job/4C73C591C7D0D8D8BB4CF6DCFBC6D45B"
    },
    {
      id: 2,
      title: "Food preparation worker",
      description: "Food prep workers are responsible for sanitizing and maintaining a clean work area and utensils used for cooking and preparing food. They commonly work in restaurants, but can also be employed in hotels, hospitals and healthcare facilities. Food prep workers may also work alongside chefs, cooks and food service managers to prepare meals.",
      wage: "keep this empty for the time being",
      url: "https://www.lindabeansperfectmaine.com/perfect-maine/join-our-team/"
    },
    {
      id: 3,
      title: "Personal care assistant",
      description: "Personal care assistants work with clients to schedule and attend doctor appointments, as well as provide transportation or arrange for client transportation to and from appointments. Personal care assistants may also help clients with completing daily tasks such as grocery shopping and picking up medicines and other supplies. Personal care aides may also be responsible for preparing and cooking meals, administer medicines on schedule and serve as a companion for their clients.",
      wage: "keep this empty for the time being",
      url: "https://smartapply.indeed.com/beta/indeedapply/form/profile-location"
    },
    {
      id: 4,
      title: "Restaurant server",
      description: "Restaurant servers take orders, communicate with kitchen staff and deliver meals and remove spent dishes. Servers are frequently considered the most common hospitality workers, and they can usually be employed by restaurants, hotels, healthcare facilities and even cruise lines.",
      wage: "keep this empty for the time being",
      url: "https://smartapply.indeed.com/beta/indeedapply/form/resume"
    },
    {
      id: 5,
      title: "Childcare provider",
      description: "Childcare providers work with lead teachers, assistants and other educational workers to provide the care and support of children, typically from infants to elementary school age. Childcare providers are also responsible for assisting in the delivery of lessons, activities and other extracurricular activities, as well as provide an enriching environment for before and after school care kids. Childcare providers may also utilize the opportunities for professional development to help them advance their careers further in the educational field.",
      wage: "keep this empty for the time being",
      url: "https://lifeworksnw.e3applicants.com/careers/Childcare-Provider-On-Call-518-1659?source=Indeed.com"
    },
    {
      id: 6,
      title: "Bartender",
      description: "Bartenders can be considered another essential team member for any bar and restaurant business. Oftentimes called \"mixologists,\" bartenders are responsible for not only pouring, mixing and serving alcoholic beverages to customers, but they are also responsible for adhering to public safety standards and federal and state regulations when serving alcohol. Bartenders may also be required to possess a state liquor license, depending on their place of residence. Furthermore, bartending can be an effective way to gain customer service and interpersonal skills, as well as conflict resolution skills.",
      wage: "keep this empty for the time being",
      url: "https://smartapply.indeed.com/beta/indeedapply/form/profile-location"
    },
    {
      id: 7,
      title: "Home health aide",
      description: "Home health aides may work with a registered nurse or nursing assistant to monitor and care for patients by observing physical and mental well-being, recording vital signs, monitoring eating habits, helping patients perform daily functions and providing opportunities for exercise. Home health aides may also offer housekeeping and assistant services, such as shopping for groceries, medicines and other supplies.",
      wage: "keep this empty for the time being",
      url: "https://smartapply.indeed.com/beta/indeedapply/form/profile-location"
    },
    {
      id: 8,
      title: "Retail sales assistant manager",
      description: "Retail sales assistant managers work in support of the store or department manager in a retail setting. They may typically perform daily functions in a supervisory role, such as managing employees, work with customers and carry out the directives of the manager, director or owner of the store.",
      wage: "keep this empty for the time being",
      url: "https://my.peoplematter.com/mja/122330/jobapp/GetStarted?jobOpenings=3334d575-03bd-461f-9d51-a88700eb54dd&refererUrl=https://www.indeed.com/"
    },
    {
      id: 9,
      title: "Nursing assistant",
      description: "Nursing assistants work under the mentorship and supervision of registered nurses and help patients with daily activities such as eating, bathing, dressing and moving around their environment. Nurse's aides may also be responsible for providing basic health care for patients in hospitals, as well as residents of long-term care facilities like nursing homes and assisted living facilities. They may also help transport patients to and from rooms and treatment areas.",
      wage: "keep this empty for the time being",
      url: "https://smartapply.indeed.com/beta/indeedapply/form/profile-location"
    }
  ]
  const handleApplyClick = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Opportunities</h2>
      <div className="space-y-4">
        {jobs.map((scheme) => (
          <div key={scheme.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg">{scheme.title}</h3>
                <span className="inline-block bg-[#FFE8CC] text-[#FF9D2E] text-sm px-3 py-1 rounded-full mt-1">
                  {scheme.wage}
                </span>
              </div>
              <button
                onClick={() => handleApplyClick(scheme.url)}
                className="mt-2 bg-[#FF9D2E] text-white px-4 py-2 rounded hover:bg-[#e88c1e]"
              >
                More Info
              </button>
            </div>
            <p className="text-gray-600 mt-2">{scheme.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatbotContent() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm your VikasYatra assistant. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isUser: true }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/LearnBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { text: "Sorry, something went wrong. Please try again.", isUser: false }]);
    }

    setInput("");
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("File uploaded:", data.message);

      // Automatic file download
      const fileURL = URL.createObjectURL(selectedFile);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = selectedFile.name; // Keep the original filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup URL after download
      setTimeout(() => URL.revokeObjectURL(fileURL), 100);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setSelectedFile(null); //reset the file.
  };

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
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="border border-gray-300 rounded-lg px-2 py-1"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Upload & Download File
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
  );
}
