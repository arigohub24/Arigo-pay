import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

const CurrencyLoader = () => {
  const [amount, setAmount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          // Show completion state for longer
          setTimeout(() => setShowComplete(true), 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // Slightly slower interval

    return () => clearInterval(interval);
  }, []);

  const currencySymbols = ['$', '€', '£', '¥', '₹'];
  const randomSymbol = currencySymbols[Math.floor(Math.random() * currencySymbols.length)];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 transform hover:scale-[1.01]">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Arigo Pay
          </h1>
          <p className="text-sm text-gray-500 mt-1">Pay with Arigo - Secure Payment Gateway</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-medium text-gray-800">
            {isComplete ? 'Payment Completed' : 'Processing Payment'}
          </div>
          {isComplete ? (
            <div className="text-green-500 flex items-center gap-1 animate-pulse">
              <CheckCircle className="w-5 h-5" />
              <span>Success</span>
            </div>
          ) : (
            <div className="text-blue-500 flex items-center gap-1">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{Math.min(amount, 100)}%</span>
            </div>
          )}
        </div>

        <div className="relative h-3 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 transition-all duration-300 ease-out"
            style={{ width: `${amount}%` }}
          />
          {!isComplete && (
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>

        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="bg-blue-50 p-5 rounded-xl text-blue-600 font-bold text-3xl shadow-inner border border-blue-100 transition-all duration-300 hover:scale-105">
            {amount.toFixed(0)}{randomSymbol}
          </div>
          <ArrowRight className="text-gray-400 w-6 h-6 animate-pulse" />
          <div className="bg-green-50 p-5 rounded-xl text-green-600 font-bold text-2xl shadow-inner border border-green-100 transition-all duration-300 hover:scale-105">
            Account
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-2">
          {isComplete ? (
            showComplete ? (
              <div className="animate-bounce text-green-600 font-medium">
                Payment successfully processed!
              </div>
            ) : (
              'Finalizing transaction...'
            )
          ) : (
            <div className="flex justify-center items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Securely transferring your funds</span>
            </div>
          )}
        </div>

        {showComplete && (
          <button 
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-300"
            onClick={() => console.log('Continue clicked')}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrencyLoader;