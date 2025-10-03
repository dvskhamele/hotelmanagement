'use client'

import React, { useState } from 'react'

interface StaffMember {
  id: number
  name: string
  department: string
  performance: number
  requestsCompleted: number
  avgResponseTime: number
  badges: string[]
}

const StaffLeaderboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  
  // Mock data for staff performance
  const staffData: StaffMember[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      department: 'Housekeeping',
      performance: 96,
      requestsCompleted: 42,
      avgResponseTime: 18,
      badges: ['Speed Demon', 'Perfect Score']
    },
    {
      id: 2,
      name: 'Bob Smith',
      department: 'Maintenance',
      performance: 92,
      requestsCompleted: 38,
      avgResponseTime: 25,
      badges: ['Problem Solver']
    },
    {
      id: 3,
      name: 'Carol Davis',
      department: 'Housekeeping',
      performance: 94,
      requestsCompleted: 45,
      avgResponseTime: 15,
      badges: ['Early Bird', 'Team Player']
    },
    {
      id: 4,
      name: 'David Wilson',
      department: 'Food & Beverage',
      performance: 89,
      requestsCompleted: 35,
      avgResponseTime: 22,
      badges: ['Customer Favorite']
    },
    {
      id: 5,
      name: 'Eva Brown',
      department: 'Maintenance',
      performance: 91,
      requestsCompleted: 32,
      avgResponseTime: 28,
      badges: ['Attention to Detail']
    }
  ]

  // Filter staff by department
  const filteredStaff = selectedDepartment === 'all' 
    ? staffData 
    : staffData.filter(staff => staff.department === selectedDepartment)

  // Sort staff by performance
  const sortedStaff = [...filteredStaff].sort((a, b) => b.performance - a.performance)

  // Get unique departments
  const departments = Array.from(new Set(staffData.map(staff => staff.department)))

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Staff Performance Leaderboard</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <select
            className="text-sm px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
            <button 
              className={`text-xs px-2 py-1 rounded ${timeRange === 'day' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}
              onClick={() => setTimeRange('day')}
            >
              Day
            </button>
            <button 
              className={`text-xs px-2 py-1 rounded ${timeRange === 'week' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`text-xs px-2 py-1 rounded ${timeRange === 'month' ? 'bg-white text-teal-600 shadow' : 'text-slate-600'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Requests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Badges</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedStaff.map((staff, index) => (
              <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium text-slate-900">#{index + 1}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{staff.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{staff.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                    {staff.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-slate-900">{staff.performance}%</div>
                    <div className="ml-2 w-24 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                        style={{ width: `${staff.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {staff.requestsCompleted}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-900">{staff.avgResponseTime} min</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {staff.badges.map((badge, badgeIndex) => (
                      <span 
                        key={badgeIndex} 
                        className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Achievement Badges Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-800 mb-2">Achievement Badges</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Speed Demon - Completed 10+ requests in under 20 min</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Perfect Score - 95%+ performance for 3 consecutive days</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Problem Solver - Resolved 5+ maintenance requests</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Early Bird - First to complete 5 requests each day</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Team Player - Helped 3+ colleagues with tasks</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Customer Favorite - 10+ positive guest feedbacks</span>
          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Attention to Detail - 0 complaints in 10+ tasks</span>
        </div>
      </div>
    </div>
  )
}

export default StaffLeaderboard