import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/api`;

const updateStorage = async (contentId, action) => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    let user = storedUser ? JSON.parse(storedUser) : { watchlist: [] };

    if (action === 'add') {
      user.watchlist = user.watchlist ? [...user.watchlist, contentId] : [contentId];
    } else if (action === 'remove') {
      user.watchlist = user.watchlist?.filter((id) => id !== contentId) || [];
    }

    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error updating storage:', error);
  }
};

const likeContent = async ({ contentId, token }) => {
  try {
    const response = await axios.put(
      `${API_URL}/content/${contentId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to like content. Please try again.';
    throw new Error(message);
  }
};

const unlikeContent = async ({ contentId, token }) => {
  try {
    const response = await axios.put(
      `${API_URL}/content/${contentId}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to unlike content. Please try again.';
    throw new Error(message);
  }
};

const commentOnContent = async ({ contentId, comment, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/content/${contentId}/comment`,
      { contentId, text: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to add comment. Please try again.';
    throw new Error(message);
  }
};

const getComments = async ({ contentId, token }) => {
  try {
    const response = await axios.get(
      `${API_URL}/content/${contentId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to fetch comments. Please try again.';
    throw new Error(message);
  }
};

const addToWatchlist = async ({ userId, contentId, token }) => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/content/watchlist/add`,
      { contentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    await updateStorage(contentId, 'add');
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to add to watchlist. Please try again.';
    throw new Error(message);
  }
};

const removeFromWatchlist = async ({ userId, contentId, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/content/watchlist/remove`,
      { contentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    await updateStorage(contentId, 'remove');
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to remove from watchlist. Please try again.';
    throw new Error(message);
  }
};

const likeFeedPost = async ({ feedId, token }) => {
  try {
    const response = await axios.put(
      `${API_URL}/feed/${feedId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to like feed post. Please try again.';
    throw new Error(message);
  }
};

const unlikeFeedPost = async ({ feedId, token }) => {
  try {
    const response = await axios.put(
      `${API_URL}/feed/${feedId}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to unlike feed post. Please try again.';
    throw new Error(message);
  }
};

const commentOnFeedPost = async ({ feedId, comment, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/feed/${feedId}/comment`,
      { feedId, text: comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to add comment on feed post. Please try again.';
    throw new Error(message);
  }
};

const contentService = {
  likeContent,
  unlikeContent,
  commentOnContent,
  getComments,
  addToWatchlist,
  removeFromWatchlist,
  likeFeedPost,
  unlikeFeedPost,
  commentOnFeedPost,
};

export default contentService;
