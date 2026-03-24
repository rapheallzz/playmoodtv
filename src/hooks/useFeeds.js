import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_API_URL, { CLOUDINARY_CLOUD_NAME } from '../apiConfig';
import uploadService from '../features/uploadService';
import { getFileContentType } from '../utils/fileUtils';

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

  const createFeedPost = async (caption, mediaFiles, previews, selectedExisting = []) => {
    if (!user) return;
    try {
      // Step 1: Upload new media files
      const uploadPromises = mediaFiles.map(async (file, index) => {
        const preview = previews[index];

        // Upload main file
        const contentType = getFileContentType(file);
        const signatureFormData = new FormData();
        signatureFormData.append('provider', 'r2');
        signatureFormData.append('fileName', file.name);
        signatureFormData.append('contentType', contentType);

        const sigResponse = await api.post('/api/content/signature', signatureFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { uploadUrl, key, publicUrl } = sigResponse.data;
        await uploadService.uploadToR2(file, uploadUrl, contentType);

        let thumbnailData = null;
        // Upload generated thumbnail if it's a video
        if (file.type.startsWith('video/') && preview.thumbnailBlob) {
          const thumbFileName = `thumb-${file.name.split('.')[0]}.jpg`;
          const thumbFormData = new FormData();
          thumbFormData.append('provider', 'r2');
          thumbFormData.append('fileName', thumbFileName);
          thumbFormData.append('contentType', 'image/jpeg');

          const thumbSigResponse = await api.post('/api/content/signature', thumbFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          const { uploadUrl: thumbUploadUrl, key: thumbKey, publicUrl: thumbPublicUrl } = thumbSigResponse.data;
          await uploadService.uploadToR2(preview.thumbnailBlob, thumbUploadUrl, 'image/jpeg');

          thumbnailData = {
            url: thumbPublicUrl || thumbUploadUrl,
            key: thumbKey
          };
        }

        return {
          url: publicUrl || uploadUrl,
          key: key,
          thumbnail: thumbnailData
        };
      });

      const uploadedMedia = await Promise.all(uploadPromises);

      // Prepare IDs for existing content
      const contentIds = selectedExisting.filter(item => item.type === 'video').map(item => item.id);
      const highlightIds = selectedExisting.filter(item => item.type === 'highlight').map(item => item.id);

      // 3. Create feed post in backend
      const postData = {
        caption,
        type: uploadedMedia.some(m => m.url.includes('.mp4')) ? 'video' : 'image', // Basic type detection
        media: uploadedMedia,
        contentIds,
        highlightIds
      };

      const response = await api.post('/api/feed', postData);
      setFeeds(prevFeeds => [response.data, ...prevFeeds]);
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to create feed post.';
      setError(errMsg);
      throw new Error(errMsg);
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

  const deleteFeedPost = async (postId) => {
    try {
      await api.delete(`/api/feed/${postId}`);
      setFeeds(feeds.filter(feed => feed._id !== postId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete feed post.');
      throw err;
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
    deleteFeedPost,
  };
};

export default useFeeds;