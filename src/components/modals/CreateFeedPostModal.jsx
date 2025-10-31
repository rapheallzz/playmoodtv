import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalButtons,
  ModalButtonCancel,
  ModalButtonSubmit,
  CloseButton,
  StyledInput,
  ModalTextarea,
} from '../../styles/CreatorPageStyles';

const CreateFeedPostModal = ({ isOpen, onClose, onCreateFeedPost }) => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setMedia(e.target.files);
  };

  const handleSubmit = async () => {
    if (!caption || media.length === 0) {
      alert('Please provide a caption and at least one image.');
      return;
    }

    setIsUploading(true);
    await onCreateFeedPost(caption, media);
    setIsUploading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <ModalTitle>Create Feed Post</ModalTitle>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTextarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <StyledInput type="file" multiple onChange={handleFileChange} />
        <ModalButtons>
          <ModalButtonCancel onClick={onClose}>Cancel</ModalButtonCancel>
          <ModalButtonSubmit onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? 'Posting...' : 'Post'}
          </ModalButtonSubmit>
        </ModalButtons>
      </ModalContent>
    </Modal>
  );
};

export default CreateFeedPostModal;
