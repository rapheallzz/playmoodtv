// VideoModal.js
import React from 'react';

const ViewModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4">
        <button className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded" onClick={onClose}>Close</button>
        <video controls className="w-full h-full">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ViewModal;
