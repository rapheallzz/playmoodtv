import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { login } from '../features/authSlice';
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
  height: 40px;
  background-color: #333;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('testuser@test.com');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, message } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email, password })).then((result) => {
        if(result.meta.requestStatus === 'fulfilled') {
            navigation.navigate('Home');
        }
    })
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FocusableTouchableOpacity onPress={handleLogin}>
            <View style={{padding: 10, backgroundColor: '#E50914', borderRadius: 5, width: 300}}>
                <ButtonText>Login</ButtonText>
            </View>
        </FocusableTouchableOpacity>
      )}
      {isError && <Text style={{ color: 'red', marginTop: 10 }}>{message}</Text>}
    </Container>
  );
};

export default LoginScreen;