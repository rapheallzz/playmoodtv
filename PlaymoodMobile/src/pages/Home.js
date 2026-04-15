import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';

const { width: windowWidth } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [homePageData, setHomePageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);
        setHomePageData(response.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderBannerItem = ({ item }) => (
    <View style={styles.bannerItem}>
      <Image
        source={{ uri: item.thumbnail || 'https://via.placeholder.com/800x450' }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle} numberOfLines={1}>{item.title}</Text>
        <TouchableOpacity
          style={styles.watchNowButton}
          onPress={() => navigation.navigate('MoviePlayer', { movie: item })}
        >
          <Ionicons name="play" size={20} color="white" />
          <Text style={styles.watchNowText}>WATCH NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSection = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {data.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.contentCard}
            onPress={() => navigation.navigate('MoviePlayer', { movie: item })}
          >
            <Image
              source={{ uri: item.thumbnail || 'https://via.placeholder.com/300x168' }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#541011" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {homePageData.length > 0 && (
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={windowWidth}
            height={windowWidth * 0.6}
            autoPlay={true}
            data={homePageData.slice(0, 5)}
            scrollAnimationDuration={1000}
            renderItem={renderBannerItem}
          />
        </View>
      )}

      {renderSection('New on Playmood', homePageData.slice(0, 10))}
      {renderSection('Recommended for you', homePageData.slice(5, 15))}
      {renderSection('Channels', homePageData.slice(10, 20))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    marginBottom: 20,
  },
  bannerItem: {
    flex: 1,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundGradient: ['transparent', 'rgba(0,0,0,0.8)'], // Note: StyleSheet doesn't support linear gradient, would need expo-linear-gradient
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  watchNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#541011',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    gap: 5,
  },
  watchNowText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  horizontalScroll: {
    paddingLeft: 15,
    gap: 15,
  },
  contentCard: {
    width: 160,
  },
  cardImage: {
    width: 160,
    height: 90,
    borderRadius: 8,
    marginBottom: 5,
  },
  cardTitle: {
    color: '#ccc',
    fontSize: 12,
  },
});

export default Home;
