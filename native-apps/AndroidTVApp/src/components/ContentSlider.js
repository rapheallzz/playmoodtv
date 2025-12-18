import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';

const ContentSlider = ({ title, content, navigation }) => {
  const renderItem = ({ item }) => (
    <Pressable
      style={({ focused }) => [styles.card, focused && styles.cardFocused]}
      onPress={() => navigation.navigate('Movie', { contentId: item._id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  card: {
    width: 180,
    height: 270,
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  cardFocused: {
    transform: [{ scale: 1.1 }],
    borderColor: 'white',
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: '85%',
  },
  title: {
    color: 'white',
    padding: 5,
    textAlign: 'center',
  },
});

export default ContentSlider;
