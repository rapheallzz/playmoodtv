import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '../config/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';
import { Video } from 'expo-av';

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

const BannerContainer = styled.View`
  width: 100%;
  height: 500px;
  position: relative;
`;

const BannerVideo = styled(Video)`
  width: 100%;
  height: 100%;
`;

const BannerOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.4);
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
  max-width: 50%;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

// --- Interfaces ---
interface Content {
  _id: string;
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  category: string;
}

// --- Component ---
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [featuredContent, setFeaturedContent] = useState<Content[]>([]);
  const [topTen, setTopTen] = useState<Content[]>([]);
  const [newContent, setNewContent] = useState<Content[]>([]);
  const [recommendedContent, setRecommendedContent] = useState<Content[]>([]);
  const [fashionContent, setFashionContent] = useState<Content[]>([]);
  const [documentariesContent, setDocumentariesContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [allRes, topTenRes] = await Promise.all([
          axios.get(`${EXPO_PUBLIC_API_URL}/api/content`),
          axios.get(`${EXPO_PUBLIC_API_URL}/api/top-ten`)
        ]);

        const all: Content[] = allRes.data;

        setFeaturedContent(all.slice(0, 5)); // First 5 for banner
        setNewContent(all.slice(0, 15)); // First 15 for 'New'
        setTopTen(topTenRes.data);
        setRecommendedContent(all.filter(c => c.category === 'Recommended').slice(0, 10));
        setFashionContent(all.filter(c => c.category === 'Fashion').slice(0, 10));
        setDocumentariesContent(all.filter(c => c.category === 'Documentaries').slice(0, 10));

      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (featuredContent.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(prev => (prev + 1) % featuredContent.length);
      }, 5000); // Change banner every 5 seconds
      return () => clearInterval(interval);
    }
  }, [featuredContent]);

  const handleWatchNow = (content: Content) => {
    navigation.navigate('Movie', { contentId: content._id });
  };

  const handleLike = (contentId: string) => {
      const isLiked = user?.like?.includes(contentId);
      if (isLiked) {
          dispatch(unlikeContent({ contentId }));
      } else {
          dispatch(likeContent({ contentId }));
      }
  }

  const handleWatchlist = (contentId: string) => {
      const isInWatchlist = user?.watchlist?.includes(contentId);
      if (isInWatchlist) {
          dispatch(removeFromWatchlist({ contentId }));
      } else {
          dispatch(addToWatchlist({ contentId }));
      }
  }

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoaderContainer>
    );
  }

  const currentBannerContent = featuredContent[currentBannerIndex];

  return (
    <Container>
      {currentBannerContent && (
        <BannerContainer>
          <BannerVideo
            ref={videoRef}
            source={{ uri: currentBannerContent.video }}
            shouldPlay
            isMuted
            resizeMode="cover"
            isLooping
          />
          <BannerOverlay>
            <BannerTitle>{currentBannerContent.title}</BannerTitle>
            <BannerDescription numberOfLines={3}>{currentBannerContent.description}</BannerDescription>
            <ButtonContainer>
              <FocusableTouchableOpacity onPress={() => handleWatchNow(currentBannerContent)}>
                <View style={{ padding: 15, backgroundColor: '#541011', borderRadius: 5, marginRight: 15 }}>
                  <ButtonText>WATCH NOW</ButtonText>
                </View>
              </FocusableTouchableOpacity>
              <FocusableTouchableOpacity onPress={() => handleWatchlist(currentBannerContent._id)}>
                 <View style={{ padding: 15, backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: 5 }}>
                  <ButtonText>
                    {user?.watchlist?.includes(currentBannerContent._id) ? 'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}
                  </ButtonText>
                </View>
              </FocusableTouchableOpacity>
            </ButtonContainer>
          </BannerOverlay>
        </BannerContainer>
      )}

      <ContentSlider title="Top 10" data={topTen} onPressItem={handleWatchNow} />
      <ContentSlider title="New on Playmood" data={newContent} onPressItem={handleWatchNow} />
      <ContentSlider title="Recommended for you" data={recommendedContent} onPressItem={handleWatchNow} />
      <ContentSlider title="Fashion" data={fashionContent} onPressItem={handleWatchNow} />
      <ContentSlider title="Documentaries" data={documentariesContent} onPressItem={handleWatchNow} />
    </Container>
  );
};

export default HomeScreen;
