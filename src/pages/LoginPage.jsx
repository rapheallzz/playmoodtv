import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import playmood from '/PLAYMOOD_DEF.png';
import { login, reset } from '../features/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const responseGoogle = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
      alert(`Login Error: ${message}`);
    }

    if (isSuccess && user && user.role) {
      console.log('Redirecting to /dashboard');
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onClick = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    const userData = {
      email,
      password,
    };

    try {
      await dispatch(login(userData));
    } catch (error) {
      setErrorMessage('An error occurred during login.');
      alert('An error occurred during login.');
    }
  };

  return (
    <LoginContainer>
      <Logo src={playmood} alt="Playmood Logo" onClick={() => navigate('/')} />
      <Form>
        <h2>Login</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Enter email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onClick} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <ForgotPasswordLink onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </ForgotPasswordLink>
        <CreateAccountButton onClick={() => navigate('/register')}>
          Create an account
        </CreateAccountButton>
      </Form>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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

  @media only screen and (max-width: 768px) {
    width: 60%;
    height: auto;
  }
`;

const Form = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  gap: 8;

  h2 {
    text-align: center;
    padding: 5px;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
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

const ForgotPasswordLink = styled.span`
  color: #541011;
  cursor: pointer;
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CreateAccountButton = styled.button`
  color: #fff;
  background-color: #808080;
  border: none;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

export default Login;