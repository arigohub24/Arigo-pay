"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  CreditCard,
  Download,
  PieChart,
  Send,
  Settings,
  User,
  DollarSign,
  Clock,
  AlertCircle,
  Search,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  Bell,
  LogOut,
  HelpCircle,
  FileText,
} from "lucide-react"

const Account = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("transactions")
  const [expandedTransaction, setExpandedTransaction] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const accountData = {
    name: "Sarah Johnson",
    accountNumber: "**** **** **** 4521",
    balance: 5472.85,
    availableBalance: 5247.32,
    transactions: [
      {
        id: 1,
        date: "2025-04-15",
        description: "Grocery Store",
        amount: -128.45,
        category: "Shopping",
        status: "Completed",
      },
      {
        id: 2,
        date: "2025-04-12",
        description: "Salary Deposit",
        amount: 3240.0,
        category: "Income",
        status: "Completed",
      },
      {
        id: 3,
        date: "2025-04-09",
        description: "Electric Bill",
        amount: -98.75,
        category: "Utilities",
        status: "Completed",
      },
      {
        id: 4,
        date: "2025-04-05",
        description: "Restaurant",
        amount: -65.2,
        category: "Dining",
        status: "Completed",
      },
      {
        id: 5,
        date: "2025-04-01",
        description: "ATM Withdrawal",
        amount: -200.0,
        category: "Cash",
        status: "Completed",
      },
      {
        id: 6,
        date: "2025-03-28",
        description: "Online Shopping",
        amount: -89.99,
        category: "Shopping",
        status: "Pending",
      },
    ],
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const toggleTransaction = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id)
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-white transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900">My Account</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <Search className="absolute left-3 top-2.5 text-blue-400" size={18} />
              </div>
              <button className="relative p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-blue-50 rounded-full py-1.5 pl-1.5 pr-4 hover:bg-blue-100 transition-colors"
                >
                  <div className="bg-blue-600 rounded-full p-1.5">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-sm text-blue-900">{accountData.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-blue-500 transition-transform duration-300 ${
                      showUserMenu ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-blue-100">
                    <a href="#" className="block px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-500" />
                      Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-blue-500" />
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                      Help Center
                    </a>
                    <div className="border-t border-blue-100 my-1"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                      <LogOut className="h-4 w-4 mr-2 text-red-500" />
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Account Overview</h2>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 transition-all duration-300 hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white shadow-md">
                <p className="text-blue-100 mb-1 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 opacity-70" /> Available Balance
                </p>
                <p className="text-3xl font-bold">{formatCurrency(accountData.availableBalance)}</p>
                <div className="mt-4 pt-4 border-t border-blue-400 border-opacity-30 flex justify-between items-center">
                  <p className="text-sm text-blue-100">Account Number</p>
                  <p className="text-sm font-medium">{accountData.accountNumber}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <p className="text-blue-500 mb-1 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" /> Income This Month
                </p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(3240.0)}</p>
                <div className="mt-4 pt-4 border-t border-blue-100 flex items-center">
                  <div className="bg-green-100 p-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 ml-1">+12% from last month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-blue-100">
                <p className="text-blue-500 mb-1 flex items-center">
                  <ArrowDownLeft className="h-4 w-4 mr-1" /> Expenses This Month
                </p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(582.39)}</p>
                <div className="mt-4 pt-4 border-t border-blue-100 flex items-center">
                  <div className="bg-red-100 p-1 rounded-full">
                    <ArrowDownLeft className="h-3 w-3 text-red-600" />
                  </div>
                  <p className="text-sm text-red-600 ml-1">-5% from last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Quick Actions</h2>
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 transition-all duration-300 hover:shadow-md">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Send className="h-5 w-5" />, label: "Transfer", color: "bg-blue-100 text-blue-600" },
                  { icon: <CreditCard className="h-5 w-5" />, label: "Pay", color: "bg-purple-100 text-purple-600" },
                  { icon: <Download className="h-5 w-5" />, label: "Deposit", color: "bg-green-100 text-green-600" },
                  { icon: <PieChart className="h-5 w-5" />, label: "Insights", color: "bg-yellow-100 text-yellow-600" },
                  {
                    icon: <FileText className="h-5 w-5" />,
                    label: "Statements",
                    color: "bg-indigo-100 text-indigo-600",
                  },
                  { icon: <Settings className="h-5 w-5" />, label: "Settings", color: "bg-gray-100 text-gray-600" },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`${action.color} p-3 rounded-xl mb-2`}>{action.icon}</div>
                    <span className="text-xs font-medium text-blue-900">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Payments */}
            <h2 className="text-xl font-semibold text-blue-900 mt-8 mb-4">Upcoming Payments</h2>
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 transition-all duration-300 hover:shadow-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-900">Electricity Bill</p>
                      <p className="text-xs text-blue-500">Due in 3 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-900">$94.20</p>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Pay now</button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-900">Internet Service</p>
                      <p className="text-xs text-blue-500">Due in 7 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-900">$59.99</p>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Pay now</button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-900">Credit Card Payment</p>
                      <p className="text-xs text-blue-500">Due in 12 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-900">$350.00</p>
                    <button className="text-xs text-blue-600 hover:text-blue-800">Pay now</button>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                View all scheduled payments <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Transaction History</h2>
              <div className="flex items-center space-x-2">
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <Calendar className="h-4 w-4 mr-1" /> Filter by date
                </button>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <Download className="h-4 w-4 mr-1" /> Export
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="border-b border-blue-100 p-4">
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "transactions"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setActiveTab("transactions")}
                  >
                    All
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "income" ? "bg-blue-600 text-white shadow-md" : "text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setActiveTab("income")}
                  >
                    Income
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === "expenses" ? "bg-blue-600 text-white shadow-md" : "text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setActiveTab("expenses")}
                  >
                    Expenses
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {accountData.transactions
                    .filter((t) => {
                      if (activeTab === "income") return t.amount > 0
                      if (activeTab === "expenses") return t.amount < 0
                      return true
                    })
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="animate-fadeIn border border-blue-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm"
                      >
                        <div
                          className={`p-4 cursor-pointer transition-colors ${
                            expandedTransaction === transaction.id ? "bg-blue-50" : "hover:bg-blue-50"
                          }`}
                          onClick={() => toggleTransaction(transaction.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`p-3 rounded-xl ${
                                  transaction.amount > 0 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                }`}
                              >
                                {transaction.amount > 0 ? (
                                  <ArrowUpRight className="h-5 w-5" />
                                ) : (
                                  <ArrowDownLeft className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-blue-900">{transaction.description}</p>
                                <p className="text-xs text-blue-500">{formatDate(transaction.date)}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p
                                className={`font-semibold ${
                                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {formatCurrency(transaction.amount)}
                              </p>
                              <ChevronDown
                                className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${
                                  expandedTransaction === transaction.id ? "transform rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>

                          {/* Expanded Details */}
                          <div
                            className={`mt-4 pt-4 border-t border-blue-100 text-sm grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-500 ${
                              expandedTransaction === transaction.id
                                ? "max-h-48 opacity-100"
                                : "max-h-0 opacity-0 hidden"
                            }`}
                          >
                            <div className="bg-white p-3 rounded-lg border border-blue-100">
                              <p className="text-blue-500 flex items-center text-xs mb-1">
                                <Clock className="h-3 w-3 mr-1" /> Status
                              </p>
                              <p className="font-medium text-blue-900">
                                {transaction.status === "Completed" ? (
                                  <span className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
                                    Completed
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1.5"></span>
                                    Pending
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-blue-100">
                              <p className="text-blue-500 flex items-center text-xs mb-1">
                                <PieChart className="h-3 w-3 mr-1" /> Category
                              </p>
                              <p className="font-medium text-blue-900">{transaction.category}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                <FileText className="h-3 w-3 mr-1" /> View Receipt
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" /> Report Issue
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                    View all transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-blue-500">© 2025 SecureBank. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Account
