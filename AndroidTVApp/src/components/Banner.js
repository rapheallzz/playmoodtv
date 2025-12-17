import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const Banner = ({ items }) => {
  const renderItem = ({ item }) => (
    <View style={styles.banner}>
      <Image source={{ uri: item.thumbnail }} style={styles.bannerImage} />
      <Text style={styles.bannerTitle}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  banner: {
    width: 800,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Banner;
