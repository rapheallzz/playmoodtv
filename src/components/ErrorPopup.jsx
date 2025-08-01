// ErrorPopup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPopup = ({ showPopup, onClose, errorMessage }) => {
  const navigate = useNavigate();

  return (
    showPopup && (
      <PopupContainer>
        <PopupContent>
          <CloseButton onClick={onClose}>×</CloseButton>
          <h2>Oops, Something Went Wrong!</h2>
          <p>{errorMessage || 'An error occurred. Please try again.'}</p>
          <ButtonContainer>
            <LoginButton onClick={() => { onClose(); navigate('/login'); }}>Log In</LoginButton>
            <RegisterButton onClick={() => { onClose(); navigate('/register'); }}>Register</RegisterButton>
          </ButtonContainer>
        </PopupContent>
      </PopupContainer>
    )
  );
};

// Use styled-components for styling
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1052;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const PopupContent = styled.div`
  text-align: center;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`;

const LoginButton = styled(Button)`
  margin-bottom: 10px;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const RegisterButton = styled(Button)``;

export default ErrorPopup;