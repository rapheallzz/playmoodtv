import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import playmood from '/PLAYMOOD_DEF.png';
import { login, reset } from '../features/authSlice';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import BASE_API_URL from '../apiConfig';

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

  const onSubmit = async (e) => {
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
    window.location.href = `${BASE_API_URL}/api/users/auth/google`;
  };

  return (
    <LoginWrapper>
      <BackgroundOverlay />
      <LoginCard>
        <LogoContainer onClick={() => navigate('/')}>
          <Logo src={playmood} alt="Playmood Logo" />
        </LogoContainer>

        <TitleSection>
          <h2>Welcome Back</h2>
          <p>Login to your account to continue</p>
        </TitleSection>

        <Form onSubmit={onSubmit}>
          <InputGroup>
            <label htmlFor="email">Email Address</label>
            <Input
              type="email"
              placeholder="name@example.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <ForgotPasswordLink onClick={() => navigate('/forgot-password')}>
                Forgot password?
              </ForgotPasswordLink>
            </div>
            <PasswordContainer>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </PasswordContainer>
          </InputGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Login'}
          </SubmitButton>

          <Divider>
            <span>OR</span>
          </Divider>

          <GoogleButton type="button" onClick={handleGoogleLogin}>
            <FaGoogle className="icon" />
            Sign in with Google
          </GoogleButton>

          <FooterText>
            Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span>
          </FooterText>
        </Form>
      </LoginCard>
    </LoginWrapper>
  );
};

// Styled components
const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
  padding: 20px;
  overflow: hidden;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 30%, #541011 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, #1a1a1a 0%, transparent 40%);
  opacity: 0.6;
  z-index: 1;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  z-index: 2;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    color: #999;
    font-size: 0.95rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: #ccc;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #541011;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(84, 16, 17, 0.2);
  }

  &::placeholder {
    color: #666;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #541011 0%, #7c1408 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  gap: 12px;

  &:hover {
    background: #f0f0f0;
  }

  .icon {
    font-size: 1.2rem;
    color: #4285f4;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  span {
    padding: 0 15px;
    color: #666;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const ForgotPasswordLink = styled.span`
  color: #541011;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  margin-top: 10px;

  span {
    color: #541011;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default Login;
