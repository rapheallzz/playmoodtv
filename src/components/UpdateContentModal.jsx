// UpdateVideoModal.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BASE_API_URL from '../apiConfig';
import uploadService from '../features/uploadService';

const UpdateContentModal = ({ onClose, contentId }) => {
  const { userToken } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    credit: '',
    category: '',
    thumbnail: null,
    video: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update form data when contentId prop changes
  useEffect(() => {
    const fetchContentDetails = async () => {
      if (!contentId) return;

      try {
        const response = await axios.get(
          `${BASE_API_URL}/api/content/${contentId}`
        );

        if (response.status === 200) {
          setFormData(response.data || {});
        } else {
        }
      } catch (error) {
      }
    };

    fetchContentDetails();
  }, [contentId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      let currentVideo = formData.video;
      let currentThumbnail = formData.thumbnail;

      // Handle Video Upload to R2 if it's a new file
      if (formData.video instanceof File) {
        const videoSignatureFormData = new FormData();
        videoSignatureFormData.append('provider', 'r2');
        videoSignatureFormData.append('fileName', formData.video.name);
        videoSignatureFormData.append('contentType', formData.video.type);

        const videoSigResponse = await axios.post(
          `${BASE_API_URL}/api/content/signature`,
          videoSignatureFormData,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        const { uploadUrl: videoUploadUrl, key: videoKey, publicUrl: videoPublicUrl } = videoSigResponse.data;

        await uploadService.uploadToR2(
          formData.video,
          videoUploadUrl,
          formData.video.type,
          (progress) => {
          }
        );

        currentVideo = {
          url: videoPublicUrl || videoUploadUrl,
          key: videoKey,
        };
      }

      // Handle Thumbnail Upload to R2 if it's a new file
      if (formData.thumbnail instanceof File) {
        const thumbSignatureFormData = new FormData();
        thumbSignatureFormData.append('provider', 'r2');
        thumbSignatureFormData.append('fileName', formData.thumbnail.name);
        thumbSignatureFormData.append('contentType', formData.thumbnail.type);

        const thumbSigResponse = await axios.post(
          `${BASE_API_URL}/api/content/signature`,
          thumbSignatureFormData,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        const { uploadUrl: thumbUploadUrl, key: thumbKey, publicUrl: thumbPublicUrl } = thumbSigResponse.data;

        await uploadService.uploadToR2(
          formData.thumbnail,
          thumbUploadUrl,
          formData.thumbnail.type,
          (progress) => {
          }
        );

        currentThumbnail = {
          url: thumbPublicUrl || thumbUploadUrl,
          key: thumbKey,
        };
      }

      // Final Step: Update Content Record
      const updatePayload = {
        title: formData.title,
        description: formData.description,
        credit: formData.credit,
        category: formData.category,
        video: currentVideo,
        thumbnail: currentThumbnail,
      };

      const response = await axios.put(
        `${BASE_API_URL}/api/content/${contentId}`,
        updatePayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError(response.data.error || 'Failed to update content');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error updating content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Update Video</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {formData && (
          <Form>
            <label>Title</label>
            <Input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
            />

            <label>Video Description</label>
            <TextArea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
            />

            <label>Production Credits</label>
            <Input
              type="text"
              name="credit"
              value={formData.credit || ''}
              onChange={handleInputChange}
            />

            <label>Category</label>
            <Select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
            >
              <option value="Top 10">Top 10</option>
              <option value="Fashion Show">Fashion Show</option>
              <option value="Teen">Teens</option>
              <option value="Documentarie">Documentaries</option>
              <option value="Interview">Interviews</option>
              <option value="Social">Social</option>
              <option value="Behind the camera">Behind the camera</option>
              <option value="Soon in Playmood">Soon in Playmood</option>
              <option value="Daries">Daries</option>
            </Select>

            <label>Upload Video Image</label>
            <Input
              type="file"
              accept="image/*"
              name="thumbnail"
              onChange={handleFileChange}
            />

            <label>Upload Video</label>
            <Input
              type="file"
              accept="video/*"
              name="video"
              onChange={handleFileChange}
            />

            <UploadButton type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </UploadButton>

            {success && (
              <SuccessNotification>
                <p>Video updated successfully!</p>
              </SuccessNotification>
            )}
          </Form>
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
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
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
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UploadButton = styled.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessNotification = styled.div`
  background-color: #541011;
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
  margin-bottom: 10px;
  border-radius: 4px;
  text-align: center;
`;

export { UpdateContentModal };
