import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const CategoryList = ({ route, navigation }) => {
  const { category, title } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);
        const filtered = response.data.filter(item => item.category === category);
        setData(filtered);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MoviePlayer', { movie: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.views}>{item.views || 0} views</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#541011" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title || category}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={<Text style={styles.empty}>No content found in this category.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 5,
  },
  list: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  info: {
    padding: 10,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    height: 40,
  },
  views: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
  },
  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  }
});

export default CategoryList;
