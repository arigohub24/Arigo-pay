import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Save, 
  Shield, 
  Mail, 
  Phone, 
  Globe, 
  LogOut,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Setting = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    language: 'English',
    twoFactorAuth: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    defaultPaymentMethod: 'checking',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/25',
    cardCvv: '•••',
    darkMode: false,
  });

  const [activeSection, setActiveSection] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings updated successfully!');
    }, 1500);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    {
      id: 'account',
      title: 'Account Information',
      icon: <User size={18} />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
              <User size={16} className="mr-2" /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
              <Mail size={16} className="mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
              <Phone size={16} className="mr-2" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
              <Globe size={16} className="mr-2" /> Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
              <option>Germany</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
              <Globe size={16} className="mr-2" /> Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Lock size={18} />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield size={16} className="mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
              <Shield size={16} className="mr-2" /> Password
            </h4>
            <p className="text-sm text-blue-700 mb-3">Last changed 3 months ago</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Change Password
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Active Sessions</h4>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Chrome on Windows</p>
                <p className="text-xs text-gray-500">New York, USA • 2 hours ago</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-800">Log out</button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={18} />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={formData.smsNotifications}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Bell size={16} className="mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Push Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={formData.pushNotifications}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Notification Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Account Activity</span>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                  <option>Immediate</option>
                  <option>Daily Digest</option>
                  <option>Weekly Digest</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Payment Notifications</span>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                  <option>Immediate</option>
                  <option>Daily Digest</option>
                  <option>Weekly Digest</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Promotional Offers</span>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={18} />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Default Payment Method</label>
            <select
              name="defaultPaymentMethod"
              value={formData.defaultPaymentMethod}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="checking">Checking Account</option>
              <option value="savings">Savings Account</option>
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-3">Saved Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <CreditCard size={16} className="mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Visa •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires {formData.cardExpiry}</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <CreditCard size={16} className="mr-3 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">PayPal</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
              </div>
            </div>
            <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">
              + Add Payment Method
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-800 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Dark Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Theme Color</h4>
            <div className="flex space-x-3">
              {['blue', 'green', 'purple', 'red', 'orange'].map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full bg-${color}-500 hover:opacity-90 focus:ring-2 focus:ring-${color}-300`}
                  aria-label={`${color} theme`}
                ></button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Font Size</h4>
            <div className="flex items-center space-x-4">
              <button className="text-xs px-2 py-1 border border-gray-300 rounded">Small</button>
              <button className="text-sm px-2 py-1 border border-blue-500 bg-blue-50 text-blue-700 rounded">Medium</button>
              <button className="text-base px-2 py-1 border border-gray-300 rounded">Large</button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut size={16} className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            <div className="divide-y divide-gray-200">
              {sections.map((section) => (
                <div key={section.id} className="px-6 py-5">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-blue-600">{section.icon}</span>
                      <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
                    </div>
                    {activeSection === section.id ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </button>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeSection === section.id ? 'auto' : 0,
                      opacity: activeSection === section.id ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pl-9">
                      {section.content}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <div className="text-center">
              <LogOut size={48} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Are you sure you want to logout?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Youll need to sign in again to access your account.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle logout
                    setShowLogoutModal(false);
                    alert('You have been logged out');
                  }}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Setting;