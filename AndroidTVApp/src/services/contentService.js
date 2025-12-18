import axios from 'axios';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/';

// Get all content
const getAllContent = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get top 10 content (for the banner)
const getTopTen = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + 'top-ten', config);
    return response.data;
  };


// Get single content by ID
const getContentById = async (contentId, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + contentId, config);
    return response.data;
};

// Like content
const likeContent = async (contentId, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + `${contentId}/like`, {}, config);
    return response.data;
};

// Unlike content
const unlikeContent = async (contentId, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + `${contentId}/unlike`, {}, config);
    return response.data;
};

// Add to watchlist
const addToWatchlist = async (contentId, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + 'watchlist/add', { contentId }, config);
    return response.data;
};

// Remove from watchlist
const removeFromWatchlist = async (contentId, token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + 'watchlist/remove', { contentId }, config);
    return response.data;
};


const contentService = {
  getAllContent,
  getTopTen,
  getContentById,
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist,
};

export default contentService;
