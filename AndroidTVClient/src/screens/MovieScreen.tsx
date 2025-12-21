import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Video } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchContentById } from '../features/content/contentSlice';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/auth/authSlice';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const VideoContainer = styled.View`
  width: 100%;
  height: 56.25%; /* 16:9 aspect ratio */
`;

const ContentContainer = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const MovieScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const { contentId } = route.params as { contentId: string };
  const { selectedContent: movie, isLoading } = useSelector((state: RootState) => state.content);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchContentById(contentId));
  }, [dispatch, contentId]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoadingContainer>
    );
  }

  if (!movie) {
    return (
      <LoadingContainer>
        <Text style={{ color: '#fff' }}>Failed to load movie data.</Text>
      </LoadingContainer>
    );
  }

  const isLiked = user?.like?.includes(movie._id);
  const isWatchlisted = user?.watchlist?.includes(movie._id);

  const handleLike = () => {
    if (!user) return;
    const action = isLiked ? unlikeContent({ contentId: movie._id }) : likeContent({ contentId: movie._id });
    dispatch(action);
  };

  const handleWatchlist = () => {
    if (!user) return;
    const action = isWatchlisted ? removeFromWatchlist({ contentId: movie._id }) : addToWatchlist({ contentId: movie._id });
    dispatch(action);
  };

  return (
    <Container>
      <VideoContainer>
        <Video
          source={{ uri: movie.video }}
          style={{ flex: 1 }}
          useNativeControls
          resizeMode="contain"
          shouldPlay
        />
      </VideoContainer>
      <ContentContainer>
        <Title>{movie.title}</Title>
        <Description>{movie.description}</Description>
        <ButtonContainer>
          <FocusableTouchableOpacity onPress={handleLike}>
            <Text style={{ color: '#fff' }}>{isLiked ? 'Unlike' : 'Like'}</Text>
          </FocusableTouchableOpacity>
          <FocusableTouchableOpacity onPress={handleWatchlist}>
            <Text style={{ color: '#fff' }}>{isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}</Text>
          </FocusableTouchableOpacity>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default MovieScreen;
