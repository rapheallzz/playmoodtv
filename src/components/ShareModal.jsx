import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaCopy,
} from 'react-icons/fa';

import styled from 'styled-components';


const ShareModal = ({ open, onClose, shareUrl }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
    onClose();
  };

  return (
    <ShareModalContainer>
      {/* Modal content */}
      <FacebookShareButton
        url={shareUrl}
        quote="Check out this video on PlayMood"
        onClick={() => onClose()}
      >
        <SocialIcon as={FaFacebook} />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title="Check out this video on PlayMood"
        onClick={() => onClose()}
      >
        <SocialIcon as={FaTwitter} />
      </TwitterShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title="Check out this video on PlayMood"
        onClick={() => onClose()}
      >
        <SocialIcon as={FaWhatsapp} />
      </WhatsappShareButton>

        <SocialIcon as={FaInstagram} />

      <SocialIcon as={FaCopy} onClick={handleCopy} />

    </ShareModalContainer>
  );
};


const ShareModalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
`;

const SocialIcon = styled.div`
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
  margin: 5px;

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 768px) {
    margin: 10px;
    font-size: 14px; /* Adjust the margin for better spacing on mobile */
  }
`;




export default ShareModal;
