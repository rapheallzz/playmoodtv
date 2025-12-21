import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/authSlice';
import { AppDispatch, RootState } from '../store/store';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const SignInScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Handle error, e.g., show a toast message
      console.error(message);
      dispatch(reset());
    }

  }, [user, isError, isSuccess, message, dispatch]);

  const onLogin = () => {
    if (!email || !password) {
      // Handle empty fields
      return;
    }
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <Container>
      <Form>
        <Title>Login</Title>
        <StyledInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />
        <StyledInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
        <ButtonContainer>
          <StyledFocusableButton onPress={onLogin} disabled={isLoading}>
            <ButtonText>{isLoading ? 'Logging in...' : 'Login'}</ButtonText>
          </StyledFocusableButton>
        </ButtonContainer>
        <ButtonContainer>
          <StyledFocusableButton onPress={() => navigation.navigate('Registration')}>
            <ButtonText>Create an account</ButtonText>
          </StyledFocusableButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const Form = styled.View`
  background-color: #111;
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

const StyledInput = styled.TextInput`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
`;

const StyledFocusableButton = styled(FocusableTouchableOpacity)`
  background-color: #541011;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default SignInScreen;
