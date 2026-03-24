import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadFile, updateContent } from '../features/uploadSlice';
import { HiCloudUpload, HiVideoCamera, HiPhotograph } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';

const FileUploadZone = ({ accept, onChange, file, icon: Icon, label, maxSizeLabel }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDivClick = () => {
    fileInputRef.current.click();
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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } };
      onChange(event);
    }
  };

  return (
    <UploadZoneContainer
      $isDragOver={isDragOver}
      onClick={handleDivClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {file ? (
        <FileDetails>
          <Icon size={30} color="#541011" />
          <FileInfo>
            <FileName>{file.name}</FileName>
            <FileSize>{(file.size / (1024 * 1024)).toFixed(2)} MB</FileSize>
          </FileInfo>
          <ChangeButton type="button">Change</ChangeButton>
        </FileDetails>
      ) : (
        <>
          <HiCloudUpload size={40} color="#666" />
          <UploadText>
            <strong>Click to upload</strong> or drag and drop
          </UploadText>
          <UploadSubtext>{label} {maxSizeLabel && `(${maxSizeLabel})`}</UploadSubtext>
        </>
      )}
    </UploadZoneContainer>
  );
};

const VideoModal = ({ onClose, content }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userToken } = useSelector((state) => state.auth);
  const { isUploading } = useSelector((state) => state.upload);

  const isEditing = !!content;

  const [videoData, setVideoData] = useState({
    title: content?.title || '',
    description: content?.description || '',
    credit: content?.credit || '',
    category: content?.category || 'Fashion Show',
    isOnlyOnPlaymood: content?.isOnlyOnPlaymood || false,
    scheduledDate: content?.scheduledDate || '',
    scheduledStartTime: content?.scheduledStartTime || '',
  });

  const [isScheduled, setIsScheduled] = useState(!!(content?.scheduledDate || content?.scheduledStartTime));
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewStart, setPreviewStart] = useState(content?.previewStart || 0);
  const [previewEnd, setPreviewEnd] = useState(content?.previewEnd || 10);
  const [videoDuration, setVideoDuration] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
      if (file.size > maxSize) {
        setError('The video file exceeds the maximum size (2GB).');
        setVideoFile(null);
        return;
      }
      setError('');
      setVideoFile(file);
      const videoURL = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = videoURL;
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        setVideoDuration(video.duration);
        setPreviewStart(0);
        setPreviewEnd(Math.min(10, video.duration));
        URL.revokeObjectURL(videoURL);
        video.remove();
      };

      video.onerror = () => {
        setError('Unable to load video metadata.');
        URL.revokeObjectURL(videoURL);
        video.remove();
      };
    } else {
      setVideoFile(null);
      setVideoDuration(null);
    }
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const maxThumbnailSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxThumbnailSize) {
        setError('The thumbnail file exceeds the maximum size (10MB).');
        setThumbnailFile(null);
        return;
      }
      setError('');
      setThumbnailFile(file);
    } else {
      setThumbnailFile(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePreviewChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseFloat(value) || 0;

    if (name === 'previewStart') {
      setPreviewStart(newValue);
      if (previewEnd < newValue + 10) {
        setPreviewEnd(Math.min(newValue + 10, videoDuration || Infinity));
      }
    } else if (name === 'previewEnd') {
      setPreviewEnd(newValue);
      if (previewStart > newValue - 15) {
        setPreviewStart(Math.max(0, newValue - 15));
      }
    }

    const duration = previewEnd - previewStart;
    if (duration < 10 || duration > 15) {
      setError('Preview must be between 10 and 15 seconds.');
    } else {
      setError('');
    }
  };

  const playPreview = () => {
    if (videoRef.current && videoDuration) {
      videoRef.current.currentTime = previewStart;
      videoRef.current.play();
      const stopPlayback = () => {
        if (videoRef.current.currentTime >= previewEnd) {
          videoRef.current.pause();
          videoRef.current.removeEventListener('timeupdate', stopPlayback);
        }
      };
      videoRef.current.addEventListener('timeupdate', stopPlayback);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing && !videoFile) {
      setError('Please select a video file to upload.');
      return;
    }

    if (!isEditing) {
      const previewDuration = previewEnd - previewStart;
      if (previewDuration < 10 || previewDuration > 15) {
        setError('Preview must be between 10 and 15 seconds.');
        return;
      }
    }

    if (!user || !userToken) {
      setError('You must be logged in to upload videos. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    let scheduledReleaseDate = null;
    if (isScheduled && videoData.scheduledDate && videoData.scheduledStartTime) {
      scheduledReleaseDate = new Date(`${videoData.scheduledDate}T${videoData.scheduledStartTime}:00Z`).toISOString();
    }

    const metadata = {
      ...videoData,
      previewStart,
      previewEnd,
      scheduledReleaseDate,
      // Ensure strings for the API if not scheduled
      scheduledDate: isScheduled ? videoData.scheduledDate : "",
      scheduledStartTime: isScheduled ? videoData.scheduledStartTime : "",
    };

    if (isEditing) {
      dispatch(
        updateContent({
          contentId: content._id,
          thumbnailFile,
          videoMetadata: metadata,
        })
      );
    } else {
      dispatch(
        uploadFile({
          videoFile,
          thumbnailFile,
          videoMetadata: metadata,
          previewStart,
          previewEnd,
        })
      );
    }

    onClose(); // Close the modal immediately
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <h2>{isEditing ? 'Edit Video' : 'Submit Video'}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleInputChange}
            required
          />

          <Label>Video Description</Label>
          <TextArea
            name="description"
            value={videoData.description}
            onChange={handleInputChange}
            required
          ></TextArea>

          <Label>Production Credits</Label>
          <Input
            type="text"
            name="credit"
            value={videoData.credit}
            onChange={handleInputChange}
          />

          <Label>Category</Label>
          <Select
            name="category"
            value={videoData.category}
            onChange={handleInputChange}
          >
            <option value="Fashion Show">Fashion Show</option>
            <option value="Teen">Teens</option>
            <option value="Documentaries">Documentaries</option>
            <option value="Interview">Interviews</option>
            <option value="Social">Social</option>
            <option value="Behind the camera">Behind the camera</option>
            <option value="Diaries">Diaries</option>
          </Select>

          <CheckboxContainer>
            <input
              type="checkbox"
              id="isOnlyOnPlaymood"
              name="isOnlyOnPlaymood"
              checked={videoData.isOnlyOnPlaymood}
              onChange={handleInputChange}
            />
            <Label htmlFor="isOnlyOnPlaymood">Only on Playmood</Label>
          </CheckboxContainer>

          <CheckboxContainer>
            <input
              type="checkbox"
              id="isScheduled"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
            />
            <Label htmlFor="isScheduled">Schedule Release Date</Label>
          </CheckboxContainer>

          {isScheduled && (
            <ScheduleContainer>
              <div style={{ flex: 1 }}>
                <Label>Release Date</Label>
                <Input
                  type="date"
                  name="scheduledDate"
                  value={videoData.scheduledDate}
                  onChange={handleInputChange}
                  required={isScheduled}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Label>Release Time</Label>
                <Input
                  type="time"
                  name="scheduledStartTime"
                  value={videoData.scheduledStartTime}
                  onChange={handleInputChange}
                  required={isScheduled}
                />
              </div>
            </ScheduleContainer>
          )}

          {!isEditing && (
            <>
              <Label>Upload Video</Label>
              <FileUploadZone
                accept="video/*"
                onChange={handleVideoChange}
                file={videoFile}
                icon={HiVideoCamera}
                label="MP4, WebM or Ogg"
                maxSizeLabel="max. 2GB"
              />
            </>
          )}

          <Label>{isEditing ? 'Change Thumbnail (Optional)' : 'Upload Thumbnail'}</Label>
          <FileUploadZone
            accept="image/*,.heic,.HEIC"
            onChange={handleThumbnailChange}
            file={thumbnailFile}
            icon={HiPhotograph}
            label="PNG, JPG, JPEG or HEIC"
            maxSizeLabel="max. 10MB"
          />

          {!isEditing && videoFile && (
            <>
              <Label>Preview Selection (10–15 seconds)</Label>
              {videoDuration ? (
                <>
                  <VideoContainer>
                    <video
                      ref={videoRef}
                      controls
                      src={URL.createObjectURL(videoFile)}
                      style={{ width: '100%', maxHeight: '200px' }}
                    />
                  </VideoContainer>
                  <PreviewControls>
                    <div>
                      <Label>Start Time (seconds)</Label>
                      <Input
                        type="number"
                        name="previewStart"
                        value={previewStart}
                        onChange={handlePreviewChange}
                        min="0"
                        max={videoDuration - 10}
                        step="0.1"
                        required
                      />
                    </div>
                    <div>
                      <Label>End Time (seconds)</Label>
                      <Input
                        type="number"
                        name="previewEnd"
                        value={previewEnd}
                        onChange={handlePreviewChange}
                        min={previewStart + 10}
                        max={videoDuration}
                        step="0.1"
                        required
                      />
                    </div>
                    <PreviewButton type="button" onClick={playPreview}>
                      Play Preview
                    </PreviewButton>
                  </PreviewControls>
                  <PreviewInfo>
                    Preview Duration: {(previewEnd - previewStart).toFixed(1)} seconds
                  </PreviewInfo>
                </>
              ) : (
                <p>Loading video duration...</p>
              )}
            </>
          )}

          <UploadButton type="submit" disabled={isUploading || (!isEditing && !videoFile) || !user}>
            {isUploading ? (isEditing ? 'Updating...' : 'Uploading...') : (isEditing ? 'Save Changes' : 'Start Upload')}
          </UploadButton>
        </Form>
      </ModalContainer>
    </>
  );
};


const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 600px) {
    max-width: 95%;
    padding: 15px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  font-size: 24px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    margin-bottom: 0;
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  gap: 15px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #eee;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const UploadButton = styled.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

  &:hover:not(:disabled) {
    background-color: #3d0c0d;
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  text-align: center;
`;

const VideoContainer = styled.div`
  margin-bottom: 10px;
`;

const PreviewControls = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const PreviewButton = styled.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #3d0c0d;
  }
`;

const PreviewInfo = styled.p`
  font-size: 12px;
  color: #333;
  margin-top: 5px;
`;

const UploadZoneContainer = styled.div`
  border: 2px dashed ${(props) => (props.$isDragOver ? '#541011' : '#ccc')};
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.$isDragOver ? '#fff5f5' : '#fafafa')};
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #541011;
    background-color: #fff5f5;
  }
`;

const UploadText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;

  strong {
    color: #541011;
  }
`;

const UploadSubtext = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
`;

const ChangeButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #eee;
  }
`;

export { VideoModal };