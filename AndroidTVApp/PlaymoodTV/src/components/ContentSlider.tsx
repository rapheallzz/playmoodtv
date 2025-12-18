import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';

const ContentSlider = ({ title, data, navigation }) => {
  const renderItem = ({ item }) => (
    <MovieContainer
      onPress={() => navigation.navigate('Movie', { contentId: item._id })}
    >
      <Thumbnail source={{ uri: item.thumbnail }} resizeMode="cover" />
      <MovieTitle>{item.title}</MovieTitle>
    </MovieContainer>
  );

  return (
    <Container>
      <SliderTitle>{title}</SliderTitle>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 20px;
`;

const SliderTitle = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const MovieContainer = styled(FocusableTouchableOpacity)`
  margin-right: 10px;
  width: 150px;
`;

const Thumbnail = styled.Image.attrs(props => ({
  source: props.source,
}))`
  width: 150px;
  height: 220px;
  border-radius: 5px;
`;

const MovieTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-top: 5px;
  text-align: center;
`;

export default ContentSlider;
