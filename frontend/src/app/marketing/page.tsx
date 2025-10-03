'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function MarketingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you! We'll contact you at ${email} soon.`)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="block">Revolutionize Your</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">
                Hotel Operations
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300">
              Streamline guest experiences, empower staff, and maximize efficiency with our all-in-one hotel management platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/dashboard" 
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <button className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm text-white font-bold rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 top-1/2 bg-gradient-to-b from-transparent to-slate-900 pointer-events-none"></div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features for Modern Hotels
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
              Everything you need to run a world-class hospitality operation
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Guest Request Management",
                description: "Centralized system for logging, tracking, and resolving guest requests with automatic department routing.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                )
              },
              {
                title: "Housekeeping & Room Status",
                description: "Real-time room status tracking with mobile-friendly interfaces for staff to update statuses instantly.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )
              },
              {
                title: "Staff Management",
                description: "Comprehensive staff management with performance tracking, scheduling, and communication tools.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Inventory Control",
                description: "Track and manage all hotel inventory with automated alerts for low stock and reorder recommendations.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              {
                title: "Advanced Analytics",
                description: "Data-driven insights with customizable reports, trend analysis, and performance benchmarking.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Department Coordination",
                description: "Seamless communication between departments with shared dashboards and real-time updates.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-700 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-slate-600 hover:border-teal-500 transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
              Join thousands of hotels worldwide transforming their operations
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "HotelOps transformed our guest service delivery. Response times dropped by 60% and guest satisfaction scores increased to 96%.",
                author: "Sarah Johnson",
                title: "General Manager, Grand Palazzo Hotel"
              },
              {
                quote: "The staff management features alone saved us 15 hours per week in administrative tasks. The ROI was immediate.",
                author: "Michael Chen",
                title: "Operations Director, Oceanview Resorts"
              },
              {
                quote: "Implementing HotelOps was seamless. Our housekeeping efficiency improved by 40% in the first month.",
                author: "Robert Williams",
                title: "Executive Housekeeper, Metropolitan Suites"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-teal-400 text-5xl mb-4">"</div>
                <p className="text-lg text-slate-200 mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-slate-400">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Transform Your Hotel Operations?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-teal-100">
            Join thousands of hotels worldwide using HotelOps to deliver exceptional guest experiences.
          </p>
          
          <div className="mt-10 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="sm:flex">
              <div className="min-w-0 flex-1">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full px-5 py-3 text-base text-slate-900 placeholder-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                  required
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full px-5 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
                >
                  Get Started
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-teal-100">
              Start your free 14-day trial. No credit card required.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">HotelOps</h3>
              <p className="text-slate-400">
                Revolutionizing hotel operations with intelligent technology solutions.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white">Features</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Integrations</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Guides</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white">About</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Careers</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Contact</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white">Partners</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500">© 2023 HotelOps. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}