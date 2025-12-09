import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';

const ContentCard = ({ item, onPress }) => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('MoviePage', { item });
    }
  };

  return (
    <TouchableHighlight
      style={[styles.container, isFocused && styles.focused]}
      underlayColor="#541011"
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
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: 150,
    height: 250, // Set a fixed height
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: '#541011', // Highlight color on focus
    transform: [{ scale: 1.1 }], // Enlarge on focus
  },
  thumbnail: {
    width: '100%',
    height: 225,
    borderRadius: 5,
  },
  title: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ContentCard;
