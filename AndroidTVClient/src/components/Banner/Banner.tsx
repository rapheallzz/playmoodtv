import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import FocusableTouchableOpacity from '../FocusableTouchableOpacity';

const { height } = Dimensions.get('window');

const BannerContainer = styled.View`
  width: 100%;
  height: ${height * 0.55}px;
`;

const BannerContent = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
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

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { content } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    if (content.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % Math.min(3, content.length));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [content]);

  const currentContent = content[activeSlide];

  if (!currentContent) {
    return null;
  }

  return (
    <BannerContainer>
      <Video
        source={{ uri: currentContent.video }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        shouldPlay
        isMuted
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={StyleSheet.absoluteFill}
      />
      <BannerContent>
        <Title>{currentContent.title}</Title>
        <Description>{currentContent.description}</Description>
        <ButtonContainer>
          <FocusableTouchableOpacity>
            <Text style={{ color: '#fff' }}>Watch Now</Text>
          </FocusableTouchableOpacity>
          <FocusableTouchableOpacity>
            <Text style={{ color: '#fff' }}>Add to Watchlist</Text>
          </FocusableTouchableOpacity>
        </ButtonContainer>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
