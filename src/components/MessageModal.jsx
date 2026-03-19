import React from 'react';

const MessageModal = ({ show, onClose, message }) => {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[10010]"
            onClick={onClose}
        >
            <div
                className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 w-[90%] max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4 text-white border-b border-[#333] pb-2">Message</h2>
                <p className="mb-6 text-gray-300 leading-relaxed">{message}</p>
                <div className="flex justify-end">
                    <button
                        className="bg-[#541011] hover:bg-[#7a181a] text-white py-2 px-6 rounded transition-colors duration-200"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageModal;
