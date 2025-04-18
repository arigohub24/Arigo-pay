import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaSearch, FaChevronDown, FaChevronUp, FaPrint, FaFileDownload } from 'react-icons/fa';

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
  ]);

  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const printRef = useRef();

  // Unique categories for filter
  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  // Filtered transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesCategory = filterCategory === 'All' || transaction.category === filterCategory;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle transaction details
  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Export as CSV
  const exportCSV = () => {
    // Create CSV content
    const headers = ['Date', 'Description', 'Amount', 'Category'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => 
        [t.date, t.description, t.amount.toFixed(2), t.category].join(',')
      )
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-500 mt-2 text-sm">Track and manage your financial activities with ease</p>
        </motion.div>

        {/* Filters, Search and Actions */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <FaFilter className="text-indigo-600" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button 
              onClick={handlePrint}
              className="p-3 rounded-lg bg-indigo-600 text-white flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <FaPrint /> Print
            </button>
            
            <button 
              onClick={exportCSV}
              className="p-3 rounded-lg bg-emerald-600 text-white flex items-center gap-2 hover:bg-emerald-700 transition"
            >
              <FaFileDownload /> Export
            </button>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden print:shadow-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          ref={printRef}
        >
          <div className="grid grid-cols-5 gap-4 p-6 bg-gray-50 font-semibold text-gray-700 text-sm uppercase">
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
                    className={`grid grid-cols-5 gap-4 p-6 border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 ${expandedId === transaction.id ? 'bg-indigo-50' : ''}`}
                  >
                    <div className="text-gray-600 text-sm">{transaction.date}</div>
                    <div className="text-gray-800 font-medium">{transaction.description}</div>
                    <div
                      className={`font-semibold text-sm ${
                        transaction.amount > 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : '-'}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </div>
                    <div className="text-gray-600 text-sm">{transaction.category}</div>
                    <div className="flex justify-center">
                      <button 
                        onClick={() => toggleDetails(transaction.id)} 
                        className="p-2 rounded-full hover:bg-gray-200 transition-all"
                        aria-label={expandedId === transaction.id ? "Hide Details" : "Show Details"}
                      >
                        {expandedId === transaction.id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                  </motion.div>
                  
                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === transaction.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-indigo-50 overflow-hidden"
                      >
                        <div className="p-6 border-b border-indigo-100">
                          <h3 className="font-medium text-indigo-900 mb-4">Transaction Details</h3>
                          
                          {/* Dynamic detail rendering based on transaction type */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(transaction.details).map(([key, value]) => (
                              <div key={key} className="flex flex-col">
                                <span className="text-xs text-indigo-700 uppercase">{key}</span>
                                {Array.isArray(value) ? (
                                  <span className="text-gray-700">{value.join(', ')}</span>
                                ) : (
                                  <span className="text-gray-700">
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
                className="p-6 text-center text-gray-500"
              >
                No transactions found
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Summary Section */}
        <motion.div
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Total Income</p>
              <p className="text-emerald-600 font-bold text-xl">
                ${filteredTransactions
                  .filter(t => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <p className="text-rose-600 font-bold text-xl">
                ${Math.abs(filteredTransactions
                  .filter(t => t.amount < 0)
                  .reduce((sum, t) => sum + t.amount, 0))
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Net</p>
              <p className={`font-bold text-xl ${
                filteredTransactions.reduce((sum, t) => sum + t.amount, 0) >= 0 
                  ? 'text-emerald-600' 
                  : 'text-rose-600'
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
  );
};

export default TransactionsHistory;