import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/api`;

const likeContent = async ({ contentId, token }) => {
  try {
    const response = await axios.put(`${API_URL}/content/${contentId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to like content.');
  }
};

const unlikeContent = async ({ contentId, token }) => {
  try {
    const response = await axios.put(`${API_URL}/content/${contentId}/unlike`, {}, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to unlike content.');
  }
};

const addToWatchlist = async ({ contentId, token }) => {
  try {
    const response = await axios.post(`${API_URL}/content/watchlist/add`, { contentId }, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add to watchlist.');
  }
};

const removeFromWatchlist = async ({ contentId, token }) => {
  try {
    const response = await axios.post(`${API_URL}/content/watchlist/remove`, { contentId }, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove from watchlist.');
  }
};

const getWatchlist = async ({ token }) => {
  try {
    const response = await axios.get(`${API_URL}/content/watchlist/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get watchlist.');
  }
};

const getLikedContent = async ({ token }) => {
  try {
    const response = await axios.get(`${API_URL}/users/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get liked content.');
  }
};

const contentService = {
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  getLikedContent,
};

export default contentService;
