import React, { useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  StyledInput,
  StyledTextArea,
  ActionButton,
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
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Create Feed Post</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <StyledTextArea
            placeholder="What's on your mind?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <StyledInput type="file" multiple onChange={handleFileChange} />
        </ModalBody>
        <ModalFooter>
          <ActionButton onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? 'Posting...' : 'Post'}
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateFeedPostModal;