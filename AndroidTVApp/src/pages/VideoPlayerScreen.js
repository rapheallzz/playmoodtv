import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const VideoPlayerScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: item.video }}
        style={styles.video}
        controls={true}
        paused={paused}
        resizeMode="contain"
      />
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => setPaused(!paused)} style={styles.playPause}>
          <Text style={styles.playPauseText}>{paused ? 'Play' : 'Pause'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
  playPause: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  playPauseText: {
    color: 'white',
    fontSize: 18,
  },
});

export default VideoPlayerScreen;
