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
  Calendar,
  Building,
  Download,
} from "lucide-react"

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

  // Fee types with descriptions and default amounts
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

  // School campuses
  const schools = {
    main: "Main Campus",
    downtown: "Downtown Campus",
    medical: "Medical School Campus",
    international: "International Campus",
  }

  // Programs
  const programs = {
    undergraduate: "Undergraduate",
    graduate: "Graduate",
    doctorate: "Doctorate",
    certificate: "Certificate Program",
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Update amount when fee type changes
    if (name === "feeType") {
      setFormData((prev) => ({
        ...prev,
        amount: feeTypes[value].amount.toString(),
      }))
    }
  }

  const nextStep = () => {
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
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
      setCurrentStep(4)
      // Generate a random payment ID
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
  }

  // Validation logic for each step
  const isStep1Valid = formData.studentId.trim() !== "" && formData.studentName.trim() !== ""
  const isStep2Valid = formData.feeType !== "" && formData.semester !== "" && formData.amount > 0
  const isStep3Valid =
    formData.cardNumber.length >= 16 &&
    formData.cardHolder.trim() !== "" &&
    formData.expiryDate.trim() !== "" &&
    formData.cvv.length >= 3 &&
    formData.agreeToTerms

  // Step indicators component
  const StepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`rounded-full flex items-center justify-center w-10 h-10 ${
                  currentStep === step
                    ? "bg-blue-600 text-white"
                    : currentStep > step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step ? <CheckCircle size={24} /> : step}
              </div>
              <div className="text-xs mt-2 text-gray-600">
                {step === 1 && "Student Info"}
                {step === 2 && "Fee Details"}
                {step === 3 && "Payment"}
                {step === 4 && "Confirmation"}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-1 w-full bg-gray-200 mx-2">
            <div className="h-1 bg-blue-600" style={{ width: `${(currentStep - 1) * 33.33}%` }}></div>
          </div>
        </div>
      </div>
    )
  }

  const downloadReceipt = () => {
    // In a real application, this would generate a PDF receipt
    alert("Receipt download started...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <School className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">University Payment Portal</h1>
          </div>
          <div className="text-sm">
            <p>Academic Year: 2025-2026</p>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-blue-800">School Fees Payment</h1>
          <p className="text-center text-gray-600 mb-6">Complete the steps below to pay your school fees</p>

          <StepIndicator />

          {/* Step 1: Student Information */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold flex items-center mb-4 text-blue-700">
                <User className="mr-2" /> Student Information
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start mb-2">
                  <Info size={20} className="text-blue-500 mr-2 mt-1" />
                  <p className="text-sm text-blue-700">
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your student ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className={`flex items-center px-6 py-2 rounded-md ${
                    isStep1Valid
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Step <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Fee Details */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold flex items-center mb-4 text-blue-700">
                <School className="mr-2" /> Fee Details
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start mb-2">
                  <Info size={20} className="text-blue-500 mr-2 mt-1" />
                  <p className="text-sm text-blue-700">
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(feeTypes).map(([key, { name }]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">{feeTypes[formData.feeType].description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="fall">Fall 2025</option>
                    <option value="spring">Spring 2026</option>
                    <option value="summer">Summer 2026</option>
                    <option value="winter">Winter 2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <p className="mt-1 text-sm text-gray-500">Default amount based on selected fee type</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center text-blue-700">
                    <Calendar size={18} className="mr-2" />
                    Payment Schedule
                  </h3>
                  <div className="text-sm space-y-2">
                    <p>
                      <span className="font-medium">Fall Semester:</span> Due by August 15, 2025
                    </p>
                    <p>
                      <span className="font-medium">Spring Semester:</span> Due by January 10, 2026
                    </p>
                    <p>
                      <span className="font-medium">Summer Semester:</span> Due by May 5, 2026
                    </p>
                    <p>
                      <span className="font-medium">Winter Semester:</span> Due by December 1, 2025
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  className="flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                >
                  <ArrowLeft size={16} className="mr-2" /> Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={!isStep2Valid}
                  className={`flex items-center px-6 py-2 rounded-md ${
                    isStep2Valid
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Step <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Information */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold flex items-center mb-4 text-blue-700">
                <CreditCard className="mr-2" /> Payment Details
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start mb-2">
                  <Info size={20} className="text-blue-500 mr-2 mt-1" />
                  <p className="text-sm text-blue-700">
                    Enter your payment details. All transactions are secure and encrypted.
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 border border-blue-100 rounded-lg mb-6 bg-white shadow-sm">
                  <h3 className="font-medium mb-2 flex items-center text-blue-700">
                    <FileText size={18} className="mr-2" />
                    Payment Summary
                  </h3>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Student:</span>
                    <span className="font-medium">{formData.studentName || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Campus:</span>
                    <span className="font-medium">{schools[formData.school]}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Program:</span>
                    <span className="font-medium">{programs[formData.program]}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Fee Type:</span>
                    <span className="font-medium">{feeTypes[formData.feeType].name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Semester:</span>
                    <span className="font-medium">
                      {formData.semester === "fall"
                        ? "Fall 2025"
                        : formData.semester === "spring"
                          ? "Spring 2026"
                          : formData.semester === "summer"
                            ? "Summer 2026"
                            : "Winter 2025"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 font-medium text-lg">
                    <span>Total Amount:</span>
                    <span className="text-blue-700">${formData.amount}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Name on card"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="123"
                      maxLength="4"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the terms and conditions of payment and understand that this amount will be charged to
                      my card.
                    </span>
                  </label>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Previous
                  </button>
                  <button
                    type="submit"
                    disabled={!isStep3Valid || isSubmitting}
                    className={`flex items-center px-6 py-2 rounded-md ${
                      isStep3Valid && !isSubmitting
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        Complete Payment <DollarSign size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <div className="bg-green-50 p-6 rounded-lg mb-6 text-center">
                <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-4">
                  Your payment of ${formData.amount} for {feeTypes[formData.feeType].name} has been processed
                  successfully.
                </p>
                <div className="border-t border-green-200 pt-4 mt-4">
                  <p className="text-gray-500 text-sm">Transaction ID: {paymentId}</p>
                  <p className="text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 shadow-sm">
                <h3 className="font-medium mb-4 text-blue-700 text-lg">Payment Receipt</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Student Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student ID:</span>
                        <span className="font-medium">{formData.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Student Name:</span>
                        <span className="font-medium">{formData.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Campus:</span>
                        <span className="font-medium">{schools[formData.school]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Program:</span>
                        <span className="font-medium">{programs[formData.program]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Payment Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fee Type:</span>
                        <span className="font-medium">{feeTypes[formData.feeType].name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Semester:</span>
                        <span className="font-medium">
                          {formData.semester === "fall"
                            ? "Fall 2025"
                            : formData.semester === "spring"
                              ? "Spring 2026"
                              : formData.semester === "summer"
                                ? "Summer 2026"
                                : "Winter 2025"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Academic Year:</span>
                        <span className="font-medium">{formData.academicYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span className="font-medium text-green-600">${formData.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={downloadReceipt}
                    className="flex items-center px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md"
                  >
                    <Download size={16} className="mr-2" /> Download Receipt
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <Info size={20} className="text-blue-500 mr-2 mt-1" />
                  <div>
                    <p className="text-sm text-blue-700 mb-2">
                      A receipt has been sent to your registered email address. Please keep it for your records.
                    </p>
                    <p className="text-sm text-blue-700">
                      If you have any questions about your payment, please contact the finance office at
                      finance@university.edu or call (555) 123-4567.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={resetForm} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Make Another Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-blue-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                <span className="font-medium">University Payment System</span>
              </div>
              <p className="text-xs text-blue-200 mt-1">Secure payments for your academic journey</p>
            </div>
            <div className="text-sm text-blue-200">
              <p>© {new Date().getFullYear()} University Name. All rights reserved.</p>
              <p>Contact: finance@university.edu | (555) 123-4567</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SchoolFees
