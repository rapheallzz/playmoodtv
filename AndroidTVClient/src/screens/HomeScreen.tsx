import React, { useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchContent, fetchTopTenContent } from '../../features/content/contentSlice';
import styled from 'styled-components/native';
import Banner from '../../components/Banner/Banner';
import Slider from '../../components/Slider/Slider';
import { useNavigation } from '@react-navigation/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { content, topTenContent, isLoading } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(fetchTopTenContent());
  }, [dispatch]);

  const handleCardPress = (item: any) => {
    navigation.navigate('Movie', { contentId: item._id });
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoadingContainer>
    );
  }

  const newOnPlaymood = content.filter((item) => item.category === 'New on Playmood');
  const diaries = content.filter((item) => item.category === 'Diaries');
  const spaces = content.filter((item) => item.category === 'Spaces');
  const recommended = content.filter((item) => item.category === 'Recommended');
  const interviews = content.filter((item) => item.category === 'Interviews');
  const fashion = content.filter((item) => item.category === 'Fashion');
  const documentaries = content.filter((item) => item.category === 'Documentaries');

  return (
    <Container>
      <Banner />
      <Slider title="Top 10" data={topTenContent} onCardPress={handleCardPress} />
      <Slider title="New on Playmood" data={newOnPlaymood} onCardPress={handleCardPress} />
      <Slider title="Diaries" data={diaries} onCardPress={handleCardPress} />
      <Slider title="Spaces" data={spaces} onCardPress={handleCardPress} />
      <Slider title="Recommended" data={recommended} onCardPress={handleCardPress} />
      <Slider title="Interviews" data={interviews} onCardPress={handleCardPress} />
      <Slider title="Fashion" data={fashion} onCardPress={handleCardPress} />
      <Slider title="Documentaries" data={documentaries} onCardPress={handleCardPress} />
    </Container>
  );
};

export default HomeScreen;
