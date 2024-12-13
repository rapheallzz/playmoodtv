import React from 'react';

const MessageModal = ({ show, onClose, message }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 w-1/3">
                <h2 className="text-xl mb-4">Message</h2>
                <p className="mb-4">{message}</p>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default MessageModal;
