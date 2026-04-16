import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const Watchlist = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  // Note: In the actual app, you'd likely fetch the full content objects for the IDs in user.watchlist
  // For this initial implementation, we'll assume the watchlist contains content objects or handle the missing data gracefully

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MoviePlayer', { movie: item })}
    >
      <Image source={{ uri: item.thumbnail || 'https://via.placeholder.com/300' }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title || 'Untitled'}</Text>
        <TouchableOpacity style={styles.removeButton}>
           <Ionicons name="trash-outline" size={20} color="#541011" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Watchlist</Text>
      {!user ? (
        <View style={styles.centered}>
          <Text style={styles.message}>Please login to view your watchlist.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : user.watchlist?.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="bookmark-outline" size={80} color="#222" />
          <Text style={styles.message}>Your watchlist is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={user.watchlist}
          renderItem={renderItem}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 140,
    height: 80,
  },
  info: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  message: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#541011',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default Watchlist;
