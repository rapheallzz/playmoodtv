import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/contentSlice';
import styled from 'styled-components/native';
import ContentSlider from '../components/ContentSlider';
import BannerSlider from '../components/BannerSlider';

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
      <FlatList
        data={Object.keys(categories)}
        ListHeaderComponent={
          <BannerSlider data={content} navigation={navigation} />
        }
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

export default HomeScreen;
