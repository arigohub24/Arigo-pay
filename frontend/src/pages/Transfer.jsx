import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUserPlus, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const Transfer = () => {
  const [formData, setFormData] = useState({
    senderAccount: '',
    receiverBank: '',
    receiverAccountNumber: '',
    receiverName: '',
    amount: '',
    narration: '',
    pin: '',
    scheduleDate: ''
  });
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);
  const [transferFee, setTransferFee] = useState(0);
  const [showPinModal, setShowPinModal] = useState(false);
  const [transferStatus, setTransferStatus] = useState(null); // null, 'processing', 'success', 'failed'
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [savedBeneficiaries, setSavedBeneficiaries] = useState([]);
  const [banksList, setBanksList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [scheduleTransfer, setScheduleTransfer] = useState(false);

  // Mock Nigerian banks data
  useEffect(() => {
    setBanksList([
      { id: '001', name: 'Access Bank', code: '044' },
      { id: '002', name: 'Zenith Bank', code: '057' },
      { id: '003', name: 'First Bank of Nigeria', code: '011' },
      { id: '004', name: 'Guaranty Trust Bank', code: '058' },
      { id: '005', name: 'United Bank for Africa', code: '033' },
      { id: '006', name: 'Fidelity Bank', code: '070' },
      { id: '007', name: 'Ecobank Nigeria', code: '050' },
      { id: '008', name: 'Union Bank', code: '032' },
      { id: '009', name: 'Wema Bank', code: '035' },
      { id: '010', name: 'Sterling Bank', code: '232' },
      { id: '011', name: 'Polaris Bank', code: '076' },
      { id: '012', name: 'Stanbic IBTC Bank', code: '221' },
      { id: '013', name: 'Standard Chartered Bank', code: '068' },
      { id: '014', name: 'Heritage Bank', code: '030' },
      { id: '015', name: 'Keystone Bank', code: '082' },
      { id: '016', name: 'Citibank Nigeria', code: '023' },
      { id: '017', name: 'Unity Bank', code: '215' },
      { id: '018', name: 'Jaiz Bank', code: '301' },
      { id: '019', name: 'Titan Trust Bank', code: '102' },
      { id: '020', name: 'Providus Bank', code: '101' },
      { id: '021', name: 'Globus Bank', code: '103' },
      { id: '022', name: 'SunTrust Bank', code: '100' },
      { id: '023', name: 'Taj Bank', code: '302' },
      { id: '024', name: 'Kuda Bank', code: '090267' },
      { id: '025', name: 'VFD Microfinance Bank', code: '090110' },
      { id: '026', name: 'Palmpay', code: '100033' },
      { id: '027', name: 'Opay Digital Services', code: '100004' },
      { id: '028', name: 'Moniepoint MFB', code: '100022' },
      { id: '029', name: 'Rubies Microfinance Bank', code: '090175' }
    ]);

    // Mock recent transfers
    setRecentTransfers([
      { id: '1', receiverName: 'John Okafor', bank: 'Access Bank', accountNumber: '0123456789', amount: 25000, date: '2025-04-12T10:30:00' },
      { id: '2', receiverName: 'Amina Ibrahim', bank: 'Zenith Bank', accountNumber: '9876543210', amount: 50000, date: '2025-04-10T14:45:00' },
      { id: '3', receiverName: 'Chijioke Eze', bank: 'GTBank', accountNumber: '5678901234', amount: 10000, date: '2025-04-08T09:15:00' }
    ]);

    // Mock saved beneficiaries
    setSavedBeneficiaries([
      { id: 'b1', name: 'John Okafor', bank: 'Access Bank', accountNumber: '0123456789' },
      { id: 'b2', name: 'Amina Ibrahim', bank: 'Zenith Bank', accountNumber: '9876543210' }
    ]);
  }, []);

  const filteredBanks = banksList.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateAccountNumber = async () => {
    if (formData.receiverBank && formData.receiverAccountNumber.length === 10) {
      setIsValidatingAccount(true);
      setTimeout(() => {
        setFormData({ ...formData, receiverName: "Verified User Name" });
        setIsValidatingAccount(false);
      }, 1500);
    }
  };

  const calculateFee = () => {
    const amount = parseFloat(formData.amount) || 0;
    if (amount <= 5000) setTransferFee(10);
    else if (amount <= 50000) setTransferFee(25);
    else setTransferFee(50);
  };

  useEffect(() => {
    validateAccountNumber();
  }, [formData.receiverBank, formData.receiverAccountNumber]);

  useEffect(() => {
    calculateFee();
  }, [formData.amount]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.senderAccount) newErrors.senderAccount = 'Please select sender account';
    if (!formData.receiverBank) newErrors.receiverBank = 'Please select a bank';
    if (!formData.receiverAccountNumber) newErrors.receiverAccountNumber = 'Please enter account number';
    else if (formData.receiverAccountNumber.length !== 10) newErrors.receiverAccountNumber = 'Account number must be 10 digits';
    if (!formData.amount) newErrors.amount = 'Please enter amount';
    else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) newErrors.amount = 'Please enter a valid amount';
    if (scheduleTransfer && !formData.scheduleDate) newErrors.scheduleDate = 'Please select a schedule date';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPinModal(true);
    }
  };

  const handlePinSubmit = () => {
    if (formData.pin.length !== 4) {
      setErrors({ ...errors, pin: 'PIN must be 4 digits' });
      return;
    }
    
    setShowPinModal(false);
    setTransferStatus('processing');
    
    setTimeout(() => {
      if (Math.random() < 0.9) {
        setTransferStatus('success');
        setRecentTransfers([
          {
            id: Date.now().toString(),
            receiverName: formData.receiverName,
            bank: banksList.find(bank => bank.id === formData.receiverBank)?.name || 'Unknown Bank',
            accountNumber: formData.receiverAccountNumber,
            amount: parseFloat(formData.amount),
            date: new Date().toISOString()
          },
          ...recentTransfers
        ]);
      } else {
        setTransferStatus('failed');
      }
      
      setTimeout(() => {
        setTransferStatus(null);
        if (transferStatus === 'success') {
          setFormData({
            senderAccount: '',
            receiverBank: '',
            receiverAccountNumber: '',
            receiverName: '',
            amount: '',
            narration: '',
            pin: '',
            scheduleDate: ''
          });
          setScheduleTransfer(false);
        }
      }, 5000);
    }, 3000);
  };

  const handleAddBeneficiary = () => {
    if (formData.receiverName && formData.receiverBank && formData.receiverAccountNumber) {
      setSavedBeneficiaries([
        {
          id: `b${Date.now()}`,
          name: formData.receiverName,
          bank: banksList.find(bank => bank.id === formData.receiverBank)?.name || 'Unknown Bank',
          accountNumber: formData.receiverAccountNumber
        },
        ...savedBeneficiaries
      ]);
      setShowBeneficiaryModal(false);
    }
  };

  const selectBeneficiary = (beneficiary) => {
    setFormData({
      ...formData,
      receiverBank: banksList.find(bank => bank.name === beneficiary.bank)?.id || '',
      receiverAccountNumber: beneficiary.accountNumber,
      receiverName: beneficiary.name
    });
    setSearchTerm(beneficiary.bank);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-50 to-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="bg-blue-600 text-white shadow-lg"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold">Arigo Pay - Transfer</h1>
          <p className="mt-2 text-blue-100">Send money securely to any bank account in Nigeria</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Transfer Form */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bank Transfer</h2>

              <AnimatePresence>
                {transferStatus === 'processing' && (
                  <motion.div 
                    className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaSpinner className="animate-spin h-6 w-6 text-blue-500 mr-3" />
                    <p className="text-blue-600 font-medium">Processing your transfer...</p>
                  </motion.div>
                )}
                {transferStatus === 'success' && (
                  <motion.div 
                    className="bg-green-50 p-4 rounded-lg mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center">
                      <FaCheckCircle className="h-6 w-6 text-green-500 mr-3" />
                      <p className="text-green-600 font-medium">Transfer Successful!</p>
                    </div>
                    <p className="mt-2 text-green-600 text-sm">
                      You have successfully transferred {formatCurrency(parseFloat(formData.amount))} to {formData.receiverName}
                    </p>
                  </motion.div>
                )}
                {transferStatus === 'failed' && (
                  <motion.div 
                    className="bg-red-50 p-4 rounded-lg mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center">
                      <FaTimesCircle className="h-6 w-6 text-red-500 mr-3" />
                      <p className="text-red-600 font-medium">Transfer Failed!</p>
                    </div>
                    <p className="mt-2 text-red-600 text-sm">
                      Something went wrong with your transfer. Please try again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* From Account */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">From Account</label>
                    <select
                      name="senderAccount"
                      value={formData.senderAccount}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.senderAccount ? 'border-red-500' : 'border-gray-200'}`}
                    >
                      <option value="">Select Account</option>
                      <option value="savings">Savings Account - 1234567890 (₦1,250,000.00)</option>
                      <option value="current">Current Account - 0987654321 (₦350,000.00)</option>
                    </select>
                    {errors.senderAccount && <p className="text-red-500 text-xs mt-1">{errors.senderAccount}</p>}
                  </div>

                  {/* Schedule Transfer */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={scheduleTransfer}
                      onChange={() => setScheduleTransfer(!scheduleTransfer)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-gray-700 text-sm font-semibold">Schedule Transfer</label>
                  </div>

                  {/* Bank Selection */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Select Bank</label>
                    <div className="relative">
                      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search banks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                      <div className={`absolute w-full max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg mt-1 ${searchTerm && filteredBanks.length > 0 ? 'block' : 'hidden'}`}>
                        {filteredBanks.map(bank => (
                          <motion.div
                            key={bank.id}
                            className="p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => {
                              setFormData({ ...formData, receiverBank: bank.id });
                              setSearchTerm(bank.name);
                            }}
                            whileHover={{ backgroundColor: '#EFF6FF' }}
                          >
                            {bank.name}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {errors.receiverBank && <p className="text-red-500 text-xs mt-1">{errors.receiverBank}</p>}
                  </div>

                  {/* Schedule Date */}
                  {scheduleTransfer && (
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">Schedule Date</label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="scheduleDate"
                          value={formData.scheduleDate}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.scheduleDate ? 'border-red-500' : 'border-gray-200'}`}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      {errors.scheduleDate && <p className="text-red-500 text-xs mt-1">{errors.scheduleDate}</p>}
                    </div>
                  )}

                  {/* Account Number */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Account Number</label>
                    <input
                      type="text"
                      name="receiverAccountNumber"
                      placeholder="10-digit account number"
                      value={formData.receiverAccountNumber}
                      onChange={handleChange}
                      maxLength={10}
                      className={`w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.receiverAccountNumber ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.receiverAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.receiverAccountNumber}</p>}
                  </div>

                  {/* Account Name */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Account Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="receiverName"
                        placeholder="Account name will appear here"
                        value={formData.receiverName}
                        readOnly
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none"
                      />
                      {isValidatingAccount && (
                        <FaSpinner className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Amount (NGN)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">₦</span>
                      <input
                        type="text"
                        name="amount"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.amount ? 'border-red-500' : 'border-gray-200'}`}
                      />
                    </div>
                    {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                    {formData.amount && !errors.amount && (
                      <p className="text-sm text-gray-600 mt-1">Transfer fee: {formatCurrency(transferFee)}</p>
                    )}
                  </div>

                  {/* Narration */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Narration (Optional)</label>
                    <textarea
                      name="narration"
                      placeholder="What's this transfer for?"
                      value={formData.narration}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    ></textarea>
                  </div>
                </div>

                {/* Add to Beneficiaries */}
                <motion.button
                  type="button"
                  onClick={() => setShowBeneficiaryModal(true)}
                  className="mt-4 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUserPlus className="mr-2" /> Save as Beneficiary
                </motion.button>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full mt-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {scheduleTransfer ? 'Schedule Transfer' : 'Continue'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar: Recent Transfers and Beneficiaries */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Recent Transfers */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transfers</h2>
              {recentTransfers.length > 0 ? (
                <div className="space-y-4">
                  {recentTransfers.map((transfer) => (
                    <motion.div 
                      key={transfer.id} 
                      className="border-b border-gray-100 pb-4 last:border-0"
                      whileHover={{ backgroundColor: '#F8FAFC' }}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{transfer.receiverName}</p>
                          <p className="text-sm text-gray-500">{transfer.bank} - {transfer.accountNumber.slice(-4)}</p>
                          <p className="text-xs text-gray-400">{formatDate(transfer.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{formatCurrency(transfer.amount)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No recent transfers</p>
                </div>
              )}
            </div>

            {/* Saved Beneficiaries */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Beneficiaries</h2>
              {savedBeneficiaries.length > 0 ? (
                <div className="space-y-4">
                  {savedBeneficiaries.map((beneficiary) => (
                    <motion.div 
                      key={beneficiary.id} 
                      className="border-b border-gray-100 pb-4 last:border-0 cursor-pointer"
                      onClick={() => selectBeneficiary(beneficiary)}
                      whileHover={{ backgroundColor: '#F8FAFC' }}
                    >
                      <p className="font-medium text-gray-900">{beneficiary.name}</p>
                      <p className="text-sm text-gray-500">{beneficiary.bank} - {beneficiary.accountNumber.slice(-4)}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No saved beneficiaries</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enter Transaction PIN</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Confirm transfer of {formatCurrency(parseFloat(formData.amount))} to {formData.receiverName}
                {scheduleTransfer && ` scheduled for ${new Date(formData.scheduleDate).toLocaleDateString('en-NG')}`}
              </p>
              <label className="block text-gray-700 text-sm font-semibold mb-2">4-Digit PIN</label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                maxLength={4}
                placeholder="Enter your 4-digit PIN"
                className={`w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.pin ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin}</p>}
              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handlePinSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Confirm Transfer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Beneficiary Modal */}
      <AnimatePresence>
        {showBeneficiaryModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Save Beneficiary</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Save {formData.receiverName} ({formData.receiverAccountNumber}) as a beneficiary for quick transfers.
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  onClick={() => setShowBeneficiaryModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleAddBeneficiary}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Beneficiary
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Transfer;