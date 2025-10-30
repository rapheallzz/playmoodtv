// contentService.js
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/api`;

// Function to update localStorage for adding or removing content from the watchlist
const updateLocalStorage = (contentId, action) => {
  let user = JSON.parse(localStorage.getItem('user')) || { watchlist: [] };

  if (action === 'add') {
    user.watchlist = user.watchlist ? [...user.watchlist, contentId] : [contentId];
  } else if (action === 'remove') {
    user.watchlist = user.watchlist?.filter((id) => id !== contentId) || [];
  }

  localStorage.setItem('user', JSON.stringify(user));
};

// Like content
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

// Unlike content
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

// Comment on content
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

// Get comments for content
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

// Add to watchlist
const addToWatchlist = async ({ userId, contentId, token }) => {
  try {
    const response = await axios.post(
      `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/watchlist/add`,
      { contentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    updateLocalStorage(contentId, 'add');
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to add to watchlist. Please try again.';
    throw new Error(message);
  }
};

// Remove from watchlist
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
    updateLocalStorage(contentId, 'remove');
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to remove from watchlist. Please try again.';
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
};

export default contentService;