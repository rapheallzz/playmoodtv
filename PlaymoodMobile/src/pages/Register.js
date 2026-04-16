import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, reset } from '../features/authSlice';
import { Ionicons } from '@expo/vector-icons';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      Alert.alert('Registration Error', message);
      dispatch(reset());
    }

    if (isSuccess && user) {
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('Main');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const onRegisterPress = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    dispatch(registerUser({ name, email, password }));
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
            <Title>Create Account</Title>
            <Subtitle>Join Playmood today</Subtitle>
          </TitleSection>

          <Form>
            <InputGroup>
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </InputGroup>

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

            <InputGroup>
              <Label>Password</Label>
              <PasswordWrapper>
                <Input
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

            <InputGroup>
              <Label>Confirm Password</Label>
              <Input
                placeholder="Confirm your password"
                placeholderTextColor="#666"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </InputGroup>

            <SubmitButton
              onPress={onRegisterPress}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <SubmitButtonText>Sign Up</SubmitButtonText>
              )}
            </SubmitButton>

            <Footer>
              <FooterText>Already have an account? </FooterText>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <SignUpText>Login</SignUpText>
              </TouchableOpacity>
            </Footer>
          </Form>
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

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  color: #999;
  font-size: 16px;
`;

const Form = styled.View``;

const InputGroup = styled.View`
  margin-bottom: 15px;
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

const PasswordWrapper = styled.View`
  position: relative;
`;

const PasswordToggle = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #541011;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  height: 56px;
  justify-content: center;
  margin-top: 20px;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
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

export default Register;
