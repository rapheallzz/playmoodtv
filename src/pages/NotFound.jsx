// NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-800">
      <h1 className="text-6xl text-red-600 font-bold mb-4">404</h1>
      <p className="text-xl text-white mb-8 text-center ">Oops! you miss your way, let help you back! <br /> click on the button below</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-[#541011] text-white rounded hover:bg-[#8b2a2c] transition"
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
