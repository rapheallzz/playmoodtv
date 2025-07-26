import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../features/authSlice';
import styled from 'styled-components';
import playmood from '/PLAYMOOD_DEF.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useMemo(() => countryList().getData(), []);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    country: '',
    address: '',
    selectedCode: '',
    phoneNumber: '',
  });

  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);
  const { name, email, password, age, address, phoneNumber, country } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate('/emailverify', { state: { userId: user?.userId, email } });
      dispatch(reset());
    }
  }, [isSuccess, user, navigate, dispatch, email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      navigate('/emailverify', { state: { userId: result.userId, email } });
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
      dispatch(reset());
    }
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
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
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
        <Input
          type="text"
          name="age"
          placeholder="Age (Optional)"
          value={age}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="address"
          placeholder="Address (Optional)"
          value={address}
          onChange={handleChange}
        />
        <SignupButton type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </SignupButton>
        <SignInText>
          Already have an account?{' '}
          <SignInLink onClick={() => navigate('/login')}>Sign In</SignInLink>
        </SignInText>
      </Form>
    </RegisterContainer>
  );
};

// Styled components (unchanged)
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

export default Register;