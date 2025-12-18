import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Video } from 'expo-av';
import {
  getContentById,
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist,
  reset,
} from '../redux/contentSlice';
import {
    updateUserLikes,
    updateUserWatchlist
} from '../redux/authSlice'

const MovieScreen = ({ route }) => {
  const { contentId } = route.params;
  const dispatch = useDispatch();
  const { selectedContent, isLoading, isError, message } = useSelector(
    (state) => state.content
  );
  const { user } = useSelector((state) => state.auth);

  const isLiked = user?.like?.includes(selectedContent?._id);
  const isInWatchlist = user?.watchlist?.includes(selectedContent?._id);

  useEffect(() => {
    dispatch(getContentById(contentId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, contentId]);

  const handleLikeToggle = () => {
    if (isLiked) {
      dispatch(unlikeContent(contentId)).then(() => dispatch(updateUserLikes(user.like.filter(id => id !== contentId))));

    } else {
      dispatch(likeContent(contentId)).then(() => dispatch(updateUserLikes([...user.like, contentId])));
    }
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(contentId)).then(() => dispatch(updateUserWatchlist(user.watchlist.filter(id => id !== contentId))));
    } else {
      dispatch(addToWatchlist(contentId)).then(() => dispatch(updateUserWatchlist([...user.watchlist, contentId])));
    }
  };

  if (isLoading || !selectedContent) {
    return <ActivityIndicator size="large" color="#E50914" style={styles.loader} />;
  }

  if (isError) {
    return <Text style={styles.error}>{message}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Video
        source={{ uri: selectedContent.video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={styles.videoPlayer}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{selectedContent.title}</Text>
        <Text style={styles.description}>{selectedContent.description}</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ focused }) => [styles.button, focused && styles.buttonFocused]}
            onPress={handleLikeToggle}
          >
            <Text style={styles.buttonText}>{isLiked ? 'Unlike' : 'Like'}</Text>
          </Pressable>
          <Pressable
             style={({ focused }) => [styles.button, focused && styles.buttonFocused]}
            onPress={handleWatchlistToggle}
          >
            <Text style={styles.buttonText}>
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  videoPlayer: {
    width: '100%',
    height: 400, // Adjust as needed
  },
  detailsContainer: {
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonFocused: {
    backgroundColor: '#555',
    transform: [{ scale: 1.1 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MovieScreen;
