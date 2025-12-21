import axios from 'axios';
import API_URL from '../config/apiConfig';

const likeContent = async ({ contentId, token }: { contentId: string, token: string }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/api/content/${contentId}/like`, {}, config);
  return response.data;
};

const unlikeContent = async ({ contentId, token }: { contentId: string, token: string }) => {
    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/api/content/${contentId}/unlike`, {}, config);
  return response.data;
};

const addToWatchlist = async ({ contentId, token }: { contentId: string, token: string }) => {
    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/api/content/watchlist/add`, { contentId }, config);
  return response.data;
};

const removeFromWatchlist = async ({ contentId, token }: { contentId: string, token: string }) => {
    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/api/content/watchlist/remove`, { contentId }, config);
  return response.data;
};


const contentService = {
  likeContent,
  unlikeContent,
  addToWatchlist,
  removeFromWatchlist
};

export default contentService;
