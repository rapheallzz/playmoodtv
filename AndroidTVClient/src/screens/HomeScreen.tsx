import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { API_URL } from '../config/apiConfig';
import ContentSlider from '../components/ContentSlider';
import CreatorSlider from '../components/CreatorSlider';
import { useNavigation } from '@react-navigation/native';

// --- Interfaces ---
interface Content {
  _id: string;
  title: string;
  thumbnail: string;
  video: string;
  description: string;
}

interface Creator {
    _id: string;
    name: string;
    profileImage: string;
}

// --- Styled Components ---
const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

const Banner = styled.ImageBackground`
  height: 400px;
  justify-content: flex-end;
  padding: 20px;
`;

const BannerTitle = styled.Text`
  font-size: 36px;
  color: #fff;
  font-weight: bold;
`;

const BannerDescription = styled.Text`
  font-size: 18px;
  color: #fff;
  margin-top: 10px;
`;

// --- Component ---
const HomeScreen = () => {
  const [bannerContent, setBannerContent] = useState<Content | null>(null);
  const [videoContent, setVideoContent] = useState<Content[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentRes = await axios.get(`${API_URL}/content`);
        const videos = contentRes.data.filter((item: any) => item.category === 'Video');
        setVideoContent(videos);
        setBannerContent(videos[0] || null);

        const creatorsRes = await axios.get(`${API_URL}/user/creators`);
        setCreators(creatorsRes.data);

      } catch (error) {
        console.error('Failed to fetch home screen data:', error);
      }
    };
    fetchData();
  }, []);

  const handleContentPress = (content: Content) => {
    navigation.navigate('Movie', { contentId: content._id });
  };

  const handleCreatorPress = (creator: Creator) => {
    navigation.navigate('Creator', { creatorId: creator._id });
  };

  return (
    <Container>
      {bannerContent && (
        <Banner source={{ uri: bannerContent.thumbnail }}>
          <BannerTitle>{bannerContent.title}</BannerTitle>
          <BannerDescription>{bannerContent.description}</BannerDescription>
        </Banner>
      )}
      <ContentSlider title="Trending Videos" data={videoContent} onPressItem={handleContentPress} />
      <CreatorSlider title="Channels" data={creators} onPressItem={handleCreatorPress} />
      <CreatorSlider title="Diaries" data={creators} onPressItem={handleCreatorPress} />
      <CreatorSlider title="Spaces" data={creators} onPressItem={handleCreatorPress} />
    </Container>
  );
};

export default HomeScreen;
