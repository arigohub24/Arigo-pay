import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaExchangeAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaCopy,
  FaQrcode,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
} from "react-icons/fa";
import { FiSend, FiUserPlus } from "react-icons/fi";
import { RiExchangeDollarFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [showFullBalance, setShowFullBalance] = useState(false);
  const [showAllRates, setShowAllRates] = useState(false);
  const navigate = useNavigate();

  const exchangeRates = [
    { currency: "USD", rate: "1 USD = 1,200 NGN", trend: "up" },
    { currency: "EUR", rate: "1 EUR = 1,350 NGN", trend: "down" },
    { currency: "GBP", rate: "1 GBP = 1,500 NGN", trend: "up" },
    { currency: "CAD", rate: "1 CAD = 900 NGN", trend: "down" },
    { currency: "AUD", rate: "1 AUD = 850 NGN", trend: "up" },
    { currency: "GHS", rate: "1 GHS = 120 NGN", trend: "down" },
  ];

  const recentTransactions = [
    {
      type: "credit",
      name: "Salary Deposit",
      amount: "₦250,000",
      date: "Today, 10:45 AM",
      icon: <FaMoneyBillWave className="text-blue-600" />,
    },
    {
      type: "debit",
      name: "Transfer to John",
      amount: "₦50,000",
      date: "Yesterday, 2:30 PM",
      icon: <FiSend className="text-blue-600" />,
    },
    {
      type: "debit",
      name: "Electricity Bill",
      amount: "₦15,000",
      date: "Mar 15, 9:15 AM",
      icon: <FaCreditCard className="text-blue-600" />,
    },
    {
      type: "credit",
      name: "Freelance Payment",
      amount: "₦75,000",
      date: "Mar 14, 4:20 PM",
      icon: <FaMoneyBillWave className="text-blue-600" />,
    },
    {
      type: "debit",
      name: "Airtime Purchase",
      amount: "₦5,000",
      date: "Mar 12, 11:05 AM",
      icon: <FaCreditCard className="text-blue-600" />,
    },
  ];

  const quickActions = [
    { 
      icon: <FiSend size={20} />, 
      label: "Send Money", 
      color: "bg-blue-100 text-blue-600",
      action: () => navigate('/transfers')
    },
    { 
      icon: <FaQrcode size={20} />, 
      label: "Pay with QR", 
      color: "bg-blue-100 text-blue-600",
      action: () => navigate('/qr-payment')
    },
    { 
      icon: <FiUserPlus size={20} />, 
      label: "Add Beneficiary", 
      color: "bg-blue-100 text-blue-600",
      action: () => navigate('/beneficiaries/add')
    },
    { 
      icon: <FaExchangeAlt size={20} />, 
      label: "Currency Swap", 
      color: "bg-blue-100 text-blue-600",
      action: () => navigate('/international')
    },
  ];

  const copyAccountNumber = () => {
    // In a real app, you would copy the actual account number
    navigator.clipboard.writeText("0123456789");
    alert("Account number copied to clipboard!");
  };

  return (
    <motion.div
      className="flex-1 min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-blue-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Dashboard
        </motion.h1>
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-blue-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Account Summary */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Total Balance</h2>
            <div className="flex items-center mt-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={showFullBalance ? "visible" : "hidden"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl sm:text-3xl font-bold text-blue-800"
                >
                  {showFullBalance ? "₦1,245,876.50" : "₦•••••••"}
                </motion.p>
              </AnimatePresence>
              <button
                onClick={() => setShowFullBalance(!showFullBalance)}
                className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                {showFullBalance ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-1">Arigo Pay •••• 4567</p>
          </div>
          <motion.button
            className="flex items-center px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md w-full sm:w-auto justify-center text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyAccountNumber}
          >
            <FaCopy className="mr-2 text-sm" /> Copy Account No.
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4 sm:mt-6">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${action.color} hover:shadow-md transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={action.action}
            >
              <div className="p-2 rounded-full bg-white shadow-sm mb-2">{action.icon}</div>
              <span className="text-xs sm:text-sm font-semibold text-center">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Exchange Rates and Recent Transactions */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Exchange Rates */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-blue-800">Exchange Rates</h2>
            <RiExchangeDollarFill className="text-blue-600" size={20} />
          </div>
          <div className="space-y-4">
            {(showAllRates ? exchangeRates : exchangeRates.slice(0, 3)).map((rate, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="font-medium text-blue-800">{rate.currency}</span>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">{rate.rate}</span>
                  {rate.trend === "up" ? (
                    <FaArrowUp className="text-blue-600" />
                  ) : (
                    <FaArrowDown className="text-blue-600" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            className="w-full mt-4 py-2 sm:py-3 text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAllRates(!showAllRates)}
          >
            {showAllRates ? "Show Less" : "View All Rates"}
          </motion.button>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-blue-800">Recent Transactions</h2>
            <motion.button
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/transactions')}
            >
              View All
            </motion.button>
          </div>
          <div className="space-y-3">
            {recentTransactions.slice(0, 3).map((transaction, index) => (
              <motion.div
                key={index}
                className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="p-2 rounded-full bg-blue-100 mr-3">{transaction.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-800 text-sm">{transaction.name}</h3>
                  <p className="text-xs text-gray-600">{transaction.date}</p>
                </div>
                <div
                  className={`font-semibold text-sm ${
                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"} {transaction.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Transfer Money Section */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-4 sm:p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-base sm:text-lg font-semibold text-blue-800 mb-4">Transfer Money</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">From</label>
              <select
                className="w-full p-3 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              >
                <option>Arigo Pay Account (₦1,245,876.50)</option>
                <option>Savings Account (₦500,000.00)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">To</label>
              <select
                className="w-full p-3 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              >
                <option>Select beneficiary</option>
                <option>John Doe (Zenith Bank •••• 1234)</option>
                <option>Jane Smith (GTBank •••• 5678)</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">Amount</label>
              <input
                type="text"
                placeholder="0.00"
                className="w-full p-3 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">Narration</label>
              <input
                type="text"
                placeholder="Optional"
                className="w-full p-3 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Transfer Fee</p>
              <p className="font-semibold text-blue-800 text-sm">₦50.00</p>
            </div>
            <motion.button
              className="w-full py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/transfers')}
            >
              Send Money
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;