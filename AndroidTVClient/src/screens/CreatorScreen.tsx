import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '../config/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { subscribe, unsubscribe } from '../features/authSlice';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';
import ContentSlider from '../components/ContentSlider';

// --- Interfaces ---
interface Creator {
  _id: string;
  name: string;
  profileImage: string;
  bannerImage: string;
  subscribers: number;
  subscriberDetails: { _id: string }[];
  content: Content[];
}

interface Content {
  _id: string;
  title: string;
  thumbnail: string;
  video: string;
}

// --- Styled Components ---
const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled.Image`
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
  margin-right: 20px;
`;

const ProfileInfo = styled.View`
  flex: 1;
`;

const CreatorName = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const SubscriberCount = styled.Text`
  color: #ccc;
  font-size: 16px;
`;

const SubscribeButtonContainer = styled.View`
    width: 150px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

// --- Component ---
const CreatorScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { creatorId } = route.params;
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!creatorId) return;
      try {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/api/channel/${creatorId}`);
        setCreator(response.data);
        if (user && response.data.subscriberDetails.some(sub => sub._id === user._id)) {
            setSubscribed(true);
        } else {
            setSubscribed(false);
        }
      } catch (error) {
        console.error('Failed to fetch creator data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorData();
  }, [creatorId, user]);

  const handleSubscribeClick = () => {
    if (subscribed) {
      dispatch(unsubscribe(creatorId));
      setSubscribed(false);
    } else {
      dispatch(subscribe(creatorId));
      setSubscribed(true);
    }
  };

  const handleVideoPress = (content: Content) => {
    navigation.navigate('Movie', { contentId: content._id });
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoaderContainer>
    );
  }

  if (!creator) {
    return (
      <LoaderContainer>
        <Text style={{ color: '#fff' }}>Creator not found.</Text>
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <BannerImage source={{ uri: creator.bannerImage }} />
      <ProfileContainer>
        <ProfileImage source={{ uri: creator.profileImage }} />
        <ProfileInfo>
          <CreatorName>{creator.name}</CreatorName>
          <SubscriberCount>{creator.subscribers} subscribers</SubscriberCount>
        </ProfileInfo>
        <SubscribeButtonContainer>
            <FocusableTouchableOpacity onPress={handleSubscribeClick}>
                 <View style={{ padding: 10, backgroundColor: subscribed ? '#555' : '#E50914', borderRadius: 5 }}>
                    <ButtonText>{subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}</ButtonText>
                </View>
            </FocusableTouchableOpacity>
        </SubscribeButtonContainer>
      </ProfileContainer>
      <ContentSlider title="Videos" data={creator.content} onPressItem={handleVideoPress} />
    </Container>
  );
};

export default CreatorScreen;