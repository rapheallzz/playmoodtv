import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const usePlaylists = (user) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '', visibility: 'public' });
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [newPlaylistId, setNewPlaylistId] = useState(null);
  const [availableVideos, setAvailableVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlaylistVideos, setSelectedPlaylistVideos] = useState([]);
  const [isLoadingPlaylistVideos, setIsLoadingPlaylistVideos] = useState(false);
  const [playlistVideoData, setPlaylistVideoData] = useState({});
  const [errorShown, setErrorShown] = useState(false); // Flag to prevent repeated pop-ups

  // Fetch playlists and available videos
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user || !user._id || !user.token) {
        if (!errorShown) {
          setErrorMessage('User not authenticated. Please log in.');
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'User not authenticated. Please log in.',
          });
          setErrorShown(true);
        }
        return;
      }
      setIsLoadingPlaylists(true);
      try {
        const response = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/user/${user._id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log('GET /api/playlists/user response:', response.data);
        const playlistsData = Array.isArray(response.data.playlists) ? response.data.playlists : [];
        setPlaylists(playlistsData);
        const videosResponse = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/my-channel/${user._id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setAvailableVideos(videosResponse.data.content.filter(video => video.isApproved) || []);
        if (newPlaylistId && playlistsData.some(p => p._id === newPlaylistId)) {
          setSelectedPlaylistId(newPlaylistId);
        }
        setErrorMessage('');
        setErrorShown(false);
      } catch (error) {
        console.error('Error fetching playlists:', error.response?.data || error.message);
        if (!errorShown) {
          setErrorMessage('Failed to load playlists. Please try again later.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.error || 'Failed to load playlists. Please try again later.',
          });
          setErrorShown(true);
        }
        setPlaylists([]);
      } finally {
        setIsLoadingPlaylists(false);
      }
    };

    if (user && user._id && user.token) {
      fetchPlaylists();
    }
  }, [user, newPlaylistId, errorShown]);

  // Fetch playlist by ID
  const fetchPlaylistById = useCallback(async (playlistId) => {
    if (!playlistId) {
      if (!errorShown) {
        setErrorMessage('Invalid playlist ID.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid playlist ID.',
        });
        setErrorShown(true);
      }
      return [];
    }
    if (playlistVideoData[playlistId] || (selectedPlaylistId === playlistId && selectedPlaylistVideos.length > 0)) {
      console.log('Using cached playlist videos:', playlistId);
      return playlistVideoData[playlistId]?.videos || selectedPlaylistVideos;
    }
    setIsLoadingPlaylistVideos(true);
    try {
      const response = await axios.get(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log('GET /api/playlists response:', response.data);
      const playlistData = response.data?.playlist;
      if (!playlistData?._id) {
        throw new Error('Invalid playlist data received from server');
      }
      const videos = Array.isArray(playlistData.videos) ? playlistData.videos : [];
      setPlaylistVideoData((prev) => ({
        ...prev,
        [playlistId]: {
          videos,
          videoCount: videos.length,
          thumbnail: videos.length > 0 ? videos[0].thumbnail : '/placeholder-image.jpg',
        },
      }));
      setSelectedPlaylistVideos(videos);
      setSelectedPlaylistId(playlistId);
      setErrorMessage('');
      setErrorShown(false);
      return videos;
    } catch (error) {
      console.error('Error fetching playlist by ID:', error.response?.data || error.message);
      if (!errorShown) {
        setErrorMessage(error.response?.data?.error || 'Failed to load playlist videos. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.error || 'Failed to load playlist videos. Please try again.',
        });
        setErrorShown(true);
      }
      setSelectedPlaylistVideos([]);
      return [];
    } finally {
      setIsLoadingPlaylistVideos(false);
    }
  }, [user, selectedPlaylistId, selectedPlaylistVideos, playlistVideoData, errorShown]);

  // Create or update a playlist
const handleCreateOrUpdatePlaylist = async () => {
  if (!newPlaylist.name.trim()) {
    setErrorMessage('Playlist name is required.');
    // Remove Swal.fire to avoid duplicate alerts
    return Promise.reject(new Error('Playlist name is required.'));
  }
  try {
    setIsLoadingPlaylists(true);
    const payload = {
      name: newPlaylist.name,
      description: newPlaylist.description,
      visibility: newPlaylist.visibility,
    };
    let playlistId;
    if (editingPlaylist) {
      const response = await axios.put(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${editingPlaylist._id}`,
        payload,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log('PUT /api/playlists response:', response.data);
      setPlaylists((prev) => prev.map((p) => (p._id === editingPlaylist._id ? { ...p, ...response.data.playlist } : p)));
      setNewPlaylist({ name: '', description: '', visibility: 'public' });
      setEditingPlaylist(null);
      setSelectedPlaylistId(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Playlist updated successfully!',
      });
    } else {
      const response = await axios.post(
        'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists',
        payload,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log('POST /api/playlists response:', response.data);
      const newPlaylistData = response.data?.playlist;
      if (!newPlaylistData?._id) {
        throw new Error('Invalid playlist data received from server');
      }
      playlistId = newPlaylistData._id;
      setNewPlaylistId(playlistId);
      setNewPlaylist({ name: '', description: '', visibility: 'public' });
      let retries = 3;
      let playlistsData = [];
      while (retries > 0) {
        const updatedResponse = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/user/${user._id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log('GET /api/playlists/user retry response:', updatedResponse.data);
        playlistsData = Array.isArray(updatedResponse.data.playlists) ? updatedResponse.data.playlists : [];
        if (playlistsData.some((p) => p._id === playlistId)) {
          break;
        }
        retries--;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (playlistsData.length === 0 && retries === 0) {
        console.warn('Falling back to manual playlist addition');
        setPlaylists((prev) => [...prev, newPlaylistData]);
      } else {
        setPlaylists(playlistsData);
      }
      setSelectedPlaylistId(playlistId);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Playlist created successfully!',
      });
    }
    setErrorMessage('');
    setErrorShown(false);
    return Promise.resolve();
  } catch (error) {
    console.error('Error creating/updating playlist:', error.response?.data || error.message);
    setErrorMessage(error.response?.data?.error || 'Failed to create/update playlist. Please try again.');
    // Only show Swal.fire for edit errors, not creation (handled in modal)
    if (editingPlaylist && !errorShown) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Failed to create/update playlist. Please try again.',
      });
      setErrorShown(true);
    }
    return Promise.reject(error);
  } finally {
    setIsLoadingPlaylists(false);
  }
};

  // Delete a playlist
  const handleDeletePlaylist = async (playlistId) => {
    if (!playlistId) {
      if (!errorShown) {
        setErrorMessage('Invalid playlist ID.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid playlist ID.',
        });
        setErrorShown(true);
      }
      return Promise.reject(new Error('Invalid playlist ID.'));
    }
    if (!window.confirm('Are you sure you want to delete this playlist?')) {
      return Promise.resolve();
    }
    try {
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
      if (selectedPlaylistId === playlistId) {
        setSelectedPlaylistId(null);
        setSelectedPlaylistVideos([]);
      }
      setPlaylistVideoData((prev) => {
        const { [playlistId]: _, ...rest } = prev;
        return rest;
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Playlist deleted successfully!',
      });
      setErrorMessage('');
      setErrorShown(false);
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting playlist:', error.response?.data || error.message);
      if (!errorShown) {
        setErrorMessage(error.response?.data?.error || 'Failed to delete playlist. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.error || 'Failed to delete playlist. Please try again.',
        });
        setErrorShown(true);
      }
      return Promise.reject(error);
    }
  };

  // Add video to playlist
  const handleAddVideoToPlaylist = async (playlistId, contentId) => {
    if (!playlistId || !contentId) {
      if (!errorShown) {
        setErrorMessage('Invalid playlist or video ID.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid playlist or video ID.',
        });
        setErrorShown(true);
      }
      return Promise.reject(new Error('Invalid playlist or video ID.'));
    }
    try {
      const playlistExists = playlists.find((p) => p._id === playlistId);
      if (!playlistExists) {
        if (!errorShown) {
          setErrorMessage('Playlist not found.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Playlist not found.',
          });
          setErrorShown(true);
        }
        return Promise.reject(new Error('Playlist not found.'));
      }
      await axios.post(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}/videos/${contentId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const playlistResponse = await axios.get(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (!playlistResponse.data?.playlist?._id) {
        throw new Error('Invalid playlist data received from server');
      }
      const videos = Array.isArray(playlistResponse.data.playlist.videos) ? playlistResponse.data.playlist.videos : [];
      setPlaylists((prev) => prev.map((p) => (p._id === playlistId ? playlistResponse.data.playlist : p)));
      if (selectedPlaylistId === playlistId) {
        setSelectedPlaylistVideos(videos);
      }
      setPlaylistVideoData((prev) => ({
        ...prev,
        [playlistId]: {
          videos,
          videoCount: videos.length,
          thumbnail: videos.length > 0 ? videos[0].thumbnail : '/placeholder-image.jpg',
        },
      }));
      setErrorMessage('');
      setErrorShown(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Video added to playlist successfully!',
      });
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding video to playlist:', error.response?.data || error.message);
      if (!errorShown) {
        setErrorMessage(error.response?.data?.error || 'Failed to add video to playlist. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.error || 'Failed to add video to playlist. Please try again.',
        });
        setErrorShown(true);
      }
      return Promise.reject(error);
    }
  };

  // Remove video from playlist
  const handleRemoveVideoFromPlaylist = async (playlistId, contentId) => {
    if (!playlistId || !contentId) {
      if (!errorShown) {
        setErrorMessage('Invalid playlist or video ID.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid playlist or video ID.',
        });
        setErrorShown(true);
      }
      return Promise.reject(new Error('Invalid playlist or video ID.'));
    }
    if (!window.confirm('Are you sure you want to remove this video from the playlist?')) {
      return Promise.resolve();
    }
    try {
      const playlistExists = playlists.find((p) => p._id === playlistId);
      if (!playlistExists) {
        if (!errorShown) {
          setErrorMessage('Playlist not found.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Playlist not found.',
          });
          setErrorShown(true);
        }
        return Promise.reject(new Error('Playlist not found.'));
      }
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}/videos/${contentId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPlaylists((prev) =>
        prev.map((p) =>
          p._id === playlistId
            ? {
                ...p,
                videos: Array.isArray(p.videos) ? p.videos.filter((v) => v._id !== contentId) : [],
              }
            : p
        )
      );
      if (selectedPlaylistId === playlistId) {
        setSelectedPlaylistVideos((prev) => (Array.isArray(prev) ? prev.filter((v) => v._id !== contentId) : []));
      }
      setPlaylistVideoData((prev) => {
        const videos = prev[playlistId]?.videos.filter((v) => v._id !== contentId) || [];
        return {
          ...prev,
          [playlistId]: {
            videos,
            videoCount: videos.length,
            thumbnail: videos.length > 0 ? videos[0].thumbnail : '/placeholder-image.jpg',
          },
        };
      });
      setErrorMessage('');
      setErrorShown(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Video removed from playlist successfully!',
      });
      return Promise.resolve();
    } catch (error) {
      console.error('Error removing video from playlist:', error.response?.data || error.message);
      if (!errorShown) {
        setErrorMessage(error.response?.data?.error || 'Failed to remove video from playlist. Please try again.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.error || 'Failed to remove video from playlist. Please try again.',
        });
        setErrorShown(true);
      }
      return Promise.reject(error);
    }
  };

  return {
    playlists,
    isLoadingPlaylists,
    newPlaylist,
    setNewPlaylist,
    editingPlaylist,
    setEditingPlaylist,
    selectedPlaylistId,
    setSelectedPlaylistId,
    newPlaylistId,
    setNewPlaylistId,
    availableVideos,
    handleCreateOrUpdatePlaylist: debounce(handleCreateOrUpdatePlaylist, 300),
    handleDeletePlaylist,
    handleAddVideoToPlaylist,
    handleRemoveVideoFromPlaylist,
    errorMessage,
    fetchPlaylistById: debounce(fetchPlaylistById, 300),
    selectedPlaylistVideos,
    isLoadingPlaylistVideos,
    playlistVideoData,
  };
};

export default usePlaylists;