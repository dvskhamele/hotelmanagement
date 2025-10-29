'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import apiService from '../../utils/apiService'

export default function ComplianceReports() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [reportType, setReportType] = useState('sebi-audit')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [generating, setGenerating] = useState(false)
  const [auditLogs, setAuditLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      if (!token || (user && (user as any).role !== 'ADMIN' && (user as any).role !== 'COMPLIANCE_OFFICER')) {
        router.push('/')
        return
      }

      // Mock user for prototype
      const mockUser = JSON.parse(localStorage.getItem('currentUser') || 
        JSON.stringify({ id: 4, email: 'compliance@advisorx.com', role: 'COMPLIANCE_OFFICER', name: 'Compliance Officer' }))
      
      setUser(mockUser)

      // Load mock audit logs
      loadAuditLogs()
    }

    checkAuth()
    setLoading(false)
  }, [router, user])

  const loadAuditLogs = () => {
    // Mock audit logs data
    const mockLogs = [
      {
        id: 1,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        userId: 2,
        userRole: 'ONBOARDING_AGENT',
        actionType: 'USER_LOGIN',
        actionDetails: 'User logged in to system',
        ipAddress: '192.168.1.100'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        userId: 5,
        userRole: 'ONBOARDING_AGENT',
        clientId: 1,
        actionType: 'CLIENT_PROFILE_VIEW',
        actionDetails: 'User viewed client profile',
        ipAddress: '192.168.1.101'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        userId: 3,
        userRole: 'RESEARCH_ANALYST',
        clientId: 1,
        actionType: 'MESSAGE_SENT',
        actionDetails: 'User sent WHATSAPP using template \'Intraday Buy Call\'',
        ipAddress: '192.168.1.102'
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        userId: 1,
        userRole: 'ADMIN',
        actionType: 'REPORT_GENERATED',
        actionDetails: 'User generated SEBI_AUDIT report for 2023-01-01 to 2023-01-31',
        ipAddress: '192.168.1.1'
      },
      {
        id: 5,
        timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        userId: 4,
        userRole: 'COMPLIANCE_OFFICER',
        clientId: 2,
        actionType: 'KYC_CHECK',
        actionDetails: 'User performed KYC verification',
        ipAddress: '192.168.1.103'
      }
    ]
    setAuditLogs(mockLogs as any)
  }

  const handleGenerateReport = async () => {
    if (!dateRange.from || !dateRange.to) {
      alert('Please select both start and end dates')
      return
    }

    setGenerating(true)
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert(`Report generated successfully! Report type: ${reportType}, Date range: ${dateRange.from} to ${dateRange.to}`)
    } catch (err) {
      alert('Failed to generate report. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading compliance reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Compliance & Audits</h1>
          <p className="text-slate-600">SEBI audit reports and compliance monitoring</p>
        </div>

        {/* Section 4.1: Compliance & Audits Page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* One-Click SEBI Audit Report */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">SEBI Audit Report</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              >
                <option value="sebi-audit">SEBI Full Audit Report</option>
                <option value="client-communications">Client Communications Log</option>
                <option value="kyc-verification">KYC Verification Log</option>
                <option value="advisory-delivery">Advisory Delivery Log</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">From</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">To</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className={`w-full py-3 px-4 rounded-lg transition ${
                generating 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {generating ? 'Generating Report...' : 'Generate & Download Full Audit Archive'}
            </button>
          </div>

          {/* Monthly Complaints Report */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Monthly Complaints Report</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month & Year
              </label>
              <input
                type="month"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Complaints Received
              </label>
              <input
                type="number"
                placeholder="Enter number of complaints"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              />
            </div>

            <button className="w-full bg-slate-100 text-slate-800 py-3 px-4 rounded-lg hover:bg-slate-200 transition">
              Generate Monthly Complaints Report
            </button>
          </div>
        </div>

        {/* Recent Audit Logs */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Audit Logs</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {auditLogs.map((log) => (
                  <tr key={(log as any).id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date((log as any).timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      User {(log as any).userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {(log as any).userRole}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {(log as any).actionType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs">
                      {(log as any).actionDetails}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
              View All Audit Logs
            </button>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}