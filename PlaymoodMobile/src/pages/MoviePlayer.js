import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Share,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { isTV } from '../utils/platform';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import Carousel from 'react-native-reanimated-carousel';

const { width: windowWidth } = Dimensions.get('window');

const MoviePlayer = ({ route, navigation }) => {
  const { movie: initialMovie } = route.params;
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [movie, setMovie] = useState(initialMovie);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const contentId = movie._id;

  useEffect(() => {
    fetchMovieData();
    fetchComments();
    fetchRecommended();
    if (user) {
      fetchResumeData();
      checkSubscription();
    }
  }, [contentId, user]);

  useEffect(() => {
    if (user && movie) {
      setIsLiked(user?.like?.includes(movie._id));
      setIsInWatchlist(user?.watchlist?.includes(movie._id));
    }
  }, [user, movie]);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/content/${contentId}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/content/${contentId}/comments`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchRecommended = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/content/`);
      const allContent = response.data;
      const filtered = allContent.filter(item => item._id !== contentId).slice(0, 10);
      setRecommended(filtered);
    } catch (error) {
      console.error('Error fetching recommended:', error);
    }
  };

  const fetchResumeData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/content/continue-watching`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.data && response.data.continueWatching) {
        const formattedData = response.data.continueWatching.map(item => ({
          ...item,
          _id: item.contentId || item._id
        }));
        setResumeData(formattedData);
      } else {
        setResumeData([]);
      }
    } catch (error) {
      console.error('Error fetching resume data:', error);
    }
  };

  const checkSubscription = async () => {
    if (!movie.user?._id) return;
    try {
      const response = await axios.get(`${BASE_API_URL}/api/subscribe/creators`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const subscribedCreators = response.data;
      setIsSubscribed(subscribedCreators.some(creator => creator._id === movie.user._id));
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    try {
      if (isLiked) {
        await dispatch(unlikeContent({ contentId })).unwrap();
      } else {
        await dispatch(likeContent({ contentId })).unwrap();
      }
      setIsLiked(!isLiked);
      fetchMovieData(); // Refresh to get updated like count
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Error: ' + (error.message || 'Failed to update like status'));
    }
  };

  const handleWatchlist = async () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    try {
      if (isInWatchlist) {
        await dispatch(removeFromWatchlist({ userId: user._id, contentId })).unwrap();
      } else {
        await dispatch(addToWatchlist({ userId: user._id, contentId })).unwrap();
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      alert('Error: ' + (error.message || 'Failed to update watchlist'));
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    try {
      if (isSubscribed) {
        await axios.put(`${BASE_API_URL}/api/subscribe`, { creatorId: movie.user._id }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await axios.post(`${BASE_API_URL}/api/subscribe`, { creatorId: movie.user._id }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error('Error toggling subscription:', error);
      alert('Error: ' + (error.response?.data?.message || 'Failed to update subscription'));
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `https://playmoodtv.com/movie/${movie.title.replace(/\s+/g, '-')}-${movie._id}`;
      await Share.share({
        message: `Check out this movie on Playmood: ${movie.title}\n${shareUrl}`,
        url: shareUrl,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handlePostComment = async () => {
    if (!user) return alert('Please login to comment');
    if (!commentText.trim()) return;
    setIsSubmittingComment(true);
    try {
      const response = await axios.post(`${BASE_API_URL}/api/content/${contentId}/comment`, {
        contentId,
        text: commentText,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setComments([response.data.comment, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handlePlayAgain = async () => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(0);
      await videoRef.current.playAsync();
    }
  };

  const handleNextVideo = () => {
    if (recommended.length > 0) {
      const nextMovie = recommended[Math.floor(Math.random() * recommended.length)];
      navigation.replace('MoviePlayer', { movie: nextMovie });
    }
  };

  const navigateToCreator = () => {
    if (movie.user?._id) {
      navigation.navigate('CreatorChannel', { creatorId: movie.user._id });
    }
  };

  const renderContentSlider = (title, data) => {
    if (!data || data.length === 0) return null;

    const itemWidth = isTV ? 320 : 160;
    const itemHeight = isTV ? 220 : 240;
    const carouselWidth = isTV ? (windowWidth - 260) : windowWidth;

    return (
      <View style={styles.sliderSection}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Carousel
          loop={false}
          width={itemWidth}
          height={itemHeight}
          style={{ width: carouselWidth }}
          data={data}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.replace('MoviePlayer', { movie: item })}
            >
              <Image
                source={{ uri: item.thumbnail || 'https://via.placeholder.com/150' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#541011" />
      </View>
    );
  }

  return (
    <View style={[styles.container, isTV && styles.tvContainer]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={[isTV ? styles.tvVideoWrapper : styles.videoWrapper]}>
        <Video
          ref={videoRef}
          source={{ uri: movie.video }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      </View>

      <ScrollView style={styles.detailsContainer}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.statsRow}>
               <View style={styles.statItem}>
                  <Ionicons name="eye-outline" size={16} color="#ccc" />
                  <Text style={styles.statText}>{movie.views || 0}</Text>
               </View>
               <View style={styles.statItem}>
                  <Ionicons name="heart-outline" size={16} color="#ccc" />
                  <Text style={styles.statText}>{movie.likes?.length || 0}</Text>
               </View>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.creatorRow}>
          <TouchableOpacity onPress={navigateToCreator} style={styles.creatorInfo}>
            <Ionicons name="person-circle-outline" size={30} color="white" />
            <Text style={styles.creatorName}>By: {movie.user?.name || 'Playmood'}</Text>
          </TouchableOpacity>
          {movie.user && (
            <TouchableOpacity
              style={[styles.subscribeBtn, isSubscribed && styles.subscribedBtn]}
              onPress={handleSubscribe}
            >
              <Ionicons name={isSubscribed ? "notifications" : "notifications-outline"} size={18} color="white" />
              <Text style={styles.subscribeBtnText}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.description}>{movie.description}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#f00" : "white"} />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleWatchlist}>
            <Ionicons name={isInWatchlist ? "checkmark-circle" : "add-circle-outline"} size={24} color="white" />
            <Text style={styles.actionText}>{isInWatchlist ? 'In Watchlist' : 'Watchlist'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={24} color="white" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => alert('Donation feature coming soon')}>
            <FontAwesome5 name="donate" size={20} color="white" />
            <Text style={styles.actionText}>Donate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.playbackActions}>
          <TouchableOpacity style={styles.playbackBtn} onPress={handlePlayAgain}>
            <Ionicons name="refresh" size={18} color="white" />
            <Text style={styles.playbackBtnText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playbackBtn} onPress={handleNextVideo}>
            <Ionicons name="play-skip-forward" size={18} color="white" />
            <Text style={styles.playbackBtnText}>Next Video</Text>
          </TouchableOpacity>
        </View>

        {movie.credit && (
          <View style={styles.creditsSection}>
            <Text style={styles.sectionLabel}>Credits</Text>
            <Text style={styles.creditsText}>{movie.credit}</Text>
          </View>
        )}

        <View style={styles.commentsSection}>
          <Text style={styles.sectionLabel}>Comments ({comments.length})</Text>
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity
              style={styles.commentPostBtn}
              onPress={handlePostComment}
              disabled={isSubmittingComment}
            >
              {isSubmittingComment ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="paper-plane" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          {comments.map((comment, index) => (
            <View key={comment._id || index} style={styles.commentItem}>
              <Ionicons name="person-circle" size={30} color="#666" />
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>{comment.user?.name || 'Anonymous'}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))}
        </View>

        {renderContentSlider('Recommended for you', recommended)}
        {user && renderContentSlider('Continue Watching', resumeData)}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  videoWrapper: {
    width: windowWidth,
    aspectRatio: 16 / 9,
    marginTop: Platform.OS === 'ios' ? 50 : 30, // Push down to avoid status bar
    backgroundColor: '#000',
  },
  tvContainer: {
    paddingLeft: 0,
  },
  tvVideoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    maxHeight: '70%',
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 5,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#ccc',
    fontSize: 12,
  },
  closeButton: {
    padding: 5,
  },
  creatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  creatorName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  subscribeBtn: {
    backgroundColor: '#541011',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  subscribedBtn: {
    backgroundColor: '#333',
  },
  subscribeBtnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 25,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
  },
  playbackActions: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  playbackBtn: {
    flex: 1,
    backgroundColor: '#541011',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 5,
  },
  playbackBtnText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  creditsSection: {
    marginBottom: 30,
  },
  sectionLabel: {
    color: '#541011',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  creditsText: {
    color: '#999',
    fontSize: 13,
    lineHeight: 18,
  },
  commentsSection: {
    marginBottom: 30,
  },
  commentInputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 14,
  },
  commentPostBtn: {
    backgroundColor: '#541011',
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  commentItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentText: {
    color: '#ccc',
    fontSize: 13,
  },
  sliderSection: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    width: 145,
    marginLeft: 0,
    marginRight: 15,
  },
  cardImage: {
    width: 145,
    height: 200,
    borderRadius: 8,
  },
  cardTitle: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },
});

export default MoviePlayer;
