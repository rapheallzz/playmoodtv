import { defaults } from 'autoprefixer';
import React from 'react';

const DonationModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-center text-black font-semibold mb-4">Coming Soon!</h2>
          <p className="mb-4 text-black">Subscribe to get notified when this feature is available:</p>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className="w-full px-3 py-2 mb-4 border rounded"
              placeholder="Enter your email"
              required
            />
            
            <button type="submit" className="w-full bg-[#541011] text-white py-2 rounded">
              Subscribe
            </button>
          </form>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  

  export default DonationModal ;