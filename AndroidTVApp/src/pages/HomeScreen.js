import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/contentSlice';
import { getWatchlist, getLikedContent } from '../features/userContentSlice';
import { getTopTen } from '../features/topTenSlice';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { content, isLoading: isContentLoading, isError: isContentError, message: contentMessage } = useSelector((state) => state.content);
  const { watchlist, likedContent, isLoading: isUserContentLoading, isError: isUserContentError } = useSelector((state) => state.userContent);
  const { topTen, isLoading: isTopTenLoading, isError: isTopTenError } = useSelector((state) => state.topTen);

  useEffect(() => {
    dispatch(fetchContent());
    dispatch(getWatchlist());
    dispatch(getLikedContent());
    dispatch(getTopTen());
  }, [dispatch]);

  const categories = [
    'Highlights', 'Top 10', 'New on Playmood', 'My Watchlist', 'Liked Content', 'Channels', 'Diaries', 'Spaces',
    'Recommended for you', 'Interviews', 'Fashion Show', 'Social', 'Documentaries and Reports',
    'Behind the Cameras', 'Soon in Playmood', 'Teens', 'Only in Playmood'
  ];

  if (isContentLoading || isUserContentLoading || isTopTenLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (isContentError || isUserContentError || isTopTenError) {
    return <Text style={styles.error}>{contentMessage}</Text>;
  }

  const getContentForCategory = (category) => {
    const lowerCategory = category.toLowerCase();
    switch (lowerCategory) {
      case 'my watchlist':
        return watchlist;
      case 'liked content':
        return likedContent;
      case 'top 10':
        return topTen;
      default:
        return content.filter(item => {
          const itemCategory = item.category?.toLowerCase();
          if (!itemCategory) return false;
          // Check for both singular and plural forms
          return itemCategory === lowerCategory || `${itemCategory}s` === lowerCategory;
        });
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
      {categories.map(category => {
        const data = getContentForCategory(category);
        if (data && data.length > 0) {
          return (
            <Carousel
              key={category}
              title={category}
              data={data}
              navigation={navigation}
              cardType={getCardTypeForCategory(category)}
            />
          );
        }
        return null;
      })}
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
