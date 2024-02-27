


// VideoModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const VideoModal = ({ onClose }) => {
    const { token } = useSelector((state) => state.auth.user);

    const [videoData, setVideoData] = useState({
        title: '',
        description: '',
        credit: '',
        category: 'Top 10',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
      const fileList = e.target.files;
      const filesArray = Array.from(fileList); // Convert FileList to array
      console.log(filesArray); // Check the array of files
      setFiles(filesArray);
  };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        const formData = new FormData();
        formData.append('title', videoData.title);
        formData.append('description', videoData.description);
        formData.append('credit', videoData.credit);
        formData.append('category', videoData.category);
        files.forEach((file) => {
            formData.append('files', file);
        });
    
        try {
            const response = await fetch('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
                // Correct usage of onUploadProgress as an option to fetch
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    console.log(`Upload Progress: ${progress}%`);
                    // Update the state with the current progress
                    setUploadProgress(progress);
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Video submitted successfully:', data);
                setSuccess(true);
                onClose();
            } else {
                console.error('Failed to submit video:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error submitting video:', error);
        }
        finally {
            setLoading(false);
        }
    };
    

    return (
        <>     
            <Overlay onClick={onClose} />
              <ModalContainer>
              <CloseButton onClick={onClose}>&times;</CloseButton>
            <h2>Submit Video</h2>
            <Form onSubmit={handleSubmit}>
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
                ></TextArea>

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
                    <option value='Daries'>Watchlist</option>
                    <option value='Daries'>Recommended</option>
                    <option value='Daries'>New on Playmood</option>
                    <option value='Daries'>Only in Playmood</option>
                </Select>

                <label>Upload Video and Thumbnail</label>
                <Input
                  type='file'
                 accept='video/*, image/*'
                   multiple
                    onChange={handleFileChange}
                    />

                  <UploadButton type='submit' disabled={loading}>
                   {loading ? 'Uploading...' : 'Upload'}
                   </UploadButton>

                             {/* Success notification */}
                     {success && (
                   <SuccessNotification>
                   <p>Video uploaded successfully!</p>
                   </SuccessNotification>
                    )}
            </Form>
            {/* Progress Bar */}
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
`;

export {VideoModal };