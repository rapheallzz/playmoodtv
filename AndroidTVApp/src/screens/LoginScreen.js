import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset, loadUserFromStorage } from '../features/authSlice';
import styled from 'styled-components/native';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

// Styled Components
const LoginContainer = styled.View`
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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.error(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
        if (user?.role === 'admin') {
            navigation.replace('Home');
        } else {
            navigation.replace('Home');
        }
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const onLoginPressed = () => {
    if (!email || !password) {
      console.error('Please enter both email and password');
      return;
    }
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <LoginContainer>
      <Logo source={{ uri: 'https://res.cloudinary.com/dpehzv4sc/image/upload/v1718890242/PLAYMOOD_DEF_l1a3sf.png' }} />
      <Form>
        <Title>Login</Title>
        <Input
          placeholder="Enter email"
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
          placeholder="Enter password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'password'}
        />
        <Button onPress={onLoginPressed} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <ButtonText>Login</ButtonText>}
        </Button>
        <LinkButton onPress={() => navigation.navigate('Registration')}>
          <LinkText>Create an account</LinkText>
        </LinkButton>
      </Form>
    </LoginContainer>
  );
};

export default LoginScreen;
