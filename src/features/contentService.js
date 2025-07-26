// contentService.js
import axios from 'axios';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users';

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

// Function to update localStorage for liking/unliking content
const updateLocalStorageLike = (contentId, action) => {
  let user = JSON.parse(localStorage.getItem('user')) || { like: [] };

  if (action === 'like') {
    user.like = user.like ? [...user.like, contentId] : [contentId];
  } else if (action === 'unlike') {
    user.like = user.like?.filter((id) => id !== contentId) || [];
  }

  localStorage.setItem('user', JSON.stringify(user));
};

// Like content
const likeContent = async ({ contentId, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/like`,
      { contentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    updateLocalStorageLike(contentId, 'like');
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
    const response = await axios.post(
      `${API_URL}/unlike`,
      { contentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    updateLocalStorageLike(contentId, 'unlike');
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to unlike content. Please try again.';
    throw new Error(message);
  }
};

// Add to watchlist
const addToWatchlist = async ({ userId, contentId, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/watchlist/add`,
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
    const response = await axios.put(
      `${API_URL}/watchlist/remove${userId}`,
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
  addToWatchlist,
  removeFromWatchlist,
};

export default contentService;