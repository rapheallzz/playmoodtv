import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import {
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist,
} from '../features/authSlice';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';

const { width } = Dimensions.get('window');

const BannerSlider = ({ data, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  if (!data || data.length === 0) {
    return null;
  }

  const handleLike = (contentId) => {
    if (user) {
      const isLiked = user.like.includes(contentId);
      if (isLiked) {
        dispatch(unlikeContent({ contentId }));
      } else {
        dispatch(likeContent({ contentId }));
      }
    }
  };

  const handleWatchlist = (contentId) => {
    if (user) {
      const isWatchlisted = user.watchlist.includes(contentId);
      if (isWatchlisted) {
        dispatch(removeFromWatchlist({ contentId }));
      } else {
        dispatch(addToWatchlist({ contentId }));
      }
    }
  };

  const renderItem = ({ item, index }) => {
    const isLiked = user?.like.includes(item._id);
    const isWatchlisted = user?.watchlist.includes(item._id);

    return (
      <SlideContainer>
        <BannerVideoContainer>
          <Video
            source={{ uri: item.video }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay={index === activeIndex}
            isLooping
            style={{ width: '100%', height: '100%' }}
          />
        </BannerVideoContainer>
        <BannerContent
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.95)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <ContentDetails>
            <BannerTitle>{item.title}</BannerTitle>
            <BannerDescription numberOfLines={3}>
              {item.description}
            </BannerDescription>
            <ButtonContainer>
              <ActionButton
                onPress={() =>
                  navigation.navigate('Movie', { contentId: item._id })
                }
              >
                <ButtonText>WATCH NOW</ButtonText>
              </ActionButton>
              <ActionButton onPress={() => handleLike(item._id)}>
                <ButtonText>{isLiked ? 'UNLIKE' : 'LIKE'}</ButtonText>
              </ActionButton>
              <ActionButton onPress={() => handleWatchlist(item._id)}>
                <ButtonText>
                  {isWatchlisted ? 'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}
                </ButtonText>
              </ActionButton>
            </ButtonContainer>
          </ContentDetails>
        </BannerContent>
      </SlideContainer>
    );
  };

  return (
    <Container>
      <FlatList
        data={data.slice(0, 3)}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </Container>
  );
};
const Container = styled.View`
  height: 450px;
  width: 100%;
`;

const SlideContainer = styled.View`
  width: ${width}px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #000;
`;

const BannerVideoContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 65%;
  height: 100%;
`;

const BannerContent = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ContentDetails = styled.View`
  width: 50%;
  left: 55%;
  padding-right: 20px;
`;

const BannerTitle = styled.Text`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
`;

const BannerDescription = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const ActionButton = styled(FocusableTouchableOpacity)`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px 15px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export default BannerSlider;
