import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContentCard from './ContentCard';

const Carousel = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <ContentCard item={item} />}
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
  title: {
    color: 'white',
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    marginLeft: 40, // Added more left margin
    marginBottom: 10,
  },
});

export default Carousel;
