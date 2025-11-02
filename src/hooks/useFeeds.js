import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const useFeeds = (user, creatorId = null) => {
  const [feeds, setFeeds] = useState([]);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      Authorization: `Bearer ${user?.token}`,
      'Content-Type': 'application/json',
    },
  });

  const fetchFeeds = async () => {
    const userIdToFetch = creatorId || user?._id;
    if (!userIdToFetch) return;

    setIsLoadingFeeds(true);
    setError(null);
    try {
      const response = await api.get(`/api/feed/user/${userIdToFetch}`);
      setFeeds(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch feeds.');
    } finally {
      setIsLoadingFeeds(false);
    }
  };

  const createFeedPost = async (caption, mediaFiles) => {
    if (!user) return;
    try {
      // 1. Get signature from backend
      const sigResponse = await api.post('/api/content/signature', { type: 'images' });
      const { signature, timestamp, api_key: cloudinaryApiKey, folder } = sigResponse.data;

      // 2. Upload files to Cloudinary
      const uploadPromises = Array.from(mediaFiles).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', cloudinaryApiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);

        const cloudinaryResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/di97mcvbu/image/upload',
          formData
        );
        return {
          url: cloudinaryResponse.data.secure_url,
          public_id: cloudinaryResponse.data.public_id,
        };
      });

      const uploadedMedia = await Promise.all(uploadPromises);

      // 3. Create feed post in backend
      const postData = {
        caption,
        type: 'image',
        media: uploadedMedia,
      };

      const response = await api.post('/api/feed', postData);
      setFeeds([response.data, ...feeds]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create feed post.');
    }
  };

  const likeFeedPost = async (postId) => {
    try {
      const response = await api.put(`/api/feed/${postId}/like`);
      setFeeds(feeds.map(feed => (feed._id === postId ? response.data : feed)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to like post.');
    }
  };

  const unlikeFeedPost = async (postId) => {
    try {
      const response = await api.put(`/api/feed/${postId}/unlike`);
      setFeeds(feeds.map(feed => (feed._id === postId ? response.data : feed)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to unlike post.');
    }
  };

  const addCommentToFeed = async (postId, text) => {
    try {
      const response = await api.post(`/api/feed/${postId}/comment`, { text });
      setFeeds(feeds.map(feed => (feed._id === postId ? response.data : feed)));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment.');
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, [user]);

  return {
    feeds,
    isLoadingFeeds,
    error,
    fetchFeeds,
    createFeedPost,
    likeFeedPost,
    unlikeFeedPost,
    addCommentToFeed,
  };
};

export default useFeeds;