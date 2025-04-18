import { useState, useEffect } from 'react';
import { User, CreditCard, Wallet, ChevronRight, Settings, Bell, Lock, LogOut, Activity } from 'lucide-react';

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ setActiveSection] = useState(null);

  // Simulate user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    accountNumber: "****5678",
    balance: "$12,450.75",
    savingsBalance: "$35,890.20",
    profilePic: "/api/placeholder/120/120"
  };

  useEffect(() => {
    // Animate components on mount
    setIsLoaded(true);
    
    // Simulate data loading with staggered animations
    const timer = setTimeout(() => {
      setActiveSection('main');
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { icon: <CreditCard size={20} />, label: "My Cards", badge: "3" },
    { icon: <Wallet size={20} />, label: "Transactions", badge: "" },
    { icon: <Activity size={20} />, label: "Statistics", badge: "New" },
    { icon: <Bell size={20} />, label: "Notifications", badge: "5" },
    { icon: <Settings size={20} />, label: "Settings", badge: "" },
    { icon: <Lock size={20} />, label: "Security", badge: "" },
    { icon: <LogOut size={20} />, label: "Log Out", badge: "" }
  ];

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      {/* Header */}
      <div className={`bg-blue-600 text-white p-6 transition-all duration-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Settings className="cursor-pointer" />
        </div>
        
        <div className="flex items-center">
          <div className="relative">
            <img 
              src={userData.profilePic} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover border-4 border-blue-300"
            />
            <div className="absolute bottom-0 right-0 bg-green-400 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-blue-200">{userData.email}</p>
          </div>
        </div>
      </div>
      
      {/* Account Summary */}
      <div className={`mx-6 -mt-6 bg-white rounded-xl shadow-lg p-5 transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-800">Account Summary</h3>
          <span className="text-sm text-blue-500 font-medium cursor-pointer flex items-center">
            View Details <ChevronRight size={16} />
          </span>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1 bg-blue-100 p-4 rounded-lg transition-all duration-300 hover:bg-blue-200 cursor-pointer">
            <p className="text-sm text-blue-600 mb-1">Main Account</p>
            <p className="text-lg font-bold text-blue-900">{userData.balance}</p>
            <p className="text-xs text-blue-500 mt-1">Account: {userData.accountNumber}</p>
          </div>
          <div className="flex-1 bg-blue-50 p-4 rounded-lg transition-all duration-300 hover:bg-blue-100 cursor-pointer">
            <p className="text-sm text-blue-600 mb-1">Savings</p>
            <p className="text-lg font-bold text-blue-900">{userData.savingsBalance}</p>
            <p className="text-xs text-blue-500 mt-1">Interest: 2.5% APY</p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Quick Access</h3>
        </div>
        
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm cursor-pointer transition-all duration-500 ease-out hover:bg-blue-100 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                {item.icon}
              </div>
              <span className="ml-3 font-medium text-gray-700">{item.label}</span>
            </div>
            <div className="flex items-center">
              {item.badge && (
                <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${item.badge === 'New' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  {item.badge}
                </span>
              )}
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Navigation */}
      <div className={`flex justify-around items-center bg-white border-t border-gray-200 p-4 transition-all duration-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="flex flex-col items-center text-blue-600">
          <User size={24} className="mb-1" />
          <span className="text-xs font-medium">Profile</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <CreditCard size={24} className="mb-1" />
          <span className="text-xs">Cards</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Wallet size={24} className="mb-1" />
          <span className="text-xs">Payments</span>
        </div>
        <div className="flex flex-col items-center text-gray-400">
          <Settings size={24} className="mb-1" />
          <span className="text-xs">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;