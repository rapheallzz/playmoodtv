
import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WelcomePopup = ({ showPopup, onClose }) => {
  const navigate = useNavigate();

  if (!showPopup) return null;

  const modalContent = (
    <PopupOverlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <PopupContent>
          <h2>Welcome to PlaymoodTV!</h2>
          <p>Join us to explore a world of amazing content. Log in or register to get started.</p>
          <ButtonContainer>
            <LoginButton onClick={() => { onClose(); navigate('/login'); }}>Log In</LoginButton>
            <RegisterButton onClick={() => { onClose(); navigate('/register'); }}>Register</RegisterButton>
          </ButtonContainer>
        </PopupContent>
      </PopupContainer>
    </PopupOverlay>
  );

  return createPortal(modalContent, document.body);
};

// Use styled-components for styling
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10052;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const PopupContainer = styled.div`
  position: relative;
  background-color: #1a1a1a;
  padding: 35px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 420px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @media screen and (max-width: 768px) {
    padding: 25px;
    width: 85%;
    border-radius: 12px;
  }
`;

const PopupContent = styled.div`
  text-align: center;
  color: white;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    font-weight: 700;
    color: white;

    @media screen and (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 1rem;
    color: #b0b0b0;
    margin-bottom: 28px;
    line-height: 1.5;

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
      margin-bottom: 20px;
    }
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 26px;
  color: #666;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: white;
  }

  @media screen and (max-width: 768px) {
    top: 10px;
    right: 12px;
    font-size: 22px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 15px;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;

  @media screen and (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
`;

const LoginButton = styled(Button)`
  background-color: #541011;
  color: white;
  border: none;

  &:hover {
    background-color: #7c1408;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RegisterButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default WelcomePopup;
