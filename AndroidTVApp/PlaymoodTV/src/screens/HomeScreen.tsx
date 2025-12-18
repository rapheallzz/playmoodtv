import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/contentSlice';
import styled from 'styled-components/native';
import ContentSlider from '../components/ContentSlider';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { content, isLoading, isError, message } = useSelector(
    (state) => state.content
  );
  const [categories, setCategories] = useState({});

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    if (content && content.length > 0) {
      const groupedCategories = content.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});
      setCategories(groupedCategories);
    }
  }, [content]);

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Container>
      <Banner
        onPress={() =>
          content.length > 0 &&
          navigation.navigate('Movie', { contentId: content[0]._id })
        }
      >
        <BannerImage
          source={{ uri: content.length > 0 ? content[0].thumbnail : '' }}
          resizeMode="cover"
        />
        <BannerOverlay />
        <BannerTitle>
          {content.length > 0 ? content[0].title : 'Welcome to PlaymoodTV'}
        </BannerTitle>
      </Banner>
      <FlatList
        data={Object.keys(categories)}
        renderItem={({ item }) => (
          <ContentSlider
            title={item}
            data={categories[item]}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const Banner = styled(FocusableTouchableOpacity)`
  width: 100%;
  height: 400px;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
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

export default HomeScreen;
