'use client'

import React, { useState, useEffect, useRef } from 'react'

interface VoiceCommandProps {
  onCommand: (command: string) => void
}

const VoiceCommand: React.FC<VoiceCommandProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const [error, setError] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      setIsSupported(false)
      setError('Speech recognition is not supported in your browser. Please try Chrome or Edge.')
      return
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map(result => result.transcript)
        .join('')
      
      setTranscript(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      setError(`Error: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      if (transcript) {
        onCommand(transcript)
        setTranscript('')
      }
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onCommand])

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('')
      setError('')
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  if (!isSupported) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Browser Compatibility</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Voice Commands</h3>
      
      <div className="flex flex-col items-center">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`flex items-center justify-center w-20 h-20 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${
            isListening 
              ? 'bg-rose-100 hover:bg-rose-200 focus:ring-rose-500' 
              : 'bg-teal-100 hover:bg-teal-200 focus:ring-teal-500'
          }`}
        >
          {isListening ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <p className="mt-4 text-sm text-slate-600">
          {isListening ? 'Listening... Speak now' : 'Click to start voice command'}
        </p>
        
        {transcript && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg w-full">
            <p className="text-sm text-slate-800">"{transcript}"</p>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-rose-50 rounded-lg w-full">
            <p className="text-sm text-rose-800">{error}</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-medium text-slate-800 mb-2">Try these voice commands:</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• "Request extra towels for room 205"</li>
          <li>• "Leaky faucet in room 108 needs maintenance"</li>
          <li>• "Guest in room 302 wants late checkout"</li>
          <li>• "Room 104 air conditioning not working"</li>
        </ul>
      </div>
    </div>
  )
}

export default VoiceCommand