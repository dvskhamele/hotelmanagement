'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import apiService from '../../utils/apiService'

export default function ClientOnboardingWizard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Advisory Delivery Module</h1>
          <p className="text-slate-600">Send research advisories to your clients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Send New Advisory</h2>
            <p className="text-slate-600">Select a template and customize your message</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Deliveries</h2>
            <p className="text-slate-600">Track your recent advisory deliveries</p>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}