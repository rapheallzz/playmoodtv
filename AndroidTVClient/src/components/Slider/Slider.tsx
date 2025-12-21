import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styled from 'styled-components/native';
import FocusableTouchableOpacity from '../FocusableTouchableOpacity';

const SliderContainer = styled.View`
  margin: 20px 0;
`;

const SliderTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
  padding-left: 20px;
`;

const CardContainer = styled.View`
  margin: 0 10px;
`;

const CardImage = styled.Image`
  width: 150px;
  height: 225px;
  border-radius: 5px;
`;

interface Content {
  _id: string;
  thumbnail: string;
}

interface SliderProps {
  title: string;
  data: Content[];
  onCardPress: (item: Content) => void;
}

const Slider: React.FC<SliderProps> = ({ title, data, onCardPress }) => {
  return (
    <SliderContainer>
      <SliderTitle>{title}</SliderTitle>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => (
          <FocusableTouchableOpacity onPress={() => onCardPress(item)}>
            <CardContainer>
              <CardImage source={{ uri: item.thumbnail }} />
            </CardContainer>
          </FocusableTouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </SliderContainer>
  );
};

export default Slider;
