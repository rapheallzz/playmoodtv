import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../features/authSlice';
import Spinner from '../components/LoadSpinner';
import styled from 'styled-components';
import playmood from "/PLAYMOOD_DEF.png";
import axios from 'axios';
// import { GoogleLogin } from 'react-google-login';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countryCodes, setCountryCodes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const fetchedCountries = response.data.map((country) => ({
          name: country.name.common,
          code: country.idd?.root
            ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`
            : '',
        }));
        setCountries(fetchedCountries);
        setCountryCodes(
          fetchedCountries.map((country) => country.code).filter((code) => code)
        );
      } catch (error) {
        console.error('Error fetching countries:', error);
        toast.error('Failed to load countries. Please try again.');
      }
    };
    fetchCountries();
  }, []);

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

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { name, email, password, age, country, address, phoneNumber } = formData;

  
  useEffect(() => {
    if (isSuccess && user) {
      navigate('/emailverify');
    }
    if (isError) {
      toast.error(message);
    }
  }, [isError, isSuccess, user, message, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleCountryChange = (e) => {
    const selected = e.target.value;
    setSelectedCountry(selected);
    setFormData({ ...formData, country: selected });
};

const handleSignup = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !country) {
    toast.error("Please fill in all required fields.");
    return;
}

  console.log(formData);
  dispatch(registerUser(formData));
};


  return (
    <RegisterContainer>
    <Logo src={playmood} alt="Playmood Logo" />
    <Form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <Input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
        <Input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
        <Select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
                <option key={index} value={country.name}>
                    {country.name}
                </option>
            ))}
        </Select>
        <Input type="text" name="age" placeholder="Age (Optional)" value={age} onChange={handleChange} />
        <Input type="text" name="address" placeholder="Address (Optional)" value={address} onChange={handleChange} />
        <Select value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
            <option value="">Select Code</option>
            {countryCodes.map((code, index) => (
                <option key={index} value={code}>
                    {code}
                </option>
            ))}
        </Select>
        <Input type="tel" name="phoneNumber" placeholder="Phone Number (Optional)" value={phoneNumber} onChange={handleChange} />
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

const Google = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh;
`;

const Logo = styled.img`
  height: 100px;
  width: auto;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    width:60%;
    height:auto;
  }
`;

const Form = styled.form`
  background-color: #fff;
  // padding: 20px;
  padding:10px 20px 20px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,  0, 0, 0.1);
  width: 40%;
  h2{
    text-align: center;
    padding:5px;
  }

  @media only screen and (max-width: 768px) {
    width:80%;
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

export default Register;
