import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import { Ionicons } from '@expo/vector-icons';

const CreatorChannel = ({ route, navigation }) => {
  const { creatorSlug, creatorId } = route.params;
  const [creator, setCreator] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        // Fetch creator details and their content
        const creatorRes = await axios.get(`${BASE_API_URL}/api/users/creator/${creatorSlug || creatorId}`);
        setCreator(creatorRes.data);

        const contentRes = await axios.get(`${BASE_API_URL}/api/content/creator/${creatorRes.data._id}`);
        setContent(contentRes.data);
      } catch (error) {
        console.error('Error fetching creator data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreatorData();
  }, [creatorSlug, creatorId]);

  const renderContentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contentCard}
      onPress={() => navigation.navigate('MoviePlayer', { movie: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.contentTitle} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#541011" />
      </View>
    );
  }

  if (!creator) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Creator not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: creator.bannerImage || 'https://via.placeholder.com/800x200' }}
          style={styles.banner}
        />
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: creator.profileImage || 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.textInfo}>
            <Text style={styles.creatorName}>{creator.name}</Text>
            <Text style={styles.subscribers}>{creator.subscribers?.length || 0} subscribers</Text>
          </View>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>SUBSCRIBE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{creator.bio || 'No bio available.'}</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Videos</Text>
        <FlatList
          data={content}
          renderItem={renderContentItem}
          keyExtractor={item => item._id}
          horizontal={false}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.columnWrapper}
          ListEmptyComponent={<Text style={styles.empty}>No videos uploaded yet.</Text>}
        />
      </View>
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
  bannerContainer: {
    backgroundColor: '#111',
  },
  banner: {
    width: '100%',
    height: 120,
    backgroundColor: '#222',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: -30,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  textInfo: {
    flex: 1,
    marginLeft: 15,
    marginTop: 25,
  },
  creatorName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subscribers: {
    color: '#666',
    fontSize: 12,
  },
  subscribeButton: {
    backgroundColor: '#541011',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 25,
  },
  subscribeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  aboutSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  contentSection: {
    padding: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  contentCard: {
    width: '48%',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  contentTitle: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#666',
  },
  empty: {
    color: '#444',
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
  }
});

export default CreatorChannel;
