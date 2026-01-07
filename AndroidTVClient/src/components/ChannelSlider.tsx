import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import { Creator } from '../types';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';

interface ChannelSliderProps {
  data: Creator[];
  onChannelPress: (creatorId: string) => void;
}

const ChannelSlider: React.FC<ChannelSliderProps> = ({ data, onChannelPress }) => {
  const renderItem = ({ item }: { item: Creator }) => (
    <ChannelCircle onPress={() => onChannelPress(item._id)}>
      <ProfileImage source={{ uri: item.profileImage }} />
    </ChannelCircle>
  );

  return (
    <Container>
      <Title>Channels</Title>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10 }}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: 20px 0;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 15px;
  padding-left: 20px;
`;

const ChannelCircle = styled(FocusableTouchableOpacity)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-right: 15px;
  background-color: #333;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;

export default ChannelSlider;
