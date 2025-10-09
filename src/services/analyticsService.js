import axios from 'axios';

const API_URL = 'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/analytics';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getPlatformAnalytics = async (token) => {
  const response = await axios.get(`${API_URL}/admin/platform`, getAuthHeaders(token));
  return response.data;
};

export const getUserDemographics = async (token) => {
  const response = await axios.get(`${API_URL}/admin/user-demographics`, getAuthHeaders(token));
  return response.data;
};

export const getModerationStats = async (token) => {
  const response = await axios.get(`${API_URL}/admin/moderation`, getAuthHeaders(token));
  return response.data;
};

export const getCreatorDashboard = async (token, creatorId) => {
    const response = await axios.get(`${API_URL}/creator/dashboard?creatorId=${creatorId}`, getAuthHeaders(token));
    return response.data;
};

export const getCreatorPerformance = async (token, creatorId) => {
    const response = await axios.get(`${API_URL}/creator/performance-comparison?creatorId=${creatorId}`, getAuthHeaders(token));
    return response.data;
};

export const getCreatorEngagement = async (token, creatorId) => {
    const response = await axios.get(`${API_URL}/creator/engagement-trends?creatorId=${creatorId}`, getAuthHeaders(token));
    return response.data;
};

export const getCreatorWatchTime = async (token, videoId) => {
    const response = await axios.get(`${API_URL}/creator/watch-time/${videoId}`, getAuthHeaders(token));
    return response.data;
};