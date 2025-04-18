"use client"

import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaExchangeAlt,
  FaHistory,
  FaFileInvoice,
  FaGraduationCap,
  FaGlobe,
  FaChartLine,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [ setIsHovered] = useState(false)
  const queryClient = useQueryClient()
  const location = useLocation()

  // Improved responsive sidebar logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: () => {
      toast.error("Logout failed")
    },
  })

  const { data: authUser } = useQuery({ queryKey: ["authUser"] })

  const navItems = [
    { icon: <FaHome className="w-5 h-5" />, label: "Dashboard", path: "/dashboard", color: "text-indigo-500" },
    { icon: <FaExchangeAlt className="w-5 h-5" />, label: "Transfers", path: "/transfers", color: "text-emerald-500" },
    { icon: <FaHistory className="w-5 h-5" />, label: "Transactions", path: "/transactions", color: "text-violet-500" },
    { icon: <FaFileInvoice className="w-5 h-5" />, label: "Bills", path: "/bills", color: "text-amber-500" },
    {
      icon: <FaGraduationCap className="w-5 h-5" />,
      label: "School Fees",
      path: "/school-fees",
      color: "text-yellow-500",
    },
    { icon: <FaGlobe className="w-5 h-5" />, label: "International", path: "/international", color: "text-teal-500" },
    { icon: <FaChartLine className="w-5 h-5" />, label: "Investments", path: "/investments", color: "text-blue-500" },
    { icon: <FaMoneyCheckAlt className="w-5 h-5" />, label: "Loans", path: "/loans", color: "text-rose-500" },
    { icon: <FaCreditCard className="w-5 h-5" />, label: "Cards", path: "/cards", color: "text-pink-500" },
    {
      icon: <FaUser className="w-5 h-5" />,
      label: "Account",
      path: `/profile/${authUser?.username}`,
      color: "text-cyan-500",
    },
    { icon: <FaCog className="w-5 h-5" />, label: "Settings", path: "/settings", color: "text-gray-500" },
  ]

  // Handle logout with preventing default click
  const handleLogout = (e) => {
    e.preventDefault()
    e.stopPropagation()
    logout()
  }

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl h-screen border-r border-gray-200/70 ${
        isExpanded ? "w-64" : "w-16"
      } transition-all duration-300 ease-in-out flex-shrink-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ width: isExpanded ? 256 : 64 }}
      animate={{ width: isExpanded ? 256 : 64 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="sticky top-0 left-0 h-full flex flex-col overflow-hidden">
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/80 bg-white/50 backdrop-blur-sm">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent whitespace-nowrap"
              >
                Arigo Pay
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-indigo-50 hover:shadow-md transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? (
              <FaChevronLeft className="text-indigo-600 w-4 h-4" />
            ) : (
              <FaChevronRight className="text-indigo-600 w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Navigation Items */}
        <ul className="flex flex-col gap-1 mt-4 px-3 overflow-y-auto custom-scrollbar flex-grow">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to={item.path}
                className={`flex items-center transition-all duration-200 rounded-xl py-2.5 ${
                  isExpanded ? "px-4" : "px-3 justify-center"
                } ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 font-semibold shadow-sm"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <motion.div
                  className={`flex items-center justify-center ${isExpanded ? "" : "w-full"}`}
                  animate={{
                    scale: location.pathname === item.path ? 1.1 : 1,
                  }}
                >
                  <span className={`${item.color} ${location.pathname === item.path ? "drop-shadow-md" : ""}`}>
                    {item.icon}
                  </span>
                </motion.div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: 0.05 * index }}
                      className="ml-3 text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* User Profile - Improved for both states */}
        {authUser && (
          <div className="mt-auto mb-4 mx-3">
            <motion.div
              className={`p-3 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <Link
                  to={`/profile/${authUser.username}`}
                  className={`flex items-center flex-1 ${!isExpanded && "justify-center"}`}
                >
                  <motion.div className="relative" whileHover={{ rotate: 5 }}>
                    <div className="rounded-full ring-2 ring-indigo-200 overflow-hidden">
                      <img
                        src={authUser?.profileImg || "/avatar-placeholder.png"}
                        alt="Profile"
                        className={`${isExpanded ? "w-8 h-8" : "w-10 h-10"} object-cover`}
                      />
                    </div>
                  </motion.div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="ml-3 flex-1 overflow-hidden"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        <p className="text-gray-800 font-semibold text-sm truncate">{authUser?.fullName}</p>
                        <p className="text-gray-500 text-xs">@{authUser?.username}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>

                {/* Logout button - Consistently positioned in both states */}
                <motion.button
                  onClick={handleLogout}
                  className={`rounded-full hover:bg-red-50 transition-colors ${
                    isExpanded ? "p-2 ml-1" : "p-2"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaSignOutAlt className={`text-red-500 ${isExpanded ? "w-4 h-4" : "w-4 h-4"}`} />
                </motion.button>
              </div>
              
              {/* Username for collapsed state - only show if not expanded */}
              {!isExpanded && authUser?.username && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-gray-600 font-medium mt-1.5 text-center truncate"
                >
                  {authUser.username.length > 6 
                    ? `${authUser.username.substring(0, 6)}...` 
                    : authUser.username}
                </motion.p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Sidebar