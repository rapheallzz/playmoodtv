import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import playmood from '/PLAYMOOD_DEF.png';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await axios.post('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/forget-password', { email });
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <ForgotPasswordContainer>
      <Logo src={playmood} alt="Playmood Logo" />
      <Form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        {message && <SuccessMessage>{message}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </ForgotPasswordContainer>
  );
};

const ForgotPasswordContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  height: 100px;
  width: auto;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  h2 {
    text-align: center;
    padding: 5px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #541011;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SuccessMessage = styled.div`
  color: #2e7d32;
  background-color: #e8f5e9;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

export default ForgotPasswordPage;
