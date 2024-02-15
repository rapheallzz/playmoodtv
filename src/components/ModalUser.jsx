


// UserModal.js
import React, { useState } from 'react';
import styled from 'styled-components';


const UserModal = ({ onClose }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    // Add more user-related fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for user creation (API call, dispatch action, etc.)
    console.log('Submitting user data:', userData);
    onClose();
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Add New User</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Username</label>
            <Input
              type='text'
              name='username'
              value={userData.username}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Email</label>
            <Input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          {/* Add more user-related fields here */}
          <SubmitButton type='submit'>Create User</SubmitButton>
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
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

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export { UserModal };