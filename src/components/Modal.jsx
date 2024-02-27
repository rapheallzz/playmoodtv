
import React from 'react';
import styled from 'styled-components';



const Modal = ({ onClose }) => {
    return (
        <>
            <Overlay onClick={onClose} />
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>Submit Video</h2>
                <Form>
                    <label>Title</label>
                    <Input
                        type='text'
                        name='title'
                        s
                    />
                    
                    <label>Video Description</label>
                    <TextArea
                        name='description'
                        // You can add onChange and value attributes based on your needs
                    />
                    
                    <label>Production Credits</label>
                    <Input
                        type='text'
                        name='productionCredits'
                        // You can add onChange and value attributes based on your needs
                    />
                    
                    <label>Category</label>
                    <Select
                        name='category'
                        // You can add onChange and value attributes based on your needs
                    >
                            <option value='Top 10'>Top 10</option>
                            <option value='Fashion Show'>Fashion Show</option>
                            <option value='Teens'>Teens</option>
                            <option value='Documentaries'>Documentaries</option>
                            <option value='Interviews'>Interviews</option>
                            <option value='Social'>Social</option>
                            <option value='Behind the camera'>Behind the camera</option>
                            <option value='Soon in Playmood'>Soon in Playmood</option>
                            <option value='Daries'>Daries</option>
                        {/* Add other category options */}
                    </Select>

                    <label>Add Video Image</label>
                    <Input
                        type='file'
                        accept='image/*'
                        // You can add onChange attribute based on your needs
                    />

                    
                    <label>Upload Video</label>
                    <Input
                        type='file'
                        accept='video/*'
                        // You can add onChange attribute based on your needs
                    />

                    <UploadButton type='button' onClick={() => {}}>
                        Upload
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


export default Modal;
