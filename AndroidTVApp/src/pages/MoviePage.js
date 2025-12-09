import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import NeonButton from '../components/NeonButton';
import { useRoute } from '@react-navigation/native';

const MoviePage = () => {
  const route = useRoute();
  const { item } = route.params;
  const video = useRef(null);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Content not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: item.video }}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <NeonButton title="Like" onPress={() => {}} />
          <NeonButton title="Share" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 400,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
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

export default MoviePage;
