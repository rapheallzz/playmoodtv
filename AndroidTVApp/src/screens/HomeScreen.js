import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTopTenContent, getAllContent, reset } from '../redux/contentSlice';
import { logout } from '../redux/authSlice';
import Banner from '../components/Banner';
import ContentSlider from '../components/ContentSlider';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { bannerContent, allContent, isLoading, isError, message } = useSelector(
    (state) => state.content
  );

  useEffect(() => {
    dispatch(getTopTenContent());
    dispatch(getAllContent());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#E50914" />;
  }

  if (isError) {
    // In a real app, you'd show a more user-friendly error
    console.error(message);
    return null;
  }

  // Example of categorizing content. In a real app, this logic might be more complex.
  const trendingContent = allContent.filter(c => c.category === 'Trending');
  const newReleasesContent = allContent.filter(c => c.category === 'New Release');
  const fashionContent = allContent.filter(c => c.category === 'Fashion');
  const socialContent = allContent.filter(c => c.category === 'Social');


  return (
    <ScrollView style={styles.container}>
      <Banner content={bannerContent} navigation={navigation} />
      <View style={styles.slidersContainer}>
        {trendingContent.length > 0 && <ContentSlider title="Trending Now" content={trendingContent} navigation={navigation} />}
        {newReleasesContent.length > 0 && <ContentSlider title="New Releases" content={newReleasesContent} navigation={navigation} />}
        {fashionContent.length > 0 && <ContentSlider title="Fashion" content={fashionContent} navigation={navigation} />}
        {socialContent.length > 0 && <ContentSlider title="Social" content={socialContent} navigation={navigation} />}
      </View>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  slidersContainer: {
    paddingBottom: 20,
  }
});

export default HomeScreen;
