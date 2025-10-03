'use client'

import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'

interface WorkloadData {
  date: string
  actual: number
  predicted: number
}

interface StaffRecommendation {
  date: string
  recommendedStaff: number
  currentStaff: number
}

const HousekeepingAnalytics: React.FC = () => {
  const [workloadData, setWorkloadData] = useState<WorkloadData[]>([])
  const [staffRecommendations, setStaffRecommendations] = useState<StaffRecommendation[]>([])
  const [timeRange, setTimeRange] = useState('7d')

  // Generate mock data for demonstration
  useEffect(() => {
    // Generate workload data (actual vs predicted)
    const workload: WorkloadData[] = []
    const recommendations: StaffRecommendation[] = []
    
    const days = timeRange === '7d' ? 7 : 30
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Generate realistic data with some variance
      const actual = Math.floor(Math.random() * 30) + 20 // 20-50 rooms
      const predicted = actual + Math.floor(Math.random() * 10) - 5 // Predicted with some variance
      
      workload.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        actual,
        predicted: Math.max(0, predicted) // Ensure non-negative
      })
      
      // Generate staff recommendations
      const currentStaff = 8 // Fixed current staff count
      const recommendedStaff = Math.max(5, Math.min(15, Math.floor(predicted / 6))) // Recommendation based on workload
      
      recommendations.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        recommendedStaff,
        currentStaff
      })
    }
    
    setWorkloadData(workload)
    setStaffRecommendations(recommendations)
  }, [timeRange])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Housekeeping Workload Analytics</h2>
        <div className="flex space-x-2">
          <button 
            className={`text-xs px-3 py-1 rounded-full ${timeRange === '7d' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
            onClick={() => setTimeRange('7d')}
          >
            7D
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full ${timeRange === '30d' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
            onClick={() => setTimeRange('30d')}
          >
            30D
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload Prediction Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Room Cleaning Workload</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={workloadData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Rooms', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [value, 'Rooms']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Bar dataKey="actual" name="Actual Cleaned" fill="#0d9488" />
                <Bar dataKey="predicted" name="Predicted Workload" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Staffing Recommendations Chart */}
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Staffing Recommendations</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={staffRecommendations}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'Staff Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [value, 'Staff']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="recommendedStaff" 
                  name="Recommended Staff" 
                  stroke="#0d9488" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="currentStaff" 
                  name="Current Staff" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Insights Panel */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-medium text-slate-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Predictive Insights
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          <li>Based on occupancy forecasts, you may need 2 additional staff members next week</li>
          <li>Friday typically has 25% higher workload than other weekdays</li>
          <li>Consider pre-allocating staff for high-occupancy weekends</li>
        </ul>
      </div>
    </div>
  )
}

export default HousekeepingAnalytics