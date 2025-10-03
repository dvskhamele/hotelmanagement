'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Analytics() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [responseTimeStats, setResponseTimeStats] = useState<any>({})
  const [productivityStats, setProductivityStats] = useState<any>({})
  const [requestTrends, setRequestTrends] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchAnalyticsData()
    }
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      
      // Mock data for prototype
      const mockResponseTimeStats = {
        averageResponseTime: 32,
        responseTimeTrend: [
          { date: '2023-05-01', responseTime: 35 },
          { date: '2023-05-02', responseTime: 30 },
          { date: '2023-05-03', responseTime: 32 },
          { date: '2023-05-04', responseTime: 28 },
          { date: '2023-05-05', responseTime: 34 },
          { date: '2023-05-06', responseTime: 31 },
          { date: '2023-05-07', responseTime: 33 }
        ],
        departmentResponseTimes: [
          { department: 'Housekeeping', averageTime: 28 },
          { department: 'Maintenance', averageTime: 45 },
          { department: 'Food & Beverage', averageTime: 22 },
          { department: 'Front Office', averageTime: 18 }
        ]
      }
      
      const mockProductivityStats = {
        overallProductivity: 87,
        departmentProductivity: [
          { department: 'Housekeeping', productivity: 92 },
          { department: 'Maintenance', productivity: 87 },
          { department: 'Food & Beverage', productivity: 95 },
          { department: 'Front Office', productivity: 89 }
        ],
        topPerformers: [
          { name: 'Alice Johnson', department: 'Housekeeping', productivity: 96 },
          { name: 'Mike Thompson', department: 'Food & Beverage', productivity: 94 },
          { name: 'Robert Wilson', department: 'Maintenance', productivity: 91 }
        ],
        productivityTrend: [
          { date: '2023-05-01', productivity: 85 },
          { date: '2023-05-02', productivity: 86 },
          { date: '2023-05-03', productivity: 88 },
          { date: '2023-05-04', productivity: 87 },
          { date: '2023-05-05', productivity: 89 },
          { date: '2023-05-06', productivity: 88 },
          { date: '2023-05-07', productivity: 90 }
        ]
      }
      
      const mockRequestTrends = {
        totalRequests: 124,
        requestTypes: [
          { type: 'Housekeeping', count: 45, percentage: 36 },
          { type: 'Maintenance', count: 28, percentage: 23 },
          { type: 'Food & Beverage', count: 32, percentage: 26 },
          { type: 'Front Office', count: 19, percentage: 15 }
        ],
        peakRequestTimes: [
          { hour: '08:00', count: 12 },
          { hour: '09:00', count: 18 },
          { hour: '10:00', count: 22 },
          { hour: '11:00', count: 15 },
          { hour: '12:00', count: 8 },
          { hour: '13:00', count: 6 },
          { hour: '14:00', count: 10 },
          { hour: '15:00', count: 14 },
          { hour: '16:00', count: 19 }
        ],
        requestStatusDistribution: [
          { status: 'PENDING', count: 12, percentage: 10 },
          { status: 'IN_PROGRESS', count: 8, percentage: 6 },
          { status: 'COMPLETED', count: 104, percentage: 84 }
        ]
      }
      
      setResponseTimeStats(mockResponseTimeStats)
      setProductivityStats(mockProductivityStats)
      setRequestTrends(mockRequestTrends)
      
      setError('')
    } catch (err) {
      console.error('Error fetching analytics data:', err)
      setError('Failed to fetch analytics data')
    } finally {
      setLoading(false)
    }
  }

  const exportReport = () => {
    // In a real implementation, this would call the export API
    // For prototype, we'll just show a message
    alert('Report exported successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Analytics & Reporting</h2>
            <p className="text-slate-600">Insights into hotel operations performance</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-6 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={exportReport}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export Report
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow p-2 mb-6">
          <div className="flex space-x-1">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-teal-100 text-teal-800'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'response-times'
                  ? 'bg-teal-100 text-teal-800'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
              onClick={() => setActiveTab('response-times')}
            >
              Response Times
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'productivity'
                  ? 'bg-teal-100 text-teal-800'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
              onClick={() => setActiveTab('productivity')}
            >
              Productivity
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'trends'
                  ? 'bg-teal-100 text-teal-800'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
              onClick={() => setActiveTab('trends')}
            >
              Request Trends
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-teal-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg. Response Time</p>
                    <p className="text-3xl font-bold text-teal-600">{responseTimeStats.averageResponseTime} min</p>
                  </div>
                  <div className="p-3 bg-teal-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Overall Productivity</p>
                    <p className="text-3xl font-bold text-blue-600">{productivityStats.overallProductivity}%</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Requests</p>
                    <p className="text-3xl font-bold text-amber-600">{requestTrends.totalRequests}</p>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completion Rate</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {requestTrends.requestStatusDistribution 
                        ? Math.round(requestTrends.requestStatusDistribution.find((s: any) => s.status === 'COMPLETED')?.percentage || 0) 
                        : 0}%
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Response Time Trend */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Response Time Trend</h3>
                <div className="h-64 flex items-end space-x-2">
                  {responseTimeStats.responseTimeTrend?.map((point: any, index: number) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-md"
                        style={{ height: `${(point.responseTime / 50) * 100}%` }}
                      ></div>
                      <span className="text-xs text-slate-500 mt-2">{point.date.split('-')[2]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Productivity Trend */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Productivity Trend</h3>
                <div className="h-64 flex items-end space-x-2">
                  {productivityStats.productivityTrend?.map((point: any, index: number) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md"
                        style={{ height: `${point.productivity}%` }}
                      ></div>
                      <span className="text-xs text-slate-500 mt-2">{point.date.split('-')[2]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Response Times Tab */}
        {activeTab === 'response-times' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Average Response Time by Department</h3>
              <div className="space-y-4">
                {responseTimeStats.departmentResponseTimes?.map((dept: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-slate-800">{dept.department}</h4>
                      <span className="text-lg font-bold text-slate-800">{dept.averageTime} min</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                        style={{ width: `${(dept.averageTime / 60) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Productivity Tab */}
        {activeTab === 'productivity' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Department Productivity</h3>
                <div className="space-y-4">
                  {productivityStats.departmentProductivity?.map((dept: any, index: number) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-slate-800">{dept.department}</h4>
                        <span className="text-lg font-bold text-slate-800">{dept.productivity}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" 
                          style={{ width: `${dept.productivity}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {productivityStats.topPerformers?.map((performer: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-medium">{performer.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{performer.name}</div>
                          <div className="text-sm text-slate-500">{performer.department}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-slate-800">{performer.productivity}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Request Types Distribution</h3>
                <div className="space-y-4">
                  {requestTrends.requestTypes?.map((type: any, index: number) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-slate-800">{type.type}</h4>
                        <span className="text-lg font-bold text-slate-800">{type.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full" 
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{type.count} requests</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Peak Request Times</h3>
                <div className="h-64 flex items-end space-x-2">
                  {requestTrends.peakRequestTimes?.map((time: any, index: number) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-md"
                        style={{ height: `${(time.count / 25) * 100}%` }}
                      ></div>
                      <span className="text-xs text-slate-500 mt-2">{time.hour}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Request Status Distribution</h3>
              <div className="flex justify-center">
                <div className="w-64 h-64 relative">
                  {requestTrends.requestStatusDistribution && (
                    <>
                      {/* PENDING - 10% (36 degrees) */}
                      <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 61.8% 11.8%)' }}></div>
                      
                      {/* IN_PROGRESS - 6% (21.6 degrees) */}
                      <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: 'polygon(50% 50%, 61.8% 11.8%, 70.7% 29.3%)' }}></div>
                      
                      {/* COMPLETED - 84% (302.4 degrees) */}
                      <div className="absolute inset-0 rounded-full border-8 border-emerald-500" style={{ clipPath: 'polygon(50% 50%, 70.7% 29.3%, 50% 100%)' }}></div>
                    </>
                  )}
                  <div className="absolute inset-8 rounded-full bg-white"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-800">{requestTrends.totalRequests}</span>
                    <span className="text-sm text-slate-600">Total Requests</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 space-x-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm text-slate-600">
                    Pending ({requestTrends.requestStatusDistribution?.find((s: any) => s.status === 'PENDING')?.percentage || 0}%)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-slate-600">
                    In Progress ({requestTrends.requestStatusDistribution?.find((s: any) => s.status === 'IN_PROGRESS')?.percentage || 0}%)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-sm text-slate-600">
                    Completed ({requestTrends.requestStatusDistribution?.find((s: any) => s.status === 'COMPLETED')?.percentage || 0}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}