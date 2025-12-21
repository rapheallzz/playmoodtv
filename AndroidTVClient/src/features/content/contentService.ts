import axios from 'axios';
import BASE_API_URL from '../../config/apiConfig';

const API_URL = `${BASE_API_URL}/api/content`;

// Get all content
const getContent = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get content by ID
const getContentById = async (contentId: string) => {
  const response = await axios.get(`${API_URL}/${contentId}`);
  return response.data;
};

// Get top 10 content
const getTopTenContent = async () => {
  const response = await axios.get(`${API_URL}/top-ten`);
  return response.data;
};

// Like content
const likeContent = async (contentId: string, token: string) => {
  const response = await axios.put(
    `${API_URL}/${contentId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Unlike content
const unlikeContent = async (contentId: string, token: string) => {
  const response = await axios.put(
    `${API_URL}/${contentId}/unlike`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Add to watchlist
const addToWatchlist = async (contentId: string, token: string) => {
  const response = await axios.post(
    `${API_URL}/watchlist/add`,
    { contentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Remove from watchlist
const removeFromWatchlist = async (contentId: string, token: string) => {
  const response = await axios.post(
    `${API_URL}/watchlist/remove`,
    { contentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const contentService = {
  getContent,
  getContentById,
  getTopTenContent,
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist,
};

export default contentService;
