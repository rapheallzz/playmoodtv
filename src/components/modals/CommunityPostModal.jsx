import React from 'react';
import { Modal, ModalContent, ModalTitle, ModalTextarea, ModalButtons, ModalButtonCancel, ModalButtonSubmit } from '../../styles/CreatorPageStyles';

const CommunityPostModal = ({ newPostContent, setNewPostContent, handleCreatePost, onClose }) => (
  <Modal>
    <ModalContent>
      <ModalTitle>Create Community Post</ModalTitle>
      <ModalTextarea
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
        aria-label="Community Post Content"
      />
      <ModalButtons>
        <ModalButtonCancel onClick={onClose} aria-label="Cancel">
          Cancel
        </ModalButtonCancel>
        <ModalButtonSubmit
          onClick={handleCreatePost}
          disabled={!newPostContent.trim()}
          aria-label="Submit Post"
        >
          Post
        </ModalButtonSubmit>
      </ModalButtons>
    </ModalContent>
  </Modal>
);

export default CommunityPostModal;