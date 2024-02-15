import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/authSlice';
import Spinner from '../components/LoadSpinner';
import axios from 'axios';
import styled from 'styled-components';
import playmood from "/PLAYMOOD_DEF.png";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCode, setSelectedCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const countries = [
    'Select Country',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Spain',
    'Nigeria',
    'Russia',
    'Brazil',
  ];

  const countryCodes = [
    'Select Code',
    '+1',
    '+44',
    '+1',
    '+61',
  ];

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/login');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      age,
      selectedCountry,
      address,
      selectedCode,
      phoneNumber,
    };
    try {
      const response = await axios.post('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/', userData);
  
      console.log('Registration successful:', response.data);
  
      // Dispatch the register action directly
      dispatch(register(response.data));
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Error handling is done in the extraReducers section of your authSlice
      toast.error('Registration failed. Please try again.');
    }
  };
  return (
    <RegisterContainer>
      <Logo src={playmood} alt="Playmood Logo" />
      <Form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <Input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Age"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          placeholder="Address"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Select
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
        >
          {countryCodes.map((code, index) => (
            <option key={index} value={code}>
              {code}
            </option>
          ))}
        </Select>
        <Input
          type="tel"
          placeholder="Phone Number"
          id="phone"
          name="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <SignupButton type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </SignupButton>
        <SignInText>
          Already have an account?{' '}
          <SignInLink onClick={() => navigate('/login')}>Sign In</SignInLink>
        </SignInText>
      </Form>
      {isLoading && <Spinner />}
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
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,  0, 0, 0.1);
  width: 40%;
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

const SignInText = styled.p`
  margin-top: 10px;
  text-align: center;
`;

const SignInLink = styled.span`
  color: #541011;
  cursor: pointer;
  text-decoration: underline;
`;

export default Register;
