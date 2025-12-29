import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { login } from '../features/authSlice';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

// --- Styled Components ---
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #141414;
`;

const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  margin-bottom: 30px;
`;

const Input = styled.TextInput`
  width: 300px;
  height: 50px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  border-width: 2px;
  border-color: transparent;

  &:focus {
    border-color: #007bff;
  }
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-top: 10px;
`;

// --- Component ---
const LoginScreen = () => {
  const [email, setEmail] = useState('testuser@test.com');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email, pass: password }));
  };

  return (
    <Container>
      <Title>Sign In</Title>
      <Input
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <FocusableTouchableOpacity onPress={handleLogin}>
        <View style={{ padding: 15, backgroundColor: '#e50914', borderRadius: 5 }}>
          <ButtonText>
            {status === 'loading' ? 'Signing In...' : 'Sign In'}
          </ButtonText>
        </View>
      </FocusableTouchableOpacity>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default LoginScreen;
