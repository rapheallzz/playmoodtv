import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Video } from 'expo-av';

const Banner = ({ item }) => {
  if (!item || !item.video) return null;

  return (
    <View style={styles.bannerContainer}>
      <Video
        source={{ uri: item.video }}
        style={styles.video}
        isMuted
        shouldPlay
        isLooping
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Watch Now" onPress={() => {}} />
          <Button title="Add to Watchlist" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 400, // Increased height for a more cinematic feel
    justifyContent: 'flex-end',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    color: 'white',
    fontSize: 18,
    marginVertical: 15,
    maxWidth: '50%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10, // Creates space between buttons
  },
});

export default Banner;
