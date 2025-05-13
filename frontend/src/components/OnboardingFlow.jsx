"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle, Mail, ArrowRight, RefreshCw, Eye, EyeOff, Lock,  Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

const OnboardingFlow = ({ onComplete }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [securityQuestion, setSecurityQuestion] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const timerRef = useRef(null)

  // Total number of steps in the onboarding process
  const totalSteps = 7

  // Get user data from React Query cache
  const authUserData = queryClient.getQueryData(["authUser"])
  const authUser = authUserData || {}

  useEffect(() => {
    // If user already has email, pre-fill it
    if (authUser.email) {
      setEmail(authUser.email)
    }

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [authUser])

  const startCountdown = () => {
    setCountdown(30)
    setCanResend(false)

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current)
          timerRef.current = null
          setCanResend(true)
          return 0
        }
        return prevCount - 1
      })
    }, 1000)
  }

  const handleSendCode = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // In a real app, you would make an API call to send verification code
    // fetch("/api/auth/send-verification", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setIsLoading(false);
    //     if (data.error) {
    //       setError(data.error);
    //     } else {
    //       setCurrentStep(2);
    //       startCountdown();
    //     }
    //   })
    //   .catch(err => {
    //     setIsLoading(false);
    //     setError("Failed to send verification code. Please try again.");
    //   });

    // For demo purposes
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(2)
      startCountdown()
    }, 1500)
  }

  const handleVerifyCode = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code")
      setIsLoading(false)
      return
    }

    // In a real app, you would make an API call to verify the code
    // fetch("/api/auth/verify-code", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, code: verificationCode })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setIsLoading(false);
    //     if (data.error) {
    //       setError(data.error);
    //     } else {
    //       setCurrentStep(3);
    //       queryClient.invalidateQueries({ queryKey: ["authUser"] });
    //     }
    //   })
    //   .catch(err => {
    //     setIsLoading(false);
    //     setError("Failed to verify code. Please try again.");
    //   });

    // For demo purposes
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(3)
      // Invalidate the auth user query to refresh user data
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    }, 1500)
  }

  const handleResendCode = () => {
    if (!canResend) return
    setIsLoading(true)
    setCanResend(false)

    // In a real app, you would make an API call to resend the code
    // fetch("/api/auth/resend-verification", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setIsLoading(false);
    //     if (data.error) {
    //       setError(data.error);
    //     } else {
    //       startCountdown();
    //     }
    //   })
    //   .catch(err => {
    //     setIsLoading(false);
    //     setError("Failed to resend code. Please try again.");
    //   });

    // For demo purposes
    setTimeout(() => {
      setIsLoading(false)
      startCountdown()
    }, 1500)
  }

  const handleWelcomeComplete = () => {
    setCurrentStep(4)
  }

  const handleCreatePin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (pin.length !== 6) {
      setError("PIN must be 6 digits")
      setIsLoading(false)
      return
    }

    // For demo purposes
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(5)
    }, 1000)
  }

  const handleConfirmPin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (pin !== confirmPin) {
      setError("PINs do not match")
      setIsLoading(false)
      return
    }

    // For demo purposes
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(6)
    }, 1000)
  }

  const handleSetupRecovery = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!securityQuestion || !securityAnswer) {
      setError("Please complete all fields")
      setIsLoading(false)
      return
    }

    // In a real app, you would make an API call to save the security question
    // fetch("/api/user/set-security-question", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     securityQuestion,
    //     securityAnswer,
    //     pin: pin // In a real app, you would encrypt this
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setIsLoading(false);
    //     if (data.error) {
    //       setError(data.error);
    //     } else {
    //       setCurrentStep(7);
    //     }
    //   })
    //   .catch(err => {
    //     setIsLoading(false);
    //     setError("Failed to set up recovery. Please try again.");
    //   });

    // For demo purposes
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(7)
    }, 1000)
  }

  const handlePinChange = (e, setter) => {
    const value = e.target.value
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setter(value)
    }
  }

  const handleCompletionContinue = () => {
    // Call the onComplete callback to update the parent component
    if (onComplete) {
      onComplete()
    }

    // In a real app, you would make an API call to update the user's onboarding status
    // fetch("/api/user/complete-onboarding", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     // Update local storage
    //     localStorage.setItem("onboardingComplete", "true");
    //     // Invalidate the auth user query to refresh user data
    //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
    //     // Navigate to dashboard
    //     navigate("/dashboard");
    //   })
    //   .catch(err => {
    //     setError("Failed to complete onboarding. Please try again.");
    //   });

    // For demo purposes
    localStorage.setItem("onboardingComplete", "true")
    queryClient.invalidateQueries({ queryKey: ["authUser"] })
    navigate("/dashboard")
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Verify Your Email"
      case 2:
        return "Enter Verification Code"
      case 3:
        return "Welcome to Arigo Pay"
      case 4:
        return "Create Transaction PIN"
      case 5:
        return "Confirm Transaction PIN"
      case 6:
        return "Set Up PIN Recovery"
      case 7:
        return "Setup Complete"
      default:
        return "Onboarding"
    }
  }

  // Background animation variants
  const backgroundVariants = {
    initial: {
      backgroundPosition: "0% 0%",
    },
    animate: {
      backgroundPosition: "100% 100%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  }

  // Floating particles component
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -window.innerHeight],
              x: [null, Math.random() * window.innerWidth * 0.2 - window.innerWidth * 0.1 + parseFloat(`${i}00`)],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #3b82f6 100%)",
        backgroundSize: "400% 400%",
      }}
    >
      <FloatingParticles />

      <div className="absolute inset-0 flex items-center justify-center px-4 py-6 sm:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <motion.div
            className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full translate-x-16 translate-y-16" />

            <div className="relative p-6 sm:p-8">
              {/* Header with step indicator */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
                  <motion.h1
                    className="text-xl sm:text-2xl font-bold text-blue-800 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {getStepTitle()}
                  </motion.h1>
                  <div className="flex space-x-2">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: i + 1 === currentStep ? 1.25 : 1,
                          backgroundColor:
                            i + 1 === currentStep ? "#3b82f6" : i + 1 < currentStep ? "#10b981" : "#e5e7eb",
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  />
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {/* Step 1: Enter Email */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4 sm:mb-6"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-md">
                          <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6"
                      >
                        Well send a verification code to your email
                      </motion.p>
                      <form onSubmit={handleSendCode}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="mb-4 sm:mb-6"
                        >
                          <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base text-gray-800 placeholder-gray-400"
                            placeholder="example@email.com"
                            required
                            disabled={!!authUser.email} // Disable if email is already set
                          />
                        </motion.div>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-md"
                          >
                            {error}
                          </motion.div>
                        )}
                        <motion.button
                          type="submit"
                          disabled={isLoading || !email}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className={`w-full py-2 sm:py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                            isLoading || !email
                              ? "bg-blue-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                          }`}
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                          ) : (
                            <>
                              Send Verification Code
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 2: Enter Verification Code */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4 sm:mb-6"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-md">
                          <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6"
                      >
                        We sent a 6-digit code to <span className="font-medium text-blue-600">{email}</span>
                      </motion.p>
                      <form onSubmit={handleVerifyCode}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="mb-4 sm:mb-6"
                        >
                          <label htmlFor="code" className="block text-sm font-medium text-blue-800 mb-1">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            id="code"
                            maxLength={6}
                            value={verificationCode}
                            onChange={(e) => handlePinChange(e, setVerificationCode)}
                            className="w-full text-center tracking-wider text-lg sm:text-xl px-3 py-2 sm:px-4 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                            placeholder="••••••"
                            required
                          />
                        </motion.div>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-md"
                          >
                            {error}
                          </motion.div>
                        )}
                        <motion.button
                          type="submit"
                          disabled={isLoading || verificationCode.length !== 6}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className={`w-full py-2 sm:py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                            isLoading || verificationCode.length !== 6
                              ? "bg-blue-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                          }`}
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                          ) : (
                            "Verify Code"
                          )}
                        </motion.button>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="text-center mt-4 sm:mt-6"
                        >
                          <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={!canResend || isLoading}
                            className={`text-xs sm:text-sm font-medium transition-all ${
                              canResend && !isLoading
                                ? "text-blue-600 hover:text-blue-700"
                                : "text-blue-300 cursor-not-allowed"
                            }`}
                          >
                            {canResend ? "Resend Code" : `Resend code in ${countdown}s`}
                          </button>
                        </motion.div>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 3: Welcome */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="flex justify-center mb-4">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                            className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Sparkles className="w-8 h-8 text-blue-600" />
                          </motion.div>
                        </div>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="text-base text-blue-700 text-center mb-6 px-2"
                        >
                          Congratulations on verifying your email! Youre now part of our trusted community. Lets embark
                          on a journey to secure your financial future.
                        </motion.p>

                        {/* About Arigo Pay */}
                        <motion.section
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="mb-6"
                        >
                          <h2 className="text-lg font-semibold mb-3 text-center text-blue-800">About Arigo Pay</h2>
                          <p className="text-blue-700 text-sm leading-relaxed px-2">
                            At Arigo Pay, we prioritize your financial success with innovative payment solutions,
                            top-tier security, and personalized support. Whether youre saving for a dream, investing for
                            the future, or managing daily expenses, were here to empower you every step of the way.
                          </p>
                        </motion.section>

                        {/* Tier System */}
                        <motion.section
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <h2 className="text-lg font-semibold mb-4 text-center text-blue-800">
                            Our Transfer Limit Tier System
                          </h2>
                          <p className="text-blue-700 text-sm mb-4 text-center px-2">
                            Enjoy different transfer limits based on your tier level. Each tier has specific requirements
                            and offers enhanced benefits.
                          </p>
                          <div className="grid grid-cols-1 gap-4">
                            {/* Tier 1 */}
                            <motion.div
                              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                              transition={{ duration: 0.3 }}
                              className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 text-center shadow-md"
                            >
                              <h3 className="text-lg font-semibold text-blue-800 mb-2">Tier 1: Standard</h3>
                              <p className="text-blue-700 text-sm mb-3">Begin with essential banking features:</p>
                              <ul className="text-blue-600 text-xs space-y-1">
                                <li>
                                  <strong>Transfer Limit:</strong> Up to $200,000
                                </li>
                                <li>Online and mobile banking</li>
                                <li>Basic account management</li>
                              </ul>
                              <p className="text-blue-600 mt-3 text-xs font-medium">
                                <strong>Requirements:</strong> Minimum balance of $5,000 or regular monthly deposits of
                                $1,000
                              </p>
                            </motion.div>

                            {/* Tier 2 */}
                            <motion.div
                              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                              transition={{ duration: 0.3 }}
                              className="bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 rounded-lg p-4 text-center shadow-md"
                            >
                              <h3 className="text-lg font-semibold text-blue-800 mb-2">Tier 2: Premium</h3>
                              <p className="text-blue-700 text-sm mb-3">Unlock enhanced transfer capabilities:</p>
                              <ul className="text-blue-600 text-xs space-y-1">
                                <li>
                                  <strong>Transfer Limit:</strong> $200,000 - $500,000
                                </li>
                                <li>Priority customer support</li>
                                <li>Reduced transaction fees</li>
                              </ul>
                              <p className="text-blue-600 mt-3 text-xs font-medium">
                                <strong>Requirements:</strong> Minimum balance of $50,000 or combined deposits/investments
                                of $100,000
                              </p>
                            </motion.div>

                            {/* Tier 3 */}
                            <motion.div
                              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                              transition={{ duration: 0.3 }}
                              className="bg-gradient-to-br from-blue-200 to-blue-300 border border-blue-400 rounded-lg p-4 text-center shadow-md"
                            >
                              <h3 className="text-lg font-semibold text-blue-800 mb-2">Tier 3: Elite</h3>
                              <p className="text-blue-700 text-sm mb-3">Enjoy premium banking privileges:</p>
                              <ul className="text-blue-600 text-xs space-y-1">
                                <li>
                                  <strong>Transfer Limit:</strong> Above $500,000
                                </li>
                                <li>Personal financial advisor</li>
                                <li>Exclusive investment opportunities</li>
                              </ul>
                              <p className="text-blue-600 mt-3 text-xs font-medium">
                                <strong>Requirements:</strong> Minimum balance of $250,000 or total relationship value of
                                $500,000+
                              </p>
                            </motion.div>
                          </div>
                        </motion.section>

                        {/* Call to Action */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1 }}
                          className="text-center mt-6"
                        >
                          <h3 className="text-lg font-semibold mb-3 text-blue-800">Start Your Journey Today</h3>
                          <p className="text-blue-700 text-sm mb-4 px-2">
                            Next, lets set up your transaction PIN to secure your account and begin climbing the tiers
                            to unlock higher transfer limits and exclusive benefits!
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-md font-medium text-sm shadow-lg"
                            onClick={handleWelcomeComplete}
                          >
                            Continue to PIN Setup
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Step 4: Create PIN */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4 sm:mb-6"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-md">
                          <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6"
                      >
                        This PIN will be used to authorize all your transactions
                      </motion.p>
                      <form onSubmit={handleCreatePin}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="mb-4 sm:mb-6"
                        >
                          <label htmlFor="pin" className="block text-sm font-medium text-blue-800 mb-1">
                            6-Digit Transaction PIN
                          </label>
                          <div className="relative">
                            <input
                              type={showPin ? "text" : "password"}
                              id="pin"
                              maxLength={6}
                              value={pin}
                              onChange={(e) => handlePinChange(e, setPin)}
                              className="w-full text-center tracking-wider text-lg sm:text-xl px-3 py-2 sm:px-4 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="••••••"
                              required
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={() => setShowPin(!showPin)}
                            >
                              {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showPin ? "Hide PIN" : "Show PIN"}</span>
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            PIN must be 6 digits and will be used for all transactions
                          </p>
                        </motion.div>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-md"
                          >
                            {error}
                          </motion.div>
                        )}
                        <motion.button
                          type="submit"
                          disabled={isLoading || pin.length !== 6}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className={`w-full py-2 sm:py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                            isLoading || pin.length !== 6
                              ? "bg-blue-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                          }`}
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                          ) : (
                            <>
                              Continue
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 5: Confirm PIN */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4 sm:mb-6"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-md">
                          <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6"
                      >
                        Please re-enter your PIN to confirm
                      </motion.p>
                      <form onSubmit={handleConfirmPin}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="mb-4 sm:mb-6"
                        >
                          <label htmlFor="confirmPin" className="block text-sm font-medium text-blue-800 mb-1">
                            Re-enter 6-Digit PIN
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPin ? "text" : "password"}
                              id="confirmPin"
                              maxLength={6}
                              value={confirmPin}
                              onChange={(e) => handlePinChange(e, setConfirmPin)}
                              className="w-full text-center tracking-wider text-lg sm:text-xl px-3 py-2 sm:px-4 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="••••••"
                              required
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={() => setShowConfirmPin(!showConfirmPin)}
                            >
                              {showConfirmPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showConfirmPin ? "Hide PIN" : "Show PIN"}</span>
                            </button>
                          </div>
                        </motion.div>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-md"
                          >
                            {error}
                          </motion.div>
                        )}
                        <motion.button
                          type="submit"
                          disabled={isLoading || confirmPin.length !== 6}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className={`w-full py-2 sm:py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                            isLoading || confirmPin.length !== 6
                              ? "bg-blue-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                          }`}
                        >
                          {isLoading ? <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" /> : "Confirm PIN"}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 6: Set up recovery */}
                  {currentStep === 6 && (
                    <motion.div
                      key="step6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4 sm:mb-6"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-md">
                          <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6"
                      >
                        Add a security question to recover your PIN if forgotten
                      </motion.p>
                      <form onSubmit={handleSetupRecovery}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="mb-4 sm:mb-6"
                        >
                          <label htmlFor="securityQuestion" className="block text-sm font-medium text-blue-800 mb-1">
                            Security Question
                          </label>
                          <select
                            id="securityQuestion"
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base text-gray-800"
                            required
                          >
                            <option value="">Select a security question</option>
                            <option value="pet">What was your first pets name?</option>
                            <option value="school">What elementary school did you attend?</option>
                            <option value="city">In what city were you born?</option>
                            <option value="mother">What is your mothers maiden name?</option>
                            <option value="car">What was your first car?</option>
                          </select>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="mb-4 sm:mb-6"
                        >
                          <label htmlFor="securityAnswer" className="block text-sm font-medium text-blue-800 mb-1">
                            Your Answer
                          </label>
                          <input
                            type="text"
                            id="securityAnswer"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                            placeholder="Your answer"
                            required
                          />
                        </motion.div>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded-md"
                          >
                            {error}
                          </motion.div>
                        )}
                        <motion.button
                          type="submit"
                          disabled={isLoading || !securityQuestion || !securityAnswer}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className={`w-full py-2 sm:py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                            isLoading || !securityQuestion || !securityAnswer
                              ? "bg-blue-300 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                          }`}
                        >
                          {isLoading ? <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" /> : "Set Up Recovery"}
                        </motion.button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 7: Setup Complete */}
                  {currentStep === 7 && (
                    <motion.div
                      key="step7"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                        className="flex justify-center mb-4 sm:mb-6"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <h2 className="text-base sm:text-lg font-semibold text-blue-800 text-center mb-2">
                          Onboarding Complete!
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6">
                          Your account has been set up successfully. Youre ready to start banking with Arigo Pay!
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg mb-6 shadow-md"
                      >
                        <h3 className="text-sm font-medium text-blue-800 mb-2">Important Security Tips:</h3>
                        <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                          <li>Never share your PIN with anyone</li>
                          <li>Bank staff will never ask for your complete PIN</li>
                          <li>Change your PIN regularly</li>
                          <li>Dont use easily guessable numbers (birthdays, etc.)</li>
                          <li>Always log out when youre done</li>
                        </ul>
                      </motion.div>
                      <motion.button
                        onClick={handleCompletionContinue}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-medium transition-all text-sm sm:text-base shadow-lg"
                      >
                        Continue to Dashboard
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default OnboardingFlow

