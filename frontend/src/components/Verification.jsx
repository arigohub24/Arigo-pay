import { useState, useEffect, useRef } from "react";
import { CheckCircle, Mail, ArrowRight, RefreshCw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

const Verification = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState(state?.email || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  // Check authentication status on mount
  const authUserData = queryClient.getQueryData(["authUser"]);
  const authUser = authUserData?.data || {};

  useEffect(() => {
    if (authUser?.isVerified) {
      navigate("/welcome");
    }
    
    // If email is not provided in state, redirect to previous page
    if (step === 1 && !state?.email && !email) {
      // You might want to redirect to a specific page instead
      // navigate(-1);
    }
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [authUser, navigate, state, email, step]);

  const handleSendCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      startCountdown();
    }, 1500);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
      setStep(3);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }, 1500);
  };

  const handleResendCode = () => {
    if (!canResend) return;
    setIsLoading(true);
    setCanResend(false);
    setTimeout(() => {
      setIsLoading(false);
      startCountdown();
    }, 1500);
  };

  const startCountdown = () => {
    setCountdown(30);
    setCanResend(false);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setCanResend(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setVerificationCode(value);
    }
  };

  const handleContinue = () => {
    navigate("/welcome");
  };

  // For demo purposes, ensure all steps can be seen
  const simulateStepChange = (nextStep) => {
    setStep(nextStep);
    if (nextStep === 2) {
      startCountdown();
    }
    if (nextStep === 3) {
      setIsVerified(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-6 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        {/* Header with step indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-800 text-center">
              Verify Your Account
            </h1>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i === step ? 1.25 : 1,
                    backgroundColor:
                      i === step ? "#3b82f6" : i < step ? "#10b981" : "#e5e7eb",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                />
              ))}
            </div>
          </div>
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-1 bg-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* For demo purposes */}
        <div className="mb-4 flex justify-center gap-2">
          <button
            onClick={() => simulateStepChange(1)}
            className={`px-3 py-1 rounded text-xs ${
              step === 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Step 1
          </button>
          <button
            onClick={() => simulateStepChange(2)}
            className={`px-3 py-1 rounded text-xs ${
              step === 2 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Step 2
          </button>
          <button
            onClick={() => simulateStepChange(3)}
            className={`px-3 py-1 rounded text-xs ${
              step === 3 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Step 3
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Enter Email */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-blue-800 text-center mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6">
                Well send a verification code to your email
              </p>
              <form onSubmit={handleSendCode}>
                <div className="mb-4 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-800 mb-1"
                  >
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
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className={`w-full py-2 sm:py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                    isLoading || !email
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
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
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 2: Enter Verification Code */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-blue-800 text-center mb-2">
                Enter Verification Code
              </h2>
              <p className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-blue-600">{email}</span>
              </p>
              <form onSubmit={handleVerifyCode}>
                <div className="mb-4 sm:mb-6">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-blue-800 mb-1"
                  >
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    maxLength={6}
                    value={verificationCode}
                    onChange={handlePinChange}
                    className="w-full text-center tracking-wider text-lg sm:text-xl px-3 py-2 sm:px-4 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 placeholder-gray-400"
                    placeholder="••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || verificationCode.length !== 6}
                  className={`w-full py-2 sm:py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                    isLoading || verificationCode.length !== 6
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                  ) : (
                    "Verify Code"
                  )}
                </button>
                <div className="text-center mt-4 sm:mt-6">
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
                    {canResend
                      ? "Resend Code"
                      : `Resend code in ${countdown}s`}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Verification Success */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-blue-800 text-center mb-2">
                Verification Successful!
              </h2>
              <p className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6">
                Your email has been verified successfully
              </p>
              <button
                onClick={handleContinue}
                className="w-full py-2 sm:py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all text-sm sm:text-base"
              >
                Continue to Welcome
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Verification;