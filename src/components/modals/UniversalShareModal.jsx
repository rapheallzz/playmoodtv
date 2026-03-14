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
  z-index: 10015; /* Higher than most modals */
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 420px;
  position: relative;
  color: #fff;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const ShareTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 700;
`;

const ShareIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 25px;
`;

const CopyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #222;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
`;

const CopyInput = styled.input`
  flex: 1;
  padding: 8px;
  background: transparent;
  color: #ddd;
  border: none;
  font-size: 0.9rem;
  outline: none;
`;

const CopyButton = styled.button`
  background: #541011;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #7c1408;
  }
`;

const UniversalShareModal = React.forwardRef(({ shareUrl, title, onClose }, ref) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  const shareTitle = title || "Check out this amazing content on PlaymoodTV!";

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent ref={ref} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <ShareTitle>Share</ShareTitle>
        <ShareIcons>
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={48} round />
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
});

export default UniversalShareModal;
