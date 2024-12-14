import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, resendVerificationCode, reset } from '../features/authSlice';



const EmailVerification = ({ userId, email }) => {
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  
    const [code, setCode] = useState(new Array(6).fill(''));
    const [timer, setTimer] = useState(60); 
    const [isResendDisabled, setIsResendDisabled] = useState(true);
  
    useEffect(() => {
      if (isError) toast.error(message);
      if (isSuccess) toast.success('Email verified successfully!');
      dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);
  
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
      const verificationCode = code.join('');
      dispatch(verifyEmail({ userId, verificationCode }));
    };
  
    const handleResend = () => {
      dispatch(resendVerificationCode(email));
      setTimer(60);
      setIsResendDisabled(true);
    };
  
  return (
    <Container>
      <Form>
        <Title>Email Verification</Title>
        <Description>
          Please enter the 6-digit code sent to your email address (Case Sensitive!).
        </Description>
        <CodeInputContainer>
          {code.map((digit, index) => (
            <CodeInput
              key={index}
              id={`input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </CodeInputContainer>
        <TimerText>
          {timer > 0
            ? `Resend code in ${timer}s`
            : 'Didn’t receive a code?'}
        </TimerText>
        <ResendButton
          onClick={handleResend} disabled={isResendDisabled || isLoading}
        >
          Resend Code
        </ResendButton>
        <VerifyButton  onClick={handleSubmit} disabled={isLoading}>Verify</VerifyButton>
      </Form>
    </Container>
  );
};

// Styled components
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
  background-color: ${(props) =>
    props.disabled ? '#ccc' : '#541011'};
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
  cursor: pointer;
  width: 100%;
`;

export default EmailVerification;
