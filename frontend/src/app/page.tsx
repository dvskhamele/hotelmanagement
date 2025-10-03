'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('template')

  const features = [
    {
      title: "Dashboard Analytics",
      description: "Real-time insights into hospital performance with customizable widgets and visualizations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Patient Room Management",
      description: "Track patient room status, cleaning tasks, and discharge planning with real-time updates.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Medical Request System",
      description: "Streamline patient requests and medical orders with priority management and department assignment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      title: "Staff Management",
      description: "Track medical staff performance, schedules, and department assignments.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Pharmacy Management System",
      description: "Monitor medication inventory levels with automated alerts and reordering suggestions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: "Reporting & Analytics",
      description: "Generate detailed reports on patient care, staff performance, and operational efficiency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ]

  const pricingPlans = [
    {
      id: 'template',
      name: 'Complete Patient Management System',
      price: '$4000',
      description: 'Full hospital management system with PWA compatibility',
      features: [
        'Progressive Web App (PWA) compatible',
        'Real-time dashboard analytics',
        'Patient room status tracking & care management',
        'Medical request system with priority routing',
        'Staff performance monitoring',
        'Pharmacy management with alerts',
        'Mobile-responsive interface',
        'Offline functionality'
      ],
      cta: 'Get Full System'
    },
    {
      id: 'backend',
      name: 'Enterprise Backend',
      price: '$4000',
      description: 'Scalable backend with enterprise-grade security',
      features: [
        'High-performance RESTful API',
        'Database optimization & indexing',
        'Advanced authentication & authorization',
        'Real-time data synchronization',
        'Comprehensive API documentation',
        'Load balancing & auto-scaling',
        'Data encryption & security protocols',
        'HIPAA compliance ready'
      ],
      cta: 'Get Enterprise Backend'
    },
    {
      id: 'full',
      name: 'Complete SuperHealth Suite',
      price: '$8000',
      description: 'End-to-end hospital operations with AI-powered insights',
      features: [
        'Full Patient Management System',
        'Pharmacy Management System',
        'AI-powered analytics & predictive insights',
        'Custom integrations & API connectors',
        'Advanced reporting & data visualization',
        'Patient management system',
        'Pharmacy management system',
        '24/7 dedicated support',
        'Regular updates & feature releases'
      ],
      cta: 'Get Complete Suite',
      popular: true
    }
  ]

  const benefits = [
    "Reduce operational costs by up to 30%",
    "Improve patient satisfaction scores",
    "Streamline medical staff workflows",
    "Real-time visibility into hospital operations",
    "Data-driven clinical decision making",
    "Mobile-responsive interface for on-the-go access"
  ]

  const useCases = [
    "Hospital systems seeking centralized management",
    "Independent hospitals wanting to modernize operations",
    "Medical centers with diverse service offerings",
    "Clinics needing patient experience optimization",
    "Emergency departments managing high volumes",
    "Specialized units requiring automated systems"
  ]

  const technologies = [
    { name: "Next.js 13+", category: "Frontend Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "React", category: "UI Library" },
    { name: "Node.js", category: "Backend Runtime" },
    { name: "Express", category: "Backend Framework" },
    { name: "MongoDB", category: "Database" },
    { name: "JWT", category: "Authentication" },
    { name: "Vercel", category: "Deployment" },
    { name: "Recharts", category: "Data Visualization" },
    { name: "HIPAA Compliance", category: "Security" },
    { name: "Telemedicine API", category: "Remote Care" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 flex-wrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-slate-800">SuperHealth</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10 flex-wrap">
              <a href="#features" className="text-slate-600 hover:text-teal-600 font-medium">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-teal-600 font-medium">Pricing</a>
              <a href="#benefits" className="text-slate-600 hover:text-teal-600 font-medium">Benefits</a>
              <a href="#tech" className="text-slate-600 hover:text-teal-600 font-medium">Technology</a>
            </nav>
            <div className="flex items-center space-x-4 flex-wrap">
              <button 
                onClick={() => router.push('/login')}
                className="text-slate-600 hover:text-teal-600 font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
              >
                Live Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
                Modern Hospital Operations Management
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
                Transform your hospital with our comprehensive management system. 
                From patient care coordination to medical resource optimization, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() => router.push('/dashboard')}
                >
                  View Live Demo
                </button>
                <button 
                  className="bg-white text-teal-600 border border-teal-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-50 transition duration-300"
                  onClick={() => setIsPreviewOpen(true)}
                >
                  Preview Features
                </button>
              </div>
            </div>
          </div>
        </section>

      {/* Private Rooms Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">PRIVATE ROOMS ONLY</h2>
              <p className="text-slate-600 mb-6">
                Private rooms are quieter and safer than shared rooms and better for your recovery. 
                So Superhealth does not have any room sharing. Every patient gets their own private 
                room, comfortably appointed for you and your attendant.
              </p>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Private Room</h3>
              <h3 className="text-xl font-semibold text-slate-800">Private Room</h3>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-10 shadow-lg border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-3"></div>
                    <div className="text-slate-700">Private room for each patient</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-3"></div>
                    <div className="text-slate-700">Comfortable for patient and attendant</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-3"></div>
                    <div className="text-slate-700">Better recovery environment</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-3"></div>
                    <div className="text-slate-700">Enhanced privacy and safety</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Equipment Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ADVANCED EQUIPMENT FOR RAPID, ACCURATE DIAGNOSES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Advanced 1.5T MRI</h3>
              <div className="w-16 h-16 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Advanced 1.5T MRI</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">160 SLICE LOW DOSE CARDIAC CT</h3>
              <div className="w-16 h-16 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">160 SLICE LOW DOSE CARDIAC CT</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Digital XRAY</h3>
              <div className="w-16 h-16 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Digital XRAY</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">HD DIGITAL MAMMOGRAPHY</h3>
              <div className="w-16 h-16 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">HD DIGITAL MAMMOGRAPHY</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Wireless Ultrasound</h3>
              <div className="w-16 h-16 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Wireless Ultrasound</h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">ECG, ECHO, TMT</h3>
              <div className="w-16 h-16 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">ECG, ECHO, TMT</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to efficiently manage your hospital operations in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Key Benefits</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transform your hospital operations with measurable improvements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-lg text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Perfect For</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our system adapts to various medical environments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800">{useCase}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs and budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular 
                    ? 'ring-2 ring-teal-500 transform scale-105 z-10 bg-white' 
                    : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="bg-teal-500 text-white text-center py-2">
                    <span className="text-sm font-semibold">MOST POPULAR</span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    {plan.id !== 'template' && <span className="text-slate-600">/one time</span>}
                  </div>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      if (plan.id === 'template') {
                        // Handle template download
                        alert('Template download would be implemented here')
                      } else {
                        // Handle purchase
                        alert(`Purchase flow for ${plan.name} would be implemented here`)
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-md'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Modern Technology Stack</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built with cutting-edge technologies for optimal performance
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition duration-300">
                <h3 className="font-semibold text-slate-800">{tech.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Hospital Operations?</h2>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-10">
            Experience care like never before with our world-class hospital management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-white text-teal-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-100 transition duration-300 shadow-lg"
            >
              View Live Demo
            </button>
            <button 
              onClick={() => alert('Book Appointment feature would be implemented here')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-teal-600 transition duration-300"
            >
              Book An Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-white">SuperHealth</span>
              </div>
              <p className="mt-4 text-sm">
                Delivering exceptional patient care through innovative hospital management solutions.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Patient Management</a></li>
                <li><a href="#" className="hover:text-white transition">Pharmacy Systems</a></li>
                <li><a href="#" className="hover:text-white transition">Medical Staff Coordination</a></li>
                <li><a href="#" className="hover:text-white transition">Emergency Response</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Clinical Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition">Training Materials</a></li>
                <li><a href="#" className="hover:text-white transition">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition">System Status</a></li>
                <li><a href="#" className="hover:text-white transition">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
            <p>© 2023 SuperHealth Hospital Management System. All rights reserved.</p>
            <p className="mt-2">Designed for healthcare excellence and patient safety.</p>
          </div>
        </div>
      </footer>

      {/* Preview Features */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto max-w-[calc(100vw-2rem)]">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">SuperHealth Feature Preview</h3>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-slate-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517M19.428 15.428v-4.857a2 2 0 00-.547-1.447l-2.387-2.387a2 2 0 00-1.447-.547h-4.857a2 2 0 00-1.447.547l-2.387 2.387a2 2 0 00-.547 1.447v4.857a2 2 0 00.547 1.447l2.387 2.387a2 2 0 001.447.547h4.857a2 2 0 001.447-.547l2.387-2.387a2 2 0 00.547-1.447z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-2">Interactive Dashboard Preview</h4>
                    <p className="text-slate-600 max-w-md mx-auto">
                      Experience the full SuperHealth dashboard with real-time analytics, patient room management, 
                      and medical request tracking.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-sm text-slate-700">Real-time Dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-sm text-slate-700">Patient Room Management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-sm text-slate-700">Medical Request Tracking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-sm text-slate-700">Medical Staff Management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-sm text-slate-700">Pharmacy Management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
                    <span className="text-sm text-slate-700">Department Coordination</span>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Key Features Included:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time Dashboard</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Patient Room Management</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Medical Request System</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Medical Staff Management</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Pharmacy Management</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Department Coordination</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Inventory Management</span>
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Reporting & Analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end">
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}