import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import useChannelDetails from '../hooks/useChannelDetails';
import useHighlights from '../hooks/useHighlights';
import useFeeds from '../hooks/useFeeds';
import usePlaylists from '../hooks/usePlaylists';
import useCommunityPosts from '../hooks/useCommunityPosts';
import PostActionsModal from '../components/PostActionsModal';
import CreateCommunityPostModal from '../components/CreateCommunityPostModal';
import CreatePlaylistModal from '../components/CreatePlaylistModal';
import CreateHighlightModal from '../components/CreateHighlightModal';
import CreateVideoModal from '../components/CreateVideoModal';
import CreateFeedPostModal from '../components/CreateFeedPostModal';
import HighlightViewerModal from '../components/HighlightViewerModal';
import { groupFeeds } from '../utils/feedUtils';
import { uploadFile } from '../features/uploadSlice';
import BASE_API_URL from '../apiConfig';

const CreatorPage = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('Uploads');

  const {
    bannerImage, profileImage, creatorName, about, subscribers, data: uploads,
    isLoading: isLoadingChannel, errorMessage: channelError, refreshChannel
  } = useChannelDetails(user);

  const { highlights, isLoading: isLoadingHighlights, error: highlightsError, createHighlight, fetchHighlights } = useHighlights(user);
  const { feeds, isLoadingFeeds, error: feedsError, fetchFeeds, createFeedPost } = useFeeds(user);
  const {
    playlists,
    isLoadingPlaylists,
    errorMessage: playlistsError,
    handleCreateOrUpdatePlaylist,
    fetchPlaylists,
    setNewPlaylist
  } = usePlaylists(user);
  const {
    communityPosts,
    handleCreatePost,
    isLoadingPosts,
    errorMessage: postsError
  } = useCommunityPosts(user, activeTab, null, BASE_API_URL);
  const dispatch = useDispatch();
  const { isUploading } = useSelector((state) => state.upload);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [communityModalVisible, setCommunityModalVisible] = useState(false);
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
  const [highlightModalVisible, setHighlightModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [feedModalVisible, setFeedModalVisible] = useState(false);
  const [highlightViewerVisible, setHighlightViewerVisible] = useState(false);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);

  const processedFeeds = useMemo(() => groupFeeds(feeds), [feeds]);

  if (!user || user.role !== 'creator') {
    return (
      <Centered>
        <Text style={{ color: '#fff' }}>Access denied. You must be a creator.</Text>
      </Centered>
    );
  }

  if (isLoadingChannel) {
    return (
      <Centered>
        <ActivityIndicator size="large" color="#541011" />
      </Centered>
    );
  }

  const StatBox = ({ label, value }) => (
    <StatItem>
      <StatValueText>{value}</StatValueText>
      <StatLabelText>{label}</StatLabelText>
    </StatItem>
  );

  const navigateToPublicChannel = () => {
    navigation.navigate('CreatorChannel', { creatorId: user?._id || user?.userId });
  };

  const openHighlightViewer = (index) => {
    setHighlightStartIndex(index);
    setHighlightViewerVisible(true);
  };

  const navigateToCreator = (creator) => {
    if (!creator) return;
    setHighlightViewerVisible(false);
    const creatorId = creator._id || creator;
    if (creatorId === (user?._id || user?.userId)) return;
    navigation.navigate('CreatorChannel', { creatorId });
  };

  const handleActionSelect = (id) => {
    if (id === 'community') {
      setCommunityModalVisible(true);
    } else if (id === 'playlist') {
      setPlaylistModalVisible(true);
    } else if (id === 'highlight') {
      setHighlightModalVisible(true);
    } else if (id === 'video') {
      setVideoModalVisible(true);
    } else if (id === 'feed') {
      setFeedModalVisible(true);
    } else {
      Alert.alert('Action Selected', `The ${id} creation flow is coming soon to mobile.`);
    }
  };

  const onCreateCommunityPost = async (content) => {
    const result = await handleCreatePost(content);
    if (result.success) {
      Alert.alert('Success', 'Community post created successfully!');
      setCommunityModalVisible(false);
    } else {
      Alert.alert('Error', result.error || 'Failed to create post.');
    }
  };

  const onCreatePlaylist = async (playlistData) => {
    setNewPlaylist(playlistData);
    const result = await handleCreateOrUpdatePlaylist();
    if (result.success) {
      Alert.alert('Success', 'Playlist created successfully!');
      setPlaylistModalVisible(false);
      fetchPlaylists();
    } else {
      Alert.alert('Error', result.error || 'Failed to create playlist.');
    }
  };

  const onUploadVideo = async (uploadData) => {
    try {
      await dispatch(uploadFile(uploadData)).unwrap();
      Alert.alert('Success', 'Video upload started! You can check progress in the dashboard.');
      setVideoModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.error || 'Failed to start upload.');
    }
  };

  const onCreateFeedPost = async (caption, media) => {
    try {
      const result = await createFeedPost(caption, media);
      if (result.success) {
        Alert.alert('Success', 'Feed post created successfully!');
        setFeedModalVisible(false);
        fetchFeeds();
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create feed post.');
    }
  };

  return (
    <Container>
      <ScrollView>
        {(channelError || highlightsError || feedsError || playlistsError || postsError) && (
          <View style={{ backgroundColor: '#541011', padding: 10 }}>
            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>
              {channelError || highlightsError || feedsError || playlistsError || postsError}
            </Text>
          </View>
        )}
        <BannerImage source={{ uri: bannerImage || 'https://via.placeholder.com/800x200' }} resizeMode="cover" />

        <HeaderView>
           <ProfileContainer>
              <ProfileImage source={{ uri: profileImage || 'https://via.placeholder.com/70' }} />
           </ProfileContainer>
           <HeaderInfo>
              <CreatorNameText>{creatorName}</CreatorNameText>
              <TouchableOpacity onPress={navigateToPublicChannel}>
                <ManageBadge><ManageTextText>VIEW PUBLIC CHANNEL</ManageTextText></ManageBadge>
              </TouchableOpacity>
           </HeaderInfo>
        </HeaderView>

        <StatsRow>
           <StatBox label="Subscribers" value={subscribers || 0} />
           <StatBox label="Uploads" value={uploads?.length || 0} />
           <StatBox label="Feeds" value={feeds?.length || 0} />
        </StatsRow>

        <HighlightsContainer>
           <SectionTitleText>Highlights</SectionTitleText>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
              {highlights.map((item, index) => (
                <HighlightCircle key={item._id || index} onPress={() => openHighlightViewer(index)}>
                   <HighlightImage source={{ uri: item.thumbnail || item.content?.thumbnail || 'https://via.placeholder.com/65' }} />
                </HighlightCircle>
              ))}
              {highlights.length === 0 && <EmptyText>No highlights yet.</EmptyText>}
           </ScrollView>
        </HighlightsContainer>

        <ActionGrid>
           <ActionButton onPress={() => setActionsVisible(true)}>
              <Ionicons name="add-circle-outline" size={32} color="#fff" />
              <ActionLabelText>Create New</ActionLabelText>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Analytics', 'Analytics dashboard coming soon to mobile.')}>
              <Ionicons name="bar-chart-outline" size={32} color="#fff" />
              <ActionLabelText>Analytics</ActionLabelText>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Comments', 'Comment management coming soon to mobile.')}>
              <Ionicons name="chatbubbles-outline" size={32} color="#fff" />
              <ActionLabelText>Comments</ActionLabelText>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Settings', 'Channel settings coming soon to mobile.')}>
              <Ionicons name="settings-outline" size={32} color="#fff" />
              <ActionLabelText>Settings</ActionLabelText>
           </ActionButton>
        </ActionGrid>

        <TabBarView stickyHeaderIndices={[0]}>
          {['Uploads', 'Feeds', 'Playlists', 'Community', 'About'].map((tab) => (
            <TabTouchable
              key={tab}
              active={activeTab === tab}
              onPress={() => setActiveTab(tab)}
            >
              <TabLabelText active={activeTab === tab}>{tab.toUpperCase()}</TabLabelText>
            </TabTouchable>
          ))}
        </TabBarView>

        <ContentAreaView>
          {activeTab === 'Uploads' && (
            <FlatList
              data={uploads}
              renderItem={({ item }) => (
                <VideoCard onPress={() => navigation.navigate('MoviePlayer', { movie: item })}>
                  <Thumbnail source={{ uri: item.thumbnail || 'https://via.placeholder.com/150' }} resizeMode="cover" />
                  <VideoTitleText numberOfLines={2}>{item.title}</VideoTitleText>
                </VideoCard>
              )}
              keyExtractor={item => item._id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
              ListEmptyComponent={<EmptyText>No uploads yet.</EmptyText>}
            />
          )}

          {activeTab === 'Feeds' && (
            <FlatList
              data={processedFeeds}
              renderItem={({ item }) => (
                <FeedCard>
                  <FeedThumbnail source={{ uri: item.media?.[0]?.url || item.thumbnail || 'https://via.placeholder.com/150' }} resizeMode="cover" />
                  <FeedCaptionText numberOfLines={2}>{item.caption}</FeedCaptionText>
                </FeedCard>
              )}
              keyExtractor={item => item._id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
              ListEmptyComponent={<EmptyText>No feeds yet.</EmptyText>}
            />
          )}

          {activeTab === 'Playlists' && (
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
              ListEmptyComponent={<EmptyText>No playlists yet.</EmptyText>}
            />
          )}

          {activeTab === 'Community' && (
            <FlatList
              data={communityPosts}
              renderItem={({ item }) => (
                <PostCardView>
                  <PostHeaderView>
                    <PostProfileImage source={{ uri: item.user?.profileImage || 'https://via.placeholder.com/35' }} />
                    <View>
                      <PostCreatorText>{item.user?.name}</PostCreatorText>
                      <PostTimestampText>{(item.createdAt || item.timestamp) ? new Date(item.createdAt || item.timestamp).toLocaleDateString() : ''}</PostTimestampText>
                    </View>
                  </PostHeaderView>
                  <PostContentText>{item.content}</PostContentText>
                </PostCardView>
              )}
              keyExtractor={item => item._id}
              scrollEnabled={false}
              ListEmptyComponent={isLoadingPosts ? <ActivityIndicator color="#541011" /> : <EmptyText>No community posts yet.</EmptyText>}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            />
          )}

          {activeTab === 'About' && (
            <AboutSection>
              <AboutText>{about || 'No description provided.'}</AboutText>
            </AboutSection>
          )}
        </ContentAreaView>
      </ScrollView>

      <PostActionsModal
        visible={actionsVisible}
        onClose={() => setActionsVisible(false)}
        onSelect={handleActionSelect}
      />

      <CreateCommunityPostModal
        visible={communityModalVisible}
        onClose={() => setCommunityModalVisible(false)}
        onCreate={onCreateCommunityPost}
        isLoading={isLoadingPosts}
      />

      <CreatePlaylistModal
        visible={playlistModalVisible}
        onClose={() => setPlaylistModalVisible(false)}
        onCreate={onCreatePlaylist}
        isLoading={isLoadingPlaylists}
      />

      <CreateHighlightModal
        visible={highlightModalVisible}
        onClose={() => setHighlightModalVisible(false)}
        onCreate={createHighlight}
        availableVideos={uploads}
      />

      <CreateVideoModal
        visible={videoModalVisible}
        onClose={() => setVideoModalVisible(false)}
        onUpload={onUploadVideo}
        isLoading={isUploading}
      />

      <CreateFeedPostModal
        visible={feedModalVisible}
        onClose={() => setFeedModalVisible(false)}
        onCreate={onCreateFeedPost}
        isLoading={isLoadingFeeds}
      />

      <HighlightViewerModal
        visible={highlightViewerVisible}
        highlights={highlights}
        initialIndex={highlightStartIndex}
        onClose={() => setHighlightViewerVisible(false)}
        onProfilePress={navigateToCreator}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #000;
`;

const Centered = styled(View)`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 120px;
  background-color: #111;
`;

const HeaderView = styled(View)`
  flex-direction: row;
  padding: 20px;
  align-items: center;
`;

const ProfileContainer = styled(View)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 2px;
  border-color: #541011;
  overflow: hidden;
  background-color: #fff;
`;

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const HeaderInfo = styled(View)`
  margin-left: 15px;
`;

const CreatorNameText = styled(Text)`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

const ManageBadge = styled(View)`
  background-color: #541011;
  padding-horizontal: 10px;
  padding-vertical: 6px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

const ManageTextText = styled(Text)`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

const StatsRow = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  background-color: #0a0a0a;
  padding-vertical: 20px;
  margin-vertical: 10px;
`;

const StatItem = styled(View)`
  align-items: center;
`;

const StatValueText = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const StatLabelText = styled(Text)`
  color: #666;
  font-size: 11px;
  text-transform: uppercase;
  margin-top: 4px;
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

const ActionGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
`;

const ActionButton = styled(TouchableOpacity)`
  width: 48%;
  background-color: #111;
  padding: 25px;
  border-radius: 15px;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
`;

const ActionLabelText = styled(Text)`
  color: #ccc;
  font-size: 13px;
  font-weight: 500;
`;

const TabBarView = styled(View)`
  flex-direction: row;
  background-color: #000;
  border-bottom-width: 1px;
  border-bottom-color: #111;
  margin-top: 10px;
`;

const TabTouchable = styled(TouchableOpacity)`
  padding-vertical: 15px;
  padding-horizontal: 15px;
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
  min-height: 400px;
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

const FeedCard = styled(TouchableOpacity)`
  width: 48%;
  margin-bottom: 20px;
`;

const FeedThumbnail = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  background-color: #111;
`;

const FeedCaptionText = styled(Text)`
  color: #ccc;
  font-size: 12px;
  margin-top: 8px;
`;

const EmptyText = styled(Text)`
  color: #444;
  text-align: center;
  margin-vertical: 20px;
  width: 100%;
`;

const AboutSection = styled(View)`
  padding: 20px;
`;

const SectionTitleText = styled(Text)`
  color: #541011;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const AboutText = styled(Text)`
  color: #888;
  font-size: 14px;
  line-height: 22px;
`;

const PostCardView = styled(View)`
  background-color: #111;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const PostHeaderView = styled(View)`
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

export default CreatorPage;
