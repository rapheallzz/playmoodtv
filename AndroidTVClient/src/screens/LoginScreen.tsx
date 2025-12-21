import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Handle error, maybe show a toast
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <Container>
      <Title>Login</Title>
      {isError && <ErrorText>{message}</ErrorText>}
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
      <FocusableTouchableOpacity onPress={handleLogin} disabled={isLoading}>
        <ButtonText>{isLoading ? 'Logging in...' : 'Login'}</ButtonText>
      </FocusableTouchableOpacity>
      <FocusableTouchableOpacity onPress={() => navigation.navigate('Register')}>
        <ButtonText>Go to Register</ButtonText>
      </FocusableTouchableOpacity>
    </Container>
  );
};

export default LoginScreen;
