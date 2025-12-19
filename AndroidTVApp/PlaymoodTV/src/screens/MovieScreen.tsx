import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import { fetchContentById, reset } from '../features/contentSlice';
import styled from 'styled-components/native';
import { Video } from 'expo-av';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const MovieScreen = ({ route }) => {
  const { contentId } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedContent: movie, isLoading } = useSelector(
    (state) => state.content
  );
  const videoRef = useRef(null);

  useEffect(() => {
    dispatch(fetchContentById(contentId));

    return () => {
      dispatch(reset());
    };
  }, [contentId, dispatch]);

  const isLiked = user?.like?.includes(movie?._id);
  const isWatchlisted = user?.watchlist?.includes(movie?._id);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikeContent({ contentId: movie._id }));
    } else {
      dispatch(likeContent({ contentId: movie._id }));
    }
  };

  const handleWatchlist = () => {
    if (isWatchlisted) {
      dispatch(removeFromWatchlist({ contentId: movie._id }));
    } else {
      dispatch(addToWatchlist({ contentId: movie._id }));
    }
  };

  if (isLoading || !movie) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Container>
      <VideoPlayer
        ref={videoRef}
        source={{ uri: movie.video }}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
      />
      <ContentContainer>
        <Title>{movie.title}</Title>
        <Description>{movie.description}</Description>
        <ButtonContainer>
          <FocusableButton onPress={handleLike}>
            <ButtonText>{isLiked ? 'Unlike' : 'Like'}</ButtonText>
          </FocusableButton>
          <FocusableButton onPress={handleWatchlist}>
            <ButtonText>
              {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </ButtonText>
          </FocusableButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const VideoPlayer = styled(Video)`
  width: 100%;
  height: 50%;
`;

const ContentContainer = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const FocusableButton = styled(FocusableTouchableOpacity)`
  padding: 15px;
  background-color: #e50914;
  border-radius: 4px;
  align-items: center;
  width: 45%;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default MovieScreen;
