'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'

export default function Reports() {
  const [reports, setReports] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFormat, setSelectedFormat] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [timeRange, setTimeRange] = useState('7d')
  const [reportFormat, setReportFormat] = useState('pdf')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock data for prototype
    const mockReports = [
      {
        id: 1,
        title: 'Daily Operations Report',
        description: 'Comprehensive overview of daily hotel operations',
        category: 'Operations',
        lastGenerated: new Date(Date.now() - 86400000).toISOString(),
        schedule: 'Daily',
        format: 'PDF',
        size: '2.4 MB',
        downloads: 124
      },
      {
        id: 2,
        title: 'Weekly Performance Analysis',
        description: 'Detailed analysis of department performance and KPIs',
        category: 'Performance',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        schedule: 'Weekly',
        format: 'Excel',
        size: '5.1 MB',
        downloads: 87
      },
      {
        id: 3,
        title: 'Monthly Financial Summary',
        description: 'Revenue, expenses, and profitability analysis',
        category: 'Financial',
        lastGenerated: new Date(Date.now() - 2592000000).toISOString(),
        schedule: 'Monthly',
        format: 'PDF',
        size: '3.8 MB',
        downloads: 42
      },
      {
        id: 4,
        title: 'Guest Satisfaction Report',
        description: 'Analysis of guest feedback and satisfaction metrics',
        category: 'Guest Experience',
        lastGenerated: new Date(Date.now() - 1209600000).toISOString(),
        schedule: 'Bi-weekly',
        format: 'Excel',
        size: '4.2 MB',
        downloads: 65
      },
      {
        id: 5,
        title: 'Staff Performance Dashboard',
        description: 'Individual and team performance metrics',
        category: 'HR',
        lastGenerated: new Date(Date.now() - 172800000).toISOString(),
        schedule: 'Daily',
        format: 'PDF',
        size: '1.9 MB',
        downloads: 93
      },
      {
        id: 6,
        title: 'Inventory Consumption Report',
        description: 'Tracking of inventory usage and reorder recommendations',
        category: 'Operations',
        lastGenerated: new Date(Date.now() - 2592000000).toISOString(),
        schedule: 'Monthly',
        format: 'Excel',
        size: '3.1 MB',
        downloads: 38
      }
    ]
    
    setReports(mockReports)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const generateReport = async (reportId: number) => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      // In a real app, this would generate the actual report
      alert(`Report "${reports.find((r: any) => r.id === reportId)?.title}" generated successfully!`)
      setIsGenerating(false)
      setShowGenerateModal(false)
    }, 2000)
  }

  const downloadReport = (reportId: number) => {
    alert(`Downloading report ${reportId}...`)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Operations':
        return 'bg-blue-100 text-blue-800'
      case 'Performance':
        return 'bg-emerald-100 text-emerald-800'
      case 'Financial':
        return 'bg-amber-100 text-amber-800'
      case 'Guest Experience':
        return 'bg-purple-100 text-purple-800'
      case 'HR':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getFormatIcon = (format: string) => {
    if (format === 'PDF') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      )
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Reports & Analytics</h2>
            <p className="text-slate-600">Generate and manage comprehensive hotel reports</p>
          </div>
          <div className="flex space-x-2">
            <button 
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
              onClick={() => setSelectedReport('new')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Custom Report
            </button>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition duration-300">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-800">Operations</h3>
            <p className="text-sm text-slate-600 mt-1">6 reports</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition duration-300">
            <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-800">Performance</h3>
            <p className="text-sm text-slate-600 mt-1">4 reports</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition duration-300">
            <div className="bg-amber-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-800">Financial</h3>
            <p className="text-sm text-slate-600 mt-1">5 reports</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition duration-300">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-800">Guest Experience</h3>
            <p className="text-sm text-slate-600 mt-1">3 reports</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition duration-300">
            <div className="bg-rose-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-800">HR</h3>
            <p className="text-sm text-slate-600 mt-1">4 reports</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition duration-300">
            <div className="bg-slate-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="font-medium text-slate-800">Inventory</h3>
            <p className="text-sm text-slate-600 mt-1">2 reports</p>
          </div>
        </div>

        {/* Report List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800">Available Reports</h3>
            <div className="flex space-x-2">
              <select
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <select
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value)}
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Generated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Downloads</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          {getFormatIcon(report.format)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{report.title}</div>
                          <div className="text-sm text-slate-500">{report.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(report.category)}`}>
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(report.lastGenerated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {report.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {report.format}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {report.downloads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => generateReport(report.id)}
                          className="text-teal-600 hover:text-teal-900 flex items-center"
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          )}
                          Regenerate
                        </button>
                        <button
                          onClick={() => downloadReport(report.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Generation Form */}
        {selectedReport === 'new' && (
          <div className="mt-8 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Create Custom Report</h3>
              <button 
                className="text-slate-400 hover:text-slate-600"
                onClick={() => setSelectedReport(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reportTitle" className="block text-sm font-medium text-slate-700 mb-1">Report Title</label>
                  <input
                    type="text"
                    id="reportTitle"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter report title"
                  />
                </div>
                <div>
                  <label htmlFor="reportCategory" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    id="reportCategory"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select category</option>
                    <option value="operations">Operations</option>
                    <option value="performance">Performance</option>
                    <option value="financial">Financial</option>
                    <option value="guest_experience">Guest Experience</option>
                    <option value="hr">HR</option>
                    <option value="inventory">Inventory</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="reportDescription" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  id="reportDescription"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter report description"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="reportFormat" className="block text-sm font-medium text-slate-700 mb-1">Format</label>
                  <select
                    id="reportFormat"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={reportFormat}
                    onChange={(e) => setReportFormat(e.target.value)}
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reportSchedule" className="block text-sm font-medium text-slate-700 mb-1">Schedule</label>
                  <select
                    id="reportSchedule"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">No schedule</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reportRecipients" className="block text-sm font-medium text-slate-700 mb-1">Recipients</label>
                  <input
                    type="text"
                    id="reportRecipients"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Email addresses (comma separated)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data Sources</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {['Rooms', 'Requests', 'Staff', 'Inventory', 'Guests', 'Finances', 'Analytics', 'Departments'].map((source) => (
                    <div key={source} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`source-${source}`}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                      />
                      <label htmlFor={`source-${source}`} className="ml-2 text-sm text-slate-700">
                        {source}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                  onClick={() => setSelectedReport(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Analytics Dashboard Preview */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Analytics Dashboard Preview</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Full Dashboard</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Guest Satisfaction</h4>
              </div>
              <p className="text-2xl font-bold text-blue-700 mt-2">92%</p>
              <p className="text-sm text-blue-600">↑ 3% from last month</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Response Time</h4>
              </div>
              <p className="text-2xl font-bold text-emerald-700 mt-2">28 min</p>
              <p className="text-sm text-emerald-600">↓ 5 min from last month</p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-amber-800">Completion Rate</h4>
              </div>
              <p className="text-2xl font-bold text-amber-700 mt-2">96%</p>
              <p className="text-sm text-amber-600">↑ 2% from last month</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}