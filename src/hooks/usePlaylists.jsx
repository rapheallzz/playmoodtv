import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const usePlaylists = (user) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', description: '', visibility: 'public' });
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [availableVideos, setAvailableVideos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPlaylistVideos, setSelectedPlaylistVideos] = useState([]);
  const [isLoadingPlaylistVideos, setIsLoadingPlaylistVideos] = useState(false);

  // Fetch all user's playlists
  const fetchPlaylists = useCallback(async () => {
    if (!user?._id || !user.token) {
      setErrorMessage('User not authenticated.');
      return;
    }
    setIsLoadingPlaylists(true);
    try {
      const response = await axios.get(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/user/${user._id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const playlistsData = Array.isArray(response.data.playlists) ? response.data.playlists : [];
      setPlaylists(playlistsData);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching playlists:', error.response?.data || error.message);
      setErrorMessage('Failed to load playlists.');
      setPlaylists([]);
    } finally {
      setIsLoadingPlaylists(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  // Fetch a single playlist's details (including videos)
  const fetchPlaylistById = useCallback(async (playlistId) => {
    if (!playlistId) return;
    setIsLoadingPlaylistVideos(true);
    try {
      const response = await axios.get(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const playlistData = response.data?.playlist;
      const videos = Array.isArray(playlistData.videos) ? playlistData.videos : [];
      setSelectedPlaylistVideos(videos);
      setSelectedPlaylistId(playlistId);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching playlist by ID:', error.response?.data || error.message);
      setErrorMessage('Failed to load playlist videos.');
      setSelectedPlaylistVideos([]);
    } finally {
      setIsLoadingPlaylistVideos(false);
    }
  }, [user]);

  // Fetch all of the user's approved videos
  const fetchAvailableVideos = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/my-channel/${user._id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setAvailableVideos(response.data.content.filter(video => video.isApproved) || []);
    } catch (error) {
      console.error('Error fetching available videos:', error.response?.data || error.message);
      setErrorMessage('Failed to load available videos.');
    }
  }, [user]);

  // Create or update a playlist
  const handleCreateOrUpdatePlaylist = async () => {
    if (!newPlaylist.name.trim()) {
      setErrorMessage('Playlist name is required.');
      return { success: false, error: 'Playlist name is required.' };
    }
    const originalPlaylists = [...playlists];
    try {
      setIsLoadingPlaylists(true);
      const payload = {
        name: newPlaylist.name,
        description: newPlaylist.description,
        visibility: newPlaylist.visibility,
      };

      if (editingPlaylist) {
        // Optimistic update for edit
        setPlaylists((prev) =>
          prev.map((p) => (p._id === editingPlaylist._id ? { ...p, ...payload } : p))
        );
        await axios.put(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${editingPlaylist._id}`,
          payload,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } else {
        // Optimistic update for create
        const tempId = `temp-${Date.now()}`;
        const newPlaylistData = { ...payload, _id: tempId, videos: [] };
        setPlaylists((prev) => [...prev, newPlaylistData]);
        const response = await axios.post(
          'https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists',
          payload,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        // Replace temp playlist with real one from server
        const newPlaylistFromServer = response.data.playlist;
        setPlaylists((prev) =>
          prev.map((p) => (p._id === tempId ? newPlaylistFromServer : p))
        );
        return { success: true, playlist: newPlaylistFromServer };
      }
      setErrorMessage('');
      return { success: true };
    } catch (error) {
      console.error('Error creating/updating playlist:', error.response?.data || error.message);
      setPlaylists(originalPlaylists); // Revert on error
      const errorMsg = error.response?.data?.error || 'Failed to save playlist.';
      setErrorMessage(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoadingPlaylists(false);
    }
  };

  // Delete a playlist
  const handleDeletePlaylist = async (playlistId) => {
    const originalPlaylists = [...playlists];
    // Optimistic delete
    setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistId(null);
      setSelectedPlaylistVideos([]);
    }
    try {
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      return { success: true };
    } catch (error) {
      console.error('Error deleting playlist:', error.response?.data || error.message);
      setPlaylists(originalPlaylists); // Revert on error
      const errorMsg = error.response?.data?.error || 'Failed to delete playlist.';
      setErrorMessage(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Add video to playlist
  const handleAddVideoToPlaylist = async (playlistId, contentId) => {
    const originalPlaylists = [...playlists];
    const originalSelectedVideos = [...selectedPlaylistVideos];
    const videoToAdd = availableVideos.find(v => v._id === contentId);

    if (!videoToAdd) {
      const errorMsg = 'Video not found.';
      setErrorMessage(errorMsg);
      return { success: false, error: errorMsg };
    }

    // Optimistic update
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistVideos(prev => [...prev, videoToAdd]);
    }
    setPlaylists(prev => prev.map(p => p._id === playlistId ? { ...p, videos: [...(p.videos || []), videoToAdd] } : p));

    try {
      await axios.post(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}/videos/${contentId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
       // Optionally, refetch the playlist to get the most up-to-date state
      fetchPlaylistById(playlistId);
      return { success: true };
    } catch (error) {
      console.error('Error adding video to playlist:', error.response?.data || error.message);
      setPlaylists(originalPlaylists); // Revert on error
      setSelectedPlaylistVideos(originalSelectedVideos); // Revert on error
      const errorMsg = error.response?.data?.error || 'Failed to add video.';
      setErrorMessage(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Remove video from playlist
  const handleRemoveVideoFromPlaylist = async (playlistId, contentId) => {
    const originalPlaylists = [...playlists];
    const originalSelectedVideos = [...selectedPlaylistVideos];

    // Optimistic update
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistVideos(prev => prev.filter(v => v._id !== contentId));
    }
     setPlaylists(prev => prev.map(p => p._id === playlistId ? { ...p, videos: p.videos.filter(v => v._id !== contentId) } : p));


    try {
      await axios.delete(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/${playlistId}/videos/${contentId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      return { success: true };
    } catch (error) {
      console.error('Error removing video from playlist:', error.response?.data || error.message);
      setPlaylists(originalPlaylists); // Revert on error
      setSelectedPlaylistVideos(originalSelectedVideos); // Revert on error
      const errorMsg = error.response?.data?.error || 'Failed to remove video.';
      setErrorMessage(errorMsg);
      return { success: false, error: errorMsg };
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
    availableVideos,
    fetchAvailableVideos,
    handleCreateOrUpdatePlaylist,
    handleDeletePlaylist,
    handleAddVideoToPlaylist,
    handleRemoveVideoFromPlaylist,
    errorMessage,
    setErrorMessage,
    fetchPlaylistById,
    selectedPlaylistVideos,
    isLoadingPlaylistVideos,
  };
};

export default usePlaylists;