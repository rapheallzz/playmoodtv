import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '../config/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';
import { Video } from 'expo-av';

// --- Styled Components ---
const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const VideoContainer = styled.View`
  flex: 1;
`;

const StyledVideo = styled(Video)`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Title = styled.Text`
  font-size: 36px;
  color: #fff;
  font-weight: bold;
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
}

// --- Component ---
const MovieScreen = ({ route }: { route: any }) => {
  const { contentId } = route.params;
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/api/content/${contentId}`);
        setContent(response.data);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchContent();
    }
  }, [contentId]);

  const handleLike = () => {
      if (!content) return;
      const isLiked = user?.like?.includes(content._id);
      if (isLiked) {
          dispatch(unlikeContent({ contentId: content._id }));
      } else {
          dispatch(likeContent({ contentId: content._id }));
      }
  }

  const handleWatchlist = () => {
      if (!content) return;
      const isInWatchlist = user?.watchlist?.includes(content._id);
      if (isInWatchlist) {
          dispatch(removeFromWatchlist({ contentId: content._id }));
      } else {
          dispatch(addToWatchlist({ contentId: content._id }));
      }
  }

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoaderContainer>
    );
  }

  if (!content) {
    return (
      <LoaderContainer>
        <Text style={{ color: '#fff' }}>Content not found.</Text>
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <VideoContainer>
        <StyledVideo
          ref={videoRef}
          source={{ uri: content.video }}
          shouldPlay
          resizeMode="cover"
          useNativeControls
        />
        <Overlay>
          <Title>{content.title}</Title>
          <ButtonContainer>
             <FocusableTouchableOpacity onPress={handleLike}>
                <View style={{ padding: 15, backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: 5, marginRight: 15 }}>
                  <ButtonText>
                    {user?.like?.includes(content._id) ? 'UNLIKE' : 'LIKE'}
                  </ButtonText>
                </View>
              </FocusableTouchableOpacity>
              <FocusableTouchableOpacity onPress={handleWatchlist}>
                 <View style={{ padding: 15, backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: 5 }}>
                  <ButtonText>
                    {user?.watchlist?.includes(content._id) ? 'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}
                  </ButtonText>
                </View>
              </FocusableTouchableOpacity>
          </ButtonContainer>
        </Overlay>
      </VideoContainer>
    </Container>
  );
};

export default MovieScreen;
