import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import playmood from '/PLAYMOOD_DEF.png';
import { login, reset } from '../features/authSlice';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && user && user.role) {
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify({ ...user, token: user.token }));
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    const userData = { email, password };
    dispatch(login(userData));
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/auth/google';
  };

  return (
    <LoginContainer>
      <Logo src={playmood} alt="Playmood Logo" onClick={() => navigate('/')} />
      <Form>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Enter email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </PasswordToggle>
        </PasswordContainer>
        <Button onClick={onClick} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <ForgotPasswordLink onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </ForgotPasswordLink>
        <GoogleButton onClick={handleGoogleLogin}>
          <FaGoogle style={{ marginRight: '10px' }} />
          Sign in with Google
        </GoogleButton>
        <CreateAccountButton onClick={() => navigate('/register')}>
          Create an account
        </CreateAccountButton>
      </Form>
    </LoginContainer>
  );
};

// Styled components
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

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #357ae8;
  }
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

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #541011;
`;

export default Login;
