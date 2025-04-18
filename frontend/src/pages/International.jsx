import { useState } from 'react';

const InternationalTransfer = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientAddress: '',
    recipientCountry: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
    amount: '',
    transferCurrency: 'USD',
    transferPurpose: '',
    senderReference: '',
    sourceOfFunds: '',
    beneficiaryRelationship: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedFee, setEstimatedFee] = useState(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Calculate fees when amount changes
    if (name === 'amount' || name === 'transferCurrency') {
      calculateFees();
    }
  };

  const calculateFees = () => {
    if (formData.amount) {
      // Simple fee calculation (would be more complex in real app)
      const baseFee = 15;
      const percentageFee = 0.01 * parseFloat(formData.amount);
      setEstimatedFee(baseFee + percentageFee);
      
      // Estimate delivery based on currency
      if (['USD', 'EUR', 'GBP'].includes(formData.transferCurrency)) {
        setEstimatedDelivery('1-2 business days');
      } else {
        setEstimatedDelivery('3-5 business days');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(true);
    }, 1500);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "CNY", "ZAR"];
  const transferPurposes = [
    "Business Payment", 
    "Family Support", 
    "Education Fees", 
    "Medical Expenses",
    "Property Purchase",
    "Investment",
    "Travel Expenses",
    "Other"
  ];
  
  const sourceOfFundsOptions = [
    "Salary",
    "Business Income",
    "Savings",
    "Investment Proceeds",
    "Gift",
    "Inheritance",
    "Other"
  ];
  
  const beneficiaryRelationships = [
    "Family Member",
    "Business Partner",
    "Friend",
    "Employee",
    "Service Provider",
    "No Relationship",
    "Other"
  ];

  const resetForm = () => {
    setFormData({
      recipientName: '',
      recipientAddress: '',
      recipientCountry: '',
      bankName: '',
      accountNumber: '',
      swiftCode: '',
      amount: '',
      transferCurrency: 'USD',
      transferPurpose: '',
      senderReference: '',
      sourceOfFunds: '',
      beneficiaryRelationship: ''
    });
    setShowConfirmation(false);
    setCurrentStep(1);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-3 text-xl font-bold text-white">Transfer Initiated Successfully!</h2>
          </div>
          <div className="p-8">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Transaction Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">{formData.amount} {formData.transferCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transfer Fee:</span>
                  <span className="font-medium">{estimatedFee.toFixed(2)} {formData.transferCurrency}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-blue-700">
                    {(parseFloat(formData.amount) + estimatedFee).toFixed(2)} {formData.transferCurrency}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Recipient Details</h4>
                <p className="font-medium">{formData.recipientName}</p>
                <p className="text-gray-600">{formData.recipientAddress}</p>
                <p className="text-gray-600">{formData.recipientCountry}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Bank Details</h4>
                <p className="font-medium">{formData.bankName}</p>
                <p className="text-gray-600">Account: {formData.accountNumber}</p>
                <p className="text-gray-600">SWIFT: {formData.swiftCode}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Purpose</h4>
                <p>{formData.transferPurpose}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Your Reference</h4>
                <p>{formData.senderReference || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Estimated Delivery</h4>
                <p>{estimatedDelivery}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    A confirmation email with transaction details has been sent to your registered email address. 
                    Please check your spam folder if you dont see it in your inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
              >
                Make Another Transfer
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-4 border border-blue-300 rounded-md transition duration-300"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">International Money Transfer</h1>
          <p className="mt-2 text-gray-600">Send money abroad securely and at competitive rates</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-200 h-2">
            <div 
              className="bg-blue-600 h-2 transition-all duration-300" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          
          <div className="p-6">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-medium`}>
                    {step}
                  </div>
                  <span className={`mt-2 text-sm ${currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    {step === 1 ? 'Recipient' : step === 2 ? 'Transfer' : 'Review'}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Recipient Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-800 border-b pb-2">Recipient Information</h2>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                        Recipients Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="recipientName"
                        id="recipientName"
                        required
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="As it appears on bank account"
                      />
                    </div>

                    <div>
                      <label htmlFor="recipientCountry" className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="recipientCountry"
                        id="recipientCountry"
                        required
                        value={formData.recipientCountry}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Recipient's country"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Recipients Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="recipientAddress"
                      id="recipientAddress"
                      required
                      value={formData.recipientAddress}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Street address, city, postal code"
                    />
                  </div>

                  <div>
                    <label htmlFor="beneficiaryRelationship" className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship to Beneficiary <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="beneficiaryRelationship"
                      name="beneficiaryRelationship"
                      required
                      value={formData.beneficiaryRelationship}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select relationship</option>
                      {beneficiaryRelationships.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                      disabled={!formData.recipientName || !formData.recipientCountry || !formData.recipientAddress || !formData.beneficiaryRelationship}
                    >
                      Next: Bank Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Bank & Transfer Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-800 border-b pb-2">Bank Details</h2>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        id="bankName"
                        required
                        value={formData.bankName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Recipient's bank name"
                      />
                    </div>

                    <div>
                      <label htmlFor="swiftCode" className="block text-sm font-medium text-gray-700 mb-1">
                        SWIFT/BIC Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="swiftCode"
                        id="swiftCode"
                        required
                        value={formData.swiftCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Bank's SWIFT code"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number/IBAN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      id="accountNumber"
                      required
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Recipient's account number"
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-blue-800 border-b pb-2 mt-8">Transfer Details</h2>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        min="1"
                        required
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label htmlFor="transferCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                        Currency <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="transferCurrency"
                        name="transferCurrency"
                        required
                        value={formData.transferCurrency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        {currencies.map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="transferPurpose" className="block text-sm font-medium text-gray-700 mb-1">
                        Purpose of Transfer <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="transferPurpose"
                        name="transferPurpose"
                        required
                        value={formData.transferPurpose}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select purpose</option>
                        {transferPurposes.map(purpose => (
                          <option key={purpose} value={purpose}>{purpose}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="sourceOfFunds" className="block text-sm font-medium text-gray-700 mb-1">
                        Source of Funds <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="sourceOfFunds"
                        name="sourceOfFunds"
                        required
                        value={formData.sourceOfFunds}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select source</option>
                        {sourceOfFundsOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="senderReference" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Reference (Optional)
                    </label>
                    <input
                      type="text"
                      name="senderReference"
                      id="senderReference"
                      value={formData.senderReference}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="For your records"
                    />
                  </div>

                  {formData.amount && (
                    <div className="bg-blue-50 p-4 rounded-md">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm text-blue-700">
                            <span className="font-medium">Estimated Fee:</span> {estimatedFee.toFixed(2)} {formData.transferCurrency} • 
                            <span className="font-medium ml-2">Delivery:</span> {estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-2 px-6 border border-blue-300 rounded-md transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                      disabled={!formData.bankName || !formData.swiftCode || !formData.accountNumber || !formData.amount || !formData.transferPurpose || !formData.sourceOfFunds}
                    >
                      Next: Review
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-blue-800 border-b pb-2">Review Your Transfer</h2>
                  
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Transfer Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">{formData.amount} {formData.transferCurrency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transfer Fee:</span>
                        <span className="font-medium">{estimatedFee.toFixed(2)} {formData.transferCurrency}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-blue-700">
                          {(parseFloat(formData.amount) + estimatedFee).toFixed(2)} {formData.transferCurrency}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Recipient Details</h4>
                      <p className="font-medium">{formData.recipientName}</p>
                      <p className="text-gray-600">{formData.recipientAddress}</p>
                      <p className="text-gray-600">{formData.recipientCountry}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Bank Details</h4>
                      <p className="font-medium">{formData.bankName}</p>
                      <p className="text-gray-600">Account: {formData.accountNumber}</p>
                      <p className="text-gray-600">SWIFT: {formData.swiftCode}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Purpose</h4>
                      <p>{formData.transferPurpose}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Source of Funds</h4>
                      <p>{formData.sourceOfFunds}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Your Reference</h4>
                      <p>{formData.senderReference || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Estimated Delivery</h4>
                      <p>{estimatedDelivery}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Please review all details carefully before submitting. International transfers cannot be canceled once initiated.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-2 px-6 border border-blue-300 rounded-md transition duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 ${isLoading ? 'opacity-75' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Confirm & Transfer'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Why Choose Our International Transfer Service?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-900">Competitive Rates</h4>
                <p className="mt-1 text-sm text-gray-600">Better exchange rates than traditional banks with low transfer fees.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-900">Fast Transfers</h4>
                <p className="mt-1 text-sm text-gray-600">Most transfers arrive within 1-2 business days.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-900">Secure & Regulated</h4>
                <p className="mt-1 text-sm text-gray-600">Your money is protected with bank-level security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalTransfer;