import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/api/users/`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  await AsyncStorage.removeItem('user');
};

// Like content
const likeContent = async (contentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${BASE_API_URL}/api/content/${contentId}/like`,
    {},
    config
  );
  return response.data;
};

// Unlike content
const unlikeContent = async (contentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${BASE_API_URL}/api/content/${contentId}/unlike`,
    {},
    config
  );
  return response.data;
};

// Add to watchlist
const addToWatchlist = async (contentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_API_URL}/api/content/watchlist/add`,
    { contentId },
    config
  );
  return response.data;
};

// Remove from watchlist
const removeFromWatchlist = async (contentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BASE_API_URL}/api/content/watchlist/remove`,
    { contentId },
    config
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist,
};

export default authService;
