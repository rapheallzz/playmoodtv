import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import NeonButton from './NeonButton';

const { width } = Dimensions.get('window');

const Banner = ({ items }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (items && items.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prevIndex) => {
          const nextIndex = (prevIndex + 1) % items.length;
          flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        });
      }, 30000); // Auto-scroll every 30 seconds
      return () => clearInterval(interval);
    }
  }, [items]);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Video
        source={{ uri: item.video }}
        style={styles.video}
        isMuted
        shouldPlay
        isLooping
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', 'black']}
        style={styles.gradient}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <NeonButton title="WATCH NOW" onPress={() => {}} />
          <NeonButton title="ADD TO WATCHLIST" onPress={() => {}} />
        </View>
      </View>
    </View>
  );

  if (!items || items.length === 0) return null;

  return (
    <View style={styles.bannerContainer}>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setActiveSlide(index);
        }}
      />
      <View style={styles.radioButtonsContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[styles.radioButton, activeSlide === index && styles.radioButtonActive]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 450,
  },
  slide: {
    width,
    height: '100%',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    width: '60%', // Video takes up the left 60%
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '60%', // Content starts after the video
    paddingRight: 40,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  radioButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radioButton: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  radioButtonActive: {
    backgroundColor: '#541011',
  },
});

export default Banner;
