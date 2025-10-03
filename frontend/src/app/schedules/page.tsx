'use client'

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function Schedules() {
  const [user, setUser] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState('doctors');
  const [schedules, setSchedules] = useState<any[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    role: '',
    date: '',
    startTime: '',
    endTime: '',
    department: '',
    breakTime: '',
    status: 'Active'
  });

  // Mock data for schedules
  useEffect(() => {
    const mockSchedules = [
      {
        id: 1,
        name: 'Dr. Alice Johnson',
        role: 'Cardiologist',
        date: '2023-09-30',
        startTime: '09:00',
        endTime: '17:00',
        department: 'Cardiology',
        breakTime: '12:00-13:00',
        status: 'Active',
        type: 'doctor'
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        role: 'Pediatrician',
        date: '2023-09-30',
        startTime: '08:00',
        endTime: '16:00',
        department: 'Pediatrics',
        breakTime: '12:00-13:00',
        status: 'Active',
        type: 'doctor'
      },
      {
        id: 3,
        name: 'Nurse Sarah Miller',
        role: 'Registered Nurse',
        date: '2023-09-30',
        startTime: '07:00',
        endTime: '15:00',
        department: 'Emergency',
        breakTime: '11:00-11:15',
        status: 'Active',
        type: 'nurse'
      },
      {
        id: 4,
        name: 'Dr. David Wilson',
        role: 'Surgeon',
        date: '2023-09-30',
        startTime: '10:00',
        endTime: '18:00',
        department: 'Surgery',
        breakTime: '13:00-14:00',
        status: 'Active',
        type: 'doctor'
      },
      {
        id: 5,
        name: 'Nurse Jennifer Brown',
        role: 'RN',
        date: '2023-09-30',
        startTime: '15:00',
        endTime: '23:00',
        department: 'ICU',
        breakTime: '18:00-18:30',
        status: 'Active',
        type: 'nurse'
      },
      {
        id: 6,
        name: 'Dr. Emily Davis',
        role: 'Dermatologist',
        date: '2023-09-30',
        startTime: '11:00',
        endTime: '19:00',
        department: 'Dermatology',
        breakTime: '14:00-15:00',
        status: 'Active',
        type: 'doctor'
      }
    ];

    setSchedules(mockSchedules);

    // Set mock user
    setUser({ name: 'Admin User', role: 'ADMIN' });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleScheduleSubmit = () => {
    const scheduleToAdd = {
      id: schedules.length + 1,
      ...newSchedule,
      type: newSchedule.role.includes('Nurse') ? 'nurse' : 'doctor'
    };

    setSchedules([...schedules, scheduleToAdd]);
    
    // Reset form
    setNewSchedule({
      name: '',
      role: '',
      date: '',
      startTime: '',
      endTime: '',
      department: '',
      breakTime: '',
      status: 'Active'
    });
    setShowScheduleModal(false);
  };

  const filteredSchedules = schedules.filter(sched => {
    if (selectedTab === 'doctors') return sched.type === 'doctor';
    if (selectedTab === 'nurses') return sched.type === 'nurse';
    if (selectedTab === 'interns') return sched.role.toLowerCase().includes('intern');
    return true; // all
  });

  // Group by department
  const schedulesByDepartment = filteredSchedules.reduce((acc, sched) => {
    if (!acc[sched.department]) {
      acc[sched.department] = [];
    }
    acc[sched.department].push(sched);
    return acc;
  }, {} as any);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Staff Schedules</h2>
          <p className="text-slate-600">Manage doctor, nurse, and staff schedules across departments</p>
        </div>

        {/* Tabs for filtering */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${selectedTab === 'doctors' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setSelectedTab('doctors')}
          >
            Doctors
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${selectedTab === 'nurses' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setSelectedTab('nurses')}
          >
            Nurses
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${selectedTab === 'interns' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setSelectedTab('interns')}
          >
            Interns
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${selectedTab === 'all' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setSelectedTab('all')}
          >
            All Staff
          </button>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex space-x-3">
            <button className="bg-white text-slate-700 border border-slate-300 py-2 px-4 rounded-lg hover:bg-slate-50 transition duration-300 shadow">
              Today
            </button>
            <button className="bg-white text-slate-700 border border-slate-300 py-2 px-4 rounded-lg hover:bg-slate-50 transition duration-300 shadow">
              This Week
            </button>
            <button className="bg-white text-slate-700 border border-slate-300 py-2 px-4 rounded-lg hover:bg-slate-50 transition duration-300 shadow">
              This Month
            </button>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowScheduleModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Schedule Staff
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-teal-500">
            <p className="text-2xl font-bold text-teal-700">{schedules.filter(s => s.type === 'doctor').length}</p>
            <p className="text-sm text-teal-600">Total Doctors</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{schedules.filter(s => s.type === 'nurse').length}</p>
            <p className="text-sm text-blue-600">Total Nurses</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-purple-500">
            <p className="text-2xl font-bold text-purple-700">{schedules.filter(s => s.role.toLowerCase().includes('intern')).length}</p>
            <p className="text-sm text-purple-600">Total Interns</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{filteredSchedules.filter(s => s.status === 'Active').length}</p>
            <p className="text-sm text-amber-600">Active Today</p>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-8">
          {Object.entries(schedulesByDepartment).map(([dept, deptSchedules]) => (
            <div key={dept} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800 capitalize">{dept} Department</h3>
                <span className="text-sm text-slate-600">{(deptSchedules as any[]).length} staff members</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(deptSchedules as any[]).map((schedule) => (
                  <div key={schedule.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-800">{schedule.name}</h4>
                        <p className="text-sm text-slate-600">{schedule.role}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        schedule.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {schedule.status}
                      </span>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-500">Date</p>
                        <p className="text-sm font-medium text-slate-800">{schedule.date}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-500">Time</p>
                        <p className="text-sm font-medium text-slate-800">{schedule.startTime} - {schedule.endTime}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-500">Break</p>
                        <p className="text-sm font-medium text-slate-800">{schedule.breakTime}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-500">Type</p>
                        <p className="text-sm font-medium text-slate-800 capitalize">{schedule.type}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between">
                      <button className="text-sm text-slate-600 hover:text-teal-600 font-medium">
                        View Details
                      </button>
                      <div className="flex space-x-2">
                        <button className="text-slate-600 hover:text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-slate-600 hover:text-rose-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Schedule Staff Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Schedule Staff Member</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Staff Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    placeholder="Enter staff name"
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    value={newSchedule.role}
                    onChange={(e) => setNewSchedule({...newSchedule, role: e.target.value})}
                  >
                    <option value="">Select role</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Surgeon">Surgeon</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Registered Nurse">Registered Nurse</option>
                    <option value="RN">RN</option>
                    <option value="Intern Doctor">Intern Doctor</option>
                    <option value="Intern Nurse">Intern Nurse</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                      value={newSchedule.date}
                      onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                      value={newSchedule.department}
                      onChange={(e) => setNewSchedule({...newSchedule, department: e.target.value})}
                    >
                      <option value="">Select department</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Emergency">Emergency</option>
                      <option value="ICU">ICU</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="General Medicine">General Medicine</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                      value={newSchedule.startTime}
                      onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                      value={newSchedule.endTime}
                      onChange={(e) => setNewSchedule({...newSchedule, endTime: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Break Time</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    placeholder="e.g., 12:00-13:00"
                    value={newSchedule.breakTime}
                    onChange={(e) => setNewSchedule({...newSchedule, breakTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    value={newSchedule.status}
                    onChange={(e) => setNewSchedule({...newSchedule, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowScheduleModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleScheduleSubmit}
              >
                Add Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}