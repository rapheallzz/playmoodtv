import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContentCard from './ContentCard';

const Carousel = ({ title, data, navigation }) => {
  const handlePress = (item) => {
    if (title === 'Highlights') {
      navigation.navigate('Highlights', { item });
    } else {
      navigation.navigate('Preview', { item });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ContentCard item={item} onPress={() => handlePress(item)} />
        )}
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
    paddingLeft: 40, // Add left padding to align with banner
  },
  title: {
    color: 'white',
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    marginBottom: 15, // Increased margin
  },
});

export default Carousel;
