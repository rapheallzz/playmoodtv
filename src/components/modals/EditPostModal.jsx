import React from 'react';
import { Modal, ModalContent, ModalTitle, ModalTextarea, ModalButtons, ModalButtonCancel, ModalButtonSubmit } from '../../styles/CreatorPageStyles';

const EditPostModal = ({ editPostContent, setEditPostContent, handleUpdatePost, onClose }) => (
  <Modal>
    <ModalContent>
      <ModalTitle>Edit Community Post</ModalTitle>
      <ModalTextarea
        value={editPostContent}
        onChange={(e) => setEditPostContent(e.target.value)}
        placeholder="Update your post..."
        rows="4"
        aria-label="Edit Post Content"
      />
      <ModalButtons>
        <ModalButtonCancel onClick={onClose} aria-label="Cancel">
          Cancel
        </ModalButtonCancel>
        <ModalButtonSubmit
          onClick={handleUpdatePost}
          disabled={!editPostContent.trim()}
          aria-label="Save Post"
        >
          Save
        </ModalButtonSubmit>
      </ModalButtons>
    </ModalContent>
  </Modal>
);

export default EditPostModal;