import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateAuthUserReducer } from '../../features/authSlice';
import MessageModal from '../MessageModal'; // For displaying messages after application

const CreatorApplicationModal = ({ onClose }) => {
  const [creatorApplicationStatus, setCreatorApplicationStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchCreatorApplicationStatus = useCallback(async () => {
    if (authUser && authUser.token) {
      try {
        const response = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/creator-application-status?_=${new Date().getTime()}`,
          {
            headers: { Authorization: `Bearer ${authUser.token}` },
          }
        );
        const status = response.data.creatorApplicationStatus;
        setCreatorApplicationStatus(status || null);
        if (status === 'approved') {
          const updatedUser = { ...authUser, role: 'creator' };
          dispatch(updateAuthUserReducer(updatedUser));
          localStorage.setItem('user', JSON.stringify(updatedUser));
          toast.success("You are already a creator!");
          onClose();
        }
      } catch (error) {
        console.error('Error fetching creator application status:', error);
        setCreatorApplicationStatus(null);
      }
    }
  }, [authUser, dispatch, onClose]);

  useEffect(() => {
    if (authUser && authUser.role !== 'creator') {
      fetchCreatorApplicationStatus();
    } else if (authUser && authUser.role === 'creator') {
        onClose();
    }
  }, [authUser, fetchCreatorApplicationStatus, onClose]);

  const confirmApplyAsCreator = async () => {
    try {
      const response = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange',
        { userId: authUser.userId, requestedRole: 'creator' },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      );
      if (response.status === 201) {
        setMessage('Your request to become a creator has been submitted.');
        await fetchCreatorApplicationStatus();
      } else {
        setMessage('There was an issue submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('confirmApplyAsCreator error:', error);
      setMessage(error.response?.data?.message || 'There was an issue submitting your request. Please try again.');
    }
    setShowMessageModal(true);
  };

  const handleApply = () => {
    if (creatorApplicationStatus === 'pending') {
      toast.info('You already have a pending request to become a creator.');
      onClose();
      return;
    }
    confirmApplyAsCreator();
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    onClose();
  }

  return (
    <>
        <PopupOverlay onClick={onClose}>
            <PopupContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose} aria-label="Close confirmation popup">
                ×
                </CloseButton>
                <h2 className="text-white text-xl font-semibold mb-4">Apply to Become a Creator</h2>
                {creatorApplicationStatus === 'pending' ? (
                <p className="text-white text-base mb-6">
                    You have a pending application. You will be notified once it's reviewed.
                </p>
                ) : creatorApplicationStatus === 'rejected' ? (
                    <p className="text-white text-base mb-6">
                        Your previous application was not approved. You can re-apply.
                    </p>
                ) : (
                <p className="text-white text-base mb-6">
                    Are you sure you want to apply to become a creator? This will submit a request for admin approval.
                </p>
                )}
                <div className="flex justify-center gap-4">
                {creatorApplicationStatus !== 'pending' && (
                    <button
                    className="bg-[#541011] text-white py-2 px-6 rounded text-base font-normal hover:bg-white hover:text-[#541011] transition-colors"
                    onClick={handleApply}
                    >
                    {creatorApplicationStatus === 'rejected' ? 'Re-apply' : 'Confirm'}
                    </button>
                )}
                <button
                    className="bg-transparent text-white py-2 px-6 border border-white rounded text-base font-normal hover:bg-[#541011] transition-colors"
                    onClick={onClose}
                >
                    Cancel
                </button>
                </div>
            </PopupContainer>
        </PopupOverlay>
        {showMessageModal && <MessageModal show={showMessageModal} onClose={handleCloseMessageModal} message={message} />}
    </>
  );
};

export default CreatorApplicationModal;

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002; /* Above other modals */
  padding: 1rem;
`;

const PopupContainer = styled.div`
  background: #191818;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;