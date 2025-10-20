import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { FaCopy, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
  color: #fff;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const ShareTitle = styled.h2`
  margin-bottom: 20px;
`;

const ShareIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const CopyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #333;
  padding: 10px;
  border-radius: 4px;
`;

const CopyInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #444;
  color: #fff;
  border: none;
`;

const CopyButton = styled.button`
  background: #541011;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: #6b1516;
  }
`;

const HighlightShareModal = ({ shareUrl, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <ShareTitle>Share this Highlight</ShareTitle>
        <ShareIcons>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </ShareIcons>
        <CopyContainer>
          <CopyInput type="text" value={shareUrl} readOnly />
          <CopyButton onClick={copyToClipboard}>
            <FaCopy />
            Copy
          </CopyButton>
        </CopyContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HighlightShareModal;
