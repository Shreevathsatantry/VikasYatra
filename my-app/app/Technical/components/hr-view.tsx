"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card1"
import { Button } from "@/components/ui/button1"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeftIcon,
  LayoutDashboardIcon,
  PlusCircleIcon,
  CalendarIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
} from "lucide-react"
import { jobListings } from "../data/job-listings"
import { applicants } from "../data/applicants"

interface HRViewProps {
  onBack: () => void
}

export default function HRView({ onBack }: HRViewProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [showApplicants, setShowApplicants] = useState(false)

  const [newJob, setNewJob] = useState({
    title: "",
    company: "FairFi Inc.",
    description: "",
    location: "",
    salary: "",
    skills: [] as string[],
  })

  const handleJobClick = (jobId: number) => {
    setSelectedJob(jobId)
    setShowApplicants(true)
  }

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Job created successfully!")
    setActiveTab("dashboard")
  }

  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault()
      setNewJob({
        ...newJob,
        skills: [...newJob.skills, e.currentTarget.value.trim()],
      })
      e.currentTarget.value = ""
    }
  }

  const removeSkill = (index: number) => {
    setNewJob({
      ...newJob,
      skills: newJob.skills.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back
        </Button>
        <h2 className="text-2xl font-bold">HR Dashboard</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <LayoutDashboardIcon className="h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <PlusCircleIcon className="h-4 w-4" /> Create Job
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="dashboard">
            {!showApplicants ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 gap-6">
                  {jobListings.map((job) => (
                    <Card
                      key={job.id}
                      className="cursor-pointer hover:border-orange-300 transition-all"
                      onClick={() => handleJobClick(job.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <p className="text-gray-500 text-sm">{job.company}</p>
                          </div>

                          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                            <div className="flex items-center gap-2 text-gray-600">
                              <CalendarIcon className="h-4 w-4" />
                              <span className="text-sm">Posted: {job.postedDate}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                              <UsersIcon className="h-4 w-4" />
                              <span className="text-sm">Applicants: {job.applicants}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {job.status === "Active" ? (
                                <span className="flex items-center gap-1 text-green-600 text-sm">
                                  <CheckCircleIcon className="h-4 w-4" /> Active
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-red-600 text-sm">
                                  <XCircleIcon className="h-4 w-4" /> Closed
                                </span>
                              )}
                            </div>

                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <EyeIcon className="h-3 w-3" /> View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center mb-6">
                  <Button variant="ghost" onClick={() => setShowApplicants(false)} className="mr-4">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Jobs
                  </Button>
                  <h3 className="text-xl font-bold">
                    Applicants for {jobListings.find((j) => j.id === selectedJob)?.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {applicants.map((applicant) => (
                    <Card key={applicant.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h4 className="text-lg font-bold">{applicant.name}</h4>
                            <p className="text-gray-500">{applicant.email}</p>
                            <div className="mt-2">
                              <a
                                href="#"
                                className="text-orange-500 hover:text-orange-600 text-sm flex items-center gap-1"
                              >
                                View Resume
                              </a>
                            </div>
                          </div>

                          <div className="mt-4 md:mt-0">
                            <h5 className="font-medium text-gray-700 mb-2">Interview Score</h5>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-orange-500 rounded-full"
                                  style={{ width: `${applicant.score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{applicant.score}%</span>
                            </div>

                            <div className="mt-4 flex gap-2">
                              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                View Interview
                              </Button>
                              <Button size="sm" variant="outline">
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="create">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Job Listing</CardTitle>
                  <CardDescription>Fill out the form below to create a new job listing</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateJob} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        rows={4}
                        value={newJob.description}
                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newJob.location}
                          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary">Salary Range</Label>
                        <Input
                          id="salary"
                          value={newJob.salary}
                          onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Required Skills (press Enter to add)</Label>
                      <Input id="skills" onKeyDown={handleSkillInput} />

                      <div className="flex flex-wrap gap-2 mt-2">
                        {newJob.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              className="ml-1 text-orange-800 hover:text-orange-900"
                              onClick={() => removeSkill(index)}
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("dashboard")}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Create Job
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

