'use client'

import React, { useState, useEffect } from 'react'
import MobileNotFound from './not-found-mobile'

export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Render mobile 404 page for small screens
  if (isMobile) {
    return <MobileNotFound />
  }

  // Desktop version
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">404 - Page Not Found</h1>
          <p className="text-slate-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
          <p className="text-slate-500 text-sm">Resize your browser window to see the mobile-optimized version.</p>
        </div>
      </div>
    </div>
  )
}