import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, CreditCard, Eye, EyeOff, ChevronDown } from 'lucide-react';

const VirtualPaymentCards = () => {
  const [cards, setCards] = useState([
    { 
      id: 1, 
      name: 'Chase Freedom', 
      type: 'Visa', 
      bank: 'Chase',
      number: '4321 •••• •••• 6789', 
      expiry: '05/28', 
      color: 'bg-blue-600',
      balance: 3580.42,
      isDefault: true
    },
    { 
      id: 2, 
      name: 'Capital One Venture', 
      type: 'Mastercard', 
      bank: 'Capital One',
      number: '5678 •••• •••• 1234', 
      expiry: '12/27', 
      color: 'bg-indigo-700',
      balance: 2140.15,
      isDefault: false
    },
    { 
      id: 3, 
      name: 'American Express Gold', 
      type: 'AMEX', 
      bank: 'American Express',
      number: '3782 •••• •••• 005', 
      expiry: '09/26', 
      color: 'bg-blue-800',
      balance: 4650.75,
      isDefault: false
    },
  ]);

  const [visible, setVisible] = useState([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cardDetailsMap, setCardDetailsMap] = useState({});

  useEffect(() => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, card.id]);
      }, 150 * index);
    });
  }, [cards]);

  const toggleCardDetails = (cardId) => {
    setCardDetailsMap(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const setDefaultCard = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
              Virtual Payment Cards
            </h1>
            <p className="text-blue-700 text-sm sm:text-base">
              Manage all your payment methods in one place
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            onClick={() => setShowAddCardModal(true)}
          >
            <Plus size={18} className="mr-2" />
            Add New Card
          </motion.button>
        </div>

        {/* Featured/Default Card */}
        {cards.filter(card => card.isDefault).map(defaultCard => (
          <motion.div
            key={`featured-${defaultCard.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-base sm:text-lg font-medium text-blue-800 mb-3">Default Payment Method</h2>
            <div className="relative">
              <motion.div
                className={`relative ${defaultCard.color} h-48 sm:h-56 rounded-2xl p-5 sm:p-6 overflow-hidden shadow-xl`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white opacity-5 rounded-full -mt-12 -mr-12" />
                <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-white opacity-5 rounded-full -mb-8 -ml-8" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white text-lg sm:text-xl font-semibold">{defaultCard.bank}</p>
                    <p className="text-blue-100 text-xs sm:text-sm">{defaultCard.name}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-lg">
                    <p className="text-white font-medium text-xs sm:text-sm">{defaultCard.type}</p>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8">
                  <p className="text-blue-100 text-xs sm:text-sm mb-1">Card Number</p>
                  <p className="text-white font-mono text-base sm:text-lg">{defaultCard.number}</p>
                </div>
                
                <div className="flex justify-between items-end mt-3 sm:mt-4">
                  <div>
                    <p className="text-blue-100 text-xs">Expires</p>
                    <p className="text-white text-sm">{defaultCard.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-xs">Available Balance</p>
                    <p className="text-white font-semibold text-lg sm:text-xl">
                      ${defaultCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        <h2 className="text-base sm:text-lg font-medium text-blue-800 mb-4">All Payment Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: visible.includes(card.id) ? 1 : 0,
                y: visible.includes(card.id) ? 0 : 30,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <PaymentCard 
                card={card}
                isExpanded={cardDetailsMap[card.id]}
                onToggle={() => toggleCardDetails(card.id)}
                onDelete={() => deleteCard(card.id)}
                onSetDefault={() => setDefaultCard(card.id)}
              />
            </motion.div>
          ))}
          
          {/* Add Card Placeholder */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center p-6 sm:p-8 cursor-pointer h-48 sm:h-56"
            onClick={() => setShowAddCardModal(true)}
          >
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <Plus size={20} className="text-blue-600" />
            </div>
            <p className="text-blue-700 font-medium text-sm sm:text-base">Add Payment Card</p>
            <p className="text-blue-500 text-xs sm:text-sm mt-1 text-center">
              Connect a new bank card or create a virtual one
            </p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Add Card Modal Placeholder */}
      {showAddCardModal && (
        <AddCardModal onClose={() => setShowAddCardModal(false)} onAdd={(newCard) => {
          setCards([...cards, { ...newCard, id: cards.length + 1 }]);
          setShowAddCardModal(false);
        }} />
      )}
    </div>
  );
};

const PaymentCard = ({ card, isExpanded, onToggle, onDelete, onSetDefault }) => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100"
      layout
    >
      {/* Card Header */}
      <div className={`${card.color} p-4 relative`}>
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white opacity-5 rounded-full -mt-12 sm:-mt-16 -mr-12 sm:-mr-16" />
        
        <div className="flex justify-between">
          <p className="text-white font-medium text-sm sm:text-base">{card.bank}</p>
          {card.isDefault && (
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
              Default
            </span>
          )}
        </div>
        
        <div className="mt-4 sm:mt-6 mb-1">
          <div className="flex justify-between items-center">
            <p className="text-white font-mono text-sm sm:text-base">
              {showCardNumber ? card.number.replace('••••', '5678') : card.number}
            </p>
            <button 
              onClick={() => setShowCardNumber(!showCardNumber)}
              className="text-white/80 hover:text-white"
            >
              {showCardNumber ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex justify-between mt-2">
            <div>
              <p className="text-blue-100 text-xs">Expires</p>
              <p className="text-white text-sm">{card.expiry}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded self-end">
              <p className="text-white text-xs sm:text-sm">{card.type}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-blue-900 text-sm sm:text-base">{card.name}</h3>
            <p className="text-blue-500 text-xs sm:text-sm">{card.bank}</p>
          </div>
          <button 
            className="text-blue-400 hover:text-blue-600 transition-colors"
            onClick={onToggle}
          >
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
        
        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-blue-100"
          >
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-blue-500">Available Balance</p>
              <p className="text-blue-900 font-semibold text-base sm:text-lg">
                ${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex-1"
              >
                <CreditCard size={14} className="mr-1" />
                Pay Now
              </motion.button>
              
              {!card.isDefault && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSetDefault}
                  className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm"
                >
                  Set Default
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-lg"
              >
                <Edit size={14} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDelete}
                className="flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg"
              >
                <Trash2 size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const AddCardModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    bank: '',
    type: 'Visa',
    number: '',
    expiry: '',
    color: 'bg-blue-600',
    balance: 0,
    isDefault: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format the card number to show only first 4 digits
    const formattedNumber = formData.number.substring(0, 4) + ' •••• •••• ' + 
      formData.number.substring(formData.number.length - 4);
    
    onAdd({
      ...formData,
      number: formattedNumber,
      balance: parseFloat(formData.balance)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 sm:max-w-lg"
      >
        <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">Add Payment Card</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">Card Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="e.g. Travel Rewards Card"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">Bank Name</label>
              <input
                type="text"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="e.g. Chase"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">Card Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  required
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="AMEX">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">Card Color</label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                >
                  <option value="bg-blue-600">Blue</option>
                  <option value="bg-indigo-700">Indigo</option>
                  <option value="bg-blue-800">Navy</option>
                  <option value="bg-purple-700">Purple</option>
                  <option value="bg-cyan-600">Cyan</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">Card Number</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="1234 5678 9012 3456"
                required
                maxLength="19"
                pattern="[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4}"
              />
              <p className="text-xs text-blue-500 mt-1">Format: XXXX XXXX XXXX XXXX</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="MM/YY"
                  required
                  maxLength="5"
                  pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                />
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-blue-700 mb-1">Balance ($)</label>
                <input
                  type="number"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="default"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <label htmlFor="default" className="ml-2 block text-xs sm:text-sm text-blue-700">
                Set as default payment method
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              Add Card
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VirtualPaymentCards;