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

  const categories = [
    'My Watchlist', 'Liked Content', 'Highlights', 'Top 10', 'New on Playmood', 'Diaries', 'Spaces',
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
      case 'Highlights':
        return content.slice(10, 20);
      default:
        return content.slice(0, 10);
    }
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
