import { useState, useEffect } from 'react';
import axios from 'axios';

const useCommunityPosts = (user, activeTab, socket, apiUrl) => {
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      const userId = user?._id || user?.userId;
      if (!userId) return;
      setIsLoadingPosts(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/community/${userId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setCommunityPosts(response.data || []);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Failed to load community posts.');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    if (user && (user._id || user.userId) && activeTab === 'COMMUNITY') {
      fetchCommunityPosts();
    }
  }, [user, activeTab, apiUrl]);

  const handleCreatePost = async (content) => {
    const postContent = content || newPostContent;
    if (!postContent.trim()) return { success: false, error: 'Content is empty' };

    setIsLoadingPosts(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/community/create`,
        { content: postContent },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(prev => [response.data, ...prev]);
      setNewPostContent('');
      setErrorMessage('');
      return { success: true, data: response.data };
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create post.';
      setErrorMessage(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(
        `${apiUrl}/api/community/${postId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(communityPosts.filter(post => post._id !== postId));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete post.' };
    }
  };

  return {
    communityPosts,
    isLoadingPosts,
    newPostContent,
    setNewPostContent,
    newComment,
    setNewComment,
    editingPostId,
    setEditingPostId,
    editPostContent,
    setEditPostContent,
    handleCreatePost,
    handleDeletePost,
    errorMessage,
  };
};

export default useCommunityPosts;
