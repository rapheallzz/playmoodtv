import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const MoviePage = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: item.video }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
  },
});

export default MoviePage;
