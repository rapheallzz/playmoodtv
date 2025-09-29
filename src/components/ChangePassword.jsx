import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ChangePassword = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    try {
      await axios.put(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/change-password',
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      toast.success('Password changed successfully!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2 className="text-white text-xl font-medium mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
              required
            />
            <span
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-white"
            >
              {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
              required
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-white"
            >
              {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full py-3 px-4 bg-transparent text-white border border-white rounded-md placeholder-white focus:outline-none focus:border-[#541011]"
              required
            />
            <span
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-white"
            >
              {showConfirmNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-transparent text-white border border-white rounded-md hover:bg-[#541011] hover:text-white transition-colors"
          >
            Change Password
          </button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ChangePassword;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  padding: 1rem;
`;

const ModalContent = styled.div`
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
  background: #dc2626;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;