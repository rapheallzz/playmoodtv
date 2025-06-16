import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';

import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

import styled from 'styled-components';


const ShareModal = ({ open, onClose, shareUrl }) => {
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

      {/* <InstagramShareButton
        url={shareUrl}
        title="Check out this video on PlayMood"
        onClick={() => onClose()}
      >
        <SocialIcon as={FaInstagram} />
      </InstagramShareButton> */}
            
        <SocialIcon as={FaInstagram} />

      <LinkedinShareButton
        url={shareUrl}
        title="Check out this video on PlayMood"
        onClick={() => onClose()}
      >
        <SocialIcon as={FaLinkedin} />
      </LinkedinShareButton>

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
