import  { useState,  } from 'react';
import { CheckCircle, Mail, ArrowRight, RefreshCw } from 'lucide-react';

const Verification = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  // Handle form submission to request verification code
  const handleSendCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to send verification code
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      startCountdown();
    }, 1500);
  };
  
  // Handle verification code submission
  const handleVerifyCode = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to verify code
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
      setStep(3);
    }, 1500);
  };
  
  // Handle resend code
  const handleResendCode = () => {
    if (!canResend) return;
    
    setIsLoading(true);
    setCanResend(false);
    
    // Simulate API call to resend verification code
    setTimeout(() => {
      setIsLoading(false);
      startCountdown();
    }, 1500);
  };
  
  // Start countdown for resend button
  const startCountdown = () => {
    setCountdown(30);
    setCanResend(false);
    
    const timer = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };
  
  // Pin input logic
  const handlePinChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setVerificationCode(value);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 ease-in-out">
        {/* Header with step indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Verify Your Account</h1>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === step ? 'bg-blue-500 scale-125' : 
                    i < step ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="h-1 w-full bg-gray-100 rounded-full">
            <div 
              className="h-1 bg-blue-500 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                <Mail size={36} className="text-blue-500" />
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-center mb-2 text-gray-700">Verify Your Email</h2>
            <p className="text-gray-500 text-center mb-6">Well send a verification code to your email</p>
            
            <form onSubmit={handleSendCode}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={isLoading || !email}
                className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all ${
                  isLoading || !email ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <RefreshCw size={20} className="animate-spin mr-2" />
                ) : (
                  <>
                    Send Verification Code
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
        
        {/* Step 2: Enter Verification Code */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                <Mail size={36} className="text-blue-500" />
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-center mb-2 text-gray-700">Enter Verification Code</h2>
            <p className="text-gray-500 text-center mb-6">We sent a 6-digit code to <span className="font-medium text-blue-600">{email}</span></p>
            
            <form onSubmit={handleVerifyCode}>
              <div className="mb-6">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                <input
                  type="text"
                  id="code"
                  maxLength={6}
                  value={verificationCode}
                  onChange={handlePinChange}
                  className="w-full text-center tracking-widest text-xl px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••"
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all ${
                  isLoading || verificationCode.length !== 6 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <RefreshCw size={20} className="animate-spin mr-2" />
                ) : (
                  'Verify Code'
                )}
              </button>
              
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={!canResend || isLoading}
                  className={`text-sm font-medium transition-all ${
                    canResend && !isLoading ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canResend ? 'Resend Code' : `Resend code in ${countdown}s`}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Step 3: Verification Success */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle size={36} className="text-green-500" />
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-center mb-2 text-gray-700">Verification Successful!</h2>
            <p className="text-gray-500 text-center mb-6">Your email has been verified successfully</p>
            
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-all"
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
      
 
    </div>
  );
};

export default Verification;