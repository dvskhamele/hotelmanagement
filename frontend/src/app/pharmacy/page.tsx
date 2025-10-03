'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Pharmacy() {
  const [medicines, setMedicines] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ total: 0, inStock: 0, lowStock: 0, outOfStock: 0, expired: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null)
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    genericName: '',
    category: 'Tablet',
    dosageForm: '',
    strength: '',
    manufacturer: '',
    quantity: 0,
    minStock: 10,
    price: 0,
    expiryDate: new Date().toISOString().split('T')[0],
    batchNumber: '',
    rackLocation: '',
    supplier: '',
    reorderLevel: 20
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchMedicines()
    }
  }, [])

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      
      // Mock data for hospital pharmacy management
      const mockMedicines = [
        { id: 1, name: 'Paracetamol 500mg', genericName: 'Acetaminophen', category: 'Tablet', dosageForm: 'Tablet', strength: '500mg', manufacturer: 'Medico Labs', quantity: 1500, minStock: 200, reorderLevel: 300, price: 0.50, expiryDate: '2025-12-31', batchNumber: 'PAR20231201', rackLocation: 'Rack-A-01', supplier: 'Pharma Distributors Inc.', lastOrdered: '2023-09-15', daysToExpiry: 730 },
        { id: 2, name: 'Amoxicillin 500mg', genericName: 'Amoxicillin', category: 'Capsule', dosageForm: 'Capsule', strength: '500mg', manufacturer: 'Antibiotic Solutions', quantity: 850, minStock: 150, reorderLevel: 200, price: 1.20, expiryDate: '2024-06-30', batchNumber: 'AMX20230615', rackLocation: 'Rack-B-05', supplier: 'Generic Pharma Ltd.', lastOrdered: '2023-08-20', daysToExpiry: 212 },
        { id: 3, name: 'Ibuprofen 400mg', genericName: 'Ibuprofen', category: 'Tablet', dosageForm: 'Tablet', strength: '400mg', manufacturer: 'Pain Relief Corp', quantity: 1200, minStock: 100, reorderLevel: 150, price: 0.75, expiryDate: '2025-03-15', batchNumber: 'IBU20230301', rackLocation: 'Rack-A-12', supplier: 'MediSupply Co.', lastOrdered: '2023-09-01', daysToExpiry: 379 },
        { id: 4, name: 'Omeprazole 20mg', genericName: 'Omeprazole', category: 'Capsule', dosageForm: 'Capsule', strength: '20mg', manufacturer: 'GI Health Ltd', quantity: 650, minStock: 100, reorderLevel: 150, price: 2.10, expiryDate: '2024-09-30', batchNumber: 'OMP20230910', rackLocation: 'Rack-C-08', supplier: 'Digestive Care Inc.', lastOrdered: '2023-08-25', daysToExpiry: 273 },
        { id: 5, name: 'Atorvastatin 10mg', genericName: 'Atorvastatin', category: 'Tablet', dosageForm: 'Tablet', strength: '10mg', manufacturer: 'Cardio Health Inc', quantity: 920, minStock: 120, reorderLevel: 180, price: 1.80, expiryDate: '2025-01-20', batchNumber: 'ATV20230105', rackLocation: 'Rack-A-22', supplier: 'Cholesterol Control Ltd', lastOrdered: '2023-07-30', daysToExpiry: 324 },
        { id: 6, name: 'Cetirizine 10mg', genericName: 'Cetirizine', category: 'Tablet', dosageForm: 'Tablet', strength: '10mg', manufacturer: 'Allergy Relief Co', quantity: 1100, minStock: 150, reorderLevel: 200, price: 0.90, expiryDate: '2024-11-30', batchNumber: 'CTR20231101', rackLocation: 'Rack-B-15', supplier: 'Allergy Solutions Ltd', lastOrdered: '2023-08-10', daysToExpiry: 456 },
        { id: 7, name: 'Metformin 500mg', genericName: 'Metformin', category: 'Tablet', dosageForm: 'Tablet', strength: '500mg', manufacturer: 'Diabetes Care Inc', quantity: 780, minStock: 100, reorderLevel: 150, price: 0.65, expiryDate: '2025-04-30', batchNumber: 'MTF20230415', rackLocation: 'Rack-A-07', supplier: 'EndoPharma Supply', lastOrdered: '2023-08-20', daysToExpiry: 455 },
        { id: 8, name: 'Losartan 50mg', genericName: 'Losartan', category: 'Tablet', dosageForm: 'Tablet', strength: '50mg', manufacturer: 'Blood Pressure Control', quantity: 550, minStock: 80, reorderLevel: 120, price: 1.50, expiryDate: '2024-08-31', batchNumber: 'LSR20230801', rackLocation: 'Rack-D-03', supplier: 'Cardio Solutions Ltd', lastOrdered: '2023-09-05', daysToExpiry: 244 },
        { id: 9, name: 'Levothyroxine 50mcg', genericName: 'Levothyroxine', category: 'Tablet', dosageForm: 'Tablet', strength: '50mcg', manufacturer: 'Thyroid Health Inc', quantity: 420, minStock: 60, reorderLevel: 100, price: 1.10, expiryDate: '2025-02-28', batchNumber: 'LVTH20230201', rackLocation: 'Rack-E-11', supplier: 'Endocrine Solutions', lastOrdered: '2023-07-15', daysToExpiry: 394 },
        { id: 10, name: 'Albuterol Inhaler', genericName: 'Albuterol', category: 'Inhaler', dosageForm: 'Metered Dose Inhaler', strength: '90 mcg/actuation', manufacturer: 'RespCare Inc', quantity: 180, minStock: 30, reorderLevel: 50, price: 25.00, expiryDate: '2024-12-31', batchNumber: 'ALB20231201', rackLocation: 'Rack-F-02', supplier: 'RespCare Supply', lastOrdered: '2023-09-01', daysToExpiry: 730 },
        { id: 11, name: 'Insulin Glargine 100IU/ml', genericName: 'Insulin Glargine', category: 'Injection', dosageForm: 'Solution for Injection', strength: '100IU/ml', manufacturer: 'Diabetes Solutions', quantity: 95, minStock: 25, reorderLevel: 40, price: 15.50, expiryDate: '2024-07-31', batchNumber: 'INS20230701', rackLocation: 'Refrigerator-R01', supplier: 'Diabetes Care Inc', lastOrdered: '2023-08-28', daysToExpiry: 182 },
        { id: 12, name: 'Aspirin 81mg', genericName: 'Aspirin', category: 'Tablet', dosageForm: 'Tablet', strength: '81mg', manufacturer: 'Cardio Health Inc', quantity: 2500, minStock: 300, reorderLevel: 500, price: 0.15, expiryDate: '2025-05-31', batchNumber: 'ASP20230501', rackLocation: 'Rack-A-03', supplier: 'Cardio Solutions Ltd', lastOrdered: '2023-08-25', daysToExpiry: 486 },
        { id: 13, name: 'Lisinopril 10mg', genericName: 'Lisinopril', category: 'Tablet', dosageForm: 'Tablet', strength: '10mg', manufacturer: 'Blood Pressure Control', quantity: 1800, minStock: 200, reorderLevel: 300, price: 0.45, expiryDate: '2024-10-31', batchNumber: 'LSP20231001', rackLocation: 'Rack-A-05', supplier: 'Hypertension Solutions', lastOrdered: '2023-08-15', daysToExpiry: 304 },
        { id: 14, name: 'Montelukast 10mg', genericName: 'Montelukast', category: 'Tablet', dosageForm: 'Tablet', strength: '10mg', manufacturer: 'Asthma Care Inc', quantity: 1100, minStock: 150, reorderLevel: 200, price: 1.25, expiryDate: '2025-03-31', batchNumber: 'MTLK20230301', rackLocation: 'Rack-B-07', supplier: 'Respiratory Solutions', lastOrdered: '2023-08-10', daysToExpiry: 425 },
        { id: 15, name: 'Diazepam 5mg', genericName: 'Diazepam', category: 'Tablet', dosageForm: 'Tablet', strength: '5mg', manufacturer: 'Nervous System Care', quantity: 750, minStock: 100, reorderLevel: 150, price: 0.80, expiryDate: '2024-05-31', batchNumber: 'DZP20230501', rackLocation: 'Controlled Substances-CS01', supplier: 'Neuro Solutions', lastOrdered: '2023-07-20', daysToExpiry: 152 }
      ];
      
      setMedicines(mockMedicines);
      
      // Calculate stats
      const total = mockMedicines.length;
      const inStock = mockMedicines.filter(m => m.quantity > m.minStock).length;
      const lowStock = mockMedicines.filter(m => m.quantity <= m.minStock && m.quantity > 0).length;
      const outOfStock = mockMedicines.filter(m => m.quantity === 0).length;
      const expired = mockMedicines.filter(m => new Date(m.expiryDate) < new Date()).length;
      
      setStats({ total, inStock, lowStock, outOfStock, expired });
    } catch (err) {
      console.error('Error fetching medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (quantity: number, minStock: number, expiryDate: string) => {
    const expDate = new Date(expiryDate);
    const today = new Date();
    
    // Check if expired
    if (expDate < today) {
      return 'bg-rose-100 text-rose-800'
    }
    
    // Check stock level
    if (quantity === 0) {
      return 'bg-gray-100 text-gray-800'
    } else if (quantity <= minStock) {
      return 'bg-amber-100 text-amber-800'
    } else {
      return 'bg-emerald-100 text-emerald-800'
    }
  }

  const getStatusText = (quantity: number, minStock: number, expiryDate: string) => {
    const expDate = new Date(expiryDate);
    const today = new Date();
    
    // Check if expired
    if (expDate < today) {
      return 'Expired'
    }
    
    // Check stock level
    if (quantity === 0) {
      return 'Out of Stock'
    } else if (quantity <= minStock) {
      return 'Low Stock'
    } else {
      return 'In Stock'
    }
  }

  // Filter medicines based on selected category, status, and search term
  const filteredMedicines = medicines.filter(medicine => {
    const categoryMatch = selectedCategory ? medicine.category === selectedCategory : true
    const statusMatch = selectedStatus 
      ? (selectedStatus === 'expired' ? new Date(medicine.expiryDate) < new Date() :
         selectedStatus === 'lowStock' ? medicine.quantity <= medicine.minStock && medicine.quantity > 0 :
         selectedStatus === 'outOfStock' ? medicine.quantity === 0 :
         selectedStatus === 'inStock' ? medicine.quantity > medicine.minStock && new Date(medicine.expiryDate) >= new Date() :
         true)
      : true
    const searchMatch = searchTerm 
      ? medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.batchNumber.includes(searchTerm)
      : true
    return categoryMatch && statusMatch && searchMatch
  })

  // Sort medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(medicines.map(m => m.category)))

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddMedicine = () => {
    const newId = medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1
    const medicineToAdd = {
      ...newMedicine,
      id: newId,
      daysToExpiry: Math.floor((new Date(newMedicine.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    }
    
    setMedicines([...medicines, medicineToAdd])
    
    // Update stats
    const total = medicines.length + 1;
    const inStock = medicineToAdd.quantity > medicineToAdd.minStock && new Date(medicineToAdd.expiryDate) >= new Date() ? stats.inStock + 1 : stats.inStock;
    const lowStock = medicineToAdd.quantity <= medicineToAdd.minStock && medicineToAdd.quantity > 0 ? stats.lowStock + 1 : stats.lowStock;
    const outOfStock = medicineToAdd.quantity === 0 ? stats.outOfStock + 1 : stats.outOfStock;
    const expired = new Date(medicineToAdd.expiryDate) < new Date() ? stats.expired + 1 : stats.expired;
    
    setStats({ total, inStock, lowStock, outOfStock, expired })
    
    // Reset form and close modal
    setNewMedicine({
      name: '',
      genericName: '',
      category: 'Tablet',
      dosageForm: '',
      strength: '',
      manufacturer: '',
      quantity: 0,
      minStock: 10,
      price: 0,
      expiryDate: new Date().toISOString().split('T')[0],
      batchNumber: '',
      rackLocation: '',
      supplier: '',
      reorderLevel: 20
    })
    setShowAddMedicineModal(false)
  }

  const openOrderModal = (medicine: any) => {
    setSelectedMedicine(medicine)
    setShowOrderModal(true)
  }

  // Function to calculate expiration status
  const getExpirationStatus = (expiryDate: string) => {
    const expDate = new Date(expiryDate);
    const today = new Date();
    const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Expired', class: 'text-rose-600 font-bold' };
    } else if (diffDays <= 30) {
      return { text: `${diffDays} days`, class: 'text-amber-600 font-medium' };
    } else if (diffDays <= 90) {
      return { text: `${diffDays} days`, class: 'text-blue-600' };
    } else {
      return { text: `${Math.floor(diffDays/30)} months`, class: 'text-emerald-600' };
    }
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
            <h2 className="text-2xl font-bold text-slate-800">Pharmacy Management System</h2>
            <p className="text-slate-600">Manage hospital pharmacy inventory, medications, and drug supplies</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddMedicineModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Medicine
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Medicines</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.inStock}</p>
            <p className="text-sm text-emerald-600">In Stock</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.lowStock}</p>
            <p className="text-sm text-amber-600">Low Stock</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-4 text-center border-l-4 border-gray-500">
            <p className="text-2xl font-bold text-gray-700">{stats.outOfStock}</p>
            <p className="text-sm text-gray-600">Out of Stock</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.expired}</p>
            <p className="text-sm text-rose-600">Expired</p>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Medicine, manufacturer, or batch"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="categoryFilter" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                id="categoryFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category: string) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                id="statusFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="inStock">In Stock</option>
                <option value="lowStock">Low Stock</option>
                <option value="outOfStock">Out of Stock</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="genericName">Generic Name</option>
                <option value="category">Category</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="quantity">Quantity</option>
                <option value="price">Price</option>
                <option value="expiryDate">Expiry Date</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedCategory('')
                  setSelectedStatus('')
                  setSearchTerm('')
                  setSortBy('name')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Medicine Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Medicine Inventory</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Sort:</span>
              <button 
                className={`text-xs px-2 py-1 rounded ${sortOrder === 'asc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('asc')}
              >
                Asc
              </button>
              <button 
                className={`text-xs px-2 py-1 rounded ${sortOrder === 'desc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('desc')}
              >
                Desc
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMedicines.map((medicine) => (
              <div 
                key={medicine.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-teal-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{medicine.name}</h4>
                    <p className="text-sm text-slate-600">{medicine.genericName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(medicine.quantity, medicine.minStock, medicine.expiryDate)}`}>
                    {getStatusText(medicine.quantity, medicine.minStock, medicine.expiryDate)}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="text-sm font-medium text-slate-800">{medicine.category}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Strength</p>
                    <p className="text-sm font-medium text-slate-800">{medicine.strength}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Manufacturer</p>
                    <p className="text-sm font-medium text-slate-800">{medicine.manufacturer}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm font-medium text-slate-800">{medicine.rackLocation}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Stock</span>
                    <span className="text-sm font-bold text-slate-800">{medicine.quantity} / {medicine.minStock}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        medicine.quantity <= medicine.minStock ? 'bg-rose-500' : 
                        medicine.quantity <= medicine.minStock * 1.5 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (medicine.quantity / Math.max(medicine.minStock, 1)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Expiry</span>
                    <span className={`text-sm ${getExpirationStatus(medicine.expiryDate).class}`}>
                      {getExpirationStatus(medicine.expiryDate).text}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        new Date(medicine.expiryDate) < new Date() ? 'bg-rose-500' :
                        Math.ceil((new Date(medicine.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 30 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ 
                        width: `${Math.min(100, Math.max(0, 
                          (Math.ceil((new Date(medicine.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) / 365) * 100
                        ))}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => openOrderModal(medicine)}
                  >
                    Order More
                  </button>
                  <div className="flex space-x-2">
                    <button className="text-slate-600 hover:text-teal-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="text-slate-600 hover:text-rose-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medicine Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Medicine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedMedicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{medicine.name}</div>
                        <div className="text-sm text-slate-500">{medicine.genericName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="text-sm text-slate-600">
                        <div>{medicine.manufacturer}</div>
                        <div>{medicine.strength} • {medicine.category}</div>
                        <div>Batch: {medicine.batchNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {medicine.quantity} / {medicine.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(medicine.quantity, medicine.minStock, medicine.expiryDate)}`}>
                        {getStatusText(medicine.quantity, medicine.minStock, medicine.expiryDate)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getExpirationStatus(medicine.expiryDate).class}`}>
                        {getExpirationStatus(medicine.expiryDate).text}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(medicine.expiryDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{medicine.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {medicine.rackLocation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => openOrderModal(medicine)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="text-slate-600 hover:text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-slate-600 hover:text-rose-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pharmacy Insights */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Pharmacy Insights</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-rose-200 bg-rose-50 rounded-lg p-4 hover:bg-rose-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-rose-800">Expiring Soon</h4>
              </div>
              <p className="text-xl font-bold text-rose-700 mt-2">
                {medicines.filter(m => {
                  const daysToExpiry = Math.ceil((new Date(m.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return daysToExpiry <= 30 && daysToExpiry > 0;
                }).length} Items
              </p>
              <p className="text-sm text-rose-600">Expire within 30 days</p>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Low Stock Alerts</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">
                {medicines.filter(m => m.quantity <= m.minStock && m.quantity > 0).length} Items
              </p>
              <p className="text-sm text-blue-600">Require immediate attention</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Monthly Spend</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">
                ₹{medicines.reduce((total, medicine) => total + (medicine.quantity * medicine.price), 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-emerald-600">↑ 5% from last month</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Medicine Modal */}
      {showAddMedicineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Medicine</h3>
              <button 
                onClick={() => setShowAddMedicineModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter medicine name"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Generic Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter generic name"
                    value={newMedicine.genericName}
                    onChange={(e) => setNewMedicine({...newMedicine, genericName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newMedicine.category}
                      onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})}
                    >
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Injection">Injection</option>
                      <option value="Cream">Cream</option>
                      <option value="Ointment">Ointment</option>
                      <option value="Inhaler">Inhaler</option>
                      <option value="Drops">Drops</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dosage Form</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter dosage form"
                      value={newMedicine.dosageForm}
                      onChange={(e) => setNewMedicine({...newMedicine, dosageForm: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Strength</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter strength"
                      value={newMedicine.strength}
                      onChange={(e) => setNewMedicine({...newMedicine, strength: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Manufacturer</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter manufacturer"
                      value={newMedicine.manufacturer}
                      onChange={(e) => setNewMedicine({...newMedicine, manufacturer: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter quantity"
                      value={newMedicine.quantity}
                      onChange={(e) => setNewMedicine({...newMedicine, quantity: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Min Stock Level</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter min stock"
                      value={newMedicine.minStock}
                      onChange={(e) => setNewMedicine({...newMedicine, minStock: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter price"
                      value={newMedicine.price}
                      onChange={(e) => setNewMedicine({...newMedicine, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={newMedicine.expiryDate}
                      onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Batch Number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter batch number"
                      value={newMedicine.batchNumber}
                      onChange={(e) => setNewMedicine({...newMedicine, batchNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rack Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      placeholder="Enter rack location"
                      value={newMedicine.rackLocation}
                      onChange={(e) => setNewMedicine({...newMedicine, rackLocation: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter supplier name"
                    value={newMedicine.supplier}
                    onChange={(e) => setNewMedicine({...newMedicine, supplier: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddMedicineModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddMedicine}
              >
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Order More: {selectedMedicine.name}</h3>
              <button 
                onClick={() => setShowOrderModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="ml-4">
                  <h4 className="font-bold text-slate-800">{selectedMedicine.name}</h4>
                  <p className="text-sm text-slate-600">{selectedMedicine.genericName} - {selectedMedicine.manufacturer}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Current Stock</span>
                  <span className="font-medium text-slate-800">{selectedMedicine.quantity}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Minimum Stock</span>
                  <span className="font-medium text-slate-800">{selectedMedicine.minStock}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Reorder Level</span>
                  <span className="font-medium text-slate-800">{selectedMedicine.reorderLevel}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Order Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Quantity to Order</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        placeholder="Enter quantity"
                        defaultValue={Math.max(0, selectedMedicine.reorderLevel - selectedMedicine.quantity + selectedMedicine.reorderLevel)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        value={selectedMedicine.supplier}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Cost</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                      value={`₹${(selectedMedicine.price * Math.max(0, selectedMedicine.reorderLevel - selectedMedicine.quantity + selectedMedicine.reorderLevel)).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowOrderModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={() => setShowOrderModal(false)}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}