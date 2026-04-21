import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const CreatorChannel = ({ route, navigation }) => {
  const { creatorSlug, creatorId: routeCreatorId } = route.params || {};
  const user = useSelector((state) => state.auth.user);
  const currentUserId = user?._id || null;

  const [creatorData, setCreatorData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('VIDEOS');
  const [isLoading, setIsLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  const creatorId = creatorSlug ? creatorSlug.split('-').pop() : routeCreatorId;

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (!creatorId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_API_URL}/api/channel/${creatorId}`);
        setCreatorData(response.data);
        setVideos(response.data.content || []);

        if (currentUserId && response.data.subscriberDetails) {
          setSubscribed(response.data.subscriberDetails.some(s => s._id === currentUserId));
        }
      } catch (error) {
        console.error('Error fetching creator channel:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreatorData();
  }, [creatorId, currentUserId]);

  const toggleSubscribe = async () => {
    if (!currentUserId) {
      navigation.navigate('Login');
      return;
    }
    try {
      const endpoint = subscribed ? '/api/subscribe' : '/api/subscribe';
      const method = subscribed ? 'put' : 'post';
      await axios[method](`${BASE_API_URL}${endpoint}`, { creatorId });
      setSubscribed(!subscribed);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const renderVideoItem = ({ item }) => (
    <VideoCard onPress={() => navigation.navigate('MoviePlayer', { movie: item })}>
      <Thumbnail source={{ uri: item.thumbnail }} resizeMode="cover" />
      <VideoTitle numberOfLines={2}>{item.title}</VideoTitle>
      <VideoStats>{item.views || 0} views</VideoStats>
    </VideoCard>
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#541011" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ScrollView stickyHeaderIndices={[2]}>
        <BannerImage source={{ uri: creatorData?.bannerImage || 'https://via.placeholder.com/800x200' }} resizeMode="cover" />

        <ProfileHeader>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: creatorData?.profileImage }} />
          </ProfileImageContainer>
          <CreatorInfo>
            <CreatorNameText>{creatorData?.name}</CreatorNameText>
            <SubscriberCountText>{creatorData?.subscribers || 0} subscribers</SubscriberCountText>
          </CreatorInfo>
          <SubscribeButton subscribed={subscribed} onPress={toggleSubscribe}>
            <SubscribeButtonText subscribed={subscribed}>{subscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}</SubscribeButtonText>
          </SubscribeButton>
        </ProfileHeader>

        <TabBar>
          <Tab active={activeTab === 'VIDEOS'} onPress={() => setActiveTab('VIDEOS')}>
            <TabText active={activeTab === 'VIDEOS'}>VIDEOS</TabText>
          </Tab>
          <Tab active={activeTab === 'FEEDS'} onPress={() => setActiveTab('FEEDS')}>
            <TabText active={activeTab === 'FEEDS'}>FEEDS</TabText>
          </Tab>
          <Tab active={activeTab === 'COMMUNITY'} onPress={() => setActiveTab('COMMUNITY')}>
            <TabText active={activeTab === 'COMMUNITY'}>COMMUNITY</TabText>
          </Tab>
          <Tab onPress={() => Alert.alert('About', creatorData?.about || 'No description available.')}>
            <TabText>ABOUT</TabText>
          </Tab>
        </TabBar>

        <ContentArea>
          {activeTab === 'VIDEOS' && (
            <FlatList
              data={videos}
              renderItem={renderVideoItem}
              keyExtractor={item => item._id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
            />
          )}
          {activeTab !== 'VIDEOS' && (
            <EmptyState>
              <Ionicons name="construct-outline" size={48} color="#222" />
              <EmptyText>This section is coming soon to mobile.</EmptyText>
            </EmptyState>
          )}
        </ContentArea>
      </ScrollView>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #000;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 150px;
  background-color: #111;
`;

const ProfileHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  background-color: #000;
`;

const ProfileImageContainer = styled(View)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 3px;
  border-color: #fff;
  overflow: hidden;
  background-color: #eee;
`;

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const CreatorInfo = styled(View)`
  flex: 1;
  margin-left: 15px;
`;

const CreatorNameText = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

const SubscriberCountText = styled(Text)`
  color: #888;
  font-size: 13px;
  margin-top: 2px;
`;

const SubscribeButton = styled(TouchableOpacity)`
  background-color: ${props => props.subscribed ? 'transparent' : '#541011'};
  border-width: 1px;
  border-color: #541011;
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 4px;
`;

const SubscribeButtonText = styled(Text)`
  color: ${props => props.subscribed ? '#541011' : '#fff'};
  font-weight: bold;
  font-size: 11px;
`;

const TabBar = styled(View)`
  flex-direction: row;
  background-color: #000;
  border-bottom-width: 1px;
  border-bottom-color: #111;
`;

const Tab = styled(TouchableOpacity)`
  padding-vertical: 15px;
  padding-horizontal: 20px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.active ? '#541011' : 'transparent'};
`;

const TabText = styled(Text)`
  color: ${props => props.active ? '#541011' : '#888'};
  font-weight: bold;
  font-size: 12px;
`;

const ContentArea = styled(View)`
  padding-top: 20px;
  background-color: #000;
`;

const VideoCard = styled(TouchableOpacity)`
  width: 48%;
  margin-bottom: 20px;
`;

const Thumbnail = styled(Image)`
  width: 100%;
  aspect-ratio: 1.77;
  border-radius: 8px;
`;

const VideoTitle = styled(Text)`
  color: #ccc;
  font-size: 13px;
  margin-top: 8px;
  font-weight: 500;
`;

const VideoStats = styled(Text)`
  color: #555;
  font-size: 11px;
  margin-top: 2px;
`;

const EmptyState = styled(View)`
  padding: 60px;
  align-items: center;
`;

const EmptyText = styled(Text)`
  color: #444;
  margin-top: 15px;
  text-align: center;
`;

export default CreatorChannel;
