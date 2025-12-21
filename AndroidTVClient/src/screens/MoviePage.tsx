import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { AppDispatch, RootState } from '../store/store';
import { Video } from 'expo-av';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import axios from 'axios';
import API_URL from '../config/apiConfig';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const MoviePage = ({ route }: any) => {
  const { contentId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/content/${contentId}`);
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [contentId]);

  const handleLike = () => {
    if (user && content) {
      const isLiked = user.like.includes(content._id);
      if (isLiked) {
        dispatch(unlikeContent({ contentId: content._id }));
      } else {
        dispatch(likeContent({ contentId: content._id }));
      }
    }
  };

  const handleWatchlist = () => {
    if (user && content) {
      const isWatchlisted = user.watchlist.includes(content._id);
      if (isWatchlisted) {
        dispatch(removeFromWatchlist({ contentId: content._id }));
      } else {
        dispatch(addToWatchlist({ contentId: content._id }));
      }
    }
  };

  if (isLoading || !content) {
    return (
      <Container>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <VideoPlayer
        source={{ uri: content.video }}
        shouldPlay
        isLooping
        useNativeControls
        resizeMode="contain"
      />
      <ContentContainer>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        <ButtonContainer>
          <StyledFocusableButton onPress={handleWatchlist}>
            <ButtonText>
              {user?.watchlist.includes(content._id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </ButtonText>
          </StyledFocusableButton>
          <StyledFocusableButton onPress={handleLike}>
            <ButtonText>{user?.like.includes(content._id) ? 'Unlike' : 'Like'}</ButtonText>
          </StyledFocusableButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const LoadingText = styled.Text`
    color: #fff;
    font-size: 24px;
    text-align: center;
    margin-top: 50%;
`;

const VideoPlayer = styled(Video)`
  width: 100%;
  height: 400px;
`;

const ContentContainer = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
`;

const Description = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const StyledFocusableButton = styled(FocusableTouchableOpacity)`
  background-color: #541011;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default MoviePage;
