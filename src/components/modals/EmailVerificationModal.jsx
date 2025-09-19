import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { verifyEmail, resendVerificationCode } from '../../features/authSlice';

const EmailVerificationModal = ({ show, onClose, email, userId }) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const handleVerify = async () => {
    try {
      await dispatch(verifyEmail({ userId, verificationCode: code })).unwrap();
      toast.success('Email verified successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to verify email.');
    }
  };

  const handleResend = async () => {
    try {
      await dispatch(resendVerificationCode(email)).unwrap();
      toast.success('Verification code sent to your email.');
    } catch (error) {
      toast.error(error.message || 'Failed to resend verification code.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Verify Your Email</h2>
        <p>A verification code has been sent to your email address. Please enter the code below to verify your account.</p>
        <Input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button onClick={handleVerify}>Verify</Button>
        <ResendButton onClick={handleResend}>Resend Code</ResendButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #541011;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #541011;
  cursor: pointer;
  text-decoration: underline;
`;

export default EmailVerificationModal;
