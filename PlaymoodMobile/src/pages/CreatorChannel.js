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
  const [newComment, setNewComment] = useState({});
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
        const token = user?.userToken;
        const response = await axios.get(`${BASE_API_URL}/api/channel/${creatorId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
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
  }, [creatorId, currentUserId, user?.userToken]);

  const fetchCommunityPosts = async () => {
    if (!creatorId) return;
    setIsLoadingPosts(true);
    try {
      const token = user?.userToken;
      const response = await axios.get(`${BASE_API_URL}/api/community/${creatorId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
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
      const token = user?.userToken;
      const method = subscribed ? 'put' : 'post';
      await axios[method](
        `${BASE_API_URL}/api/subscribe`,
        { creatorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscribed(!subscribed);
      setCreatorData(prev => ({
        ...prev,
        subscribers: subscribed ? Math.max(0, (prev.subscribers || 0) - 1) : (prev.subscribers || 0) + 1
      }));
    } catch (error) {
      console.error('Subscription error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to update subscription');
    }
  };

  const handleLikePost = async (postId, isLiked) => {
    if (!currentUserId) {
      navigation.navigate('Login');
      return;
    }
    try {
      const token = user?.userToken;
      const endpoint = isLiked
        ? `/api/community/${postId}/unlike`
        : `/api/community/${postId}/like`;
      await axios.put(
        `${BASE_API_URL}${endpoint}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommunityPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: isLiked
                  ? post.likes.filter((id) => id !== currentUserId)
                  : [...post.likes, currentUserId],
              }
            : post
        )
      );
    } catch (error) {
      console.error('Like error:', error);
      Alert.alert('Error', 'Failed to update like status');
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!currentUserId) {
      navigation.navigate('Login');
      return;
    }
    const content = newComment[postId];
    if (!content || !content.trim()) return;

    try {
      const token = user?.userToken;
      const response = await axios.post(
        `${BASE_API_URL}/api/community/${postId}/comment`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommunityPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    _id: response.data.commentId || Date.now().toString(),
                    user: { _id: currentUserId, name: currentUser?.name || 'User', profileImage: currentUser?.profileImage },
                    content,
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Comment error:', error);
      Alert.alert('Error', 'Failed to add comment');
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
          <TabTouchable active={activeTab === 'PLAYLISTS'} onPress={() => setActiveTab('PLAYLISTS')}>
            <TabLabelText active={activeTab === 'PLAYLISTS'}>PLAYLISTS</TabLabelText>
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
              renderItem={({ item }) => {
                const isLiked = item.likes?.includes(currentUserId);
                return (
                  <PostCard>
                    <PostHeader>
                      <PostProfileImage source={{ uri: item.user?.profileImage }} />
                      <View>
                        <PostCreatorText>{item.user?.name}</PostCreatorText>
                        <PostTimestampText>{new Date(item.timestamp || item.createdAt).toLocaleDateString()}</PostTimestampText>
                      </View>
                    </PostHeader>
                    <PostContentText>{item.content}</PostContentText>

                    <PostActions>
                      <ActionButton onPress={() => handleLikePost(item._id, isLiked)}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "#541011" : "#888"} />
                        <ActionText active={isLiked}>{item.likes?.length || 0}</ActionText>
                      </ActionButton>
                      <ActionButton>
                        <Ionicons name="chatbubble-outline" size={18} color="#888" />
                        <ActionText>{item.comments?.length || 0}</ActionText>
                      </ActionButton>
                    </PostActions>

                    {item.comments?.length > 0 && (
                      <CommentsSection>
                        {item.comments.slice(0, 3).map((comment, index) => (
                          <CommentItem key={comment._id || index}>
                            <CommentUserText>{comment.user?.name || 'User'}: </CommentUserText>
                            <CommentText>{comment.content}</CommentText>
                          </CommentItem>
                        ))}
                      </CommentsSection>
                    )}

                    <CommentInputContainer>
                      <CommentTextInput
                        placeholder="Add a comment..."
                        placeholderTextColor="#555"
                        value={newComment[item._id] || ''}
                        onChangeText={(text) => setNewComment(prev => ({ ...prev, [item._id]: text }))}
                      />
                      <TouchableOpacity onPress={() => handleCommentSubmit(item._id)}>
                        <Ionicons name="send" size={20} color="#541011" />
                      </TouchableOpacity>
                    </CommentInputContainer>
                  </PostCard>
                );
              }}
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
  margin-bottom: 10px;
`;

const PostActions = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-vertical: 10px;
  padding-top: 10px;
  border-top-width: 0.5px;
  border-top-color: #222;
`;

const ActionButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const ActionText = styled(Text)`
  color: ${props => props.active ? '#541011' : '#888'};
  font-size: 13px;
`;

const CommentsSection = styled(View)`
  background-color: #0a0a0a;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
`;

const CommentItem = styled(View)`
  flex-direction: row;
  margin-bottom: 4px;
`;

const CommentUserText = styled(Text)`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const CommentText = styled(Text)`
  color: #bbb;
  font-size: 12px;
  flex: 1;
`;

const CommentInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #000;
  border-radius: 20px;
  padding-horizontal: 12px;
  height: 36px;
`;

const CommentTextInput = styled(TextInput)`
  flex: 1;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
`;

export default CreatorChannel;
