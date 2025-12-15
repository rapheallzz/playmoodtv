import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Video } from 'expo-av';
import NeonButton from '../components/NeonButton';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';

const PreviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { item } = route.params;
  const [showVideo, setShowVideo] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const isLiked = user?.likes?.includes(item._id);
  const isInWatchlist = user?.watchlist?.includes(item._id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikeContent({ contentId: item._id }));
    } else {
      dispatch(likeContent({ contentId: item._id }));
    }
  };

  const handleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ contentId: item._id }));
    } else {
      dispatch(addToWatchlist({ contentId: item._id }));
    }
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Content not found.</Text>
      </View>
    );
  }

  const videoSource = item.shortPreview ? { uri: item.shortPreview } : { uri: item.video };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: item.thumbnail }} style={styles.backgroundImage}>
        {showVideo && videoSource.uri && (
          <Video
            source={videoSource}
            style={styles.backgroundImage}
            isMuted
            shouldPlay
            isLooping
            resizeMode="cover"
          />
        )}
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
              <NeonButton title={isLiked ? "Unlike" : "Like"} onPress={handleLike} />
              <NeonButton title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"} onPress={handleWatchlist} />
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
    ...StyleSheet.absoluteFillObject,
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
    justifyContent: 'center',
  },
  detailsContainer: {
    padding: 40,
    alignItems: 'center',
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
    maxWidth: '80%',
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
