"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFilter, FaSearch, FaChevronDown, FaChevronUp, FaPrint, FaFileDownload } from 'react-icons/fa'

const TransactionsHistory = () => {
  const [transactions] = useState([
    { 
      id: 1, 
      date: '2025-04-15', 
      description: 'Grocery Store', 
      amount: -45.99, 
      category: 'Shopping',
      details: {
        store: 'Whole Foods Market',
        items: ['Vegetables', 'Bread', 'Milk', 'Eggs'],
        paymentMethod: 'Credit Card',
        receiptNumber: '124587A'
      }
    },
    { 
      id: 2, 
      date: '2025-04-14', 
      description: 'Salary Deposit', 
      amount: 2500.00, 
      category: 'Income',
      details: {
        source: 'Design Company Inc.',
        period: 'April 1-14, 2025',
        netAmount: 2500.00,
        grossAmount: 3100.00,
        deductions: 600.00
      }
    },
    { 
      id: 3, 
      date: '2025-04-13', 
      description: 'Electric Bill', 
      amount: -120.50, 
      category: 'Utilities',
      details: {
        provider: 'City Power & Light',
        accountNumber: '54879632',
        billingPeriod: 'March 2025',
        usageKWh: 542
      }
    },
    { 
      id: 4, 
      date: '2025-04-12', 
      description: 'Coffee Shop', 
      amount: -7.25, 
      category: 'Dining',
      details: {
        location: 'Urban Brew',
        items: ['Cappuccino', 'Blueberry Muffin'],
        paymentMethod: 'Debit Card'
      }
    },
    { 
      id: 5, 
      date: '2025-04-11', 
      description: 'Freelance Payment', 
      amount: 800.00, 
      category: 'Income',
      details: {
        client: 'TechStart Solutions',
        project: 'Website Redesign',
        hours: 16,
        rate: 50.00
      }
    },
  ])

  const [filterCategory, setFilterCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const printRef = useRef()

  const categories = ['All', ...new Set(transactions.map(t => t.category))]
  const filteredTransactions = transactions.filter(transaction => {
    const matchesCategory = filterCategory === 'All' || transaction.category === filterCategory
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handlePrint = () => {
    window.print()
  }

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Amount', 'Category']
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => 
        [t.date, t.description, t.amount.toFixed(2), t.category].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'transactions.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-800">Transaction History</h1>
          <p className="text-gray-600 mt-2 text-sm">Track and manage your financial activities with ease</p>
        </motion.div>

        {/* Filters, Search and Actions */}
        <motion.div 
          className="flex flex-col gap-4 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-blue-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-300"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <FaFilter className="text-blue-600" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full sm:w-auto p-3 rounded-lg border border-blue-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <motion.button 
                onClick={handlePrint}
                className="flex-1 sm:flex-none flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPrint className="mr-2" /> Print
              </motion.button>
              <motion.button 
                onClick={exportCSV}
                className="flex-1 sm:flex-none flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFileDownload className="mr-2" /> Export
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden print:shadow-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          ref={printRef}
        >
          <div className="hidden sm:grid grid-cols-5 gap-4 p-4 sm:p-6 bg-blue-50 font-semibold text-blue-800 text-xs uppercase">
            <div>Date</div>
            <div>Description</div>
            <div>Amount</div>
            <div>Category</div>
            <div className="text-center">Actions</div>
          </div>
          <AnimatePresence>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <div key={transaction.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`block sm:grid sm:grid-cols-5 gap-4 p-4 sm:p-6 border-b border-blue-100 hover:bg-blue-50 transition-all duration-200 ${expandedId === transaction.id ? 'bg-blue-50' : ''}`}
                  >
                    <div className="sm:flex sm:items-center">
                      <span className="sm:hidden font-medium text-blue-800 text-xs">Date: </span>
                      <span className="text-gray-600 text-xs">{transaction.date}</span>
                    </div>
                    <div className="sm:flex sm:items-center mt-2 sm:mt-0">
                      <span className="sm:hidden font-medium text-blue-800 text-xs">Description: </span>
                      <span className="text-blue-800 font-medium text-sm">{transaction.description}</span>
                    </div>
                    <div className="sm:flex sm:items-center mt-2 sm:mt-0">
                      <span className="sm:hidden font-medium text-blue-800 text-xs">Amount: </span>
                      <span
                        className={`font-semibold text-xs ${
                          transaction.amount > 0 ? 'text-blue-600' : 'text-blue-600'
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : '-'}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="sm:flex sm:items-center mt-2 sm:mt-0">
                      <span className="sm:hidden font-medium text-blue-800 text-xs">Category: </span>
                      <span className="text-gray-600 text-xs">{transaction.category}</span>
                    </div>
                    <div className="flex justify-center mt-2 sm:mt-0">
                      <motion.button 
                        onClick={() => toggleDetails(transaction.id)} 
                        className="p-3 rounded-full hover:bg-blue-200 transition-all"
                        aria-label={expandedId === transaction.id ? "Hide Details" : "Show Details"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {expandedId === transaction.id ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />}
                      </motion.button>
                    </div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {expandedId === transaction.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-blue-50 overflow-hidden"
                      >
                        <div className="p-4 sm:p-6 border-b border-blue-100">
                          <h3 className="font-medium text-blue-800 mb-4 text-sm">Transaction Details</h3>
                          <div className="grid grid-cols-1 gap-4">
                            {Object.entries(transaction.details).map(([key, value]) => (
                              <div key={key} className="flex flex-col">
                                <span className="text-xs text-blue-700 uppercase">{key}</span>
                                {Array.isArray(value) ? (
                                  <span className="text-gray-600 text-xs">{value.join(', ')}</span>
                                ) : (
                                  <span className="text-gray-600 text-xs">
                                    {typeof value === 'number' && key.toLowerCase().includes('amount') 
                                      ? `$${value.toFixed(2)}` 
                                      : value}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 sm:p-6 text-center text-gray-600 text-sm"
              >
                No transactions found
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Summary Section */}
        <motion.div
          className="mt-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">Summary</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-gray-600 text-xs sm:text-sm">Total Income</p>
              <p className="text-blue-600 font-bold text-lg sm:text-xl">
                ${filteredTransactions
                  .filter(t => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-gray-600 text-xs sm:text-sm">Total Expenses</p>
              <p className="text-blue-600 font-bold text-lg sm:text-xl">
                ${Math.abs(filteredTransactions
                  .filter(t => t.amount < 0)
                  .reduce((sum, t) => sum + t.amount, 0))
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-gray-600 text-xs sm:text-sm">Net</p>
              <p className={`font-bold text-lg sm:text-xl ${
                filteredTransactions.reduce((sum, t) => sum + t.amount, 0) >= 0 
                  ? 'text-blue-600' 
                  : 'text-blue-600'
              }`}>
                ${filteredTransactions
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TransactionsHistory