import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalButtonCancel,
} from '../../styles/CreatorPageStyles';

const FeedPostViewerModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <ModalOverlay onClick={onClose} data-testid="feed-post-viewer-modal">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{post.caption}</ModalTitle>
          <ModalButtonCancel onClick={onClose}>Close</ModalButtonCancel>
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <img src={post.media[0].url} alt={post.caption} style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1, paddingLeft: '20px' }}>
              <p>Comments and other details will go here.</p>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FeedPostViewerModal;