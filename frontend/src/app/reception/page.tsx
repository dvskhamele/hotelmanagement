'use client'

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function Reception() {
  const [user, setUser] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [checkInForm, setCheckInForm] = useState({
    patientName: '',
    patientId: '',
    doctor: '',
    appointmentTime: '',
    reason: ''
  });
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  useEffect(() => {
    // Mock data for reception dashboard
    const mockPatients = [
      { id: 'P001', name: 'John Smith', status: 'Checked In', checkInTime: '09:15 AM', waitingFor: 'Dr. Johnson', priority: 'Normal' },
      { id: 'P002', name: 'Sarah Williams', status: 'Waiting', checkInTime: '09:30 AM', waitingFor: 'Dr. Chen', priority: 'High' },
      { id: 'P003', name: 'Robert Brown', status: 'In Consultation', checkInTime: '09:00 AM', waitingFor: 'Dr. Davis', priority: 'Normal' },
      { id: 'P004', name: 'Emily Johnson', status: 'Completed', checkInTime: '08:45 AM', waitingFor: 'Dr. Wilson', priority: 'Normal' },
      { id: 'P005', name: 'Michael Lee', status: 'Waiting', checkInTime: '09:45 AM', waitingFor: 'Dr. Taylor', priority: 'Low' },
    ];

    const mockAppointments = [
      { id: 'A001', patientName: 'John Smith', doctor: 'Dr. Johnson', time: '10:00 AM', status: 'Upcoming' },
      { id: 'A002', patientName: 'Sarah Williams', doctor: 'Dr. Chen', time: '10:30 AM', status: 'Upcoming' },
      { id: 'A003', patientName: 'Robert Brown', doctor: 'Dr. Davis', time: '09:15 AM', status: 'In Progress' },
      { id: 'A004', patientName: 'Lisa Miller', doctor: 'Dr. Wilson', time: '11:00 AM', status: 'Scheduled' },
    ];

    setPatients(mockPatients);
    setAppointments(mockAppointments);
    
    // Set mock user
    setUser({ name: 'Admin User', role: 'ADMIN' });
  }, []);

  const handleCheckIn = () => {
    // In a real application, this would make an API call
    const newPatient = {
      id: `P${patients.length + 1}`,
      name: checkInForm.patientName,
      status: 'Checked In',
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      waitingFor: checkInForm.doctor,
      priority: 'Normal' // default priority
    };

    setPatients([...patients, newPatient]);
    
    // Reset form
    setCheckInForm({
      patientName: '',
      patientId: '',
      doctor: '',
      appointmentTime: '',
      reason: ''
    });
    setShowCheckInModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // Filter patients by status
  const checkedInPatients = patients.filter(p => p.status === 'Checked In');
  const waitingPatients = patients.filter(p => p.status === 'Waiting');
  const consultationPatients = patients.filter(p => p.status === 'In Consultation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Reception Dashboard</h2>
          <p className="text-slate-600">Manage patient check-ins, appointments, and front desk operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{patients.length}</p>
            <p className="text-sm text-blue-600">Total Patients</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-yellow-500">
            <p className="text-2xl font-bold text-yellow-700">{waitingPatients.length}</p>
            <p className="text-sm text-yellow-600">Waiting</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{consultationPatients.length}</p>
            <p className="text-sm text-emerald-600">In Consultation</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{appointments.filter(a => a.status === 'Upcoming').length}</p>
            <p className="text-sm text-amber-600">Upcoming Appointments</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md"
            onClick={() => setShowCheckInModal(true)}
          >
            Patient Check-In
          </button>
          <button className="bg-white text-slate-700 border border-slate-300 py-2 px-4 rounded-lg hover:bg-slate-50 transition duration-300 shadow">
            Patient Lookup
          </button>
          <button className="bg-white text-slate-700 border border-slate-300 py-2 px-4 rounded-lg hover:bg-slate-50 transition duration-300 shadow">
            Appointment Booking
          </button>
        </div>

        {/* Patient Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Waiting Queue */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Waiting Queue</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {waitingPatients.length} patients
              </span>
            </div>
            <div className="space-y-3">
              {waitingPatients.map((patient) => (
                <div key={patient.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{patient.name}</p>
                      <p className="text-sm text-slate-600">ID: {patient.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{patient.checkInTime}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        patient.priority === 'High' ? 'bg-rose-100 text-rose-800' : 
                        patient.priority === 'Normal' ? 'bg-amber-100 text-amber-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {patient.priority}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Waiting for: {patient.waitingFor}
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="text-xs bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600">
                      Call
                    </button>
                    <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checked In */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Checked In</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {checkedInPatients.length} patients
              </span>
            </div>
            <div className="space-y-3">
              {checkedInPatients.map((patient) => (
                <div key={patient.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{patient.name}</p>
                      <p className="text-sm text-slate-600">ID: {patient.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{patient.checkInTime}</p>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Checked In
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Waiting for: {patient.waitingFor}
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="text-xs bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600">
                      Move to Wait
                    </button>
                    <button className="text-xs bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600">
                      Consult
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Consultation */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-800">In Consultation</h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {consultationPatients.length} patients
              </span>
            </div>
            <div className="space-y-3">
              {consultationPatients.map((patient) => (
                <div key={patient.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{patient.name}</p>
                      <p className="text-sm text-slate-600">ID: {patient.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{patient.checkInTime}</p>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        In Consultation
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    With: {patient.waitingFor}
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="text-xs bg-rose-500 text-white px-2 py-1 rounded hover:bg-rose-600">
                      Complete
                    </button>
                    <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                      Revisit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Today's Appointments</h3>
            <span className="text-sm text-slate-600">{appointments.length} appointments</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{appointment.patientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{appointment.doctor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'In Progress' ? 'bg-emerald-100 text-emerald-800' :
                        appointment.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex space-x-2">
                        <button className="text-teal-600 hover:text-teal-900">Check In</button>
                        <button className="text-slate-600 hover:text-slate-900">Details</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Check In Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Patient Check-In</h3>
              <button 
                onClick={() => setShowCheckInModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    placeholder="Enter patient name"
                    value={checkInForm.patientName}
                    onChange={(e) => setCheckInForm({...checkInForm, patientName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient ID</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    placeholder="Enter patient ID (optional)"
                    value={checkInForm.patientId}
                    onChange={(e) => setCheckInForm({...checkInForm, patientId: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Doctor</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    value={checkInForm.doctor}
                    onChange={(e) => setCheckInForm({...checkInForm, doctor: e.target.value})}
                  >
                    <option value="">Select doctor</option>
                    <option value="Dr. Johnson">Dr. Johnson</option>
                    <option value="Dr. Chen">Dr. Chen</option>
                    <option value="Dr. Davis">Dr. Davis</option>
                    <option value="Dr. Wilson">Dr. Wilson</option>
                    <option value="Dr. Taylor">Dr. Taylor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    value={checkInForm.appointmentTime}
                    onChange={(e) => setCheckInForm({...checkInForm, appointmentTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    placeholder="Enter reason for visit"
                    rows={3}
                    value={checkInForm.reason}
                    onChange={(e) => setCheckInForm({...checkInForm, reason: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowCheckInModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleCheckIn}
              >
                Check In Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}