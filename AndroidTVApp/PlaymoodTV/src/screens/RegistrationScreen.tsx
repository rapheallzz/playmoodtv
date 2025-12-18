import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/authSlice';
import { Alert } from 'react-native';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      navigation.navigate('Login');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const onRegisterPressed = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <Container>
      <Logo source={require('../../assets/images/icon.png')} resizeMode="contain" />
      <Form>
        <Title>Register</Title>
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
        <Input
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <ButtonContainer>
          <FocusableButton onPress={onRegisterPressed} disabled={isLoading}>
            <ButtonText>{isLoading ? 'Registering...' : 'Register'}</ButtonText>
          </FocusableButton>
          <FocusableButton onPress={() => navigation.navigate('Login')}>
            <ButtonText>Already have an account? Login</ButtonText>
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

export default RegistrationScreen;
