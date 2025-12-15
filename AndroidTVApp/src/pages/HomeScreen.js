import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/contentSlice';
import { getWatchlist, getLikedContent } from '../features/userContentSlice';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { content, isLoading: isContentLoading, isError: isContentError, message: contentMessage } = useSelector((state) => state.content);
  const { watchlist, likedContent, isLoading: isUserContentLoading, isError: isUserContentError } = useSelector((state) => state.userContent);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(getWatchlist());
    dispatch(getLikedContent());
  }, [dispatch]);

  useEffect(() => {
    if (content.length > 0) {
      console.log('Content data structure:', JSON.stringify(content.slice(0, 5), null, 2)); // Log first 5 items
    }
  }, [content]);

  const categories = [
    'Highlights', 'Top 10', 'New on Playmood', 'My Watchlist', 'Liked Content', 'Channels', 'Diaries', 'Spaces',
    'Recommended for you', 'Interviews', 'Fashion Shows', 'Social', 'Documentaries and Reports',
    'Behind the Cameras', 'Soon in Playmood', 'Teens', 'Only in Playmood'
  ];

  if (isContentLoading || isUserContentLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (isContentError || isUserContentError) {
    return <Text style={styles.error}>{contentMessage}</Text>;
  }

  const getContentForCategory = (category) => {
    switch (category) {
      case 'My Watchlist':
        return watchlist;
      case 'Liked Content':
        return likedContent;
      default:
        return content.filter(item => item.category?.toLowerCase() === category.toLowerCase());
    }
  }

  const getCardTypeForCategory = (category) => {
    if (['Channels', 'Diaries', 'Spaces'].includes(category)) {
      return 'circle';
    }
    return 'default';
  }

  return (
    <ScrollView style={styles.container}>
      <Banner items={content.slice(0, 3)} />
      {categories.map(category => (
        <Carousel
          key={category}
          title={category}
          data={getContentForCategory(category)}
          navigation={navigation}
          cardType={getCardTypeForCategory(category)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  error: {
    flex: 1,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
