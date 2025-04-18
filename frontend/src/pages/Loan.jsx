import { useState, } from 'react';

export default function LoanDashboard() {
  const [loans, setLoans] = useState([
    {
      id: 1,
      type: 'Personal Loan',
      amount: 10000,
      interestRate: 5.5,
      term: 60,
      monthlyPayment: 191.01,
      status: 'Active',
      progress: 35,
    },
    {
      id: 2,
      type: 'Home Loan',
      amount: 200000,
      interestRate: 3.8,
      term: 360,
      monthlyPayment: 932.57,
      status: 'Active',
      progress: 15,
    },
    {
      id: 3,
      type: 'Car Loan',
      amount: 25000,
      interestRate: 4.9,
      term: 84,
      monthlyPayment: 373.28,
      status: 'Pending',
      progress: 0,
    },
  ]);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [ setShowLoanForm] = useState(false);
  const [newLoan, setNewLoan] = useState({
    type: 'Personal Loan',
    amount: 5000,
    term: 36,
  });
  const [visibleSection, setVisibleSection] = useState('dashboard');
  const [isAnimating, setIsAnimating] = useState(false);

  const loanTypes = ['Personal Loan', 'Home Loan', 'Car Loan', 'Education Loan', 'Business Loan'];
  
  const handleApplyLoan = () => {
    setShowLoanForm(true);
    setVisibleSection('application');
  };

  const handleSubmitApplication = () => {
    // Create new loan object
    const loanId = loans.length + 1;
    const interestRates = {
      'Personal Loan': 5.5,
      'Home Loan': 3.8,
      'Car Loan': 4.9,
      'Education Loan': 4.2,
      'Business Loan': 6.5,
    };
    
    const rate = interestRates[newLoan.type] || 5.0;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = (newLoan.amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -newLoan.term));
    
    const createdLoan = {
      id: loanId,
      type: newLoan.type,
      amount: parseFloat(newLoan.amount),
      interestRate: rate,
      term: newLoan.term,
      monthlyPayment: monthlyPayment,
      status: 'Pending',
      progress: 0,
    };
    
    setLoans([...loans, createdLoan]);
    setShowLoanForm(false);
    setVisibleSection('dashboard');
    
    // Reset form
    setNewLoan({
      type: 'Personal Loan',
      amount: 5000,
      term: 36,
    });
  };

  const handleCardClick = (loan) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedLoan(loan);
      setVisibleSection('details');
      setIsAnimating(false);
    }, 300);
  };

  const goBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedLoan(null);
      setVisibleSection('dashboard');
      setIsAnimating(false);
    }, 300);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Simple sliding animation for page transitions
  const getTransitionClass = () => {
    if (isAnimating) {
      return 'opacity-0 transform translate-y-4';
    }
    return 'opacity-100 transform translate-y-0 transition-all duration-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">LoanPro</h1>
          </div>
          <nav className="flex space-x-4">
            <button 
              onClick={() => setVisibleSection('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${visibleSection === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={handleApplyLoan}
              className={`px-3 py-2 rounded-md text-sm font-medium ${visibleSection === 'application' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Apply
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600">
              Help
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard View */}
        {visibleSection === 'dashboard' && (
          <div className={getTransitionClass()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Loan Dashboard</h2>
              <button
                onClick={handleApplyLoan}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Apply for New Loan
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Balance</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(loans.reduce((sum, loan) => sum + loan.amount, 0))}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monthly Payments</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(loans.reduce((sum, loan) => sum + (loan.status === 'Active' ? loan.monthlyPayment : 0), 0))}
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Loans</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {loans.filter(loan => loan.status === 'Active').length}
                    </p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Your Loans</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {loans.map((loan,) => (
                  <div 
                    key={loan.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => handleCardClick(loan)}
                  >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-2 md:mb-0">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${loan.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <h4 className="text-lg font-medium text-gray-800">{loan.type}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{formatCurrency(loan.amount)} • {loan.interestRate}% interest</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Monthly Payment</p>
                          <p className="text-base font-medium text-gray-800">{formatCurrency(loan.monthlyPayment)}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-medium">
                          {loan.status}
                        </div>
                      </div>
                    </div>
                    
                    {loan.status === 'Active' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{loan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${loan.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loan Details View */}
        {visibleSection === 'details' && selectedLoan && (
          <div className={getTransitionClass()}>
            <button 
              onClick={goBack}
              className="flex items-center text-blue-600 mb-4 hover:text-blue-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">{selectedLoan.type} Details</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Loan Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Principal Amount</span>
                          <span className="font-medium text-gray-800">{formatCurrency(selectedLoan.amount)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Interest Rate</span>
                          <span className="font-medium text-gray-800">{selectedLoan.interestRate}%</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Term</span>
                          <span className="font-medium text-gray-800">{selectedLoan.term} months</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Monthly Payment</span>
                          <span className="font-medium text-gray-800">{formatCurrency(selectedLoan.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Status</span>
                          <span className={`font-medium ${selectedLoan.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {selectedLoan.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedLoan.status === 'Active' && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Progress</h3>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-gray-600">Completion</span>
                          <span className="font-medium text-gray-800">{selectedLoan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                          <div 
                            className="bg-blue-600 h-4 rounded-full transition-all duration-1000" 
                            style={{ width: `${selectedLoan.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Schedule</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Next Payment</span>
                          <span className="text-sm font-medium text-gray-800">May 15, 2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Amount Due</span>
                          <span className="text-sm font-medium text-gray-800">{formatCurrency(selectedLoan.monthlyPayment)}</span>
                        </div>
                      </div>
                      
                      {selectedLoan.status === 'Active' && (
                        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
                          Make Payment
                        </button>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Loan Actions</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                          Download Statement
                        </button>
                        <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Loan Application Form */}
        {visibleSection === 'application' && (
          <div className={getTransitionClass()}>
            <button 
              onClick={goBack}
              className="flex items-center text-blue-600 mb-4 hover:text-blue-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Apply for a New Loan</h2>
              </div>
              
              <div className="p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Type
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={newLoan.type}
                        onChange={(e) => setNewLoan({...newLoan, type: e.target.value})}
                      >
                        {loanTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loan Amount
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={newLoan.amount}
                          onChange={(e) => setNewLoan({...newLoan, amount: parseInt(e.target.value) || 0})}
                          min="1000"
                          step="1000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Term (months)
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={newLoan.term}
                        onChange={(e) => setNewLoan({...newLoan, term: parseInt(e.target.value)})}
                      >
                        <option value="12">12 months (1 year)</option>
                        <option value="24">24 months (2 years)</option>
                        <option value="36">36 months (3 years)</option>
                        <option value="48">48 months (4 years)</option>
                        <option value="60">60 months (5 years)</option>
                        <option value="72">72 months (6 years)</option>
                        <option value="84">84 months (7 years)</option>
                        <option value="120">120 months (10 years)</option>
                        <option value="180">180 months (15 years)</option>
                        <option value="240">240 months (20 years)</option>
                        <option value="360">360 months (30 years)</option>
                      </select>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h3 className="text-md font-medium text-blue-800 mb-2">Loan Estimate</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">Estimated Interest Rate:</span>
                          <span className="text-sm font-medium text-blue-800">
                            {newLoan.type === 'Personal Loan' ? '5.5%' : 
                             newLoan.type === 'Home Loan' ? '3.8%' : 
                             newLoan.type === 'Car Loan' ? '4.9%' : 
                             newLoan.type === 'Education Loan' ? '4.2%' : '6.5%'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">Estimated Monthly Payment:</span>
                          <span className="text-sm font-medium text-blue-800">
                            {(() => {
                              const interestRates = {
                                'Personal Loan': 5.5,
                                'Home Loan': 3.8,
                                'Car Loan': 4.9,
                                'Education Loan': 4.2,
                                'Business Loan': 6.5,
                              };
                              const rate = interestRates[newLoan.type] || 5.0;
                              const monthlyRate = rate / 100 / 12;
                              const payment = (newLoan.amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -newLoan.term));
                              return formatCurrency(payment);
                            })()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">Total Repayment:</span>
                          <span className="text-sm font-medium text-blue-800">
                            {(() => {
                              const interestRates = {
                                'Personal Loan': 5.5,
                                'Home Loan': 3.8,
                                'Car Loan': 4.9,
                                'Education Loan': 4.2,
                                'Business Loan': 6.5,
                              };
                              const rate = interestRates[newLoan.type] || 5.0;
                              const monthlyRate = rate / 100 / 12;
                              const payment = (newLoan.amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -newLoan.term));
                              return formatCurrency(payment * newLoan.term);
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={goBack}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitApplication}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}