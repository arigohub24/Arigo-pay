import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Shield, Lock, Server, Key, Activity, Award, Bell } from 'lucide-react';

const EnhancedArigoLoader = () => {
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Initializing secure connection...');
  const [cycleCount, setCycleCount] = useState(0);
  const [showIcon, setShowIcon] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(1);
  const [particleCount, setParticleCount] = useState(20);
  const [shakeEffect, setShakeEffect] = useState(false);
  
  // Icons for rotating security display
  const securityIcons = [
    <Lock key="lock" className="w-6 h-6 text-blue-500" />,
    <Shield key="shield" className="w-6 h-6 text-purple-600" />,
    <Server key="server" className="w-6 h-6 text-indigo-500" />,
    <Key key="key" className="w-6 h-6 text-blue-600" />,
  ];

  // Enhanced loading messages with more technical and security-focused content
  const messages = [
    'Initializing secure connection...',
    'Establishing encrypted channel...',
    'Creating multi-layer protection...',
    'Validating cryptographic keys...',
    'Verifying account credentials...',
    'Processing secure transaction...',
    'Applying bank security protocols...',
    'Creating encrypted data tunnel...',
    'Running AI fraud detection...',
    'Confirming biometric identity...',
    'Securing transaction network...',
    'Finalizing encrypted process...',
    'Performing quantum-resistant check...',
    'Validating blockchain backup...',
    'Completing secure process...',
  ];

  // Function to trigger shake effect
  const triggerShakeEffect = useCallback(() => {
    setShakeEffect(true);
    setTimeout(() => setShakeEffect(false), 820);
  }, []);

  // Security level updater
  useEffect(() => {
    if (progress < 100) {
      const levelInterval = setInterval(() => {
        setSecurityLevel((prev) => (prev >= 3 ? 1 : prev + 1));
        // Trigger shake effect when security level changes
        triggerShakeEffect();
      }, 4500);
      return () => clearInterval(levelInterval);
    }
  }, [progress, triggerShakeEffect]);

  // Main animation controller
  useEffect(() => {
    if (!animate) return;
    
    // Rotate through security icons
    const iconInterval = setInterval(() => {
      setShowIcon((prev) => (prev >= securityIcons.length - 1 ? 0 : prev + 1));
    }, 2500);
    
    // Control progress animation speed
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnimate(false);
          return 100;
        }
        
        // Random speed variations to make it feel more realistic
        const increment = 0.3 + Math.random() * 0.3;
        return Math.min(prev + increment, 100);
      });
    }, 95);

    // Adjust particle count based on progress
    const particleInterval = setInterval(() => {
      if (progress > 75) {
        setParticleCount(Math.min(particleCount + 2, 40));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(iconInterval);
      clearInterval(particleInterval);
    };
  }, [animate, progress, particleCount, securityIcons.length]);

  // Message and cycle controller
  useEffect(() => {
    // Update loading message based on progress
    const messageIndex = Math.min(
      Math.floor((progress / 100) * messages.length),
      messages.length - 1
    );
    setLoadingMessage(messages[messageIndex]);

    // Handle completion and cycling
    if (progress === 100) {
      // Add slight delay before celebrating completion
      setTimeout(() => {
        if (cycleCount < 2) {
          // Reset and run animation again (3 times total)
          setProgress(0);
          setAnimate(true);
          setCycleCount((prev) => prev + 1);
          setParticleCount(20); // Reset particles
        }
      }, 4000);
    }
  }, [progress, messages, cycleCount]);

  // Calculate activity level based on progress
  const activityLevel = Math.min(Math.floor(progress / 20) + 1, 5);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white relative overflow-hidden">
      {/* Background security particles */}
      {Array(particleCount).fill().map((_, i) => (
        <div 
          key={i} 
          className="absolute rounded-full bg-blue-500 opacity-30"
          style={{
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 15}s linear infinite, 
                       fadeInOut ${Math.random() * 5 + 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      
      {/* Grid pattern background for tech feel */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: 'linear-gradient(to right, #9333ea 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
             backgroundSize: '20px 20px'
           }} />
      
      {/* Arigo Pay Logo with enhanced animation */}
      <div className="relative z-10">
        <div 
          className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 ${shakeEffect ? 'animate-pulse' : ''}`}
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          Arigo Pay
        </div>
        <div className="text-sm text-center mt-2 text-gray-500">
          Advanced Security System • Level {securityLevel}
        </div>
      </div>

      {/* Enhanced Vault Animation */}
      <div 
        className={`relative w-56 h-56 mt-12 ${shakeEffect ? 'animate-bounce' : ''}`} 
        style={{ animation: `glow 4s infinite ${shakeEffect ? ', shake 0.82s cubic-bezier(.36,.07,.19,.97) both' : ''}` }}
      >
        {/* Outer ring with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-1 animate-pulse">
          <div className="w-full h-full rounded-full bg-white"></div>
        </div>

        {/* Security level indicator ring */}
        <div className="absolute inset-1 rounded-full overflow-hidden">
          <div 
            className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500"
            style={{ 
              clipPath: `polygon(0 0, 100% 0, 100% ${securityLevel * 33}%, 0 ${securityLevel * 33}%)`,
              transition: 'clip-path 1s ease-in-out'
            }}
          />
        </div>

        {/* Main vault door with more detailed gradient */}
        <div className="absolute inset-3 rounded-full border-8 border-purple-600 bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow-lg"></div>
        
        {/* Activity indicators */}
        {Array(5).fill().map((_, i) => (
          <div 
            key={i}
            className={`absolute w-4 h-4 rounded-full ${i < activityLevel ? 'bg-green-500' : 'bg-gray-300'}`}
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-62px)`,
              transition: 'background-color 0.5s ease',
              boxShadow: i < activityLevel ? '0 0 10px rgba(34, 197, 94, 0.7)' : 'none'
            }}
          />
        ))}

        {/* Rotating mechanism */}
        <div 
          className="absolute inset-6 rounded-full border-4 border-dashed border-blue-500"
          style={{ 
            animation: "spin 15s linear infinite",
            transformOrigin: "center"
          }}
        ></div>

        {/* Secondary rotating ring */}
        <div 
          className="absolute inset-10 rounded-full border-2 border-dotted border-purple-400"
          style={{ 
            animation: "spin 10s linear infinite reverse",
            transformOrigin: "center"
          }}
        ></div>

        {/* Third rotating ring */}
        <div 
          className="absolute inset-14 rounded-full border-1 border-blue-300"
          style={{ 
            animation: "spin 7s linear infinite",
            transformOrigin: "center"
          }}
        ></div>

        {/* Center handle with rotating icons */}
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full z-20 shadow-lg flex items-center justify-center" 
             style={{ transform: 'translate(-50%, -50%)' }}>
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <div className="transition-all duration-500" key={showIcon}>
              {securityIcons[showIcon]}
            </div>
          </div>
        </div>

        {/* Security bolts with enhanced animation */}
        {Array(18).fill().map((_, i) => {
          // Alternate between purple and blue
          const color = i % 2 === 0 
            ? `linear-gradient(45deg, #9333ea, #3b82f6)` 
            : `linear-gradient(45deg, #3b82f6, #9333ea)`;
          
          return (
            <div 
              key={i} 
              className="absolute w-4 h-4 rounded-full shadow-lg"
              style={{
                background: color,
                top: `${50 + 46 * Math.sin(i * Math.PI / 9)}%`,
                left: `${50 + 46 * Math.cos(i * Math.PI / 9)}%`,
                transform: "translate(-50%, -50%)",
                animation: `pulse 3s ease-in-out ${i * 0.15}s infinite alternate`
              }}
            />
          );
        })}
      </div>

      {/* Enhanced Progress Bar with pulse effect */}
      <div className="w-80 h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner relative mt-12">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`,
            backgroundSize: "200% 100%",
            animation: "gradient-shift 2s ease infinite",
          }}
        />
        {/* Moving highlight effect */}
        <div 
          className="absolute h-full w-20 bg-white opacity-30"
          style={{
            top: 0,
            left: `${Math.min(progress - 20, 80)}%`,
            animation: "moveHighlight 2s linear infinite",
            display: progress < 100 ? 'block' : 'none'
          }}
        />
        {/* Percentage indicator */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-semibold text-white">
          {progress < 100 ? `${Math.floor(progress)}% Secure` : 'Complete'}
        </div>
      </div>

      {/* Status Message with improved styling */}
      <div className="flex flex-col items-center space-y-3 mt-6">
        <div className="text-base font-medium text-gray-700 min-h-[24px]">
          {progress < 100 ? (
            <span className="animate-pulse flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              {loadingMessage}
            </span>
          ) : (
            <span className="flex items-center text-green-600 gap-2 font-semibold">
              <CheckCircle className="w-5 h-5" />
              Transaction Secured Successfully
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 max-w-xs text-center">
          {progress < 100 
            ? 'Multi-layered quantum-resistant encryption protecting your financial data'
            : 'Your transaction is complete and secured with blockchain verification'}
        </div>
      </div>

      {/* Enhanced security badges */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex items-center gap-1 text-xs bg-blue-50 px-3 py-1 rounded-full text-blue-700 border border-blue-100">
          <Shield className="w-3 h-3 text-blue-500" />
          <span>256-bit AES Encryption</span>
        </div>
        <div className="flex items-center gap-1 text-xs bg-purple-50 px-3 py-1 rounded-full text-purple-700 border border-purple-100">
          <Lock className="w-3 h-3 text-purple-500" />
          <span>Bank-Level Security</span>
        </div>
        <div className="flex items-center gap-1 text-xs bg-indigo-50 px-3 py-1 rounded-full text-indigo-700 border border-indigo-100">
          <Award className="w-3 h-3 text-indigo-500" />
          <span>ISO 27001 Certified</span>
        </div>
        <div className="flex items-center gap-1 text-xs bg-green-50 px-3 py-1 rounded-full text-green-700 border border-green-100">
          <Bell className="w-3 h-3 text-green-500" />
          <span>24/7 Fraud Monitoring</span>
        </div>
      </div>
      
    </div>
  );
};

export default EnhancedArigoLoader;