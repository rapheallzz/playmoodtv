import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContentCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="#541011"
      onPress={() => navigation.navigate('VideoPlayer', { item })}
    >
      <View>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: 150,
    borderRadius: 5,
  },
  thumbnail: {
    width: 150,
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
