import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CreatorCongratsPopup = ({ showPopup, onClose }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/creatorpage');
    onClose();
  };

  return (
    showPopup && (
      <PopupContainer>
        <PopupContent>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <h2>Congratulations!</h2>
          <p>You are now a creator on PlaymoodTV. Get started by visiting your creator page.</p>
          <ButtonContainer>
            <GetStartedButton onClick={handleGetStarted}>Get Started</GetStartedButton>
          </ButtonContainer>
        </PopupContent>
      </PopupContainer>
    )
  );
};

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
`;

const GetStartedButton = styled.button`
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

export default CreatorCongratsPopup;
