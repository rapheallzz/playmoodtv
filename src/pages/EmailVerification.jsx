import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, resendVerificationCode, reset } from '../features/authSlice';
import styled from 'styled-components';

const EmailVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [code, setCode] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Get userId and email from navigation state
  const userId = state?.userId;
  const email = state?.email;

  useEffect(() => {
    // Validate userId and email
    if (!userId || !email) {
      setErrorMessage('Invalid verification link. Please register again.');
      return;
    }

    if (isError) {
      setErrorMessage(message || 'Verification failed. Please try again.');
      window.alert(message || 'Verification failed. Please try again.');
    }
    if (isSuccess) {
      window.alert('Email verified successfully!');
      navigate('/login');
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    const updatedCode = [...code];
    updatedCode[index] = value.toUpperCase();
    setCode(updatedCode);
  };

  const handleSubmit = () => {
    if (!userId) {
      setErrorMessage('User ID is missing. Please register again.');
      return;
    }
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setErrorMessage('Please enter a 6-digit code.');
      return;
    }
    dispatch(verifyEmail({ userId, verificationCode }));
  };

  const handleResend = () => {
    if (!email) {
      setErrorMessage('Email is missing. Please register again.');
      return;
    }
    dispatch(resendVerificationCode(email));
    setTimer(60);
    setIsResendDisabled(true);
    setErrorMessage('');
    window.alert('Verification code resent successfully!');
  };

  return (
    <Container>
      <Form>
        <Title>Email Verification</Title>
        <Description>
          Please enter the 6-digit code sent to your email address (Case Sensitive!).
        </Description>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <CodeInputContainer>
          {code.map((digit, index) => (
            <CodeInput
              key={index}
              id={`input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              disabled={isLoading || !userId}
            />
          ))}
        </CodeInputContainer>
        <TimerText>
          {timer > 0 ? `Resend code in ${timer}s` : 'Didn’t receive a code?'}
        </TimerText>
        <ResendButton
          onClick={handleResend}
          disabled={isResendDisabled || isLoading || !email}
        >
          {isLoading ? 'Resending...' : 'Resend Code'}
        </ResendButton>
        <VerifyButton onClick={handleSubmit} disabled={isLoading || !userId}>
          {isLoading ? 'Verifying...' : 'Verify'}
        </VerifyButton>
      </Form>
    </Container>
  );
};

// Styled components (unchanged)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: #666;
`;

const CodeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CodeInput = styled.input`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    border-color: #541011;
    outline: none;
  }
`;

const TimerText = styled.p`
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 20px;
`;

const ResendButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#541011')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-bottom: 20px;
`;

const VerifyButton = styled.button`
  background-color: #541011;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

export default EmailVerification;