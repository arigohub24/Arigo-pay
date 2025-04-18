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
  const [isHovered, setIsHovered] = useState(false)
  const queryClient = useQueryClient()
  const location = useLocation()

  // Responsive sidebar based on screen size
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
    { icon: <FaHome className="w-5 h-5" />, label: "Dashboard", path: "/", color: "text-indigo-500" },
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

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl h-screen border-r border-gray-200/70 ${
        isExpanded ? "w-80" : "w-20"
      } transition-all duration-300 ease-in-out flex-shrink-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ width: isExpanded ? 320 : 80 }}
      animate={{ width: isExpanded ? 320 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="sticky top-0 left-0 h-full flex flex-col overflow-hidden">
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/80 bg-white/50 backdrop-blur-sm">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-transparent whitespace-nowrap"
              >
                Arigo Pay
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-full bg-white shadow-sm hover:bg-indigo-50 hover:shadow-md transition-all duration-200 ${
              isHovered || isExpanded ? "opacity-100" : "opacity-0"
            }`}
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
        <ul className="flex flex-col gap-2 mt-6 px-4 overflow-y-auto custom-scrollbar flex-grow">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to={item.path}
                className={`flex items-center transition-all duration-200 rounded-xl py-3 ${
                  isExpanded ? "px-5" : "px-3 justify-center"
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
                      className="ml-4 text-base font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* User Profile - Fixed for both expanded and collapsed states */}
        {authUser && (
          <motion.div
            className={`mt-auto mb-6 mx-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 ${
              isExpanded ? "" : "flex justify-center"
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={`/profile/${authUser.username}`}
              className={`flex ${isExpanded ? "items-center" : "flex-col items-center"}`}
            >
              <motion.div className="avatar relative" whileHover={{ rotate: 5 }}>
                <div className={`${isExpanded ? "w-10" : "w-12"} rounded-full ring-2 ring-indigo-200 overflow-hidden`}>
                  <img
                    src={authUser?.profileImg || "/avatar-placeholder.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Logout button - Positioned differently based on sidebar state */}
                {!isExpanded && (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      logout()
                    }}
                    className="absolute -top-1 -right-1 p-1.5 rounded-full bg-white shadow-md hover:bg-red-50 border border-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaSignOutAlt className="text-red-500 w-3 h-3" />
                  </motion.button>
                )}
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="ml-3 flex-1 overflow-hidden"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-800 font-semibold text-sm truncate">{authUser?.fullName}</p>
                    <p className="text-gray-500 text-xs">@{authUser?.username}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Logout button for expanded state */}
              {isExpanded && (
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    logout()
                  }}
                  className="p-2 rounded-full hover:bg-red-50 ml-2 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaSignOutAlt className="text-gray-500 group-hover:text-red-500 transition-colors w-5 h-5" />
                </motion.button>
              )}
            </Link>

            {/* Username for collapsed state */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-gray-600 font-medium mt-2 text-center truncate"
                >
                  {authUser?.username?.substring(0, 6)}
                  {authUser?.username?.length > 6 ? "..." : ""}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Sidebar;
