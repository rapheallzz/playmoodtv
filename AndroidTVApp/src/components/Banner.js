import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Button } from 'react-native';

const Banner = ({ item }) => {
  if (!item) return null;

  return (
    <ImageBackground source={{ uri: item.thumbnail }} style={styles.banner}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Watch Now" onPress={() => {}} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    width: '30%',
    marginTop: 10,
  },
});

export default Banner;
