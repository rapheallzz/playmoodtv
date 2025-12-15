import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContentCard from './ContentCard';
import CircleContentCard from './CircleContentCard';

const Carousel = ({ title, data, navigation, cardType = 'default' }) => {
  const handlePress = (item) => {
    if (title === 'Highlights') {
      navigation.navigate('Highlights', { item });
    } else {
      navigation.navigate('Preview', { item });
    }
  };

  const renderItem = ({ item }) => {
    if (cardType === 'circle') {
      return <CircleContentCard item={item} onPress={() => handlePress(item)} />;
    }
    return <ContentCard item={item} onPress={() => handlePress(item)} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
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
    paddingLeft: 40,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default Carousel;
