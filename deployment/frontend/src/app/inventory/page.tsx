'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function Inventory() {
  const [inventory, setInventory] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    minStock: 10,
    supplier: '',
    price: 0
  })

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock data for prototype
    const mockInventory = [
      { id: 1, name: 'Luxury Towels', category: 'Linens', quantity: 150, minStock: 100, supplier: 'Premium Linens Co.', price: 12.99, lastOrdered: '2023-08-15' },
      { id: 2, name: 'Hotel Shampoo', category: 'Toiletries', quantity: 85, minStock: 50, supplier: 'Spa Essentials', price: 3.50, lastOrdered: '2023-08-20' },
      { id: 3, name: 'Coffee Beans', category: 'Food & Beverage', quantity: 25, minStock: 20, supplier: 'Gourmet Coffee Supply', price: 18.75, lastOrdered: '2023-09-01' },
      { id: 4, name: 'Cleaning Supplies', category: 'Housekeeping', quantity: 40, minStock: 30, supplier: 'CleanCo', price: 8.99, lastOrdered: '2023-08-25' },
      { id: 5, name: 'Wine Glasses', category: 'Dining', quantity: 75, minStock: 50, supplier: 'Fine Glassware', price: 9.25, lastOrdered: '2023-07-30' },
      { id: 6, name: 'Bed Sheets', category: 'Linens', quantity: 95, minStock: 80, supplier: 'Premium Linens Co.', price: 24.50, lastOrdered: '2023-08-10' },
      { id: 7, name: 'Conditioner', category: 'Toiletries', quantity: 45, minStock: 50, supplier: 'Spa Essentials', price: 3.75, lastOrdered: '2023-08-20' },
      { id: 8, name: 'Chocolate Assortment', category: 'Food & Beverage', quantity: 15, minStock: 20, supplier: 'Gourmet Delights', price: 22.50, lastOrdered: '2023-09-05' },
      { id: 9, name: 'Trash Bags', category: 'Housekeeping', quantity: 120, minStock: 100, supplier: 'CleanCo', price: 15.99, lastOrdered: '2023-08-28' },
      { id: 10, name: 'Silverware Set', category: 'Dining', quantity: 60, minStock: 50, supplier: 'Fine Glassware', price: 12.75, lastOrdered: '2023-08-05' }
    ]
    
    setInventory(mockInventory)
  }, [])

  // Filter inventory based on selected filters and search term
  const filteredInventory = inventory.filter(item => {
    const categoryMatch = selectedCategory 
      ? item.category === selectedCategory 
      : true
    const statusMatch = selectedStatus 
      ? (selectedStatus === 'low' ? item.quantity <= item.minStock : item.quantity > item.minStock)
      : true
    const searchMatch = searchTerm 
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return categoryMatch && statusMatch && searchMatch
  })

  // Sort inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(inventory.map((item: any) => item.category)))

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddItem = () => {
    const newId = inventory.length > 0 ? Math.max(...inventory.map((i: any) => i.id)) + 1 : 1
    const itemToAdd = {
      ...newItem,
      id: newId,
      lastOrdered: new Date().toISOString().split('T')[0]
    }
    
    setInventory([...inventory, itemToAdd])
    
    // Reset form and close modal
    setNewItem({
      name: '',
      category: '',
      quantity: 0,
      minStock: 10,
      supplier: '',
      price: 0
    })
    setShowAddItemModal(false)
  }

  const openOrderModal = (item: any) => {
    setSelectedItem(item)
    setShowOrderModal(true)
  }

  const getStatusClass = (quantity: number, minStock: number) => {
    if (quantity <= minStock) {
      return 'bg-rose-100 text-rose-800'
    } else if (quantity <= minStock * 1.5) {
      return 'bg-amber-100 text-amber-800'
    } else {
      return 'bg-emerald-100 text-emerald-800'
    }
  }

  const getStatusText = (quantity: number, minStock: number) => {
    if (quantity <= minStock) {
      return 'Low Stock'
    } else if (quantity <= minStock * 1.5) {
      return 'Medium Stock'
    } else {
      return 'In Stock'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
            <p className="text-slate-600">Track and manage hotel inventory</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddItemModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Item
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{inventory.length}</p>
            <p className="text-sm text-slate-600">Total Items</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{inventory.filter(i => i.quantity <= i.minStock).length}</p>
            <p className="text-sm text-rose-600">Low Stock</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">
              ₹{inventory.reduce((total, item) => total + (item.quantity * item.price), 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-emerald-600">Total Value</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">
              {inventory.reduce((total, item) => total + item.quantity, 0)}
            </p>
            <p className="text-sm text-blue-600">Total Quantity</p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Item name, category, or supplier"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="categoryFilter" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                id="categoryFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="low">Low Stock</option>
                <option value="normal">Normal Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="quantity">Quantity</option>
                <option value="price">Price</option>
                <option value="lastOrdered">Last Ordered</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300 flex items-center justify-center"
                onClick={() => {
                  setSelectedCategory('')
                  setSelectedStatus('')
                  setSearchTerm('')
                  setSortBy('name')
                  setSortOrder('asc')
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Inventory Cards View */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Inventory Items</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Sort:</span>
              <button 
                className={`text-sm px-2 py-1 rounded ${sortOrder === 'asc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('asc')}
              >
                Asc
              </button>
              <button 
                className={`text-sm px-2 py-1 rounded ${sortOrder === 'desc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('desc')}
              >
                Desc
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedInventory.map((item: any) => (
              <div 
                key={item.id} 
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                    <p className="text-sm text-slate-600">{item.category}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(item.quantity, item.minStock)}`}>
                    {getStatusText(item.quantity, item.minStock)}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Supplier</span>
                    <span className="font-medium text-slate-800">{item.supplier}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-600">Price</span>
                    <span className="font-medium text-slate-800">₹{item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-600">Last Ordered</span>
                    <span className="font-medium text-slate-800">{new Date(item.lastOrdered).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Stock</span>
                    <span className="text-sm font-bold text-slate-800">{item.quantity} / {item.minStock}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        item.quantity <= item.minStock ? 'bg-rose-500' : 
                        item.quantity <= item.minStock * 1.5 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (item.quantity / item.minStock) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button 
                    className="text-sm text-teal-600 hover:text-teal-800 font-medium"
                    onClick={() => openOrderModal(item)}
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

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Ordered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedInventory.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-all duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{item.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.quantity} / {item.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.quantity, item.minStock)}`}>
                        {getStatusText(item.quantity, item.minStock)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(item.lastOrdered).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-teal-600 hover:text-teal-900"
                          onClick={() => openOrderModal(item)}
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

        {/* Inventory Insights */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Inventory Insights</h3>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">View Detailed Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-rose-200 bg-rose-50 rounded-lg p-4 hover:bg-rose-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-rose-800">Low Stock Alerts</h4>
              </div>
              <p className="text-xl font-bold text-rose-700 mt-2">3 Items</p>
              <p className="text-sm text-rose-600">Require immediate attention</p>
            </div>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-blue-800">Top Categories</h4>
              </div>
              <p className="text-xl font-bold text-blue-700 mt-2">Toiletries</p>
              <p className="text-sm text-blue-600">32% of inventory</p>
            </div>
            <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4 hover:bg-emerald-100 transition duration-300 cursor-pointer">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-emerald-800">Monthly Spend</h4>
              </div>
              <p className="text-xl font-bold text-emerald-700 mt-2">₹12,450</p>
              <p className="text-sm text-emerald-600">↓ 5% from last month</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Inventory Item</h3>
              <button 
                onClick={() => setShowAddItemModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  >
                    <option value="">Select category</option>
                    {categories.map((category: string) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter supplier name"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter quantity"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Min Stock</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter min stock"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({...newItem, minStock: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddItemModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Order More: {selectedItem.name}</h3>
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
                  <h4 className="font-bold text-slate-800">{selectedItem.name}</h4>
                  <p className="text-sm text-slate-600">{selectedItem.category} - {selectedItem.supplier}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Current Stock</span>
                  <span className="font-medium text-slate-800">{selectedItem.quantity}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700">Minimum Stock</span>
                  <span className="font-medium text-slate-800">{selectedItem.minStock}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium text-slate-800 mb-2">Order Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Quantity to Order</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter quantity"
                        defaultValue={Math.max(0, selectedItem.minStock - selectedItem.quantity + selectedItem.minStock)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={selectedItem.supplier}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Cost</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={`₹${(selectedItem.price * Math.max(0, selectedItem.minStock - selectedItem.quantity + selectedItem.minStock)).toFixed(2)}`}
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