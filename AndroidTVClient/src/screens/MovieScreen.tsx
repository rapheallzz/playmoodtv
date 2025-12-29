import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';

// --- Interfaces ---
interface Content {
  _id: string;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  user: {
    _id: string;
    name: string;
    profileImage: string;
  };
}

// --- Styled Components ---
const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const VideoPlayer = styled(Video)`
  width: 100%;
  height: 300px;
`;

const ContentDetails = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #ccc;
  margin-top: 10px;
`;

const CreatorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const CreatorName = styled.Text`
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
`;

// --- Component ---
const MovieScreen = () => {
  const [content, setContent] = useState<Content | null>(null);
  const route = useRoute();
  const { contentId } = route.params as { contentId: string };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_URL}/content/${contentId}`);
        setContent(response.data);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      }
    };
    fetchContent();
  }, [contentId]);

  if (!content) {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <VideoPlayer
        source={{ uri: content.video }}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <ContentDetails>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        {content.user && (
          <CreatorInfo>
            <ProfileImage source={{ uri: content.user.profileImage }} />
            <CreatorName>{content.user.name}</CreatorName>
          </CreatorInfo>
        )}
      </ContentDetails>
    </Container>
  );
};

export default MovieScreen;
