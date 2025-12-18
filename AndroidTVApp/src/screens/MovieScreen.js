import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import BASE_API_URL from '../apiConfig';

// Styled Components
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

const VideoPlaceholder = styled.View`
    width: 100%;
    height: 550px;
    background-color: #1a1a1a;
    justify-content: center;
    align-items: center;
`;

const ContentArea = styled.View`
    padding: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const ActionButton = styled(FocusableTouchableOpacity)`
  padding: 12px 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin-right: 15px;
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const MovieScreen = ({ route }) => {
  const { contentId } = route.params;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const isLiked = user?.like?.includes(contentId);
  const isWatchlisted = user?.watchlist?.includes(contentId);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/content/${contentId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (contentId) {
      fetchMovieData();
    }
  }, [contentId]);

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
        <Text style={{color: 'white'}}>Could not load movie details.</Text>
      </LoadingContainer>
    );
  }

  const handleLike = () => {
      if (!user) return;
      const action = isLiked ? unlikeContent({ contentId }) : likeContent({ contentId });
      dispatch(action);
  };

  const handleAddToWatchlist = () => {
    if (!user) return;
    const action = isWatchlisted ? removeFromWatchlist({ contentId }) : addToWatchlist({ contentId });
    dispatch(action);
  };

  return (
    <Container>
      <VideoPlaceholder>
          <Text style={{color: 'white'}}>Video Player for {movie.title}</Text>
      </VideoPlaceholder>

      <ContentArea>
        <Title>{movie.title}</Title>
        <Description>{movie.description}</Description>
        <ButtonContainer>
            <ActionButton onPress={handleLike}>
                <ButtonText>{isLiked ? 'Unlike' : 'Like'}</ButtonText>
            </ActionButton>
            <ActionButton onPress={handleAddToWatchlist}>
                <ButtonText>{isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}</ButtonText>
            </ActionButton>
        </ButtonContainer>
      </ContentArea>
    </Container>
  );
};

export default MovieScreen;
