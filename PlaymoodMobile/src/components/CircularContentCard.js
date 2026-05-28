import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { isTV } from '../utils/platform';

const CircularContentCard = ({ content, onPress }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFocused={isFocused}
    >
      <CircleImageContainer isFocused={isFocused}>
        <StyledImage
          source={{ uri: content.thumbnail || 'https://via.placeholder.com/200' }}
          resizeMode="cover"
        />
      </CircleImageContainer>
      <ContentTitle numberOfLines={1}>{content.title}</ContentTitle>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  align-items: center;
  width: ${isTV ? '180px' : '120px'};
  margin-right: 15px;
  transform: ${props => props.isFocused ? 'scale(1.1)' : 'scale(1)'};
`;

const CircleImageContainer = styled.View`
  width: ${isTV ? '170px' : '110px'};
  height: ${isTV ? '170px' : '110px'};
  border-radius: ${isTV ? '85px' : '55px'};
  overflow: hidden;
  border-width: ${props => props.isFocused ? '4px' : '2px'};
  border-color: ${props => props.isFocused ? '#8c0734' : '#541011'};
  position: relative;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ContentTitle = styled.Text`
  color: #fff;
  font-size: ${isTV ? '16px' : '12px'};
  margin-top: 8px;
  text-align: center;
  font-weight: 500;
`;


export default CircularContentCard;
