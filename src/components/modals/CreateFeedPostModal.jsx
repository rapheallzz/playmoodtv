import React, { useState, useRef } from 'react';
import { HiCloudUpload, HiX } from 'react-icons/hi';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  StyledTextArea,
  ActionButton,
  UploadZoneContainer,
  UploadText,
  UploadSubtext,
  MediaPreviewGrid,
  PreviewItem,
  RemovePreviewButton,
} from '../../styles/CreatorPageStyles';

const CreateFeedPostModal = ({ isOpen, onClose, onCreateFeedPost }) => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    addMedia(files);
  };

  const addMedia = (files) => {
    setMedia((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(previews[index].url);
    setMedia((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addMedia(droppedFiles);
  };

  const handleSubmit = async () => {
    if (!caption || media.length === 0) {
      alert('Please provide a caption and at least one image/video.');
      return;
    }

    setIsUploading(true);
    await onCreateFeedPost(caption, media);
    setIsUploading(false);
    handleClose();
  };

  const handleClose = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setCaption('');
    setMedia([]);
    setPreviews([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Create Feed Post</h2>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <StyledTextArea
            placeholder="What's on your mind?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <UploadZoneContainer
            $isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              multiple
              hidden
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            <HiCloudUpload size={40} color={isDragOver ? '#541011' : '#666'} />
            <UploadText>
              <strong>Click to upload</strong> or drag and drop
            </UploadText>
            <UploadSubtext>Images or Videos (max. 10MB per file)</UploadSubtext>
          </UploadZoneContainer>

          {previews.length > 0 && (
            <MediaPreviewGrid>
              {previews.map((preview, index) => (
                <PreviewItem key={index}>
                  {preview.type.startsWith('video/') ? (
                    <video src={preview.url} />
                  ) : (
                    <img src={preview.url} alt="preview" />
                  )}
                  <RemovePreviewButton onClick={() => removeMedia(index)}>
                    <HiX />
                  </RemovePreviewButton>
                </PreviewItem>
              ))}
            </MediaPreviewGrid>
          )}
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