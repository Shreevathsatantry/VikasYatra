"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card1"
import { Button } from "@/components/ui/button1"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeftIcon, UploadIcon, CheckIcon } from "lucide-react"
import { jobListings } from "../data/job-listings"
import VideoRecorder from "./video-recorder"

interface JobSeekerViewProps {
  onBack: () => void
}

export default function JobSeekerView({ onBack }: JobSeekerViewProps) {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [showInterviewProcess, setShowInterviewProcess] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
  })

  const handleApply = (jobId: number) => {
    setSelectedJob(jobId)
    setShowApplicationForm(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowApplicationForm(false)
    setShowInterviewProcess(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      })
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Interview completed
      alert("Thank you for completing the interview process! Your application has been submitted.")
      onBack()
    }
  }

  const interviewQuestions = [
    "Tell us about yourself and your background.",
    "What are your key strengths that make you a good fit for this role?",
    "Describe a challenging situation you faced at work and how you resolved it.",
    "Why are you interested in this position?",
    "Do you have any questions for us?",
  ]

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back
        </Button>
        <h2 className="text-2xl font-bold">Job Opportunities</h2>
      </div>

      <AnimatePresence mode="wait">
        {!showApplicationForm && !showInterviewProcess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {jobListings.map((job) => (
              <motion.div key={job.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="text-gray-500">{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Salary:</strong> {job.salary}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {showApplicationForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Apply for {jobListings.find((j) => j.id === selectedJob)?.title}</CardTitle>
                <CardDescription>Please fill out the form below to apply for this position</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Upload Resume</Label>
                    <div className="flex items-center gap-4">
                      <Input id="resume" type="file" className="hidden" onChange={handleFileChange} />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("resume")?.click()}
                        className="flex items-center gap-2"
                      >
                        <UploadIcon className="h-4 w-4" />
                        Choose File
                      </Button>
                      <span className="text-sm text-gray-500">
                        {formData.resume ? formData.resume.name : "No file chosen"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {showInterviewProcess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm shadow-xl border-orange-200">
              <CardHeader className="border-b border-orange-100">
                <CardTitle>Interview Process</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {interviewQuestions.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg shadow-sm border border-orange-200">
                      <h3 className="text-lg font-medium mb-2 text-gray-800">Question:</h3>
                      <p className="text-gray-700">{interviewQuestions[currentQuestion]}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                      <h3 className="text-lg font-medium mb-2 text-gray-800">Instructions:</h3>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                        <li>Click "Start Recording" when you're ready to answer</li>
                        <li>Speak clearly and take your time</li>
                        <li>Click "Stop Recording" when you've finished your answer</li>
                        <li>Your recording will be saved automatically</li>
                        <li>Click "Next Question" to continue</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <VideoRecorder />

                    <div className="mt-6 flex justify-end">
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg transform transition hover:scale-105"
                      >
                        {currentQuestion < interviewQuestions.length - 1 ? (
                          <>
                            Next Question <ArrowLeftIcon className="ml-2 h-4 w-4 rotate-180" />
                          </>
                        ) : (
                          <>
                            Submit Interview <CheckIcon className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

