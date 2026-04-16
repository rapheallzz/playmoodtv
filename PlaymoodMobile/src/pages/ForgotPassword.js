import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${BASE_API_URL}/api/users/forgot-password`, { email });
      Alert.alert('Success', 'Password reset link sent to your email.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <HeaderTitle>Forgot Password</HeaderTitle>
      </Header>

      <Content>
        <Subtitle>Enter your email address and we'll send you a link to reset your password.</Subtitle>

        <InputGroup>
          <Label>Email Address</Label>
          <Input
            placeholder="name@example.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </InputGroup>

        <SubmitButton
          onPress={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <SubmitButtonText>Send Reset Link</SubmitButtonText>
          )}
        </SubmitButton>
      </Content>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const Content = styled.View`
  padding: 20px;
`;

const Subtitle = styled.Text`
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
  line-height: 20px;
`;

const InputGroup = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  background-color: rgba(255,255,255,0.05);
  border-width: 1px;
  border-color: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 14px;
  color: #fff;
  font-size: 16px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #541011;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  height: 56px;
  justify-content: center;
  margin-top: 10px;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

const TouchableOpacity = styled.TouchableOpacity``;

export default ForgotPassword;
