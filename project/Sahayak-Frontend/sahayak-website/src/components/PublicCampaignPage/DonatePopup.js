// src/components/DonationPopup.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRupeeSign, FaTimes } from 'react-icons/fa';

const DonationPopup = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleAmountClick = (value) => {
    setSelectedAmount(value);
    setAmount(value);
  };

  const handleDonate = () => {
    // Here you can handle the donation logic (API call etc.)
    alert(`Thank you for donating ₹${amount}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Make a Contribution
        </h2>

        {/* Amount Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Choose your donation amount</h3>
          <div className="grid grid-cols-3 gap-4">
            {[100, 500, 1000, 2000, 5000, 10000].map((val) => (
              <button
                key={val}
                className={`py-3 rounded-lg font-semibold border transition-all 
                  ${selectedAmount === val ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-blue-100'}`}
                onClick={() => handleAmountClick(val)}
              >
                ₹ {val}
              </button>
            ))}
          </div>

          {/* Other Amount */}
          <div className="mt-4">
            <input
              type="number"
              placeholder="Or enter a custom amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Donor Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border p-3 rounded-lg" />
            <input type="text" placeholder="Last Name" className="border p-3 rounded-lg" />
            <input type="email" placeholder="Email Address" className="border p-3 rounded-lg col-span-1 md:col-span-2" />
            <input type="tel" placeholder="Mobile Number" className="border p-3 rounded-lg col-span-1 md:col-span-2" />
          </div>
        </div>

        {/* Donate Button */}
        <div className="text-center">
          <button 
            onClick={handleDonate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg transition-all"
          >
            <FaRupeeSign className="inline mr-2 mb-1" />
            Donate Now
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Donations are tax exempted under section 80G of Income Tax Act.
        </p>
      </motion.div>
    </div>
  );
};

export default DonationPopup;
