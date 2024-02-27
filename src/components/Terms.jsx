
import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const TermsContent = styled.div`
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

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TermsModal = ({ onClose, children }) => {
  return (
    <TermsContainer>
      <TermsContent>
      <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
        <ButtonContainer>
            <RegisterButton onClick={() => navigate('/')}>Apply</RegisterButton>
          </ButtonContainer>
      </TermsContent>
    </TermsContainer>
  );
};

export default TermsModal ;
