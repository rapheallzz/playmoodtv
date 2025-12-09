import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';

const { height } = Dimensions.get('window');

const HighlightsScreen = () => {
  const { content } = useSelector((state) => state.content);

  // Filter for content that has a video URL, as some might not.
  const videoContent = content.filter(item => item.video);

  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.video }}
        style={styles.video}
        resizeMode="contain"
        shouldPlay
        isLooping
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={videoContent}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HighlightsScreen;
