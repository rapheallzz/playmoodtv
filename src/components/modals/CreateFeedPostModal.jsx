import React, { useState, useRef, useMemo } from 'react';
import { HiCloudUpload, HiX, HiPlus, HiCollection, HiVideoCamera, HiPhotograph } from 'react-icons/hi';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { getFileContentType } from '../../utils/fileUtils';
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
  StyledSelect,
} from '../../styles/CreatorPageStyles';

const TabContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #333;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.$active ? '#541011' : '#888'};
  padding: 10px 5px;
  cursor: pointer;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  border-bottom: 2px solid ${props => props.$active ? '#541011' : 'transparent'};
  transition: all 0.3s;

  &:hover {
    color: #541011;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding: 5px;
  border: 1px solid #333;
  border-radius: 4px;
`;

const ContentItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  cursor: pointer;
  border: 2px solid ${props => props.$selected ? '#541011' : 'transparent'};
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const SelectionBadge = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #541011;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const CreateFeedPostModal = ({ isOpen, onClose, onCreateFeedPost, availableVideos = [], highlights = [] }) => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState([]); // Array of File objects
  const [previews, setPreviews] = useState([]); // Previews for newly uploaded files
  const [selectedExisting, setSelectedExisting] = useState([]); // IDs of existing videos or highlights
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'videos', 'highlights'
  const fileInputRef = useRef(null);

  const generateThumbnail = (file) => {
    return new Promise((resolve) => {
      const contentType = getFileContentType(file);
      if (!contentType || !contentType.startsWith('video/')) {
        resolve(null);
        return;
      }
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        video.currentTime = 1; // Seek to 1 second
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          resolve(blob);
          video.remove();
        }, 'image/jpeg');
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    await addMedia(files);
  };

  const addMedia = async (files) => {
    const newMedia = [...media];
    const newPreviews = [...previews];

    for (const file of files) {
      const contentType = getFileContentType(file);
      newMedia.push(file);
      const thumbnailBlob = await generateThumbnail(file);
      newPreviews.push({
        url: URL.createObjectURL(file),
        thumbnailUrl: thumbnailBlob ? URL.createObjectURL(thumbnailBlob) : null,
        thumbnailBlob,
        type: contentType,
        name: file.name
      });
    }

    setMedia(newMedia);
    setPreviews(newPreviews);
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(previews[index].url);
    if (previews[index].thumbnailUrl) URL.revokeObjectURL(previews[index].thumbnailUrl);
    setMedia((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleExistingSelection = (item, type) => {
    const itemId = item._id;
    const isSelected = selectedExisting.some(sel => sel.id === itemId);

    if (isSelected) {
      setSelectedExisting(selectedExisting.filter(sel => sel.id !== itemId));
    } else {
      setSelectedExisting([...selectedExisting, {
        id: itemId,
        type: type,
        thumbnail: type === 'video' ? item.thumbnail : (item.content?.thumbnail || item.thumbnail),
        title: type === 'video' ? item.title : item.title
      }]);
    }
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
    if (!caption || (media.length === 0 && selectedExisting.length === 0)) {
      Swal.fire('Error', 'Please provide a caption and select at least one media item.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      // Prepare mixed media data
      const result = await onCreateFeedPost(caption, media, previews, selectedExisting);
      Swal.fire('Success', 'Feed post created successfully!', 'success');
      handleClose();
    } catch (error) {
      Swal.fire('Error', error.message || 'Failed to create feed post.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    previews.forEach((p) => {
      URL.revokeObjectURL(p.url);
      if (p.thumbnailUrl) URL.revokeObjectURL(p.thumbnailUrl);
    });
    setCaption('');
    setMedia([]);
    setPreviews([]);
    setSelectedExisting([]);
    setActiveTab('upload');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
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

          <TabContainer>
            <Tab $active={activeTab === 'upload'} onClick={() => setActiveTab('upload')}>
              Upload New
            </Tab>
            <Tab $active={activeTab === 'videos'} onClick={() => setActiveTab('videos')}>
              Your Videos
            </Tab>
            <Tab $active={activeTab === 'highlights'} onClick={() => setActiveTab('highlights')}>
              Your Highlights
            </Tab>
          </TabContainer>

          {activeTab === 'upload' && (
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
                accept="image/*,video/*,.heic,.HEIC"
              />
              <HiCloudUpload size={40} color={isDragOver ? '#541011' : '#666'} />
              <UploadText>
                <strong>Click to upload</strong> or drag and drop
              </UploadText>
              <UploadSubtext>Images or Videos (max. 10MB per file)</UploadSubtext>
            </UploadZoneContainer>
          )}

          {activeTab === 'videos' && (
            <ContentGrid>
              {availableVideos.length > 0 ? availableVideos.map(video => (
                <ContentItem
                  key={video._id}
                  $selected={selectedExisting.some(sel => sel.id === video._id)}
                  onClick={() => toggleExistingSelection(video, 'video')}
                >
                  <img src={video.thumbnail} alt={video.title} />
                  {selectedExisting.some(sel => sel.id === video._id) && (
                    <SelectionBadge>✓</SelectionBadge>
                  )}
                </ContentItem>
              )) : <div style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center' }}>No videos available</div>}
            </ContentGrid>
          )}

          {activeTab === 'highlights' && (
            <ContentGrid>
              {highlights.length > 0 ? highlights.map(highlight => (
                <ContentItem
                  key={highlight._id}
                  $selected={selectedExisting.some(sel => sel.id === highlight._id)}
                  onClick={() => toggleExistingSelection(highlight, 'highlight')}
                >
                  <img src={highlight.content?.thumbnail || highlight.thumbnail} alt={highlight.title} />
                  {selectedExisting.some(sel => sel.id === highlight._id) && (
                    <SelectionBadge>✓</SelectionBadge>
                  )}
                </ContentItem>
              )) : <div style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center' }}>No highlights available</div>}
            </ContentGrid>
          )}

          {(previews.length > 0 || selectedExisting.length > 0) && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px' }}>Selected Media</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '5px' }}>
              <MediaPreviewGrid>
                {/* New uploads */}
                {previews.map((preview, index) => (
                  <PreviewItem key={`new-${index}`}>
                    {preview.type.startsWith('video/') ? (
                      <img src={preview.thumbnailUrl || preview.url} alt="video thumbnail" />
                    ) : preview.type === 'image/heic' ? (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#333', color: 'white', fontSize: '10px' }}>
                        <HiPhotograph size={24} />
                        <span>HEIC</span>
                      </div>
                    ) : (
                      <img src={preview.url} alt="preview" />
                    )}
                    {preview.type.startsWith('video/') && (
                      <div style={{ position: 'absolute', top: '5px', left: '5px', color: 'white' }}>
                        <HiVideoCamera size={16} />
                      </div>
                    )}
                    <RemovePreviewButton onClick={() => removeMedia(index)}>
                      <HiX />
                    </RemovePreviewButton>
                  </PreviewItem>
                ))}
                {/* Existing selection */}
                {selectedExisting.map((item, index) => (
                  <PreviewItem key={`existing-${index}`}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div style={{ position: 'absolute', top: '5px', left: '5px', color: 'white' }}>
                      <HiCollection size={16} />
                    </div>
                    <RemovePreviewButton onClick={() => toggleExistingSelection({ _id: item.id }, item.type)}>
                      <HiX />
                    </RemovePreviewButton>
                  </PreviewItem>
                ))}
              </MediaPreviewGrid>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <ActionButton onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Spinner /> Posting...
              </div>
            ) : 'Post'}
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
`;

export default CreateFeedPostModal;