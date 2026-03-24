import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HiCloudUpload, HiVideoCamera, HiX } from 'react-icons/hi';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';
import BASE_API_URL from '../../apiConfig';
import uploadService from '../../features/uploadService';
import { getFileContentType } from '../../utils/fileUtils';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalButtons,
  ModalButtonCancel,
  ModalButtonSubmit,
  ErrorMessage,
  StyledInput,
  StyledTextArea,
  StyledSelect,
  UploadZoneContainer,
  UploadText,
  UploadSubtext,
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

const RangeSliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  margin: 10px 0 25px 0;
  display: flex;
  align-items: center;
  background: #1a1a1a;
  border-radius: 4px;
  padding: 0 10px;
`;

const SliderTrack = styled.div`
  position: absolute;
  left: 10px;
  right: 10px;
  height: 4px;
  background: #444;
  border-radius: 2px;
  z-index: 1;
`;

const SliderRange = styled.div`
  position: absolute;
  height: 4px;
  background: #541011;
  border-radius: 2px;
  z-index: 2;
  left: calc(10px + ${props => props.$left}% * (100% - 20px) / 100);
  width: calc(${props => props.$width}% * (100% - 20px) / 100);
`;

const RangeInput = styled.input`
  position: absolute;
  left: 10px;
  right: 10px;
  width: calc(100% - 20px);
  background: none;
  pointer-events: none;
  appearance: none;
  -webkit-appearance: none;
  z-index: 3;
  margin: 0;

  &::-webkit-slider-thumb {
    height: 24px;
    width: 12px;
    border-radius: 2px;
    background: #fff;
    cursor: pointer;
    pointer-events: auto;
    appearance: none;
    -webkit-appearance: none;
    border: 1px solid #541011;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }

  &::-moz-range-thumb {
    height: 24px;
    width: 12px;
    border-radius: 2px;
    background: #fff;
    cursor: pointer;
    pointer-events: auto;
    border: 1px solid #541011;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }
`;

const TimeLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -15px;
  margin-bottom: 20px;
  font-size: 11px;
  color: #888;
  font-family: monospace;
`;

const PlayRangeButton = styled.button`
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;

  &:hover {
    background: #444;
  }
`;

const CreateHighlightModal = ({
  isOpen,
  onClose,
  onCreate,
  availableVideos = [],
}) => {
  const { user, userToken } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('existing'); // 'existing' or 'upload'
  const [contentId, setContentId] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleStartTimeChange = (e) => {
    const value = Math.min(parseFloat(e.target.value), endTime - 0.1);
    setStartTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handlePlayPreview = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
      setIsPreviewing(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && isPreviewing) {
      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.pause();
          setIsPreviewing(false);
        }
      };
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [isPreviewing, endTime]);

  const handleEndTimeChange = (e) => {
    const value = Math.max(parseFloat(e.target.value), startTime + 0.1);
    setEndTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const selectedVideo = useMemo(() => {
    return availableVideos.find((video) => video._id === contentId);
  }, [contentId, availableVideos]);

  const handleVideoChange = (e) => {
    setContentId(e.target.value);
    setStartTime(0);
    setVideoDuration(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVideoDuration(null);
    setStartTime(0);
    setEndTime(0);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        const duration = video.duration;
        setVideoDuration(duration);
        setEndTime(Math.min(30, duration));
      };
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, [selectedVideo, videoFile, activeTab]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const duration = video.duration;
        setVideoDuration(duration);
        setStartTime(0);
        setEndTime(Math.min(30, duration));
        URL.revokeObjectURL(url);
      };
      video.src = url;
    }
  };

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setVideoPreviewUrl('');
    }
  }, [videoFile]);

  const generateThumbnail = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        video.currentTime = Math.min(startTime, video.duration);
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

  const uploadToR2 = async (file, contentType) => {
    const finalContentType = contentType || getFileContentType(file) || 'application/octet-stream';
    const signatureFormData = new FormData();
    signatureFormData.append('provider', 'r2');
    signatureFormData.append('fileName', file.name || `thumb-${Date.now()}.jpg`);
    signatureFormData.append('contentType', finalContentType);

    const sigResponse = await axios.post(`${BASE_API_URL}/api/content/signature`, signatureFormData, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    const { uploadUrl, key, publicUrl } = sigResponse.data;

    await uploadService.uploadToR2(file, uploadUrl, finalContentType, (progress) => {
      if (contentType.startsWith('video/')) {
        setUploadProgress(progress);
      }
    });

    return { key, publicUrl: publicUrl || uploadUrl };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((activeTab === 'existing' && !contentId) || (activeTab === 'upload' && !videoFile) || startTime === '' || endTime === '' || !title) {
      setError('All fields are required.');
      return;
    }
    if (parseFloat(startTime) >= parseFloat(endTime)) {
      setError('Start time must be less than end time.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      let payload = {
        title,
        startTime: parseFloat(startTime),
        endTime: parseFloat(endTime),
      };

      if (activeTab === 'existing') {
        payload.contentId = contentId;
      } else {
        const videoData = await uploadToR2(videoFile, videoFile.type);
        const thumbBlob = await generateThumbnail(videoFile);
        const thumbData = await uploadToR2(thumbBlob, 'image/jpeg');

        payload.videoKey = videoData.key;
        payload.thumbnailKey = thumbData.key;
      }

      const result = await onCreate(payload);

      if (result.success) {
        Swal.fire('Success', 'Highlight created successfully!', 'success');
        onClose();
        resetForm();
      } else {
        setError(result.error || 'Failed to create highlight.');
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'An error occurred during creation.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setContentId('');
    setStartTime(0);
    setEndTime(0);
    setTitle('');
    setVideoFile(null);
    setVideoDuration(null);
    setActiveTab('existing');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <ModalTitle>Create Highlight</ModalTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <TabContainer>
          <Tab $active={activeTab === 'existing'} onClick={() => handleTabChange('existing')}>
            From Existing Video
          </Tab>
          <Tab $active={activeTab === 'upload'} onClick={() => handleTabChange('upload')}>
            Upload New Highlight
          </Tab>
        </TabContainer>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '8px' }}>Highlight Title</label>
            <StyledTextArea
              id="title"
              value={title}
              placeholder="Enter highlight title"
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ minHeight: '80px' }}
            />
          </div>

          {activeTab === 'existing' ? (
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="video-select" style={{ display: 'block', marginBottom: '8px' }}>Select Video</label>
              <StyledSelect
                id="video-select"
                value={contentId}
                onChange={handleVideoChange}
              >
                <option value="" disabled>Choose a video</option>
                {availableVideos.map((video) => (
                  <option key={video._id} value={video._id}>
                    {video.title}
                  </option>
                ))}
              </StyledSelect>
            </div>
          ) : (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Upload Video</label>
              <UploadZoneContainer onClick={() => fileInputRef.current.click()}>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="video/*"
                />
                {videoFile ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HiVideoCamera size={30} color="#541011" />
                    <span style={{ color: '#333' }}>{videoFile.name}</span>
                  </div>
                ) : (
                  <>
                    <HiCloudUpload size={40} color="#666" />
                    <UploadText>Click to upload video</UploadText>
                    <UploadSubtext>MP4, WebM (max. 100MB)</UploadSubtext>
                  </>
                )}
              </UploadZoneContainer>
            </div>
          )}

          {((activeTab === 'existing' && selectedVideo) || (activeTab === 'upload' && videoPreviewUrl)) && (
            <div style={{ marginBottom: '16px' }}>
              <video
                ref={videoRef}
                key={activeTab === 'existing' && selectedVideo ? selectedVideo._id : 'uploaded-preview'}
                src={activeTab === 'existing' && selectedVideo ? selectedVideo.video : videoPreviewUrl}
                controls
                width="100%"
                style={{ borderRadius: '8px', maxHeight: '200px', backgroundColor: 'black' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {((activeTab === 'existing' && selectedVideo) || (activeTab === 'upload' && videoFile)) && videoDuration && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Trim Highlight</label>
                <PlayRangeButton type="button" onClick={handlePlayPreview}>
                   {isPreviewing ? 'Playing...' : 'Preview Range'}
                </PlayRangeButton>
              </div>
              <RangeSliderContainer>
                <SliderTrack />
                <SliderRange
                  $left={(startTime / videoDuration) * 100}
                  $width={((endTime - startTime) / videoDuration) * 100}
                />
                <RangeInput
                  type="range"
                  min="0"
                  max={videoDuration}
                  step="0.1"
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
                <RangeInput
                  type="range"
                  min="0"
                  max={videoDuration}
                  step="0.1"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </RangeSliderContainer>
              <TimeLabelContainer>
                <span>{parseFloat(startTime).toFixed(1)}s</span>
                <span>Duration: {(endTime - startTime).toFixed(1)}s</span>
                <span>{parseFloat(endTime).toFixed(1)}s</span>
              </TimeLabelContainer>
            </>
          )}

          {isLoading && uploadProgress > 0 && (
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>Uploading video...</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>{uploadProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#541011', transition: 'width 0.3s' }} />
                </div>
            </div>
          )}

          <ModalButtons>
            <ModalButtonCancel type="button" onClick={() => { onClose(); resetForm(); }}>Cancel</ModalButtonCancel>
            <ModalButtonSubmit type="submit" disabled={isLoading}>
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Spinner /> {activeTab === 'upload' ? 'Uploading...' : 'Creating...'}
                </div>
              ) : 'Create Highlight'}
            </ModalButtonSubmit>
          </ModalButtons>
        </form>
      </ModalContent>
    </Modal>
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

export default CreateHighlightModal;
