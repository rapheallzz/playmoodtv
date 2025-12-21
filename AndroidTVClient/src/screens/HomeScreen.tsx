import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { AppDispatch, RootState } from '../store/store';
import { fetchContent } from '../features/contentSlice';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import Slider from '../components/Slider';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { content, isLoading } = useSelector((state: RootState) => state.content);
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    if (content.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % Math.min(3, content.length));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [content.length]);

  const handleLike = () => {
    if (user && currentContent) {
      const isLiked = user.like.includes(currentContent._id);
      if (isLiked) {
        dispatch(unlikeContent({ contentId: currentContent._id }));
      } else {
        dispatch(likeContent({ contentId: currentContent._id }));
      }
    }
  };

  const handleWatchlist = () => {
    if (user && currentContent) {
        const isWatchlisted = user.watchlist.includes(currentContent._id);
        if (isWatchlisted) {
            dispatch(removeFromWatchlist({ contentId: currentContent._id }));
        } else {
            dispatch(addToWatchlist({ contentId: currentContent._id }));
        }
    }
  };

  if (isLoading || !content.length) {
    return (
      <Container>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  const currentContent = content[activeSlide];
  const categories = [...new Set(content.map((item: any) => item.category))];

  return (
    <Container>
      <ScrollView>
        <Banner>
          <BannerVideo
            source={{ uri: currentContent.video }}
            shouldPlay
            isLooping
            resizeMode="cover"
          />
          <BannerContent>
            <Gradient colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']} />
            <Title>{currentContent.title}</Title>
            <Description>{currentContent.description}</Description>
            <ButtonContainer>
              <StyledFocusableButton onPress={() => navigation.navigate('Movie', { contentId: currentContent._id })}>
                <ButtonText>Watch Now</ButtonText>
              </StyledFocusableButton>
              <StyledFocusableButton onPress={handleWatchlist}>
                  <ButtonText>
                      {user?.watchlist.includes(currentContent._id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </ButtonText>
              </StyledFocusableButton>
              <StyledFocusableButton onPress={handleLike}>
                <ButtonText>{user?.like.includes(currentContent._id) ? 'Unlike' : 'Like'}</ButtonText>
              </StyledFocusableButton>
            </ButtonContainer>
          </BannerContent>
        </Banner>
        <SlidersContainer>
            {categories.map((category: any) => (
                <Slider
                key={category}
                title={category}
                data={content.filter((item: any) => item.category === category)}
                navigation={navigation}
                />
            ))}
        </SlidersContainer>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const LoadingText = styled.Text`
    color: #fff;
    font-size: 24px;
    text-align: center;
    margin-top: 50%;
`;

const Banner = styled.View`
  width: 100%;
  height: 600px;
  position: relative;
`;

const BannerVideo = styled(Video)`
  width: 100%;
  height: 100%;
`;

const BannerContent = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
`;

const Gradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
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

const SlidersContainer = styled.View`
    padding-top: 20px;
`;

export default HomeScreen;
