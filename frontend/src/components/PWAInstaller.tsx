'use client'

import React, { useState, useEffect } from 'react'

const PWAInstaller: React.FC = () => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsInstalled(true)
      }
    }
    
    checkInstalled()
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setSupportsPWA(false)
    })
    
    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault()
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    
    window.addEventListener('beforeinstallprompt', handler as EventListener)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler as EventListener)
      window.removeEventListener('appinstalled', () => {})
    }
  }, [])

  const installPWA = () => {
    if (!promptInstall) return
    
    promptInstall.prompt()
    promptInstall.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      setPromptInstall(null)
    })
  }

  // Don't show if already installed or not supported
  if (isInstalled || !supportsPWA) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 max-w-xs">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="bg-teal-100 rounded-lg p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-slate-900">Install HotelOps</h3>
            <p className="mt-1 text-xs text-slate-500">Add to your home screen for faster access and offline support.</p>
            <div className="mt-3 flex space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={installPWA}
              >
                Install
              </button>
              <button
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-slate-300 text-xs font-medium rounded text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setIsInstalled(true)}
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PWAInstaller