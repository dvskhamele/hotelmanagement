'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import MobileNavigation from '../../components/MobileNavigation'
import apiService from '../../utils/apiService'

export default function AdvisoryDelivery() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [templateData, setTemplateData] = useState({})
  const [messagePreview, setMessagePreview] = useState('')
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [messageSent, setMessageSent] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/')
        return
      }

      // Mock user for prototype
      const mockUser = JSON.parse(localStorage.getItem('currentUser') || 
        JSON.stringify({ id: 3, email: 'analyst@advisorx.com', role: 'RESEARCH_ANALYST', name: 'Research Analyst' }))
      
      setUser(mockUser)

      // Load mock data
      loadTemplates()
      loadClients()
    }

    checkAuth()
    setLoading(false)
  }, [router])

  const loadTemplates = () => {
    // Mock templates data
    const mockTemplates = [
      {
        id: 1,
        name: 'Intraday Buy Call',
        body: 'Buy {Stock_Name} at {Entry_Price}. Target: {Target_Price}. SL: {Stop_Loss}.',
        placeholders: ['Stock_Name', 'Entry_Price', 'Target_Price', 'Stop_Loss']
      },
      {
        id: 2,
        name: 'Intraday Sell Call',
        body: 'Sell {Stock_Name} at {Entry_Price}. Target: {Target_Price}. SL: {Stop_Loss}.',
        placeholders: ['Stock_Name', 'Entry_Price', 'Target_Price', 'Stop_Loss']
      },
      {
        id: 3,
        name: 'Positional Call',
        body: 'Add {Stock_Name} to portfolio at {Entry_Price}. Target: {Target_Price}. Timeframe: {Timeframe}.',
        placeholders: ['Stock_Name', 'Entry_Price', 'Target_Price', 'Timeframe']
      }
    ]
    setTemplates(mockTemplates)
  }

  const loadClients = () => {
    // Mock clients data
    const mockClients = [
      { id: 1, fullName: 'Rahul Sharma', prospectId: 'CLI123456789', status: 'ACTIVE_CLIENT' },
      { id: 2, fullName: 'Priya Patel', prospectId: 'CLI987654321', status: 'ACTIVE_CLIENT' },
      { id: 3, fullName: 'Amit Kumar', prospectId: 'CLI456789123', status: 'ACTIVE_CLIENT' }
    ]
    setClients(mockClients)
  }

  const handleTemplateChange = (e) => {
    const templateId = parseInt(e.target.value)
    setSelectedTemplate(templateId)
    
    // Reset template data when template changes
    setTemplateData({})
    setMessagePreview('')
    
    // Update preview with placeholders if a template is selected
    if (templateId) {
      const template = templates.find(t => t.id === templateId)
      if (template) {
        setMessagePreview(template.body)
      }
    }
  }

  const handleTemplateDataChange = (placeholder, value) => {
    setTemplateData(prev => ({
      ...prev,
      [placeholder]: value
    }))
  }

  // Update message preview when template data changes
  useEffect(() => {
    if (selectedTemplate && Object.keys(templateData).length > 0) {
      const template = templates.find(t => t.id === selectedTemplate)
      if (template) {
        let updatedPreview = template.body
        
        // Replace placeholders with actual values
        Object.entries(templateData).forEach(([key, value]) => {
          const placeholder = `{${key}}`
          updatedPreview = updatedPreview.replace(new RegExp(placeholder, 'g'), value)
        })
        
        // Add SEBI compliance footer
        updatedPreview += '\n\n---\nThis is a research recommendation from Galaxy Research (SEBI RA Registration No: INM000012345). Please read the Risk Disclosure Document. Past performance does not guarantee future returns. This is not an offer to buy or sell securities. Consult your investment advisor before making investment decisions.'
        
        setMessagePreview(updatedPreview)
      }
    }
  }, [templateData, selectedTemplate, templates])

  const handleSendAdvisory = async () => {
    if (!selectedTemplate || !selectedClient) {
      alert('Please select both a template and a client')
      return
    }

    if (Object.keys(templateData).length === 0) {
      alert('Please fill in the template fields')
      return
    }

    setSending(true)
    
    try {
      // Simulate sending advisory message
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessageSent(true)
      alert('Advisory message sent successfully!')
      
      // Reset form
      setSelectedTemplate('')
      setSelectedClient('')
      setTemplateData({})
      setMessagePreview('')
    } catch (err) {
      alert('Failed to send advisory message. Please try again.')
    } finally {
      setSending(false)
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
          <p className="mt-4 text-slate-600">Loading advisory delivery module...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Advisory Delivery Module</h1>
          <p className="text-slate-600">Send research advisories to your clients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Template Selection and Input */}
          <div className="space-y-8">
            {/* Section 3.1: Select Message Template */}
            <div className="bg-white rounded-2xl shadow-md p-6 card">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Send New Advisory</h2>
              
              {/* Select Message Template Dropdown */}
              <div className="mb-6">
                <div className="relative group">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Message Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={handleTemplateChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                  >
                    <option value="">Choose a template</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute top-full left-0 mt-1 w-64 px-3 py-2 text-xs text-white bg-black bg-opacity-90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="text-xs font-semibold text-teal-300 mb-1">SEBI Compliance Info:</div>
                    <div className="text-xs">Why Can't I Type My Own Message?</div>
                    <div className="text-xs mt-1">To ensure 100% compliance, we can only send messages from pre-approved templates. This prevents accidental use of prohibited words like 'guaranteed return' or 'risk-free profit,' which are strictly forbidden by SEBI.</div>
                    <div className="absolute top-0 left-4 transform -translate-y-1/2 border-4 border-transparent border-b-black border-opacity-90"></div>
                  </div>
                </div>
              </div>

              {/* Template Input Fields - only show if a template is selected */}
              {selectedTemplate && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Template Fields</h3>
                  
                  {(() => {
                    const template = templates.find(t => t.id === selectedTemplate)
                    if (!template) return null
                    
                    return template.placeholders.map(placeholder => (
                      <div key={placeholder} className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {placeholder.replace(/_/g, ' ')}
                        </label>
                        <input
                          type="text"
                          value={templateData[placeholder] || ''}
                          onChange={(e) => handleTemplateDataChange(placeholder, e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                          placeholder={`Enter ${placeholder.replace(/_/g, ' ').toLowerCase()}`}
                        />
                      </div>
                    ))
                  })()}
                </div>
              )}

              {/* Client Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Client
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                >
                  <option value="">Choose a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.fullName} ({client.prospectId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendAdvisory}
                disabled={sending || !selectedTemplate || !selectedClient || Object.keys(templateData).length === 0}
                className={`w-full py-3 px-4 rounded-lg transition ${
                  sending || !selectedTemplate || !selectedClient || Object.keys(templateData).length === 0
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {sending ? 'Sending...' : 'Send Advisory Message'}
              </button>

              {messageSent && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  Message sent successfully!
                </div>
              )}
            </div>

            {/* Template Manager - for Admin/Compliance Officer */}
            {user?.role === 'ADMIN' || user?.role === 'COMPLIANCE_OFFICER' ? (
              <div className="bg-white rounded-2xl shadow-md p-6 card">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Template Manager</h2>
                
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/admin/templates')}
                    className="w-full bg-slate-100 text-slate-800 py-3 px-4 rounded-lg hover:bg-slate-200 transition"
                  >
                    Manage Message Templates
                  </button>
                  
                  <button
                    onClick={() => router.push('/admin/reports')}
                    className="w-full bg-slate-100 text-slate-800 py-3 px-4 rounded-lg hover:bg-slate-200 transition"
                  >
                    Compliance Reports
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Column - Message Preview */}
          <div>
            {/* Section 3.1: Message Preview */}
            <div className="bg-white rounded-2xl shadow-md p-6 card">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Message Preview</h2>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-48">
                {messagePreview ? (
                  <div className="whitespace-pre-wrap text-slate-800">
                    {messagePreview}
                  </div>
                ) : (
                  <div className="text-slate-500 italic">
                    Preview of your advisory message will appear here after you select a template and fill in the fields.
                  </div>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-amber-800 text-sm">
                      The compliance footer shown above is automatically added to all messages and cannot be edited.
                      It includes the firm's name, SEBI RA Registration number, and risk disclaimers as required by SEBI.
                    </p>
                    <p className="text-amber-800 text-sm mt-1">
                      <strong>SEBI Compliance Info:</strong> The Mandatory SEBI Footer - SEBI requires that every single recommendation we send includes our company name, SEBI Registration Number, and a risk disclaimer. This system adds it automatically to every message, so you don't have to worry about it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Advisories */}
            <div className="bg-white rounded-2xl shadow-md p-6 card mt-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Advisories</h2>
              
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">Buy INFY at 1500</h3>
                    <span className="text-sm text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Sent to 24 clients</p>
                  <div className="flex mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      Delivered
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      WhatsApp
                    </span>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">Sell TCS at 3200</h3>
                    <span className="text-sm text-slate-500">1 day ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Sent to 18 clients</p>
                  <div className="flex mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      Delivered
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      WhatsApp
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNavigation />
    </div>
  )
}