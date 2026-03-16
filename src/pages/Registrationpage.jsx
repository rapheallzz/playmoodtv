import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../features/authSlice';
import styled from 'styled-components';
import playmood from '/PLAYMOOD_DEF.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list';
import { FaGoogle, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import BASE_API_URL from '../apiConfig';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useMemo(() => countryList().getData(), []);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    selectedCode: '',
    phoneNumber: '',
  });

  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);
  const { name, email, password, phoneNumber, country } = formData;

  useEffect(() => {
    if (isSuccess && user) {
      navigate('/');
      dispatch(reset());
    }
  }, [isSuccess, user, navigate, dispatch]);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
      case 2:
        return 'Weak';
      case 3:
        return 'Medium';
      case 4:
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handlePhoneChange = (value, countryData) => {
    setFormData({
      ...formData,
      phoneNumber: value,
      selectedCode: `+${countryData.dialCode}`,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password || !country) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (checkPasswordStrength(password) !== 'Strong') {
      setErrorMessage('Password must be strong (8+ chars, with upper, lower, numbers, and symbols).');
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
      dispatch(reset());
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${BASE_API_URL}/api/users/auth/google`;
  };

  return (
    <RegisterWrapper>
      <BackgroundOverlay />
      <RegisterCard>
        <LogoContainer onClick={() => navigate('/')}>
          <Logo src={playmood} alt="Playmood Logo" />
        </LogoContainer>

        <TitleSection>
          <h2>Create Account</h2>
          <p>Join the Playmood community today</p>
        </TitleSection>

        {errorMessage && (
          <ErrorAlert>
            <FaExclamationCircle />
            <span>{errorMessage}</span>
          </ErrorAlert>
        )}

        <Form onSubmit={handleSignup}>
          <GridContainer>
            <InputGroup>
              <label>Full Name</label>
              <Input
                type="text"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <label>Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <label>Country</label>
              <Select name="country" value={country} onChange={handleChange} required>
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <InputGroup>
              <label>Phone Number</label>
              <PhoneInputWrapper>
                <PhoneInput
                  country={'us'}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: 'phoneNumber',
                    required: false,
                  }}
                  containerClass="phone-container"
                  inputClass="phone-input"
                  buttonClass="phone-button"
                />
              </PhoneInputWrapper>
            </InputGroup>
          </GridContainer>

          <InputGroup>
            <label>Password</label>
            <PasswordContainer>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={handleChange}
                required
              />
              <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </PasswordContainer>
            {password && (
              <StrengthMeter strength={passwordStrength}>
                <div className="bar" />
                <span>Password Strength: {passwordStrength}</span>
              </StrengthMeter>
            )}
          </InputGroup>

          <SignupButton type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Create Account'}
          </SignupButton>

          <Divider>
            <span>OR</span>
          </Divider>

          <GoogleButton type="button" onClick={handleGoogleSignup}>
            <FaGoogle className="icon" />
            Sign up with Google
          </GoogleButton>

          <FooterText>
            Already have an account? <span onClick={() => navigate('/login')}>Sign In</span>
          </FooterText>
        </Form>
      </RegisterCard>
    </RegisterWrapper>
  );
};

// Styled components
const RegisterWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
  padding: 40px 20px;
  overflow-y: auto;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 80% 20%, #541011 0%, transparent 40%),
              radial-gradient(circle at 20% 80%, #1a1a1a 0%, transparent 40%);
  opacity: 0.6;
  z-index: 1;
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 600px;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 24px;
  z-index: 2;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 45px;
  width: auto;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    color: #999;
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: #ccc;
    font-size: 0.85rem;
    font-weight: 500;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #541011;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(84, 16, 17, 0.2);
  }

  &::placeholder {
    color: #555;
  }
`;

const Select = styled.select`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #541011;
  }

  option {
    background-color: #1a1a1a;
  }
`;

const PhoneInputWrapper = styled.div`
  .phone-container {
    width: 100%;
  }
  .phone-input {
    width: 100% !important;
    height: 46px !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
    color: #fff !important;
    font-size: 0.95rem !important;
  }
  .phone-button {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px 0 0 12px !important;
    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
    }
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
`;

const StrengthMeter = styled.div`
  margin-top: 4px;
  .bar {
    height: 4px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: ${(props) => {
        if (props.strength === 'Weak') return '33%';
        if (props.strength === 'Medium') return '66%';
        if (props.strength === 'Strong') return '100%';
        return '0';
      }};
      background: ${(props) => {
        if (props.strength === 'Weak') return '#ff4d4d';
        if (props.strength === 'Medium') return '#ffa500';
        if (props.strength === 'Strong') return '#00cc66';
        return 'transparent';
      }};
      transition: width 0.3s ease-in-out;
    }
  }
  span {
    font-size: 0.75rem;
    color: #999;
    margin-top: 4px;
    display: block;
  }
`;

const SignupButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #541011 0%, #7c1408 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
  margin: 8px 0;

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

const FooterText = styled.p`
  text-align: center;
  color: #999;
  font-size: 0.9rem;

  span {
    color: #541011;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorAlert = styled.div`
  background: rgba(255, 77, 77, 0.1);
  border: 1px solid rgba(255, 77, 77, 0.2);
  color: #ff4d4d;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  margin-bottom: 20px;

  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default Register;
