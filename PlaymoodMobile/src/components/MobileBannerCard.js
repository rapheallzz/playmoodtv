import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';

const { width } = Dimensions.get('window');

const MobileBannerCard = ({ homePageData, onPlayNow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [activeSlide, setActiveSlide] = useState(0);

  const bannerContent = homePageData.slice(0, 5);
  const currentContent = bannerContent[activeSlide] || {};

  useEffect(() => {
    if (bannerContent.length > 1) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % bannerContent.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [bannerContent.length]);

  if (bannerContent.length === 0) return null;

  const isLiked = user?.like?.includes(currentContent._id);
  const isWatchlisted = user?.watchlist?.includes(currentContent._id);

  const toggleLike = () => {
    if (!user) return;
    if (isLiked) {
      dispatch(unlikeContent({ contentId: currentContent._id }));
    } else {
      dispatch(likeContent({ contentId: currentContent._id }));
    }
  };

  const toggleWatchlist = () => {
    if (!user) return;
    if (isWatchlisted) {
      dispatch(removeFromWatchlist({ userId: user._id, contentId: currentContent._id }));
    } else {
      dispatch(addToWatchlist({ userId: user._id, contentId: currentContent._id }));
    }
  };

  return (
    <Container>
      <Card
        source={{ uri: currentContent.thumbnail || 'https://via.placeholder.com/800x1200' }}
        imageStyle={{ borderRadius: 20 }}
      >
        <GradientOverlay>
          <LoveShareRow>
            <IconButton onPress={toggleLike}>
              <Ionicons name={isLiked ? "heart" : "heart-outline"} size={28} color={isLiked ? "#ff0000" : "white"} />
            </IconButton>
            <IconButton>
              <Ionicons name="share-social-outline" size={28} color="white" />
            </IconButton>
          </LoveShareRow>

          <BottomContent>
            <TitleText numberOfLines={2}>{currentContent.title || 'No Title'}</TitleText>
            <CategoryRow>
              <CategoryText>{currentContent.category || 'N/A'}</CategoryText>
              <DotSeparator>•</DotSeparator>
              <CategoryText numberOfLines={1}>{currentContent.credit || 'N/A'}</CategoryText>
            </CategoryRow>

            <ButtonRow>
              <PlayButton onPress={() => onPlayNow(currentContent)}>
                <Ionicons name="play" size={18} color="white" />
                <ButtonLabel>Play Now</ButtonLabel>
              </PlayButton>
              <WatchlistButton onPress={toggleWatchlist}>
                <Ionicons name={isWatchlisted ? "checkmark" : "add"} size={18} color="white" />
                <ButtonLabel>Watchlist</ButtonLabel>
              </WatchlistButton>
            </ButtonRow>

            <DotsRow>
              {bannerContent.map((_, index) => (
                <Dot key={index} active={index === activeSlide} />
              ))}
            </DotsRow>
          </BottomContent>
        </GradientOverlay>
      </Card>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 25px;
  padding-horizontal: 10px;
`;

const Card = styled(ImageBackground)`
  width: 100%;
  height: 480px;
  justify-content: flex-end;
`;

const GradientOverlay = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.3);
  justify-content: space-between;
  padding: 20px;
  border-radius: 20px;
`;

const LoveShareRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 15px;
`;

const IconButton = styled.TouchableOpacity`
  background-color: rgba(0,0,0,0.3);
  padding: 8px;
  border-radius: 25px;
`;

const BottomContent = styled.View`
  align-items: center;
`;

const TitleText = styled.Text`
  color: white;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const CategoryText = styled.Text`
  color: rgba(255,255,255,0.8);
  font-size: 13px;
  font-weight: 600;
`;

const DotSeparator = styled.Text`
  color: #541011;
  margin-horizontal: 8px;
  font-weight: bold;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 20px;
`;

const PlayButton = styled.TouchableOpacity`
  background-color: #541011;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 12px;
  border-radius: 30px;
  gap: 8px;
`;

const WatchlistButton = styled.TouchableOpacity`
  background-color: rgba(255,255,255,0.1);
  border-width: 1px;
  border-color: rgba(255,255,255,0.3);
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 12px;
  border-radius: 30px;
  gap: 8px;
`;

const ButtonLabel = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 13px;
`;

const DotsRow = styled.View`
  flex-direction: row;
  gap: 6px;
`;

const Dot = styled.View`
  width: ${props => props.active ? '24px' : '8px'};
  height: 8px;
  background-color: ${props => props.active ? '#541011' : 'rgba(255,255,255,0.4)'};
  border-radius: 4px;
`;

export default MobileBannerCard;
