"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card1"
import { Button } from "@/components/ui/button1"
import { Input } from "@/components/ui/input1"
import { Label } from "@/components/ui/label1"
import { Textarea } from "@/components/ui/textarea1"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs1"
import { databases, storage, COLLECTION_ID , COLLECTION_ID1, DATABASE_ID, BUCKET_ID } from "../../../appwrite/appwrite";
import { ID } from "appwrite";
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

  // Changed skills type from string[] to string
  const [newJob, setNewJob] = useState({
    title: "",
    
    description: "",
    location: "",
    salary: "",
    skills: "", // Changed from string[] to string
  })

  const handleJobClick = (jobId: number) => {
    setSelectedJob(jobId)
    setShowApplicants(true)
  }
  const handleResumeView = async (videoid) => {
    try {
      // Get the file download URL from Appwrite
      // You need to define BUCKET_ID in your appwrite config or pass it as a constant here
       // Replace with your actual bucket ID
      
      const fileUrl = storage.getFileDownload(BUCKET_ID, videoId);
      
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', `interview-${videoId}`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Failed to download the interview video.");
    }
  };
  // Then in your HRView component, add this function:
  const handleVideoDownload = async (videoId) => {
    try {
      // Get the file download URL from Appwrite
      // You need to define BUCKET_ID in your appwrite config or pass it as a constant here
       // Replace with your actual bucket ID
      
      const fileUrl = storage.getFileDownload(BUCKET_ID, videoId);
      
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', `interview-${videoId}`);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Failed to download the interview video.");
    }
  };
const handleVideoView = async (videoId) => {
  try {
    // Get the file view URL
    const fileUrl = await storage.getFileView(BUCKET_ID, videoId);
    
    // Open in new tab
    window.open(fileUrl, '_blank');
  } catch (error) {
    console.error("Error viewing video:", error);
    alert("Failed to view the interview video.");
  }
};

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newJob
      );
      alert("Job created successfully!");
      setActiveTab("dashboard");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // Updated to handle skills as string
  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewJob({
      ...newJob,
      skills: e.target.value
    });
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
                            
                          </div>

                          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                            <div className="flex items-center gap-2 text-gray-600">
                              <CalendarIcon className="h-4 w-4" />
                              <span className="text-sm">Posted: {job.postedDate}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                              <UsersIcon className="h-4 w-4" />
                              
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleResumeView(applicant.resumeid);
                                }}
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
                            <Button 
                              size="sm" 
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                handleVideoDownload(applicant.videoId);
                              }}
                            >
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
                      <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                      <Input 
                        id="skills" 
                        value={newJob.skills}
                        onChange={handleSkillInput}
                        placeholder="e.g. React, TypeScript, Node.js"
                      />
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