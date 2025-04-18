"use client"

import { useState } from "react"
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  DollarSign,
  School,
  FileText,
  Info,
  Download,
} from "lucide-react"
import { motion } from "framer-motion"

const SchoolFees = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    feeType: "tuition",
    semester: "fall",
    amount: "2500",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    agreeToTerms: false,
    school: "main",
    program: "undergraduate",
    academicYear: "2025-2026",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ setIsComplete] = useState(false)
  const [paymentId, setPaymentId] = useState("")
  const [errors, setErrors] = useState({})

  const feeTypes = {
    tuition: { name: "Tuition Fee", description: "Regular semester tuition", amount: 2500 },
    library: { name: "Library Fee", description: "Access to library services", amount: 150 },
    lab: { name: "Laboratory Fee", description: "For science and computer labs", amount: 350 },
    activity: { name: "Activity Fee", description: "Campus events and activities", amount: 200 },
    technology: { name: "Technology Fee", description: "IT and online services", amount: 300 },
    accommodation: { name: "Accommodation Fee", description: "On-campus housing", amount: 1800 },
    international: {
      name: "International Student Fee",
      description: "Additional fee for international students",
      amount: 500,
    },
    graduation: { name: "Graduation Fee", description: "For graduating students", amount: 250 },
  }

  const schools = {
    main: "Main Campus",
    downtown: "Downtown Campus",
    medical: "Medical School Campus",
    international: "International Campus",
  }

  const programs = {
    undergraduate: "Undergraduate",
    graduate: "Graduate",
    doctorate: "Doctorate",
    certificate: "Certificate Program",
  }

  const semesters = {
    fall: "Fall 2025",
    spring: "Spring 2026",
    summer: "Summer 2026",
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (name === "feeType") {
      setFormData((prev) => ({
        ...prev,
        amount: feeTypes[value].amount.toString(),
      }))
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required"
    if (!formData.studentName.trim()) newErrors.studentName = "Full name is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.feeType) newErrors.feeType = "Please select a fee type"
    if (!formData.semester) newErrors.semester = "Please select a semester"
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}
    if (formData.cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Card number must be at least 16 digits"
    if (!formData.cardHolder.trim()) newErrors.cardHolder = "Cardholder name is required"
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
      newErrors.expiryDate = "Enter valid expiry date (MM/YY)"
    if (formData.cvv.length < 3) newErrors.cvv = "CVV must be at least 3 digits"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return
    if (currentStep === 3 && !validateStep3()) return
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateStep3()) return
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
      setCurrentStep(4)
      setPaymentId(Math.random().toString(36).substr(2, 10).toUpperCase())
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      studentId: "",
      studentName: "",
      feeType: "tuition",
      semester: "fall",
      amount: "2500",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      agreeToTerms: false,
      school: "main",
      program: "undergraduate",
      academicYear: "2025-2026",
    })
    setCurrentStep(1)
    setIsComplete(false)
    setPaymentId("")
    setErrors({})
  }

  const formatCardNumber = (value) => {
    return value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  }

  const downloadReceipt = () => {
    const receiptContent = `
      Payment Receipt
      ----------------
      Payment ID: ${paymentId}
      Student Name: ${formData.studentName}
      Student ID: ${formData.studentId}
      Campus: ${schools[formData.school]}
      Program: ${programs[formData.program]}
      Academic Year: ${formData.academicYear}
      Fee Type: ${feeTypes[formData.feeType].name}
      Semester: ${semesters[formData.semester]}
      Amount Paid: $${parseFloat(formData.amount).toFixed(2)}
      Date: ${new Date().toLocaleDateString()}
      ----------------
      Thank you for your payment!
    `
    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Receipt_${paymentId}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const StepIndicator = () => {
    return (
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`rounded-full flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ${
                  currentStep === step
                    ? "bg-blue-600 text-white"
                    : currentStep > step
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-600"
                } text-sm sm:text-base`}
              >
                {currentStep > step ? <CheckCircle size={20} /> : step}
              </div>
              <div className="text-xs sm:text-sm mt-2 text-blue-800 text-center">
                {step === 1 && "Student Info"}
                {step === 2 && "Fee Details"}
                {step === 3 && "Payment"}
                {step === 4 && "Confirmation"}
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:block h-1 w-full bg-blue-100 mt-2">
          <div className="h-1 bg-blue-600" style={{ width: `${(currentStep - 1) * 33.33}%` }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <School className="h-6 w-6 sm:h-8 sm:w-8 mr-2" />
            <h1 className="text-xl sm:text-2xl font-bold">University Payment Portal</h1>
          </div>
          <div className="text-xs sm:text-sm text-blue-100">
            <p>Academic Year: {formData.academicYear}</p>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-blue-800">School Fees Payment</h1>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm">Complete the steps below to pay your school fees</p>

          <StepIndicator />

          {/* Step 1: Student Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold flex items-center mb-4 text-blue-800">
                <User className="mr-2" /> Student Information
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex items-start">
                  <Info size={16} className="text-blue-600 mr-2 mt-1" />
                  <p className="text-xs sm:text-sm text-blue-700">
                    Please enter your student details as they appear in your school records.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.studentId ? "border-red-500" : "border-blue-200"
                    } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    placeholder="Enter your student ID"
                  />
                  {errors.studentId && <p className="mt-1 text-xs text-red-600">{errors.studentId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.studentName ? "border-red-500" : "border-blue-200"
                    } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    placeholder="Enter your full name"
                  />
                  {errors.studentName && <p className="mt-1 text-xs text-red-600">{errors.studentName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {Object.entries(schools).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {Object.entries(programs).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-blue-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <motion.button
                  onClick={nextStep}
                  className="flex items-center py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Step <ArrowRight size={16} className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Fee Details */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold flex items-center mb-4 text-blue-800">
                <School className="mr-2" /> Fee Details
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex items-start">
                  <Info size={16} className="text-blue-600 mr-2 mt-1" />
                  <p className="text-xs sm:text-sm text-blue-700">
                    Select the type of fee you are paying and the applicable semester.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                  <select
                    name="feeType"
                    value={formData.feeType}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.feeType ? "border-red-500" : "border-blue-200"
                    } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  >
                    {Object.entries(feeTypes).map(([key, { name }]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.feeType && <p className="mt-1 text-xs text-red-600">{errors.feeType}</p>}
                  <p className="mt-1 text-xs text-gray-600">{feeTypes[formData.feeType].description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.semester ? "border-red-500" : "border-blue-200"
                    } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                  >
                    {Object.entries(semesters).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {errors.semester && <p className="mt-1 text-xs text-red-600">{errors.semester}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    readOnly
                    className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 shadow-sm text-sm text-gray-600"
                  />
                  {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount}</p>}
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                <motion.button
                  onClick={prevStep}
                  className="flex items-center py-3 px-4 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={16} className="mr-2" /> Previous
                </motion.button>
                <motion.button
                  onClick={nextStep}
                  className="flex items-center py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Step <ArrowRight size={16} className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment Details */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold flex items-center mb-4 text-blue-800">
                <CreditCard className="mr-2" /> Payment Details
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex items-start">
                  <Info size={16} className="text-blue-600 mr-2 mt-1" />
                  <p className="text-xs sm:text-sm text-blue-700">
                    Enter your card details to complete the payment. All transactions are secure.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formatCardNumber(formData.cardNumber)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 16)
                      setFormData((prev) => ({ ...prev, cardNumber: value }))
                    }}
                    className={`w-full p-3 border ${
                      errors.cardNumber ? "border-red-500" : "border-blue-200"
                    } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    className={`w-full p-3 border ${
                      errors.cardHolder ? "border-red-500" : "border-blue-200"
                    } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                    placeholder="Enter cardholder name"
                  />
                  {errors.cardHolder && <p className="mt-1 text-xs text-red-600">{errors.cardHolder}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "")
                        if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
                        setFormData((prev) => ({ ...prev, expiryDate: value }))
                      }}
                      className={`w-full p-3 border ${
                        errors.expiryDate ? "border-red-500" : "border-blue-200"
                      } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiryDate && <p className="mt-1 text-xs text-red-600">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                        setFormData((prev) => ({ ...prev, cvv: value }))
                      }}
                      className={`w-full p-3 border ${
                        errors.cvv ? "border-red-500" : "border-blue-200"
                      } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
                      placeholder="123"
                      maxLength={4}
                    />
                    {errors.cvv && <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>}
                  </div>
                </div>
                <div>
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-blue-600 border-blue-200 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        terms and conditions
                      </a>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                <motion.button
                  onClick={prevStep}
                  className="flex items-center py-3 px-4 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={16} className="mr-2" /> Previous
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex items-center py-3 px-4 rounded-lg text-sm ${
                    isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-gray-500"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now <DollarSign size={16} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold flex items-center mb-4 text-blue-800">
                <FileText className="mr-2" /> Payment Confirmation
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4 sm:mb-6">
                <div className="flex items-center">
                  <CheckCircle size={24} className="text-blue-600 mr-2" />
                  <p className="text-sm text-blue-700 font-medium">
                    Payment successful! Thank you for your payment.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white border border-blue-200 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Payment Details</h3>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Payment ID:</span>
                        <span className="font-medium">{paymentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student Name:</span>
                        <span className="font-medium">{formData.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student ID:</span>
                        <span className="font-medium">{formData.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Campus:</span>
                        <span className="font-medium">{schools[formData.school]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Program:</span>
                        <span className="font-medium">{programs[formData.program]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Academic Year:</span>
                        <span className="font-medium">{formData.academicYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee Type:</span>
                        <span className="font-medium">{feeTypes[formData.feeType].name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Semester:</span>
                        <span className="font-medium">{semesters[formData.semester]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount Paid:</span>
                        <span className="font-medium text-blue-600">
                          ${parseFloat(formData.amount).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={downloadReceipt}
                  className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} className="mr-2" /> Download Receipt
                </motion.button>
                <motion.button
                  onClick={resetForm}
                  className="w-full py-3 px-4 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Make Another Payment
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
          <p>&copy; 2025 University Payment Portal. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SchoolFees