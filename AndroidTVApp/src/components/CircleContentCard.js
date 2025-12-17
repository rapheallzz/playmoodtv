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
    height: 180,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: '#541011',
    transform: [{ scale: 1.1 }],
  },
  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 75,
  },
  title: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default CircleContentCard;
