import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const CircularContentCard = ({ content, onPress, onMorePress }) => {
  return (
    <Container onPress={onPress}>
      <CircleImageContainer>
        <StyledImage
          source={{ uri: content.thumbnail || 'https://via.placeholder.com/200' }}
          resizeMode="cover"
        />
        <OverlayIcon onPress={onMorePress}>
           <Ionicons name="ellipsis-vertical" size={18} color="white" />
        </OverlayIcon>
      </CircleImageContainer>
      <ContentTitle numberOfLines={1}>{content.title}</ContentTitle>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  align-items: center;
  width: 120px;
  margin-right: 15px;
`;

const CircleImageContainer = styled.View`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  overflow: hidden;
  border-width: 2px;
  border-color: #541011;
  position: relative;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ContentTitle = styled.Text`
  color: #fff;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
  font-weight: 500;
`;

const OverlayIcon = styled.TouchableOpacity`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 10px;
  padding: 2px;
`;

export default CircularContentCard;
