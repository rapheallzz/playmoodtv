import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Banner = ({ content, navigation }) => {

  const renderItem = ({ item }) => (
    <ImageBackground
      source={{ uri: item.thumbnail }}
      style={styles.bannerBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
        <Pressable
            style={({ focused }) => [styles.button, focused && styles.buttonFocused]}
            onPress={() => navigation.navigate('Movie', { contentId: item._id })}
        >
            <Text style={styles.buttonText}>Watch Now</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: '100%',
  },
  bannerBackground: {
    width: screenWidth,
    height: 400,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'flex-start'
  },
  buttonFocused: {
    backgroundColor: '#f40612',
    transform: [{ scale: 1.1 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Banner;
