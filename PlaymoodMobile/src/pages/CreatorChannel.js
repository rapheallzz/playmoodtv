import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';

const SectionTitleText = styled(Text)`
  color: #541011;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 15px;
  margin-bottom: 10px;
  padding-horizontal: 15px;
`;
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import useHighlights from '../hooks/useHighlights';
import useFeeds from '../hooks/useFeeds';
import usePlaylists from '../hooks/usePlaylists';
import { groupFeeds } from '../utils/feedUtils';
import HighlightViewerModal from '../components/HighlightViewerModal';

const CreatorChannel = ({ route, navigation }) => {
  const { creatorSlug, creatorId: routeCreatorId } = route.params || {};
  const user = useSelector((state) => state.auth);
  const currentUser = user.user;
  const currentUserId = currentUser?._id || currentUser?.userId || null;

  const [creatorData, setCreatorData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [activeTab, setActiveTab] = useState('VIDEOS');
  const [isLoading, setIsLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [highlightVisible, setHighlightVisible] = useState(false);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);

  const creatorId = creatorSlug ? creatorSlug.split('-').pop() : routeCreatorId;

  const { highlights, isLoading: isLoadingHighlights } = useHighlights(currentUser, creatorId);
  const { feeds, isLoadingFeeds } = useFeeds(currentUser, creatorId);
  const { playlists, isLoadingPlaylists } = usePlaylists(currentUser, creatorId);

  const processedFeeds = useMemo(() => groupFeeds(feeds), [feeds]);

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

  const fetchCommunityPosts = async () => {
    if (!creatorId) return;
    setIsLoadingPosts(true);
    try {
      const response = await axios.get(`${BASE_API_URL}/api/community/${creatorId}`);
      setCommunityPosts(response.data || []);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'COMMUNITY' && communityPosts.length === 0) {
      fetchCommunityPosts();
    }
  }, [activeTab]);

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

  const openHighlight = (index) => {
    setHighlightStartIndex(index);
    setHighlightVisible(true);
  };

  const navigateToCreator = (user) => {
    if (!user) return;
    setHighlightVisible(false);
    const userId = user._id || user;
    if (userId === creatorId) return; // Already on this channel
    navigation.navigate('CreatorChannel', { creatorId: userId });
  };

  const renderVideoItem = ({ item }) => (
    <VideoCard onPress={() => navigation.navigate('MoviePlayer', { movie: item })}>
      <Thumbnail source={{ uri: item.thumbnail }} resizeMode="cover" />
      <VideoTitleText numberOfLines={2}>{item.title}</VideoTitleText>
      <VideoStatsText>{item.views || 0} views</VideoStatsText>
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

        <ProfileHeaderView>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: creatorData?.profileImage }} />
          </ProfileImageContainer>
          <CreatorInfoView>
            <CreatorNameText>{creatorData?.name}</CreatorNameText>
            <SubscriberCountText>{creatorData?.subscribers || 0} subscribers</SubscriberCountText>
          </CreatorInfoView>
          <SubscribeButton subscribed={subscribed} onPress={toggleSubscribe}>
            <SubscribeButtonText subscribed={subscribed}>{subscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}</SubscribeButtonText>
          </SubscribeButton>
        </ProfileHeaderView>

        <TabBarView>
          <TabTouchable active={activeTab === 'VIDEOS'} onPress={() => setActiveTab('VIDEOS')}>
            <TabLabelText active={activeTab === 'VIDEOS'}>VIDEOS</TabLabelText>
          </TabTouchable>
          <TabTouchable active={activeTab === 'FEEDS'} onPress={() => setActiveTab('FEEDS')}>
            <TabLabelText active={activeTab === 'FEEDS'}>FEEDS</TabLabelText>
          </TabTouchable>
          <TabTouchable active={activeTab === 'COMMUNITY'} onPress={() => setActiveTab('COMMUNITY')}>
            <TabLabelText active={activeTab === 'COMMUNITY'}>COMMUNITY</TabLabelText>
          </TabTouchable>
          <TabTouchable onPress={() => Alert.alert('About', creatorData?.about || 'No description available.')}>
            <TabLabelText>ABOUT</TabLabelText>
          </TabTouchable>
        </TabBarView>

        <HighlightsContainer>
           <SectionTitleText>Highlights</SectionTitleText>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
              {highlights.map((item, index) => (
                <HighlightCircle key={item._id || index} onPress={() => openHighlight(index)}>
                   <HighlightImage source={{ uri: item.thumbnail || item.content?.thumbnail }} />
                </HighlightCircle>
              ))}
              {highlights.length === 0 && <EmptyText>No highlights yet.</EmptyText>}
           </ScrollView>
        </HighlightsContainer>

        <ContentAreaView>
          {activeTab === 'VIDEOS' && (
            <FlatList
              data={videos}
              renderItem={renderVideoItem}
              keyExtractor={item => item._id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
              ListEmptyComponent={<EmptyText>No videos available.</EmptyText>}
            />
          )}

          {activeTab === 'FEEDS' && (
            <FlatList
              data={processedFeeds}
              renderItem={({ item }) => (
                <VideoCard onPress={() => navigation.navigate('MoviePlayer', { movie: item })}>
                  <Thumbnail source={{ uri: item.media?.[0]?.url || item.thumbnail }} resizeMode="cover" />
                  <VideoTitleText numberOfLines={2}>{item.caption}</VideoTitleText>
                </VideoCard>
              )}
              keyExtractor={item => item._id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
              ListEmptyComponent={<EmptyText>No feeds available.</EmptyText>}
            />
          )}

          {activeTab === 'PLAYLISTS' && (
            <FlatList
              data={playlists}
              renderItem={({ item }) => (
                <VideoCard>
                   <Thumbnail source={{ uri: item.videos?.[0]?.thumbnail || 'https://via.placeholder.com/150' }} resizeMode="cover" />
                   <VideoTitleText numberOfLines={2}>{item.name}</VideoTitleText>
                   <VideoStatsText>{item.videos?.length || 0} videos</VideoStatsText>
                </VideoCard>
              )}
              keyExtractor={item => item._id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
              ListEmptyComponent={<EmptyText>No playlists available.</EmptyText>}
            />
          )}

          {activeTab === 'COMMUNITY' && (
            <FlatList
              data={communityPosts}
              renderItem={({ item }) => (
                <PostCard>
                  <PostHeader>
                    <PostProfileImage source={{ uri: item.user?.profileImage }} />
                    <View>
                      <PostCreatorText>{item.user?.name}</PostCreatorText>
                      <PostTimestampText>{new Date(item.timestamp).toLocaleDateString()}</PostTimestampText>
                    </View>
                  </PostHeader>
                  <PostContentText>{item.content}</PostContentText>
                </PostCard>
              )}
              keyExtractor={item => item._id}
              scrollEnabled={false}
              ListEmptyComponent={isLoadingPosts ? <ActivityIndicator color="#541011" /> : <EmptyText>No community posts available.</EmptyText>}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            />
          )}
        </ContentAreaView>
      </ScrollView>

      <HighlightViewerModal
        visible={highlightVisible}
        highlights={highlights}
        initialIndex={highlightStartIndex}
        onClose={() => setHighlightVisible(false)}
        onProfilePress={navigateToCreator}
      />
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

const ProfileHeaderView = styled(View)`
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

const CreatorInfoView = styled(View)`
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

const TabBarView = styled(View)`
  flex-direction: row;
  background-color: #000;
  border-bottom-width: 1px;
  border-bottom-color: #111;
`;

const TabTouchable = styled(TouchableOpacity)`
  padding-vertical: 15px;
  padding-horizontal: 20px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.active ? '#541011' : 'transparent'};
`;

const TabLabelText = styled(Text)`
  color: ${props => props.active ? '#541011' : '#888'};
  font-weight: bold;
  font-size: 12px;
`;

const ContentAreaView = styled(View)`
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
  background-color: #111;
`;

const VideoTitleText = styled(Text)`
  color: #ccc;
  font-size: 13px;
  margin-top: 8px;
  font-weight: 500;
`;

const VideoStatsText = styled(Text)`
  color: #555;
  font-size: 11px;
  margin-top: 2px;
`;

const HighlightsContainer = styled(View)`
  padding-vertical: 10px;
  background-color: #000;
`;

const HighlightCircle = styled(TouchableOpacity)`
  width: 65px;
  height: 65px;
  border-radius: 32.5px;
  border-width: 2px;
  border-color: #541011;
  margin-right: 15px;
  overflow: hidden;
  background-color: #111;
`;

const HighlightImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const EmptyStateView = styled(View)`
  padding: 60px;
  align-items: center;
`;

const EmptyText = styled(Text)`
  color: #444;
  margin-top: 15px;
  text-align: center;
  width: 100%;
`;

const PostCard = styled(View)`
  background-color: #111;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const PostHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const PostProfileImage = styled(Image)`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  margin-right: 10px;
  background-color: #222;
`;

const PostCreatorText = styled(Text)`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

const PostTimestampText = styled(Text)`
  color: #666;
  font-size: 11px;
`;

const PostContentText = styled(Text)`
  color: #ccc;
  font-size: 14px;
  line-height: 20px;
`;

export default CreatorChannel;
