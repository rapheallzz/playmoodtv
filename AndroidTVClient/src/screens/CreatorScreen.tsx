import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import { useRoute, useNavigation } from '@react-navigation/native';
import ContentSlider from '../components/ContentSlider';

// --- Interfaces ---
interface Creator {
  _id: string;
  name: string;
  profileImage: string;
  bannerImage: string;
}

interface Content {
  _id: string;
  title: string;
  thumbnail: string;
}

// --- Styled Components ---
const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const Banner = styled.Image`
  height: 200px;
  width: 100%;
`;

const CreatorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const CreatorName = styled.Text`
  font-size: 28px;
  color: #fff;
  margin-left: 20px;
`;

// --- Component ---
const CreatorScreen = () => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [content, setContent] = useState<Content[]>([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { creatorId } = route.params as { creatorId: string };

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const creatorRes = await axios.get(`${API_URL}/user/${creatorId}`);
        setCreator(creatorRes.data);

        const contentRes = await axios.get(`${API_URL}/content/user/${creatorId}`);
        setContent(contentRes.data);
      } catch (error) {
        console.error('Failed to fetch creator data:', error);
      }
    };
    fetchCreatorData();
  }, [creatorId]);

  const handleContentPress = (item: Content) => {
    navigation.navigate('Movie', { contentId: item._id });
  };

  if (!creator) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      {creator.bannerImage && <Banner source={{ uri: creator.bannerImage }} />}
      <CreatorInfo>
        <ProfileImage source={{ uri: creator.profileImage }} />
        <CreatorName>{creator.name}</CreatorName>
      </CreatorInfo>
      <ContentSlider title="Uploads" data={content} onPressItem={handleContentPress} />
    </Container>
  );
};

export default CreatorScreen;
