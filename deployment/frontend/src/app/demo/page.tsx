'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      title: "Guest Request Management",
      description: "Centralized system for logging, tracking, and resolving guest requests with automatic department routing.",
      benefits: [
        "30% reduction in response times",
        "95% guest satisfaction with request handling",
        "Automatic escalation for urgent requests"
      ]
    },
    {
      title: "Housekeeping & Room Status",
      description: "Real-time room status tracking with mobile-friendly interfaces for staff to update statuses instantly.",
      benefits: [
        "40% improvement in housekeeping efficiency",
        "Real-time visibility into room availability",
        "Reduced room turnaround time by 25%"
      ]
    },
    {
      title: "Staff Management",
      description: "Comprehensive staff management with performance tracking, scheduling, and communication tools.",
      benefits: [
        "35% improvement in staff productivity",
        "Reduced turnover by 30%",
        "Real-time performance analytics"
      ]
    },
    {
      title: "Inventory Control",
      description: "Track and manage all hotel inventory with automated alerts for low stock and reorder recommendations.",
      benefits: [
        "50% reduction in inventory costs",
        "Elimination of stockouts",
        "Automated purchasing recommendations"
      ]
    },
    {
      title: "Advanced Analytics",
      description: "Data-driven insights with customizable reports, trend analysis, and performance benchmarking.",
      benefits: [
        "Predictive demand forecasting",
        "Revenue optimization recommendations",
        "Guest behavior pattern analysis"
      ]
    },
    {
      title: "Department Coordination",
      description: "Seamless communication between departments with shared dashboards and real-time updates.",
      benefits: [
        "60% improvement in cross-departmental communication",
        "Reduced service delivery time by 35%",
        "Enhanced problem-solving capabilities"
      ]
    }
  ]

  const testimonials = [
    {
      quote: "HotelOps transformed our guest service delivery. Response times dropped by 60% and guest satisfaction scores increased to 96%.",
      author: "Sarah Johnson",
      position: "General Manager, Grand Palazzo Hotel",
      rating: 5
    },
    {
      quote: "The staff management features alone saved us 15 hours per week in administrative tasks. The ROI was immediate.",
      author: "Michael Chen",
      position: "Operations Director, Oceanview Resorts",
      rating: 5
    },
    {
      quote: "Implementing HotelOps was seamless. Our housekeeping efficiency improved by 40% in the first month.",
      author: "Robert Williams",
      position: "Executive Housekeeper, Metropolitan Suites",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            HotelOps
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-r from-teal-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              See HotelOps in Action
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-teal-100">
              Experience how our platform transforms hotel operations with intelligent automation and real-time insights
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg shadow-lg hover:bg-slate-100 transition duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Demo Video
              </button>
              <Link 
                href="/signup" 
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition duration-300"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-slate-800 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl">HotelOps Demo Video</p>
                  <p className="mt-2 text-slate-400">Interactive demo showing key features in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex overflow-x-auto py-2 mb-8 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'features', label: 'Key Features' },
            { id: 'testimonials', label: 'Customer Stories' },
            { id: 'results', label: 'Proven Results' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">
                  Experience HotelOps in Action
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Our 15-minute interactive demo walks you through the complete HotelOps experience, 
                  showing how our platform transforms hotel operations from reactive to proactive.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">See how guest requests are automatically routed and resolved</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Watch real-time room status updates from housekeeping staff</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">Experience our intuitive staff management dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">View real-time analytics and performance metrics</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-teal-700 transition duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Full Demo
                  </button>
                </div>
              </div>
              <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
                  <div className="text-center text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg">Interactive Dashboard Demo</p>
                    <p className="mt-2 text-slate-400">Real-time operations overview</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Key Features Demonstrated
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:border-teal-300 transition duration-300">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Customer Success Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-700 italic mb-6">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold text-slate-800">{testimonial.author}</p>
                      <p className="text-sm text-slate-600">{testimonial.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Proven Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200">
                  <div className="text-4xl font-bold text-teal-600 mb-2">60%</div>
                  <p className="text-slate-700">Reduction in response time</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">40%</div>
                  <p className="text-slate-700">Improvement in efficiency</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200">
                  <div className="text-4xl font-bold text-amber-600 mb-2">95%</div>
                  <p className="text-slate-700">Guest satisfaction rate</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">35%</div>
                  <p className="text-slate-700">Staff productivity increase</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Case Study: Grand Palazzo Hotel</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-slate-700 mb-4">
                      After implementing HotelOps, the Grand Palazzo Hotel saw remarkable improvements in their operations:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Response times to guest requests decreased by 60%</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Housekeeping efficiency improved by 40%</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Guest satisfaction scores rose to 96%</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Administrative overhead reduced by 25%</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-center mb-4">
                      <h4 className="font-bold text-slate-800">Before & After Implementation</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">Guest Request Response Time</span>
                          <span className="text-sm font-medium text-slate-700">60% ↓</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">Housekeeping Efficiency</span>
                          <span className="text-sm font-medium text-slate-700">40% ↑</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">Guest Satisfaction</span>
                          <span className="text-sm font-medium text-slate-700">96%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">Administrative Time</span>
                          <span className="text-sm font-medium text-slate-700">25% ↓</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-teal-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Guest Experience?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
            Join thousands of hotels worldwide using HotelOps to deliver exceptional guest experiences with zero human management required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg shadow-lg hover:bg-slate-100 transition duration-300"
            >
              Start Free 14-Day Trial
            </Link>
            <button 
              onClick={() => setIsVideoPlaying(true)}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-teal-600 transition duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Full Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}