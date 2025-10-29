'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import Header from '../../../components/Header'
import MobileNavigation from '../../../components/MobileNavigation'
import apiService from '../../../utils/apiService'

export default function ClientOnboardingWizard() {
  const router = useRouter()
  const params = useParams()
  const [step, setStep] = useState(1)
  const [clientData, setClientData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    panNumber: '',
    kycStatus: 'PENDING',
    kycVerificationDate: null,
    agreementStatus: 'PENDING',
    paymentStatus: 'PENDING',
  })
  const [kycResult, setKycResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Load client data if we have a client ID
    if (params.id) {
      loadClientData(params.id)
    }
  }, [params.id])

  const loadClientData = async (clientId: any) => {
    try {
      // For prototype, use mock data
      const mockClient = {
        id: parseInt(clientId),
        prospectId: `CLI${Date.now()}`,
        fullName: 'Rahul Sharma',
        mobileNumber: '+91 9876543210',
        email: 'rahul@example.com',
        panNumber: '',
        kycStatus: 'PENDING',
        agreementStatus: 'PENDING',
        paymentStatus: 'PENDING',
        kycVerificationDate: null,      }
      setClientData(mockClient)
    } catch (err) {
      setError('Failed to load client data as any)     
      console.error('Error loading client data:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClientData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Section 2.1: Step 1 - Basic Details
  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8 card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Basic Details</h2>
          <div className="text-xs text-slate-500 bg-amber-50 p-2 rounded border border-amber-200 max-w-xs">
            <div className="font-semibold text-amber-800">SEBI Compliance Info:</div>
            <div>Why PAN is Mandatory: As per SEBI, the client's PAN is the unique identifier for all their records. We must use this to perform the mandatory KYC check in the next step.</div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name as per PAN Card
            </label>
            <input
              type="text"
              name="fullName"
              value={clientData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={clientData.mobileNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              placeholder="Enter mobile number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={clientData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              PAN Card Number
            </label>
            <input
              type="text"
              name="panNumber"
              value={clientData.panNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              placeholder="Enter PAN number"
            />
            <p className="text-xs text-slate-500 mt-1">Mandatory field</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setStep(2)}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
          >
            Next: KYC Verification
          </button>
        </div>
      </div>
    </div>
  )

  // Section 2.2: Step 2 - Automated KYC Verification
  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8 card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">KYC Verification</h2>
          <div className="text-xs text-slate-500 bg-blue-50 p-2 rounded border border-blue-200 max-w-xs">
            <div className="font-semibold text-blue-800">SEBI Compliance Info:</div>
            <div>What is KYC? (Know Your Client): SEBI makes it compulsory for us to verify every client's identity and address before we can offer them any services. This process is called KYC. It helps prevent fraud and ensures all investors are genuine.</div>
          </div>
        </div>
        
        <div className="text-center py-8">
          <button
            onClick={handleKYCCheck}
            disabled={loading}
            className="bg-teal-600 text-white px-8 py-4 rounded-xl hover:bg-teal-700 transition text-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Checking KYC Status...' : 'Check KYC Status'}
          </button>
        </div>
        
        {kycResult && (
          <div className={`mt-6 p-6 rounded-xl ${getStatusBgColor(kycResult.status)}`}>
            <div className="flex flex-col items-center">
              {getStatusIcon(kycResult.status)}
              <h3 className={`text-2xl font-bold mt-4 ${getStatusTitleColor(kycResult.status)}`}>
                {kycResult.status}
              </h3>
              <p className="text-slate-600 mt-2 text-center">
                {kycResult.message}
              </p>
              {kycResult.reason && (
                <p className="text-slate-600 mt-2 text-center">
                  Reason: {kycResult.reason}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(1)}
            className="bg-slate-200 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-300 transition"
          >
            Previous
          </button>
          <button
            onClick={() => kycResult?.canProceed ? setStep(3) : null}
            disabled={!kycResult || !kycResult.canProceed}
            className={`px-6 py-3 rounded-lg transition ${
              kycResult?.canProceed 
                ? 'bg-teal-600 text-white hover:bg-teal-700' 
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
          >
            Next: Agreement & Consent
          </button>
        </div>
      </div>
    </div>
  )

  // Section 2.3: Step 3 - Client Agreement & Consent
  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8 card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Agreement & Consent</h2>
          <div className="text-xs text-slate-500 bg-green-50 p-2 rounded border border-green-200 max-w-xs">
            <div className="font-semibold text-green-800">SEBI Compliance Info:</div>
            <div>The Rule of 'Agreement First': SEBI mandates that we must have a legally signed agreement with a client before we can charge any fees or provide any services. This agreement includes the Most Important Terms and Conditions (MITC), which clearly explains our services, fees, and the fact that we do not offer guaranteed returns.</div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl mb-6">
          <h3 className="font-semibold text-slate-800 mb-3">Standard Advisory Agreement</h3>
          <p className="text-slate-600 text-sm">
            This agreement includes the latest SEBI-standardized "Most Important Terms and Conditions" (MITC) 
            for Research Analysts and a separate clause for explicit opt-in consent to receive advisory 
            messages on WhatsApp/Telegram.
          </p>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(2)}
            className="bg-slate-200 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-300 transition"
          >
            Previous
          </button>
          <button
            onClick={handleSendAgreement}
            disabled={loading}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending Agreement...' : 'Send Agreement on WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  )

  // Section 2.4: Step 4 - Subscription Payment
  const renderStep4 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8 card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Subscription Payment</h2>
          <div className="text-xs text-slate-500 bg-purple-50 p-2 rounded border border-purple-200 max-w-xs">
            <div className="font-semibold text-purple-800">SEBI Compliance Info:</div>
            <div>SEBI's Rules on Fees: 1. No Cash: We are only allowed to accept payments through official banking channels like UPI, Net Banking, or Cheque. This system ensures we follow that rule. 2. Fee Limits: Our subscription plans are configured to stay within the maximum fee limit set by SEBI for Research Analysts.</div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Subscription Plan
          </label>
          <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white">
            <option value="">Select a plan</option>
            <option value="basic">Basic Plan - ₹2,999/month</option>
            <option value="premium">Premium Plan - ₹4,999/month</option>
            <option value="elite">Elite Plan - ₹7,999/month</option>
          </select>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(3)}
            className="bg-slate-200 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-300 transition"
          >
            Previous
          </button>
          <button
            onClick={handleSendPaymentLink}
            disabled={loading}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
          >
            {loading ? 'Sending Payment Link...' : 'Send Payment Link on WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  )

  const handleKYCCheck = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call to KYC verification service
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For prototype, return mock results
      const mockResults = [
        {
          status: 'KYC VERIFIED',
          message: 'Client\'s KYC is verified and valid. You can proceed.',
          canProceed: true
        },
        {
          status: 'KYC REGISTERED',
          message: 'Client\'s KYC is old. Please ask the client to check their Aadhaar-linked mobile for an OTP to re-validate.',
          canProceed: false
        },
        {
          status: 'KYC ON-HOLD',
          message: 'Client\'s KYC is on hold.',
          reason: 'Missing documents',
          canProceed: false
        }
      ]
      
      // Randomly select a result for demo
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setKycResult(randomResult)
    } catch (err) {
      setError('Failed to verify KYC. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendAgreement = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate sending agreement
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update client agreement status
      setClientData(prev => ({
        ...prev,
        agreementStatus: 'SENT'
      }))
      
      alert('Agreement sent successfully! Please wait for client to sign.')
      setStep(4)
    } catch (err) {
      setError('Failed to send agreement. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendPaymentLink = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate sending payment link
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update client payment status
      setClientData(prev => ({
        ...prev,
        paymentStatus: 'SENT'
      }))
      
      alert('Payment link sent successfully! Please wait for payment confirmation.')
      
      // Complete onboarding
      setTimeout(() => {
        router.push('/telecaller-dashboard')
      }, 1000)
    } catch (err) {
      setError('Failed to send payment link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBgColor = (status) => {
    if (status.includes('VERIFIED')) return 'bg-green-100'
    if (status.includes('REGISTERED')) return 'bg-yellow-100'
    if (status.includes('ON-HOLD') || status.includes('REJECTED')) return 'bg-red-100'
    return 'bg-slate-100'
  }

  const getStatusTitleColor = (status) => {
    if (status.includes('VERIFIED')) return 'text-green-800'
    if (status.includes('REGISTERED')) return 'text-yellow-800'
    if (status.includes('ON-HOLD') || status.includes('REJECTED')) return 'text-red-800'
    return 'text-slate-800'
  }

  const getStatusIcon = (status) => {
    if (status.includes('VERIFIED')) {
      return (
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )
    } else if (status.includes('REGISTERED')) {
      return (
        <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      )
    } else {
      return (
        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
      )
    }
  }

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === s 
              ? 'bg-teal-600 text-white' 
              : s < step 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-200 text-slate-600'
          }`}>
            {s}
          </div>
          {s < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              s < step ? 'bg-green-500' : 'bg-slate-200'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  )

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      default: return renderStep1()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        user={{ name: 'Onboarding Agent', role: 'ONBOARDING_AGENT' }} 
        onLogout={() => router.push('/')} 
      />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="text-teal-600 hover:text-teal-800 flex items-center mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-slate-800">Client Onboarding Wizard</h1>
          <p className="text-slate-600">Complete the onboarding process for your client</p>
        </div>

        {renderStepIndicator()}
        
        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        {renderCurrentStep()}
      </main>

      <MobileNavigation />
    </div>
  )
}