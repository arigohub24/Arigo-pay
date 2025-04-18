import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaGamepad, FaWifi, FaTv, FaWater, FaCheckCircle, FaTimesCircle, FaSpinner, FaMobileAlt } from 'react-icons/fa';
import { GiElectric } from 'react-icons/gi';


const BillsPayment = () => {
  const [billType, setBillType] = useState('');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    meterNumber: '',
    bettingId: '',
    internetPlan: '',
    cablePlan: '',
    waterAccount: '',
    amount: '',
    pin: '',
    networkProvider: 'mtn',
    disco: 'ikeja-electric',
    bettingCompany: 'bet9ja'
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPinModal, setShowPinModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSavedBeneficiaries, setShowSavedBeneficiaries] = useState(false);

  // Nigerian bill types
  const billTypes = [
    { 
      id: 'airtime', 
      name: 'Airtime', 
      icon: <FaMobileAlt className="text-blue-500" />,
      description: 'Buy airtime for all Nigerian networks',
      fields: ['phoneNumber', 'amount', 'networkProvider']
    },
    { 
      id: 'data', 
      name: 'Data Plans', 
      icon: <FaWifi className="text-blue-500" />,
      description: 'Subscribe to mobile data plans',
      fields: ['phoneNumber', 'internetPlan', 'networkProvider']
    },
    { 
      id: 'electricity', 
      name: 'Electricity', 
      icon: <GiElectric className="text-blue-500" />,
      description: 'Pay electricity bills for all discos',
      fields: ['meterNumber', 'amount', 'disco']
    },
    { 
      id: 'betting', 
      name: 'Betting', 
      icon: <FaGamepad className="text-blue-500" />,
      description: 'Fund your betting accounts',
      fields: ['bettingId', 'amount', 'bettingCompany']
    },
    { 
      id: 'cable', 
      name: 'Cable TV', 
      icon: <FaTv className="text-blue-500" />,
      description: 'Subscribe to DSTv, GOtv, Startimes',
      fields: ['cablePlan', 'smartCardNumber']
    },
    { 
      id: 'water', 
      name: 'Water Bill', 
      icon: <FaWater className="text-blue-500" />,
      description: 'Pay your water utility bills',
      fields: ['waterAccount', 'amount']
    },
  ];

  // Nigerian network providers
  const networkProviders = [
    { id: 'mtn', name: 'MTN' },
    { id: 'airtel', name: 'Airtel' },
    { id: 'glo', name: 'Glo' },
    { id: '9mobile', name: '9mobile' }
  ];

  // Nigerian electricity distribution companies
  const discos = [
    { id: 'ikeja-electric', name: 'Ikeja Electric' },
    { id: 'eko-electric', name: 'Eko Electric' },
    { id: 'ibadan-electric', name: 'Ibadan Electric' },
    { id: 'kano-electric', name: 'Kano Electric' },
    { id: 'ph-electric', name: 'Port Harcourt Electric' },
    { id: 'jos-electric', name: 'Jos Electric' },
    { id: 'kaduna-electric', name: 'Kaduna Electric' },
    { id: 'abuja-electric', name: 'Abuja Electric' },
    { id: 'enugu-electric', name: 'Enugu Electric' },
    { id: 'benin-electric', name: 'Benin Electric' }
  ];

  // Nigerian betting companies
  const bettingCompanies = [
    { id: 'bet9ja', name: 'Bet9ja' },
    { id: 'nairabet', name: 'Nairabet' },
    { id: 'sportybet', name: 'SportyBet' },
    { id: 'betking', name: 'BetKing' },
    { id: 'merrybet', name: 'MerryBet' }
  ];

  // Nigerian data plans
  const dataPlans = {
    mtn: [
      { id: 'mtn-100', name: 'MTN 100MB - ₦100', amount: 100 },
      { id: 'mtn-300', name: 'MTN 350MB - ₦300', amount: 300 },
      { id: 'mtn-500', name: 'MTN 1.5GB - ₦500', amount: 500 },
      { id: 'mtn-1000', name: 'MTN 3GB - ₦1,000', amount: 1000 },
      { id: 'mtn-2000', name: 'MTN 7GB - ₦2,000', amount: 2000 }
    ],
    airtel: [
      { id: 'airtel-100', name: 'Airtel 100MB - ₦100', amount: 100 },
      { id: 'airtel-300', name: 'Airtel 350MB - ₦300', amount: 300 },
      { id: 'airtel-500', name: 'Airtel 1GB - ₦500', amount: 500 },
      { id: 'airtel-1000', name: 'Airtel 2.5GB - ₦1,000', amount: 1000 }
    ],
    glo: [
      { id: 'glo-100', name: 'Glo 100MB - ₦100', amount: 100 },
      { id: 'glo-500', name: 'Glo 1.8GB - ₦500', amount: 500 },
      { id: 'glo-1000', name: 'Glo 5.8GB - ₦1,000', amount: 1000 },
      { id: 'glo-2000', name: 'Glo 10GB - ₦2,000', amount: 2000 }
    ],
    '9mobile': [
      { id: '9mobile-100', name: '9mobile 100MB - ₦100', amount: 100 },
      { id: '9mobile-500', name: '9mobile 1GB - ₦500', amount: 500 },
      { id: '9mobile-1000', name: '9mobile 2.5GB - ₦1,000', amount: 1000 }
    ]
  };

  // Cable TV plans
  const cablePlans = [
    { id: 'dstv-padi', name: 'DStv Padi - ₦2,500', amount: 2500 },
    { id: 'dstv-yanga', name: 'DStv Yanga - ₦4,500', amount: 4500 },
    { id: 'dstv-confam', name: 'DStv Confam - ₦7,400', amount: 7400 },
    { id: 'gotv-smallie', name: 'GOtv Smallie - ₦1,300', amount: 1300 },
    { id: 'gotv-jolli', name: 'GOtv Jolli - ₦2,500', amount: 2500 },
    { id: 'startimes-nova', name: 'Startimes Nova - ₦1,300', amount: 1300 },
    { id: 'startimes-basic', name: 'Startimes Basic - ₦2,500', amount: 2500 }
  ];

  // Saved beneficiaries (mock data)
  const savedBeneficiaries = [
    { id: 1, type: 'airtime', name: 'My MTN Line', details: '0803 123 4567', provider: 'mtn' },
    { id: 2, type: 'electricity', name: 'Home Meter', details: 'IK123456789', provider: 'ikeja-electric' },
    { id: 3, type: 'betting', name: 'Bet9ja Account', details: 'BET9123456', provider: 'bet9ja' }
  ];

  const filteredBillTypes = billTypes.filter(type => 
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const selectedBill = billTypes.find(type => type.id === billType);

    if (!billType) newErrors.billType = 'Please select a bill type';
    if (selectedBill) {
      if (selectedBill.fields.includes('phoneNumber') && !formData.phoneNumber) {
        newErrors.phoneNumber = 'Please enter phone number';
      } else if (formData.phoneNumber && !/^0[7-9][0-1]\d{8}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid Nigerian number (e.g., 08012345678)';
      }
      if (selectedBill.fields.includes('meterNumber') && !formData.meterNumber) {
        newErrors.meterNumber = 'Please enter meter number';
      }
      if (selectedBill.fields.includes('bettingId') && !formData.bettingId) {
        newErrors.bettingId = 'Please enter betting ID';
      }
      if (selectedBill.fields.includes('internetPlan') && !formData.internetPlan) {
        newErrors.internetPlan = 'Please select a data plan';
      }
      if (selectedBill.fields.includes('cablePlan') && !formData.cablePlan) {
        newErrors.cablePlan = 'Please select a cable plan';
      }
      if (selectedBill.fields.includes('waterAccount') && !formData.waterAccount) {
        newErrors.waterAccount = 'Please enter water account number';
      }
      if (selectedBill.fields.includes('amount') && !formData.amount) {
        newErrors.amount = 'Please enter amount';
      } else if (formData.amount && (isNaN(formData.amount) || parseFloat(formData.amount) <= 0)) {
        newErrors.amount = 'Please enter a valid amount';
      }
    }

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
    setPaymentStatus('processing');

    // Simulate API call
    setTimeout(() => {
      if (Math.random() < 0.9) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failed');
      }

      setTimeout(() => {
        setPaymentStatus(null);
        if (paymentStatus === 'success') {
          setFormData(prev => ({
            ...prev,
            phoneNumber: '',
            meterNumber: '',
            bettingId: '',
            internetPlan: '',
            cablePlan: '',
            waterAccount: '',
            amount: ''
          }));
        }
      }, 5000);
    }, 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const selectBeneficiary = (beneficiary) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: beneficiary.type === 'airtime' ? beneficiary.details : prev.phoneNumber,
      meterNumber: beneficiary.type === 'electricity' ? beneficiary.details : prev.meterNumber,
      bettingId: beneficiary.type === 'betting' ? beneficiary.details : prev.bettingId,
      networkProvider: beneficiary.provider,
      disco: beneficiary.provider
    }));
    setShowSavedBeneficiaries(false);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pay Bills</h1>
          <p className="text-gray-600 mt-2">Quickly pay for airtime, data, electricity, betting and more</p>
        </div>

        {/* Search and Bill Type Selection */}
        <div className="mb-8">
          <div className="relative mb-4">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bill types (Airtime, Data, Electricity...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Select Bill Type</h2>
            {billType && (
              <button 
                onClick={() => setBillType('')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Change bill type
              </button>
            )}
          </div>
        </div>

        {/* Bill Types */}
        {!billType && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {filteredBillTypes.map((type) => (
              <motion.div
                key={type.id}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${billType === type.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setBillType(type.id)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-50 mr-4">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{type.name}</h3>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Payment Form */}
        {billType && (
          <motion.div 
            className="bg-white rounded-xl shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {billTypes.find(t => t.id === billType)?.name}
              </h2>
              <div className="flex items-center space-x-2">
                {billType === 'airtime' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {networkProviders.find(p => p.id === formData.networkProvider)?.name}
                  </span>
                )}
                {billType === 'electricity' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {discos.find(d => d.id === formData.disco)?.name}
                  </span>
                )}
                {billType === 'betting' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {bettingCompanies.find(b => b.id === formData.bettingCompany)?.name}
                  </span>
                )}
              </div>
            </div>

            {/* Saved Beneficiaries */}
            {['airtime', 'electricity', 'betting'].includes(billType) && (
              <div className="mb-6">
                <button 
                  onClick={() => setShowSavedBeneficiaries(!showSavedBeneficiaries)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  {showSavedBeneficiaries ? 'Hide saved' : 'Show saved'} beneficiaries
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform ${showSavedBeneficiaries ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showSavedBeneficiaries && (
                  <motion.div 
                    className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {savedBeneficiaries
                      .filter(b => b.type === billType)
                      .map(beneficiary => (
                        <motion.div
                          key={beneficiary.id}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => selectBeneficiary(beneficiary)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <h4 className="font-medium text-gray-800">{beneficiary.name}</h4>
                          <p className="text-sm text-gray-600">{beneficiary.details}</p>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Payment Status Messages */}
            <AnimatePresence>
              {paymentStatus === 'processing' && (
                <motion.div 
                  className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FaSpinner className="animate-spin h-5 w-5 text-blue-500 mr-3" />
                  <p className="text-blue-600 font-medium">Processing your payment...</p>
                </motion.div>
              )}
              {paymentStatus === 'success' && (
                <motion.div 
                  className="bg-green-50 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center">
                    <FaCheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <p className="text-green-600 font-medium">Payment Successful!</p>
                  </div>
                  <p className="mt-1 text-green-600 text-sm">
                    Your {billTypes.find(t => t.id === billType)?.name} payment was successful.
                  </p>
                </motion.div>
              )}
              {paymentStatus === 'failed' && (
                <motion.div 
                  className="bg-red-50 p-4 rounded-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center">
                    <FaTimesCircle className="h-5 w-5 text-red-500 mr-3" />
                    <p className="text-red-600 font-medium">Payment Failed</p>
                  </div>
                  <p className="mt-1 text-red-600 text-sm">
                    Please try again or contact support if the problem persists.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Network Provider Selection (Airtime/Data) */}
                {(billType === 'airtime' || billType === 'data') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Network Provider</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {networkProviders.map(provider => (
                        <button
                          key={provider.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, networkProvider: provider.id })}
                          className={`py-2 px-3 rounded-lg border text-sm font-medium ${formData.networkProvider === provider.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          {provider.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Disco Selection (Electricity) */}
                {billType === 'electricity' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Electricity Company</label>
                    <select
                      name="disco"
                      value={formData.disco}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {discos.map(disco => (
                        <option key={disco.id} value={disco.id}>{disco.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Betting Company Selection */}
                {billType === 'betting' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Betting Company</label>
                    <select
                      name="bettingCompany"
                      value={formData.bettingCompany}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {bettingCompanies.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Phone Number (Airtime/Data) */}
                {(billType === 'airtime' || billType === 'data') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="e.g., 08012345678"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                  </div>
                )}

                {/* Meter Number (Electricity) */}
                {billType === 'electricity' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meter Number
                    </label>
                    <input
                      type="text"
                      name="meterNumber"
                      placeholder="Enter your meter number"
                      value={formData.meterNumber}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.meterNumber ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.meterNumber && <p className="mt-1 text-sm text-red-600">{errors.meterNumber}</p>}
                  </div>
                )}

                {/* Betting ID */}
                {billType === 'betting' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Betting Account ID
                    </label>
                    <input
                      type="text"
                      name="bettingId"
                      placeholder="Enter your betting account ID"
                      value={formData.bettingId}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.bettingId ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.bettingId && <p className="mt-1 text-sm text-red-600">{errors.bettingId}</p>}
                  </div>
                )}

                {/* Data Plans */}
                {billType === 'data' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Plan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dataPlans[formData.networkProvider]?.map(plan => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setFormData({ 
                            ...formData, 
                            internetPlan: plan.id,
                            amount: plan.amount
                          })}
                          className={`p-3 border rounded-lg text-left ${formData.internetPlan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          <div className="font-medium">{plan.name.split(' - ')[0]}</div>
                          <div className="text-blue-600 font-semibold">{plan.name.split(' - ')[1]}</div>
                        </button>
                      ))}
                    </div>
                    {errors.internetPlan && <p className="mt-1 text-sm text-red-600">{errors.internetPlan}</p>}
                  </div>
                )}

                {/* Cable Plans */}
                {billType === 'cable' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cable TV Plan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cablePlans.map(plan => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setFormData({ 
                            ...formData, 
                            cablePlan: plan.id,
                            amount: plan.amount
                          })}
                          className={`p-3 border rounded-lg text-left ${formData.cablePlan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          <div className="font-medium">{plan.name.split(' - ')[0]}</div>
                          <div className="text-blue-600 font-semibold">{plan.name.split(' - ')[1]}</div>
                        </button>
                      ))}
                    </div>
                    {errors.cablePlan && <p className="mt-1 text-sm text-red-600">{errors.cablePlan}</p>}

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Smart Card Number
                      </label>
                      <input
                        type="text"
                        name="smartCardNumber"
                        placeholder="Enter your DSTv/GOtv smart card number"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Water Account */}
                {billType === 'water' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Water Account Number
                    </label>
                    <input
                      type="text"
                      name="waterAccount"
                      placeholder="Enter your water account number"
                      value={formData.waterAccount}
                      onChange={handleChange}
                      className={`w-full p-3 border ${errors.waterAccount ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.waterAccount && <p className="mt-1 text-sm text-red-600">{errors.waterAccount}</p>}
                  </div>
                )}

                {/* Amount (for bills that allow custom amounts) */}
                {['airtime', 'electricity', 'betting', 'water'].includes(billType) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (₦)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                      <input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className={`w-full pl-10 p-3 border ${errors.amount ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}

                    {/* Quick Amount Buttons for Airtime */}
                    {billType === 'airtime' && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[100, 200, 500, 1000, 2000].map(amt => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setFormData({ ...formData, amount: amt })}
                            className={`px-3 py-1 text-sm rounded-full ${formData.amount == amt ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            ₦{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Summary for plans with fixed amounts */}
                {['data', 'cable'].includes(billType) && formData.amount && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Amount to pay:</span>
                      <span className="font-bold text-blue-700">
                        {formatCurrency(formData.amount)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Payment
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* PIN Modal */}
        <AnimatePresence>
          {showPinModal && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Payment</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Bill Type:</span>
                    <span className="font-medium">{billTypes.find(t => t.id === billType)?.name}</span>
                  </div>
                  {formData.phoneNumber && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Phone Number:</span>
                      <span className="font-medium">{formData.phoneNumber}</span>
                    </div>
                  )}
                  {formData.meterNumber && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Meter Number:</span>
                      <span className="font-medium">{formData.meterNumber}</span>
                    </div>
                  )}
                  {formData.bettingId && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Betting ID:</span>
                      <span className="font-medium">{formData.bettingId}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600 font-medium">Amount:</span>
                    <span className="font-bold text-blue-600">
                      {formatCurrency(formData.amount || 
                        (billType === 'data' ? 
                          dataPlans[formData.networkProvider]?.find(p => p.id === formData.internetPlan)?.amount : 
                          cablePlans.find(p => p.id === formData.cablePlan)?.amount)
                        )
                      }
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your 4-digit PIN to confirm
                  </label>
                  <input
                    type="password"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    maxLength={4}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={`w-full p-3 border ${errors.pin ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-center text-xl tracking-widest`}
                    autoFocus
                  />
                  {errors.pin && <p className="mt-1 text-sm text-red-600">{errors.pin}</p>}
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handlePinSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Confirm Payment
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BillsPayment;