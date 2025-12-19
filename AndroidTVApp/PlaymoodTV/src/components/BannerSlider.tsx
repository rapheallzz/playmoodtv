import React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';

const { width } = Dimensions.get('window');

const BannerSlider = ({ data, navigation }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const renderItem = ({ item }) => (
    <Banner
      onPress={() => navigation.navigate('Movie', { contentId: item._id })}
    >
      <BannerImage source={{ uri: item.thumbnail }} resizeMode="cover" />
      <BannerOverlay />
      <BannerTitle>{item.title}</BannerTitle>
    </Banner>
  );

  return (
    <View>
      <FlatList
        data={data.slice(0, 5)} // Show first 5 items
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Banner = styled(FocusableTouchableOpacity)`
  width: ${width}px;
  height: 400px;
  justify-content: flex-end;
  align-items: center;
`;

const BannerImage = styled.Image.attrs(props => ({
  source: props.source,
}))`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const BannerOverlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BannerTitle = styled.Text`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

export default BannerSlider;
