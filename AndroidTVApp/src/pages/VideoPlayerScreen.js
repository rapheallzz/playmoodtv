import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const VideoPlayerScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: item.video,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.overlay}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>{item.title}</Text>
        <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center'
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  title: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
});

export default VideoPlayerScreen;
