import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/authSlice';
import { Alert } from 'react-native';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      Alert.alert('Error', message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      navigation.navigate('Home');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const onLoginPressed = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <Container>
      <Logo source={require('../../assets/images/icon.png')} resizeMode="contain" />
      <Form>
        <Title>Login</Title>
        <Input
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <ButtonContainer>
          <FocusableButton onPress={onLoginPressed} disabled={isLoading}>
            <ButtonText>{isLoading ? 'Logging in...' : 'Login'}</ButtonText>
          </FocusableButton>
          <FocusableButton onPress={() => navigation.navigate('Register')}>
            <ButtonText>Create an Account</ButtonText>
          </FocusableButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.View`
  background-color: #000;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  height: 150px;
  width: 150px;
  margin-bottom: 40px;
`;

const Form = styled.View`
  width: 60%;
  max-width: 500px;
  background-color: #181818;
  padding: 40px;
  border-radius: 8px;
`;

const Title = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Input = styled.TextInput`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #555;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;

const FocusableButton = styled(FocusableTouchableOpacity)`
  width: 100%;
  padding: 15px;
  background-color: #e50914;
  border-radius: 4px;
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default LoginScreen;
