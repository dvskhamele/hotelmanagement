'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@hotelops.com')
  const [password, setPassword] = useState('password123')

  useEffect(() => {
    // Auto-login after a short delay
    const timer = setTimeout(() => {
      handleLoginAuto();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoginAuto = () => {
    // Mock login - accept any credentials
    localStorage.setItem('token', 'mock-jwt-token')
    router.push('/dashboard')
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - accept any credentials
    localStorage.setItem('token', 'mock-jwt-token')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">HotelOps</h1>
          <p className="text-slate-600">Hotel Operations Management</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-slate-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Credentials auto-filled. Click login or wait for auto-login.
          </p>
        </div>
      </div>
    </div>
  )
}