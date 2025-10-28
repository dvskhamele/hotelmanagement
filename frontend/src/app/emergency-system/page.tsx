'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import EmergencyResponse from '../../components/EmergencyResponse'

export default function EmergencySystem() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('dashboard')

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
          <h2 className="text-2xl font-bold text-slate-800">Emergency Response System</h2>
          <p className="text-slate-600">Manage and respond to hotel emergencies</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Emergency Dashboard
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'protocols'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('protocols')}
            >
              Emergency Protocols
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'training'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('training')}
            >
              Training & Drills
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setActiveTab('contacts')}
            >
              Emergency Contacts
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <EmergencyResponse />
        )}

        {activeTab === 'protocols' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Emergency Protocols</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Fire Emergency Protocol</h4>
                  <div className="prose prose-slate max-w-none">
                    <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                      <li>Activate nearest fire alarm</li>
                      <li>Call emergency services (911) immediately</li>
                      <li>Evacuate guests using designated fire exits</li>
                      <li>Close all doors behind you to contain fire</li>
                      <li>Assemble at designated safe assembly point</li>
                      <li>Account for all guests and staff</li>
                      <li>Do not re-enter building until declared safe</li>
                    </ol>
                  </div>
                  
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h5 className="text-sm font-medium text-amber-800 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Important Notes
                    </h5>
                    <ul className="list-disc pl-5 space-y-1 text-amber-700 text-sm">
                      <li>Never use elevators during fire emergency</li>
                      <li>Feel doors with back of hand before opening</li>
                      <li>If trapped, stay low and signal for help</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Medical Emergency Protocol</h4>
                  <div className="prose prose-slate max-w-none">
                    <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                      <li>Assess the situation and ensure safety</li>
                      <li>Call emergency services (911) if life-threatening</li>
                      <li>Request hotel medical kit if available</li>
                      <li>Provide basic first aid if trained</li>
                      <li>Keep injured person calm and comfortable</li>
                      <li>Document incident details</li>
                      <li>Notify hotel management immediately</li>
                    </ol>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="text-sm font-medium text-blue-800 mb-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      Key Information
                    </h5>
                    <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
                      <li>Always prioritize your own safety</li>
                      <li>Do not move seriously injured persons unless in immediate danger</li>
                      <li>Keep emergency contact numbers readily available</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Security Emergency Protocol</h4>
                  <div className="prose prose-slate max-w-none">
                    <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                      <li>Remain calm and assess the threat</li>
                      <li>Contact security team immediately</li>
                      <li>Follow lockdown or evacuation procedures as directed</li>
                      <li>Protect guest and staff privacy</li>
                      <li>Coordinate with law enforcement when present</li>
                      <li>Document incident for insurance purposes</li>
                      <li>Provide support to affected individuals</li>
                    </ol>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Natural Disaster Protocol</h4>
                  <div className="prose prose-slate max-w-none">
                    <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                      <li>Monitor weather alerts and official communications</li>
                      <li>Secure outdoor furniture and loose objects</li>
                      <li>Move guests to interior rooms if necessary</li>
                      <li>Stock emergency supplies (water, food, flashlights)</li>
                      <li>Establish communication with emergency services</li>
                      <li>Follow evacuation orders if issued</li>
                      <li>Account for all guests and staff</li>
                    </ol>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-medium rounded-lg hover:from-slate-700 hover:to-slate-800 transition duration-300">
                      Download Full Protocol Manual
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Training & Drills</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Upcoming Drills</h4>
                  <div className="space-y-4">
                    <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-slate-800">Fire Drill</h5>
                        <span className="text-sm text-slate-600">Oct 15, 2023</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Full hotel evacuation drill</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Scheduled</span>
                        <button className="text-xs text-slate-600 hover:text-slate-800">View Details</button>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-slate-800">Medical Emergency Drill</h5>
                        <span className="text-sm text-slate-600">Nov 5, 2023</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">First aid and emergency response</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Scheduled</span>
                        <button className="text-xs text-slate-600 hover:text-slate-800">View Details</button>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-slate-800">Security Threat Drill</h5>
                        <span className="text-sm text-slate-600">Sep 28, 2023</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Lockdown and evacuation procedures</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">Completed</span>
                        <button className="text-xs text-slate-600 hover:text-slate-800">View Report</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Training Modules</h4>
                  <div className="space-y-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-slate-800">Basic First Aid</h5>
                        <span className="text-sm text-slate-600">45 min</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Essential first aid skills for hotel staff</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="w-3/4 bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <button className="text-xs text-teal-600 hover:text-teal-800 font-medium">Continue</button>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-slate-800">Emergency Communication</h5>
                        <span className="text-sm text-slate-600">30 min</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Effective communication during emergencies</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="w-3/4 bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <button className="text-xs text-teal-600 hover:text-teal-800 font-medium">Start</button>
                      </div>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-slate-800">Evacuation Procedures</h5>
                        <span className="text-sm text-slate-600">60 min</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Safe and efficient evacuation techniques</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="w-3/4 bg-slate-200 rounded-full h-2">
                          <div className="bg-slate-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <button className="text-xs text-teal-600 hover:text-teal-800 font-medium">Start</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Certification Tracking</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-emerald-800">CPR Certified</span>
                        <span className="text-xs text-emerald-700">Expires: Jun 2024</span>
                      </div>
                      <p className="text-xs text-emerald-600 mt-1">8 staff members certified</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-amber-800">First Aid Training</span>
                        <span className="text-xs text-amber-700">Expires: Dec 2023</span>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">12 staff members trained</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-slate-800">Fire Safety Certification</span>
                        <span className="text-xs text-slate-700">Expires: Feb 2024</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">5 staff members certified</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300">
                      Schedule Training Session
                    </button>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Drill Statistics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Average Evacuation Time</span>
                        <span className="text-sm font-medium text-slate-700">3.2 min</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Participation Rate</span>
                        <span className="text-sm font-medium text-slate-700">94%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">Protocol Adherence</span>
                        <span className="text-sm font-medium text-slate-700">87%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Emergency Contacts</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-4">Internal Contacts</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Extension</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Mobile</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Availability</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                                JS
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-slate-900">John Smith</div>
                                <div className="text-sm text-slate-500">General Manager</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">General Manager</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">1001</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">(555) 123-4567</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                              Available
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                                SD
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-slate-900">Sarah Davis</div>
                                <div className="text-sm text-slate-500">Security Director</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">Security Director</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">1002</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">(555) 123-4568</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                              Available
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-medium">
                                RW
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-slate-900">Robert Wilson</div>
                                <div className="text-sm text-slate-500">Head of Housekeeping</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">Head of Housekeeping</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">1003</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">(555) 123-4569</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                              On Duty
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-4">External Contacts</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Response Time</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">Police</div>
                            <div className="text-sm text-slate-500">Emergency Services</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">911</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">(555) 911</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-slate-700">Immediate</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">Fire Department</div>
                            <div className="text-sm text-slate-500">Emergency Services</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">911</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">(555) 911</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-slate-700">3-5 minutes</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">Hospital</div>
                            <div className="text-sm text-slate-500">St. Mary's Medical Center</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">ER: (555) 555-0199</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">Ambulance: (555) 555-0123</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-slate-700">5-10 minutes</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-slate-200 rounded-xl p-5 mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Quick Dial</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="mt-2 text-sm font-medium text-red-800">911</span>
                      <span className="text-xs text-red-600">Emergency</span>
                    </button>
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="mt-2 text-sm font-medium text-blue-800">Security</span>
                      <span className="text-xs text-blue-600">Ext. 1002</span>
                    </button>
                    <button className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="mt-2 text-sm font-medium text-emerald-800">Manager</span>
                      <span className="text-xs text-emerald-600">Ext. 1001</span>
                    </button>
                    <button className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="mt-2 text-sm font-medium text-amber-800">Front Desk</span>
                      <span className="text-xs text-amber-600">Ext. 1000</span>
                    </button>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Important Notes</h4>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Always verify identity before sharing contact information</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Update contact information quarterly</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Post emergency contact list in all staff areas</span>
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