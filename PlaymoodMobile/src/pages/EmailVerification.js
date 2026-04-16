import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const EmailVerification = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onVerify = async () => {
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit verification code.');
      return;
    }
    setIsLoading(true);
    try {
      Alert.alert('Success', 'Your email has been verified!');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <TitleText>Verify Email</TitleText>
        <SubtitleText>Please enter the 6-digit code sent to your email.</SubtitleText>

        <StyledInput
          placeholder="000000"
          placeholderTextColor="#666"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />

        <VerifyButton onPress={onVerify} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <VerifyButtonText>Verify</VerifyButtonText>
          )}
        </VerifyButton>

        <ResendButton onPress={() => Alert.alert('Resent', 'A new code has been sent.')}>
          <ResendButtonText>Resend Code</ResendButtonText>
        </ResendButton>
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
  align-items: center;
`;

const TitleText = styled(Text)`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubtitleText = styled(Text)`
  color: #999;
  text-align: center;
  margin-bottom: 30px;
`;

const StyledInput = styled(TextInput)`
  background-color: #222;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  width: 200px;
  padding: 15px;
  border-radius: 12px;
  letter-spacing: 10px;
  margin-bottom: 30px;
`;

const VerifyButton = styled(TouchableOpacity)`
  background-color: #541011;
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 20px;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const VerifyButtonText = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const ResendButton = styled(TouchableOpacity)``;

const ResendButtonText = styled(Text)`
  color: #666;
  font-size: 14px;
  text-decoration-line: underline;
`;

export default EmailVerification;
