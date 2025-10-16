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
      setIsLoadingPosts(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/channel/${user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const posts = Array.isArray(response.data.communityPosts)
          ? response.data.communityPosts.map(post => ({
              ...post,
              likes: Array.isArray(post.likes) ? post.likes : [],
              comments: Array.isArray(post.comments) ? post.comments : [],
              user: post.user || { _id: user._id, name: user.name, profileImage: user.profileImage || '' },
              createdAt: post.createdAt || new Date().toISOString(),
            }))
          : [];
        setCommunityPosts(posts);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching community posts:', error);
        setErrorMessage('Failed to load community posts. Please try again later.');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    if (user && user._id && activeTab === 'Community') {
      fetchCommunityPosts();
    }
  }, [user, activeTab, apiUrl]);

  useEffect(() => {
    if (socket) {
      socket.on('community_post_liked', ({ postId, likes }) => {
        setCommunityPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, likes } : post
          )
        );
      });

      socket.on('community_post_unliked', ({ postId, likes }) => {
        setCommunityPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, likes } : post
          )
        );
      });

      socket.on('community_post_comment_added', ({ postId, comment }) => {
        setCommunityPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId
              ? { ...post, comments: [...post.comments, comment] }
              : post
          )
        );
      });

      return () => {
        socket.off('community_post_liked');
        socket.off('community_post_unliked');
        socket.off('community_post_comment_added');
      };
    }
  }, [socket]);

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/create',
        { content: newPostContent },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts([
        {
          ...response.data,
          likes: Array.isArray(response.data.likes) ? response.data.likes : [],
          comments: Array.isArray(response.data.comments) ? response.data.comments : [],
          user: { _id: user._id, name: user.name, profileImage: user.profileImage || '' },
          createdAt: response.data.createdAt || new Date().toISOString(),
        },
        ...communityPosts,
      ]);
      setNewPostContent('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating community post:', error);
      setErrorMessage('Failed to create post. Please try again later.');
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPostId || !editPostContent.trim()) return;
    try {
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${editingPostId}`,
        { content: editPostContent },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map(post =>
          post._id === editingPostId
            ? {
                ...post,
                content: response.data.content,
                comments: Array.isArray(response.data.comments) ? response.data.comments : [],
              }
            : post
        )
      );
      setEditPostContent('');
      setEditingPostId(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating post:', error);
      setErrorMessage('Failed to update post. Please try again later.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${postId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(communityPosts.filter(post => post._id !== postId));
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Failed to delete post. Please try again later.');
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment[postId]?.trim()) {
      setErrorMessage('Comment cannot be empty.');
      return;
    }
    try {
      const response = await axios.post(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${postId}/comment`,
        { content: newComment[postId] },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map(post =>
          post._id === postId
            ? {
                ...post,
                comments: Array.isArray(response.data.comments)
                  ? response.data.comments
                  : [
                      ...post.comments,
                      {
                        _id: response.data.commentId || Date.now(),
                        user: { _id: user._id, name: user.name },
                        content: newComment[postId],
                        timestamp: new Date().toISOString(),
                      },
                    ],
              }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [postId]: '' }));
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('Failed to add comment. Please try again later.');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/community/${postId}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map(post =>
          post._id === postId
            ? { ...post, comments: post.comments.filter(comment => comment._id !== commentId) }
            : post
        )
      );
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting comment:', error);
      setErrorMessage('Failed to delete comment. Please try again later.');
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const post = communityPosts.find(p => p._id === postId);
      const isLiked = Array.isArray(post?.likes) && post.likes.includes(user?._id);
      const endpoint = isLiked
        ? `/api/community/${postId}/unlike`
        : `/api/community/${postId}/like`;
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCommunityPosts(
        communityPosts.map((post) =>
          post._id === postId ? { ...post, likes: Array.isArray(response.data.posts) ? response.data.posts : [] } : post
        )
      );
      setErrorMessage('');
    } catch (error) {
      console.error('Error liking/unliking post:', error);
      setErrorMessage('Failed to like/unlike post. Please try again later.');
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
    handleUpdatePost,
    handleDeletePost,
    handleAddComment,
    handleDeleteComment,
    handleLikePost,
    errorMessage,
  };
};

export default useCommunityPosts;