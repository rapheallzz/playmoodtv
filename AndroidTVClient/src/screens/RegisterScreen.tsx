import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../app/store';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 300px;
  height: 50px;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Handle error
    }

    if (isSuccess || user) {
      // Navigate to home screen
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const handleRegister = () => {
    const userData = { name, email, password };
    dispatch(register(userData));
  };

  return (
    <Container>
      <Title>Register</Title>
      {isError && <ErrorText>{message}</ErrorText>}
      <Input
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FocusableTouchableOpacity onPress={handleRegister} disabled={isLoading}>
        <ButtonText>{isLoading ? 'Registering...' : 'Register'}</ButtonText>
      </FocusableTouchableOpacity>
      <FocusableTouchableOpacity onPress={() => navigation.navigate('Login')}>
        <ButtonText>Go to Login</ButtonText>
      </FocusableTouchableOpacity>
    </Container>
  );
};

export default RegisterScreen;
