import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/contentSlice';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { content, isLoading, isError, message } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const categories = [
    'Top 10', 'New on Playmood', 'Diaries', 'Spaces', 'Recommended for you',
    'Interviews', 'Fashion Shows', 'Social', 'Documentaries and Reports',
    'Behind the Cameras', 'Soon in Playmood', 'Teens', 'Only in Playmood'
  ];

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (isError) {
    return <Text style={styles.error}>{message}</Text>;
  }

  const getContentForCategory = (category) => {
    // This is a placeholder logic.
    // In a real app, you'd filter based on actual category data.
    return content.slice(0, 10);
  }

  return (
    <ScrollView style={styles.container}>
      <Banner item={content[0]} />
      <View style={styles.buttonContainer}>
        <Button title="Watch Highlights" onPress={() => navigation.navigate('Highlights')} />
      </View>
      {categories.map(category => (
        <Carousel
          key={category}
          title={category}
          data={getContentForCategory(category)}
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
  buttonContainer: {
    margin: 20,
  }
});

export default HomeScreen;
