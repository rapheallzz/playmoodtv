// UpdateVideoModal.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BASE_API_URL from '../apiConfig';

const UpdateContentModal = ({ onClose, contentId }) => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    credit: '',
    category: '',
    thumbnail: 'null',
    video: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


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
          console.error('Failed to fetch content details:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching content details:', error);
      }
    };

    // Call the fetchContentDetails function when contentId changes
    fetchContentDetails(); // Call the fetchContentDetails function regardless of contentId
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
    const updateData = new FormData();
    updateData.append('title', formData.title);
    updateData.append('description', formData.description);
    updateData.append('credit', formData.credit);
    updateData.append('category', formData.category);
    updateData.append('thumbnail', formData.thumbnail);
    updateData.append('video', formData.video);

    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_API_URL}/api/content/${contentId}`,
        updateData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        console.log('Content updated successfully');
      } else {
        console.error('Failed to update content:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating content:', error);
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

        {Object.keys(formData).length > 0 && (
        <Form>
                    <label>Title</label>
                    <Input
                        type='text'
                        name='title'
                        onChange={handleInputChange}
                    />

                    <label>Video Description</label>
                    <TextArea
                        name='description'
                        onChange={handleInputChange}
                    />

                    <label>Production Credits</label>
                    <Input
                        type='text'
                        name='credit'
                        onChange={handleInputChange}
                    />

                    <label>Category</label>
                    <Select
                        name='category'
                        onChange={handleInputChange}
                    >
                            <option value='Top 10'>Top 10</option>
                            <option value='Fashion Show'>Fashion Show</option>
                            <option value='Teen'>Teens</option>
                            <option value='Documentarie'>Documentaries</option>
                            <option value='Interview'>Interviews</option>
                            <option value='Social'>Social</option>
                            <option value='Behind the camera'>Behind the camera</option>
                            <option value='Soon in Playmood'>Soon in Playmood</option>
                            <option value='Daries'>Daries</option>
                        {/* Add other category options */}
                    </Select>

                    <label>Upload Video Image</label>
                    <Input
                        type='file'
                        accept='image/*'
                       onChange={handleFileChange}
                    />

                    <label>Upload Video</label>
                    <Input
                        type='file'
                        accept='video/*'
                       onChange={handleFileChange}
                    />

                       <UploadButton type='button' onClick={handleSubmit}>
                       {loading ? 'Updating...' : 'Update'}
                       </UploadButton>

                                 {/* Success notification */}

                        {success && (
                        <SuccessNotification>
                       <p>Video uploaded successfully!</p>
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
`;

const SuccessNotification = styled.div`
  background-color: #541011; /* Bootstrap success color */
  color: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
`;

export { UpdateContentModal };
