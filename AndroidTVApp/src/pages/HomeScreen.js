import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/contentSlice';
import { getWatchlist, getLikedContent } from '../features/userContentSlice';
import { getTopTen } from '../features/topTenSlice';
import Banner from '../components/Banner';

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

  if (isContentLoading || isUserContentLoading || isTopTenLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (isContentError || isUserContentError || isTopTenError) {
    return <Text style={styles.error}>{contentMessage}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Banner items={content.slice(0, 3)} />
      <Text style={styles.text}>Home Screen - Diagnostic View</Text>
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
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
