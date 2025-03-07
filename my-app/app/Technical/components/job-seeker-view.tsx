"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card1"
import { Button } from "@/components/ui/button1"
import { Input } from "@/components/ui/input1"
import { Label } from "@/components/ui/label1"
import { ArrowLeftIcon, UploadIcon, CheckIcon, PlayIcon, MonitorStopIcon as StopIcon, CheckCircleIcon } from "lucide-react"
import { jobListings } from "../data/job-listings"
import { databases, COLLECTION_ID1, DATABASE_ID, BUCKET_ID } from "../../../appwrite/appwrite"
import { ID, Storage } from "appwrite"
import client from "../../../appwrite/appwrite"
import { set } from "zod"

interface JobSeekerViewProps {
  onBack: () => void
}

// Inline VideoRecorder component (previously imported)
function VideoRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [videoFileName , setVideofilename] = useState<string | null>(null)

  useEffect(() => {
    // Initialize camera to show preview even before recording
    const initCamera = async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setStream(videoStream)

        if (videoRef.current) {
          videoRef.current.srcObject = videoStream
        }
      } catch (err) {
        console.error("Error accessing media devices:", err)
      }
    }

    initCamera()

    return () => {
      // Clean up when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      chunksRef.current = []

      if (!stream) {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setStream(videoStream)

        if (videoRef.current) {
          videoRef.current.srcObject = videoStream
        }
      }

      if (stream) {
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/mp4" })
          const url = URL.createObjectURL(blob)

          // Create download link
          const a = document.createElement("a")
          a.href = url
          a.download = `interview-recording-${new Date().toISOString()}.mp4`
          setVideofilename(a.download)
          a.click()

          // Clean up
          URL.revokeObjectURL(url)
          setRecordingComplete(true)
        }

        mediaRecorder.start()
        setIsRecording(true)
      }
    } catch (err) {
      console.error("Error starting recording:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden aspect-video shadow-xl border border-gray-700">
        <video ref={videoRef} autoPlay muted={isRecording} className="w-full h-full object-cover" />

        {isRecording && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
              <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="text-white text-xs font-medium">Recording</span>
            </div>
          </div>
        )}

        {recordingComplete && !isRecording && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-center p-4">
              <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-2" />
              <p className="text-white font-medium">Recording saved</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            disabled={recordingComplete}
            className="bg-green-500 hover:bg-green-600 text-white shadow-lg transform transition hover:scale-105"
          >
            <PlayIcon className="h-4 w-4 mr-2" /> Start Recording
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-600 text-white shadow-lg transform transition hover:scale-105"
          >
            <StopIcon className="h-4 w-4 mr-2" /> Stop Recording
          </Button>
        )}
      </div>
    </div>
  )
}

export default function JobSeekerView({ onBack }: JobSeekerViewProps) {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [showInterviewProcess, setShowInterviewProcess] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    score: 0, // Initial score
  })
  const [applicationDocId, setApplicationDocId] = useState("");

  // Initialize Appwrite Storage
  const storage = new Storage(client)

  const handleApply = (jobId: number) => {
    setSelectedJob(jobId)
    setShowApplicationForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      // Only proceed if a resume file was selected
      if (formData.resume) {
        // 1. Upload the resume to Appwrite storage
        const uploadResponse = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          formData.resume
        )

        // 2. Get the resume file ID (storage ID)
        const resumeFileId = uploadResponse.$id

        // 3. Create a document in the database with all the data
        // Make sure these field names match your collection schema
        const docResponse = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID1,
          ID.unique(),
          {
            name: formData.name,
            email: formData.email,
            score: formData.score,
            resumeid: resumeFileId, // Using the exact field name that exists in your schema
            jobId: selectedJob?.toString() || "",
            status: "Interview in progress"
          }
        )

        // Save the document ID for later updates
        setApplicationDocId(docResponse.$id)

        // Continue to interview process
        setShowApplicationForm(false)
        setShowInterviewProcess(true)
      } else {
        alert("Please upload your resume before submitting")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      })
    }
  }

  const handleNextQuestion = async () => {
    // Increment score - in a real app, you'd calculate this based on the answer quality
    const newScore = formData.score + 20 // Just for demo, add 20 points per question
    
    // Update formData with new score
    setFormData({
      ...formData,
      score: newScore
    })

    // If we have the document ID, update the score in the database
    if (applicationDocId) {
      try {
        if (currentQuestion === interviewQuestions.length - 1) {
          // If this is the last question, update the final score and status
          await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID1,
            applicationDocId,
            {
              score: newScore,
              status: "Interview completed"
            }
          )
          
          // Interview completed
          alert(`Thank you for completing the interview process! Your application has been submitted with a score of ${newScore}/100.`)
          onBack()
        } else {
          // Just update the score and move to next question
          await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID1,
            applicationDocId,
            {
              score: newScore
            }
          )
          setCurrentQuestion(currentQuestion + 1)
        }
      } catch (error) {
        console.error("Error updating score:", error)
        // Continue anyway to not block the user experience
        if (currentQuestion < interviewQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          alert("Thank you for completing the interview process! Your application has been submitted.")
          onBack()
        }
      }
    } else {
      // If we don't have the document ID for some reason, just proceed with the UI flow
      if (currentQuestion < interviewQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        alert("Thank you for completing the interview process! Your application has been submitted.")
        onBack()
      }
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
                    <p className="text-sm text-gray-600 mb-4"><strong>Skills Required:</strong>{job.skills}</p>
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
                    <Button 
                      type="submit" 
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={isUploading || !formData.resume}
                    >
                      {isUploading ? "Uploading..." : "Submit Application"}
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