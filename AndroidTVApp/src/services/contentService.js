import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/api`;

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
    throw new Error(error.response?.data?.message || 'Failed to like content.');
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
    throw new Error(error.response?.data?.message || 'Failed to unlike content.');
  }
};

const contentService = {
  likeContent,
  unlikeContent,
};

export default contentService;
