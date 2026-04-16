import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/authSlice';
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      Alert.alert('Login Error', message);
      dispatch(reset());
    }

    if (isSuccess && user) {
      navigation.replace('Main');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const onLoginPress = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <KeyboardWrapper
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollContent contentContainerStyle={{ padding: 20, justifyContent: 'center', minHeight: '100%' }}>
          <LogoContainer>
            <Logo
              source={require('../../assets/PLAYMOOD_DEF.png')}
              resizeMode="contain"
            />
          </LogoContainer>

          <TitleSection>
            <TitleText>Welcome Back</TitleText>
            <SubtitleText>Login to your account to continue</SubtitleText>
          </TitleSection>

          <FormContainer>
            <InputGroup>
              <LabelText>Email Address</LabelText>
              <StyledInput
                placeholder="name@example.com"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </InputGroup>

            <InputGroup>
              <LabelRow>
                <LabelText>Password</LabelText>
                <TouchableOpacity onPress={() => {}}>
                  <ForgotPasswordText>Forgot password?</ForgotPasswordText>
                </TouchableOpacity>
              </LabelRow>
              <PasswordWrapper>
                <StyledInput
                  placeholder="Enter your password"
                  placeholderTextColor="#666"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  style={{ paddingRight: 50 }}
                />
                <PasswordToggle onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#999"
                  />
                </PasswordToggle>
              </PasswordWrapper>
            </InputGroup>

            <SubmitButton
              onPress={onLoginPress}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <SubmitButtonText>Login</SubmitButtonText>
              )}
            </SubmitButton>

            <Divider>
              <DividerLine />
              <DividerText>OR</DividerText>
              <DividerLine />
            </Divider>

            <GoogleButton>
              <Ionicons name="logo-google" size={20} color="#4285f4" />
              <GoogleButtonText>Sign in with Google</GoogleButtonText>
            </GoogleButton>

            <FooterContainer>
              <FooterText>Don't have an account? </FooterText>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <SignUpText>Sign Up</SignUpText>
              </TouchableOpacity>
            </FooterContainer>
          </FormContainer>
        </ScrollContent>
      </KeyboardWrapper>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`;

const KeyboardWrapper = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ScrollContent = styled.ScrollView``;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

const Logo = styled.Image`
  height: 60px;
  width: 200px;
`;

const TitleSection = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const TitleText = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubtitleText = styled.Text`
  color: #999;
  font-size: 16px;
`;

const FormContainer = styled.View``;

const InputGroup = styled.View`
  margin-bottom: 20px;
`;

const LabelRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LabelText = styled.Text`
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const StyledInput = styled.TextInput`
  background-color: rgba(255,255,255,0.05);
  border-width: 1px;
  border-color: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 14px;
  color: #fff;
  font-size: 16px;
`;

const PasswordWrapper = styled.View`
  position: relative;
`;

const PasswordToggle = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const ForgotPasswordText = styled.Text`
  color: #541011;
  font-size: 14px;
  font-weight: 600;
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

const Divider = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 20px;
`;

const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: rgba(255,255,255,0.1);
`;

const DividerText = styled.Text`
  padding-horizontal: 15px;
  color: #666;
  font-size: 12px;
  font-weight: 600;
`;

const GoogleButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  border-radius: 12px;
  padding: 14px;
  align-items: center;
  justify-content: center;
`;

const GoogleButtonText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin-left: 12px;
`;

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

const FooterText = styled.Text`
  color: #999;
  font-size: 14px;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const SignUpText = styled.Text`
  color: #541011;
  font-size: 14px;
  font-weight: 600;
`;

export default Login;
