import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MoviePlayer = ({ route, navigation }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: movie.video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        useNativeControls
        style={styles.video}
      />

      <ScrollView style={styles.detailsContainer}>
        <View style={styles.header}>
           <Text style={styles.title}>{movie.title}</Text>
           <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
             <Ionicons name="close" size={30} color="white" />
           </TouchableOpacity>
        </View>

        <Text style={styles.description}>{movie.description}</Text>

        <View style={styles.actionRow}>
           <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color="white" />
              <Text style={styles.actionText}>Like</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="add" size={24} color="white" />
              <Text style={styles.actionText}>Watchlist</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={24} color="white" />
              <Text style={styles.actionText}>Share</Text>
           </TouchableOpacity>
        </View>

        {movie.credit && (
          <View style={styles.creditsSection}>
            <Text style={styles.sectionLabel}>Credits</Text>
            <Text style={styles.creditsText}>{movie.credit}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: width,
    height: width * (9 / 16),
    backgroundColor: '#000',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    padding: 5,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 25,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
  },
  creditsSection: {
    marginTop: 10,
  },
  sectionLabel: {
    color: '#541011',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  creditsText: {
    color: '#999',
    fontSize: 13,
    lineHeight: 18,
  }
});

export default MoviePlayer;
