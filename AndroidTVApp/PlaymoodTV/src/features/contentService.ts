import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const API_URL = `${BASE_API_URL}/api/content/`;

// Get all content
const getContent = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get content by ID
const getContentById = async (contentId) => {
  const response = await axios.get(API_URL + contentId);
  return response.data;
};

const contentService = {
  getContent,
  getContentById,
};

export default contentService;
