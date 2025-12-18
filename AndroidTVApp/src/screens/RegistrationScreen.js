import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/authSlice';
import styled from 'styled-components/native';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

// Styled Components
const RegisterContainer = styled.View`
  background-color: #000;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  height: 100px;
  width: 300px;
  margin-bottom: 20px;
  resize-mode: contain;
`;

const Form = styled.View`
  background-color: #1a1a1a;
  padding: 25px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
  background-color: #333;
  ${({ isFocused }) => isFocused && `
    border-color: #fff;
    transform: scale(1.05);
  `}
`;

const Button = styled(FocusableTouchableOpacity)`
  width: 100%;
  padding: 15px;
  background-color: #541011;
  border-radius: 4px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const LinkButton = styled(FocusableTouchableOpacity)`
  margin-top: 15px;
`;

const LinkText = styled.Text`
  color: #541011;
  text-decoration: underline;
  text-align: center;
`;

const ErrorMessage = styled.Text`
    color: #d32f2f;
    text-align: center;
    margin-bottom: 10px;
`;

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
        navigation.replace('Home');
        dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const onRegisterPressed = () => {
    setErrorMessage('');
    if (!name || !email || !password) {
        setErrorMessage('Please fill in all fields.');
        return;
    }
    const userData = { name, email, password };
    dispatch(register(userData));
  };

  return (
    <RegisterContainer>
      <Logo source={{ uri: 'https://res.cloudinary.com/dpehzv4sc/image/upload/v1718890242/PLAYMOOD_DEF_l1a3sf.png' }} />
      <Form>
        <Title>Create Account</Title>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        <Input
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'name'}
        />
        <Input
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'email'}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'password'}
        />
        <Button onPress={onRegisterPressed} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <ButtonText>Sign Up</ButtonText>}
        </Button>
        <LinkButton onPress={() => navigation.navigate('Login')}>
          <LinkText>Already have an account? Sign In</LinkText>
        </LinkButton>
      </Form>
    </RegisterContainer>
  );
};

export default RegistrationScreen;
