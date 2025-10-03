'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import GuestPreferences from '../../components/GuestPreferences'

export default function GuestProfiles() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('preferences')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Guest Profiles</h2>
          <p className="text-slate-600">Manage guest preferences and personalized experiences</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'preferences'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('preferences')}
            >
              Guest Preferences
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enriched'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('enriched')}
            >
              Enriched Profiles
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'segments'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('segments')}
            >
              Guest Segments
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'personalization'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('personalization')}
            >
              Personalization Engine
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'preferences' && (
          <GuestPreferences />
        )}

        {activeTab === 'enriched' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Enriched Guest Profiles</h3>
              <div className="relative mt-2 md:mt-0">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white w-full md:w-64"
                  placeholder="Search guests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Guest Profile Card 1 */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold mr-4">
                    JS
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-slate-800">John Smith</h4>
                        <p className="text-slate-600 text-sm">Guest ID: 1001</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        VIP
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Business Traveler
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Frequent Guest
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Last Stay</p>
                    <p className="text-sm font-medium text-slate-800">Sep 15, 2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Stays</p>
                    <p className="text-sm font-medium text-slate-800">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Spend</p>
                    <p className="text-sm font-medium text-slate-800">$8,420</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Avg. Stay</p>
                    <p className="text-sm font-medium text-slate-800">2.8 nights</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Preferences</h5>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      High Floor
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Quiet Room
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Extra Towels
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Late Checkout
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Upcoming Stay</h5>
                  <p className="text-sm text-slate-600">Oct 5-8, 2023 (3 nights)</p>
                  <p className="text-sm text-slate-600">Room 1204 - Business Suite</p>
                </div>
              </div>

              {/* Guest Profile Card 2 */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold mr-4">
                    SJ
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-slate-800">Sarah Johnson</h4>
                        <p className="text-slate-600 text-sm">Guest ID: 1002</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Platinum
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Leisure Traveler
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Spa Enthusiast
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Last Stay</p>
                    <p className="text-sm font-medium text-slate-800">Sep 10, 2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Stays</p>
                    <p className="text-sm font-medium text-slate-800">8</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Spend</p>
                    <p className="text-sm font-medium text-slate-800">$12,750</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Avg. Stay</p>
                    <p className="text-sm font-medium text-slate-800">4.2 nights</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Preferences</h5>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Ocean View
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      No Nuts
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Spa Services
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Late Checkout
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Special Occasion</h5>
                  <p className="text-sm text-slate-600">Anniversary: Oct 18, 2023</p>
                  <p className="text-sm text-slate-600">Planning special celebration</p>
                </div>
              </div>

              {/* Guest Profile Card 3 */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold mr-4">
                    MB
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-slate-800">Michael Brown</h4>
                        <p className="text-slate-600 text-sm">Guest ID: 1003</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Gold
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Business Traveler
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Conference Attendee
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Last Stay</p>
                    <p className="text-sm font-medium text-slate-800">Sep 5, 2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Stays</p>
                    <p className="text-sm font-medium text-slate-800">15</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Spend</p>
                    <p className="text-sm font-medium text-slate-800">$6,320</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Avg. Stay</p>
                    <p className="text-sm font-medium text-slate-800">1.4 nights</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Preferences</h5>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Early Check-in
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Business Center
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Extra Power Outlets
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Communication</h5>
                  <p className="text-sm text-slate-600">Prefers email communication</p>
                  <p className="text-sm text-slate-600">Response within 2 hours preferred</p>
                </div>
              </div>

              {/* Guest Profile Card 4 */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold mr-4">
                    ED
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-slate-800">Emily Davis</h4>
                        <p className="text-slate-600 text-sm">Guest ID: 1004</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Platinum
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                        Family Traveler
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Child Friendly
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Last Stay</p>
                    <p className="text-sm font-medium text-slate-800">Aug 28, 2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Stays</p>
                    <p className="text-sm font-medium text-slate-800">6</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Spend</p>
                    <p className="text-sm font-medium text-slate-800">$4,890</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Avg. Stay</p>
                    <p className="text-sm font-medium text-slate-800">3.5 nights</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Preferences</h5>
                  <div className="flex flex-wrap gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Family Suite
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Kid's Menu
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Pool Access
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      Early Breakfast
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <h5 className="text-sm font-medium text-slate-800 mb-2">Family Details</h5>
                  <p className="text-sm text-slate-600">2 Adults, 1 Child (Age 7)</p>
                  <p className="text-sm text-slate-600">Child requires special bedding</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition duration-300">
                Load More Guests
              </button>
            </div>
          </div>
        )}

        {activeTab === 'segments' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Guest Segments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800">Business Travelers</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">Frequent business guests with specific needs</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">142 guests</span>
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">High Value</span>
                </div>
              </div>
              
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800">Leisure Travelers</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">Vacation guests seeking relaxation and experiences</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">328 guests</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Growing</span>
                </div>
              </div>
              
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800">VIP Guests</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">High-value guests with personalized service</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">27 guests</span>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Premium</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="text-md font-medium text-slate-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Personalization Tips
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
                <li>Business travelers prefer early check-in and late check-out options</li>
                <li>Leisure guests respond well to local experience recommendations</li>
                <li>VIP guests appreciate handwritten welcome notes and room upgrades</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'personalization' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Personalization Engine</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Personalization Triggers</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Anniversary Stay</p>
                        <p className="text-sm text-slate-600">Automatically send champagne and cake for guests celebrating special occasions</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-emerald-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Dietary Preferences</p>
                        <p className="text-sm text-slate-600">Pre-notify restaurants of guest dietary restrictions and preferences</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-amber-100 p-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">Room Temperature</p>
                        <p className="text-sm text-slate-600">Pre-adjust room temperature based on guest preferences (pending smart room integration)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Personalization Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Automated Welcome Messages</p>
                        <p className="text-sm text-slate-600">Send personalized welcome messages via email/SMS</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="welcomeToggle" id="welcomeToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="welcomeToggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Room Preparation</p>
                        <p className="text-sm text-slate-600">Pre-configure rooms based on guest preferences</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="roomPrepToggle" id="roomPrepToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="roomPrepToggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">Special Occasion Recognition</p>
                        <p className="text-sm text-slate-600">Automatically recognize and celebrate guest occasions</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="occasionToggle" id="occasionToggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                        <label htmlFor="occasionToggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Personalization Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Guest Satisfaction</span>
                        <span className="text-sm font-medium text-slate-700">94%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Repeat Guests</span>
                        <span className="text-sm font-medium text-slate-700">78%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Personalization Effectiveness</span>
                        <span className="text-sm font-medium text-slate-700">86%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Recommendations</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Add integration with guest booking system</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Implement machine learning for better predictions</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-slate-700">Add guest feedback collection system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}