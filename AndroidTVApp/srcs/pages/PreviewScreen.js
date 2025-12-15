import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import NeonButton from '../components/NeonButton';
import { likeContent, addToWatchlist } from '../features/authSlice';

const PreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { item } = route.params;

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Content not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: item.thumbnail }} style={styles.backgroundImage}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', 'black']}
          style={styles.gradient}
        />
        <TouchableHighlight
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          underlayColor="transparent"
        >
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableHighlight>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <NeonButton title="Play" onPress={() => navigation.navigate('MoviePage', { item })} />
              <NeonButton title="Like" onPress={() => dispatch(likeContent({ contentId: item._id }))} />
              <NeonButton title="Add to Watchlist" onPress={() => dispatch(addToWatchlist({ contentId: item._id }))} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 40,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Center the content vertically
  },
  detailsContainer: {
    padding: 40,
    alignItems: 'center', // Center the content horizontally
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: '80%', // Constrain the width for better readability
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default PreviewScreen;
