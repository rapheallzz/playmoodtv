import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Onboarding = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <Title>Welcome to Playmood!</Title>
        <Description>
          We're excited to have you on board. Here are a few features to get you started:
        </Description>

        <FeaturesList>
          <FeatureItem>
            <Ionicons name="sparkles-outline" size={24} color="#541011" />
            <FeatureText>Personalized movie recommendations</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <Ionicons name="film-outline" size={24} color="#541011" />
            <FeatureText>Access to exclusive content</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <Ionicons name="tv-outline" size={24} color="#541011" />
            <FeatureText>Create and share watchlists</FeatureText>
          </FeatureItem>
        </FeaturesList>

        <GetStartedButton onPress={() => navigation.replace('Main')}>
          <GetStartedText>Get Started</GetStartedText>
        </GetStartedButton>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.View`
  align-items: center;
  background-color: #111;
  padding: 40px 20px;
  border-radius: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.Text`
  color: #ccc;
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  margin-bottom: 30px;
`;

const FeaturesList = styled.View`
  width: 100%;
  gap: 20px;
  margin-bottom: 40px;
`;

const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const FeatureText = styled.Text`
  color: #fff;
  font-size: 15px;
  flex: 1;
`;

const GetStartedButton = styled.TouchableOpacity`
  background-color: #541011;
  width: 100%;
  padding: 18px;
  border-radius: 30px;
  align-items: center;
`;

const GetStartedText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default Onboarding;
