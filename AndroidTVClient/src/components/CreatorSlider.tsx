import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';

// --- Interfaces ---
interface Creator {
  _id: string;
  name: string;
  profileImage: string;
}

interface CreatorSliderProps {
  title: string;
  data: Creator[];
  onPressItem: (creator: Creator) => void;
}

// --- Styled Components ---
const SliderContainer = styled.View`
  margin-bottom: 25px;
`;

const SliderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-left: 20px;
  margin-bottom: 15px;
`;

const CreatorItemContainer = styled.View`
  margin-left: 20px;
  align-items: center; /* Center content vertically */
`;

const CreatorImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px; /* Make it a circle */
  border-width: 2px;
  border-color: transparent;
`;

const CreatorName = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin-top: 8px;
`;

// --- Component ---
const CreatorSlider: React.FC<CreatorSliderProps> = ({ title, data, onPressItem }) => {
  const renderItem = ({ item }: { item: Creator }) => (
    <FocusableTouchableOpacity onPress={() => onPressItem(item)}>
      <CreatorItemContainer>
        <CreatorImage source={{ uri: item.profileImage }} />
        <CreatorName>{item.name}</CreatorName>
      </CreatorItemContainer>
    </FocusableTouchableOpacity>
  );

  return (
    <SliderContainer>
      <SliderTitle>{title}</SliderTitle>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SliderContainer>
  );
};

export default CreatorSlider;