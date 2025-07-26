import React from 'react';

const ViewModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 relative">
        <button
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
        {videoUrl ? (
          <video controls className="w-full h-full object-contain" autoPlay>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-red-500">
            Error: Video URL is invalid or unavailable.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewModal;