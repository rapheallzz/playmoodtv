import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../features/authSlice';
import styled from 'styled-components';
import playmood from '/PLAYMOOD_DEF.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list';
import { FaGoogle } from 'react-icons/fa';

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
      navigate('/dashboard');
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
      setErrorMessage('Password is not strong enough.');
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
    window.location.href = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/auth/google';
  };

  return (
    <RegisterContainer>
      <Logo src={playmood} alt="Playmood Logo" />
      <Form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <PasswordContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </PasswordToggle>
        </PasswordContainer>
        {password && (
          <PasswordStrengthIndicator strength={passwordStrength}>
            Password Strength: {passwordStrength}
          </PasswordStrengthIndicator>
        )}
        <Select
          name="country"
          value={country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.label}>
              {country.label}
            </option>
          ))}
        </Select>
        <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={handlePhoneChange}
          inputProps={{
            name: 'phoneNumber',
            required: false,
          }}
          containerStyle={{ marginBottom: '15px' }}
        />
        <SignupButton type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </SignupButton>
        <GoogleButton onClick={handleGoogleSignup}>
          <FaGoogle style={{ marginRight: '10px' }} />
          Sign up with Google
        </GoogleButton>
        <SignInText>
          Already have an account?{' '}
          <SignInLink onClick={() => navigate('/login')}>Sign In</SignInLink>
        </SignInText>
      </Form>
    </RegisterContainer>
  );
};

// Styled components
const RegisterContainer = styled.div`
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

const Form = styled.form`
  background-color: #fff;
  padding: 10px 20px 20px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 40%;
  h2 {
    text-align: center;
    padding: 5px;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SignupButton = styled.button`
  color: #fff;
  background-color: #541011;
  border: none;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
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
  margin-top: 10px;

  &:hover {
    background-color: #357ae8;
  }
`;

const SignInText = styled.p`
  margin-top: 10px;
  text-align: center;
`;

const SignInLink = styled.span`
  color: #541011;
  cursor: pointer;
  text-decoration: underline;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
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

const PasswordStrengthIndicator = styled.div`
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: ${(props) => {
    if (props.strength === 'Weak') return 'red';
    if (props.strength === 'Medium') return 'orange';
    if (props.strength === 'Strong') return 'green';
    return 'grey';
  }};
`;

export default Register;
