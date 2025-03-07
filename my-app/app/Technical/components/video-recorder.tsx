"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button1"
import { PlayIcon, MonitorStopIcon as StopIcon, CheckCircleIcon } from "lucide-react"

export default function VideoRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const [stream, setStream] = useState<MediaStream | null>(null)

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
          const blob = new Blob(chunksRef.current, { type: "video/webm" })
          const url = URL.createObjectURL(blob)

          // Create download link
          const a = document.createElement("a")
          a.href = url
          a.download = `interview-recording-${new Date().toISOString()}.webm`
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

