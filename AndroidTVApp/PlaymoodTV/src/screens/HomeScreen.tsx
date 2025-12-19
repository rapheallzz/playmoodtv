import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, setSearchQuery } from '../features/contentSlice';
import styled from 'styled-components/native';
import ContentSlider from '../components/ContentSlider';
import BannerSlider from '../components/BannerSlider';
import SearchHeader from '../components/SearchHeader';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { content, filteredContent, isLoading, searchQuery } = useSelector(
    (state) => state.content
  );
  const [categories, setCategories] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <SearchHeader
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
        />
      ),
    });
  }, [navigation, searchQuery, dispatch]);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    if (filteredContent && filteredContent.length > 0) {
      const groupedCategories = filteredContent.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {});
      setCategories(groupedCategories);
    } else {
      setCategories({});
    }
  }, [filteredContent]);

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
