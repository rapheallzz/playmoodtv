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
    category: 'Fashion Show',
  });

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewStart, setPreviewStart] = useState(0);
  const [previewEnd, setPreviewEnd] = useState(10);
  const [videoDuration, setVideoDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // New state for popup
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

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
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
      setThumbnailFile(file);
    } else {
      setThumbnailFile(null);
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

const uploadToCloudinary = async (file, signatureData, resourceType, onProgress) => {
  // TODO: This should be moved to a configuration file or environment variable
  const cloudName = 'di97mcvbu';
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature', signatureData.signature);
  formData.append('timestamp', signatureData.timestamp);
  formData.append('api_key', signatureData.api_key);

  const response = await axios.post(uploadUrl, formData, {
    onUploadProgress: (progressEvent) => {
      const progress = progressEvent.total
        ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
        : 0;
      onProgress(progress);
    },
  });

  return response.data;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      setError('Please select a video file to upload.');
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
    setShowPopup(false);

    const maxSize = 3 * 1024 * 1024 * 1024; // 3GB
    if (videoFile.size > maxSize) {
      setError('The video file exceeds the maximum size (3GB).');
      setLoading(false);
      return;
    }
    if (thumbnailFile && thumbnailFile.size > maxSize) {
      setError('The thumbnail file exceeds the maximum size (3GB).');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Get signature for video
      const videoSignatureResponse = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/signature',
        { type: 'videos' },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const videoSignatureData = videoSignatureResponse.data;

      // Step 2: Upload video to Cloudinary
      const videoUploadResponse = await uploadToCloudinary(
        videoFile,
        videoSignatureData,
        'video',
        setUploadProgress
      );

      let thumbnailUploadResponse = null;
      if (thumbnailFile) {
        setUploadProgress(0); // Reset progress for thumbnail
        // Get a new signature for the thumbnail
        const thumbSignatureResponse = await axios.post(
          'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/signature',
          { type: 'images' },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const thumbSignatureData = thumbSignatureResponse.data;

        thumbnailUploadResponse = await uploadToCloudinary(
          thumbnailFile,
          thumbSignatureData,
          'image',
          setUploadProgress
        );
      }

      // Step 3: Send metadata to your backend
      const finalPayload = {
        title: videoData.title,
        category: videoData.category,
        description: videoData.description,
        credit: videoData.credit,
        userId,
        previewStart,
        previewEnd,
        languageCode: 'en-US',
        video: {
          public_id: videoUploadResponse.public_id,
          url: videoUploadResponse.secure_url,
        },
        thumbnail: thumbnailUploadResponse
          ? {
              public_id: thumbnailUploadResponse.public_id,
              url: thumbnailUploadResponse.secure_url,
            }
          : undefined,
      };

      await axios.post('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content', finalPayload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccess(true);
      setShowPopup(true);
    } catch (error) {
      console.error('Error in the upload process:', error.response || error);
      if (error.response) {
        // Differentiate errors based on the step
        if (error.config.url.includes('/api/content/signature')) {
          setError('Failed to get an upload signature. Please try again.');
        } else if (error.config.url.includes('cloudinary')) {
          setError('Failed to upload to Cloudinary. Please check the file and try again.');
        } else if (error.config.url.includes('/api/content')) {
          setError('Failed to create the content record. Please try again.');
        } else {
          setError(`An error occurred: ${error.response.data.message || 'Please try again.'}`);
        }
      } else {
        setError('A network error occurred. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle popup close and modal close
  const handlePopupClose = () => {
    setShowPopup(false);
    onClose(); // Close the modal after popup is closed
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
            {/* <option value="Top 10">Top 10</option> */}
            <option value="Fashion Show">Fashion Show</option>
            <option value="Teen">Teens</option>
            <option value="Documentarie">Documentaries</option>
            <option value="Interview">Interviews</option>
            <option value="Social">Social</option>
            <option value="Behind the camera">Behind the camera</option>
          </Select>

          <Label>Upload Video</Label>
          <Input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
          />

          <Label>Upload Thumbnail</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />

          {videoFile && (
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

          <UploadButton type="submit" disabled={loading || !videoFile || !getAuthData().userId || !getAuthData().authToken}>
            {loading ? 'Uploading...' : 'Upload'}
          </UploadButton>

          {success && !showPopup && (
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

        {showPopup && (
          <PopupContainer>
            <PopupContent>
              <h3>Upload Successful!</h3>
              <p>Your video has been successfully uploaded. It will take up to 24 hours for approval. You will receive a notification via email once it is approved.</p>
              <PopupButton onClick={handlePopupClose}>OK</PopupButton>
            </PopupContent>
          </PopupContainer>
        )}
      </ModalContainer>
    </>
  );
};

// Styled components for the popup
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const PopupButton = styled.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px;

  &:hover {
    background-color: #3d0c0d;
  }
`;

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
