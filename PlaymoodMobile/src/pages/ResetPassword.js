import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const ResetPassword = ({ route, navigation }) => {
  const { token } = route.params || {};
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onReset = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${BASE_API_URL}/api/users/reset-password/${token}`, { password });
      Alert.alert('Success', 'Your password has been reset successfully.');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <TitleText>Reset Password</TitleText>
        <SubtitleText>Enter your new password below.</SubtitleText>

        <InputGroup>
          <LabelText>New Password</LabelText>
          <StyledInput
            placeholder="********"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </InputGroup>

        <InputGroup>
          <LabelText>Confirm Password</LabelText>
          <StyledInput
            placeholder="********"
            placeholderTextColor="#666"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </InputGroup>

        <ResetButton onPress={onReset} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ResetButtonText>Reset Password</ResetButtonText>
          )}
        </ResetButton>
      </ContentContainer>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #000;
  justify-content: center;
  padding: 20px;
`;

const ContentContainer = styled(View)`
  background-color: #111;
  padding: 40px 20px;
  border-radius: 20px;
`;

const TitleText = styled(Text)`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const SubtitleText = styled(Text)`
  color: #999;
  text-align: center;
  margin-bottom: 30px;
`;

const InputGroup = styled(View)`
  margin-bottom: 20px;
`;

const LabelText = styled(Text)`
  color: #ccc;
  font-size: 14px;
  margin-bottom: 8px;
`;

const StyledInput = styled(TextInput)`
  background-color: #222;
  color: #fff;
  padding: 15px;
  border-radius: 12px;
  font-size: 16px;
`;

const ResetButton = styled(TouchableOpacity)`
  background-color: #541011;
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  align-items: center;
  margin-top: 10px;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const ResetButtonText = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default ResetPassword;
