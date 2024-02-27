// 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LinkCopied = ({ showPopup, onClose }) => {
  const navigate = useNavigate();

  return (
    showPopup && (
      <PopupContainer>
        <PopupContent>
          {/* <CloseButton onClick={onClose}>&times;</CloseButton> */}
          <h2>Link Copied!</h2>
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
  z-index: 1002;
  background-color: white;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 45%;
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






export default LinkCopied;
