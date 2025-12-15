import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';

const CircleContentCard = ({ item, onPress }) => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('Preview', { item });
    }
  };

  return (
    <TouchableHighlight
      style={[styles.container, isFocused && styles.focused]}
      underlayColor="transparent"
      onPress={handlePress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <View>
        {isFocused && item.video ? (
          <Video
            source={{ uri: item.video }}
            style={styles.thumbnail}
            isMuted
            shouldPlay
            isLooping
            resizeMode="cover"
          />
        ) : (
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 75, // Half of width and height
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: '#541011',
    transform: [{ scale: 1.1 }],
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
});

export default CircleContentCard;
