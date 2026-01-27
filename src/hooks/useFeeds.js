import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL, { CLOUDINARY_CLOUD_NAME } from '../apiConfig';
import uploadService from '../features/uploadService';

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
      // Step 1 & 2: Get signatures and upload each file to R2
      const uploadPromises = Array.from(mediaFiles).map(async (file) => {
        const signatureFormData = new FormData();
        signatureFormData.append('provider', 'r2');
        signatureFormData.append('fileName', file.name);
        signatureFormData.append('contentType', file.type);

        const sigResponse = await api.post('/api/content/signature', signatureFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { uploadUrl, key, publicUrl } = sigResponse.data;

        await uploadService.uploadToR2(file, uploadUrl, file.type);

        return {
          url: publicUrl || uploadUrl,
          key: key,
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