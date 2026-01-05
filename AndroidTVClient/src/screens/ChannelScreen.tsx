import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { BASE_URL } from '../config/apiConfig';

type ChannelScreenRouteProp = RouteProp<RootStackParamList, 'Channel'>;

interface Creator {
  _id: string;
  name: string;
  profileImage: string;
  bannerImage: string;
  subscribers: number;
  content: any[];
}

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const Banner = styled.Image`
  width: 100%;
  height: 200px;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const ProfileInfo = styled.View`
  margin-left: 20px;
`;

const CreatorName = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const SubscriberCount = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const VideosContainer = styled.View`
  padding: 20px;
`;

const SectionTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const VideoCard = styled.View<{ isFocused: boolean }>`
  margin-right: 10px;
  border-width: 2px;
  border-color: ${(props) => (props.isFocused ? '#fff' : 'transparent')};
  transform: ${(props) => (props.isFocused ? 'scale(1.1)' : 'scale(1)')};
`;

const VideoThumbnail = styled.Image`
  width: 160px;
  height: 90px;
`;

const VideoTitle = styled.Text`
  color: #fff;
  width: 160px;
`;

type ChannelScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Channel'>;

const ChannelScreen = ({ route }: { route: ChannelScreenRouteProp }) => {
  const { creatorId } = route.params;
  const [creator, setCreator] = useState<Creator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [focusedVideoIndex, setFocusedVideoIndex] = useState(-1);
  const navigation = useNavigation<ChannelScreenNavigationProp>();

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/channel/${creatorId}`);
        setCreator(response.data);
      } catch (err) {
        setError('Failed to load creator data. Please try again later.');
        console.error('Error fetching creator:', err);
      }
    };

    fetchCreator();
  }, [creatorId]);

  if (error) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </Container>
    );
  }

  if (!creator) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Banner source={{ uri: creator.bannerImage }} />
      <ProfileContainer>
        <ProfileImage source={{ uri: creator.profileImage }} />
        <ProfileInfo>
          <CreatorName>{creator.name}</CreatorName>
          <SubscriberCount>{creator.subscribers} subscribers</SubscriberCount>
        </ProfileInfo>
      </ProfileContainer>
      <VideosContainer>
        <SectionTitle>Videos</SectionTitle>
        <FlatList
          data={creator.content}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onFocus={() => setFocusedVideoIndex(index)}
              onBlur={() => setFocusedVideoIndex(-1)}
              onPress={() => navigation.navigate('Movie', { movieId: item._id })}
            >
              <VideoCard isFocused={focusedVideoIndex === index}>
                <VideoThumbnail source={{ uri: item.thumbnail }} />
                <VideoTitle>{item.title}</VideoTitle>
              </VideoCard>
            </TouchableOpacity>
          )}
        />
      </VideosContainer>
    </Container>
  );
};

export default ChannelScreen;
