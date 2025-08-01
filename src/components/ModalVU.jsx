import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => {
    console.log('Redux auth state:', state.auth);
    return state.auth || {};
  });

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    credit: '',
    category: 'Top 10',
  });

  const [files, setFiles] = useState([]);
  const [previewStart, setPreviewStart] = useState(0);
  const [previewEnd, setPreviewEnd] = useState(10);
  const [videoDuration, setVideoDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoRef = useRef(null);

  // Fallback to local storage if Redux state is not available
  const getAuthData = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const storedToken = storedUser?.token || '';
    const storedUserId = storedUser?._id || '';
    console.log('Stored auth data:', { storedUserId, storedToken });

    return {
      userId: user?._id || storedUserId,
      authToken: token || storedToken,
    };
  };

  // Handle file selection and load video duration
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const filesArray = Array.from(fileList);
    console.log('Selected files:', filesArray);
    setFiles(filesArray);

    if (filesArray.length > 0) {
      const videoFile = filesArray.find((file) => file.type.startsWith('video/'));
      if (videoFile) {
        const videoURL = URL.createObjectURL(videoFile);
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
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: value,
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!files.length) {
    setError('Please select at least one file to upload.');
    return;
  }

  const previewDuration = previewEnd - previewStart;
  if (previewDuration < 10 || previewDuration > 15) {
    setError('Preview must be between 10 and 15 seconds.');
    return;
  }

  const { userId, authToken } = getAuthData();
  if (!userId || !authToken) {
    setError('You must be logged in to upload videos. Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
    return;
  }

  setLoading(true);
  setError('');
  setSuccess(false);

  const maxSize = 500 * 1024 * 1024; // 500MB
  const oversizedFiles = files.filter((file) => file.size > maxSize);
  if (oversizedFiles.length > 0) {
    setError('One or more files exceed the maximum size (500MB).');
    setLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append('title', videoData.title);
  formData.append('description', videoData.description);
  formData.append('credit', videoData.credit);
  formData.append('category', videoData.category);
  formData.append('userId', userId);
  formData.append('previewStart', previewStart);
  formData.append('previewEnd', previewEnd);
  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await axios.post(
      'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content',
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 1200000, // 20 minutes
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
            : 0;
          console.log(`Upload Progress: ${progress}%`);
          setUploadProgress(progress);
        },
      }
    );

    console.log('Video submitted successfully:', response.data);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  } catch (error) {
    console.error('Error submitting video:', error, error.response);
    if (error.code === 'ECONNABORTED') {
      setError('Request timed out. Please check your network or try again later.');
    } else if (error.response) {
      setError(`Failed to upload video: ${error.response.data.message || error.response.statusText} (Status: ${error.response.status})`);
    } else {
      setError('An error occurred while uploading. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Submit Video</h2>
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
            <option value="Top 10">Top 10</option>
            <option value="Fashion Show">Fashion Show</option>
            <option value="Teen">Teens</option>
            <option value="Channels">Channels</option>
            <option value="Documentarie">Documentaries</option>
            <option value="Interview">Interviews</option>
            <option value="Social">Social</option>
            <option value="Behind the camera">Behind the camera</option>
            <option value="Soon in Playmood">Soon in Playmood</option>
            <option value="Watchlist">Watchlist</option>
            <option value="Daries">Recommended</option>
            <option value="New on Playmood">New on Playmood</option>
            <option value="Only in Playmood">Only in Playmood</option>
          </Select>

          <Label>Upload Video and Thumbnail</Label>
          <Input
            type="file"
            accept="video/*,image/*"
            multiple
            onChange={handleFileChange}
          />

          {files.length > 0 && files.some((file) => file.type.startsWith('video/')) && (
            <>
              <Label>Preview Selection (10–15 seconds)</Label>
              {videoDuration ? (
                <>
                  <VideoContainer>
                    <video
                      ref={videoRef}
                      controls
                      src={URL.createObjectURL(
                        files.find((file) => file.type.startsWith('video/'))
                      )}
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

          <UploadButton type="submit" disabled={loading || !files.length || !getAuthData().userId || !getAuthData().authToken}>
            {loading ? 'Uploading...' : 'Upload'}
          </UploadButton>

          {success && (
            <SuccessNotification>
              <p>Video uploaded successfully!</p>
            </SuccessNotification>
          )}
        </Form>

        {loading && (
          <ProgressBar>
            <Filler style={{ width: `${uploadProgress}%` }} />
          </ProgressBar>
        )}
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
  max-height: 80vh; /* Limit modal height to 80% of viewport */
  overflow-y: auto; /* Enable vertical scrolling */
  box-sizing: border-box; /* Include padding in width/height calculations */

  /* Responsive adjustments */
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
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
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
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
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

const SuccessNotification = styled.div`
  background-color: #28a745;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin-top: 10px;
`;

const Filler = styled.div`
  background-color: #541011;
  height: 10px;
  border-radius: 4px;
  transition: width 0.2s ease-in-out;
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

export { VideoModal };