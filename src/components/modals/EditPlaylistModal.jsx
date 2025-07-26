import React, { useEffect, useRef } from 'react';
import { Modal, StyledPlaylistModal, ModalTitle, ModalTextarea, ModalButtons, ModalButtonCancel, ModalButtonSubmit, NoPostsMessage } from '../../styles/CreatorPageStyles';
import styled from 'styled-components';

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const VideoThumbnail = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
`;

const VideoInfo = styled.div`
  flex: 1;
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  font-size: 0.8rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

const AddVideoButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const EditPlaylistModal = ({
  newPlaylist,
  setNewPlaylist,
  editingPlaylist,
  handleCreateOrUpdatePlaylist,
  isLoadingPlaylists,
  closeAllModals,
  fetchPlaylistById,
  selectedPlaylistVideos,
  isLoadingPlaylistVideos,
  handleAddVideoToPlaylist,
  handleRemoveVideoFromPlaylist,
  availableVideos,
  selectedPlaylistId,
  setShowAddVideoModal,
  setSelectedPlaylistId,
}) => {
  const hasFetched = useRef(false);

  useEffect(() => {
    if (editingPlaylist && editingPlaylist._id && !hasFetched.current) {
      console.log('Fetching playlist videos for:', editingPlaylist._id);
      hasFetched.current = true;
      fetchPlaylistById(editingPlaylist._id);
    }
    return () => {
      hasFetched.current = false; // Reset on unmount
    };
  }, [editingPlaylist, fetchPlaylistById]);

  const handleAddVideo = () => {
    if (editingPlaylist && editingPlaylist._id) {
      console.log('Opening AddVideoModal for playlist:', editingPlaylist._id);
      setSelectedPlaylistId(editingPlaylist._id);
      setShowAddVideoModal(true);
      closeAllModals();
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting edit playlist');
      await handleCreateOrUpdatePlaylist();
      console.log('Playlist update successful');
      closeAllModals();
    } catch (error) {
      console.error('Playlist update failed:', error);
      // Optionally, display an error message to the user
    }
  };

  console.log('Rendering EditPlaylistModal, videos:', selectedPlaylistVideos);

  return (
    <Modal>
      <StyledPlaylistModal
        style={{
          maxHeight: '70vh', // Limit modal height to 70% of viewport height
          overflowY: 'auto', // Enable vertical scrolling if content overflows
          maxWidth: '600px', // Set a reasonable width
          width: '90%', // Responsive width for smaller screens
          padding: '20px', // Consistent padding
          boxSizing: 'border-box', // Ensure padding doesn't increase size
        }}
      >
        <ModalTitle>Edit Playlist</ModalTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label>
            Name:
            <input
              type="text"
              value={newPlaylist.name}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
              placeholder="Playlist Name"
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
              aria-label="Playlist Name"
            />
          </label>
          <label>
            Description:
            <ModalTextarea
              value={newPlaylist.description}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
              placeholder="Playlist Description"
              rows="4"
              style={{ width: '100%', boxSizing: 'border-box' }}
              aria-label="Playlist Description"
            />
          </label>
          <label>
            Visibility:
            <select
              value={newPlaylist.visibility}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, visibility: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
              aria-label="Playlist Visibility"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>

        <ModalTitle style={{ marginTop: '20px' }}>Playlist Videos</ModalTitle>
        {isLoadingPlaylistVideos ? (
          <NoPostsMessage>Loading videos...</NoPostsMessage>
        ) : Array.isArray(selectedPlaylistVideos) && selectedPlaylistVideos.length > 0 ? (
          <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '15px' }}>
            {selectedPlaylistVideos.map((video) => (
              <VideoItem key={video._id}>
                <VideoThumbnail
                  src={video.thumbnail}
                  alt={video.title}
                  onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                />
                <VideoInfo>
                  <div>{video.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#999' }}>{video.description}</div>
                </VideoInfo>
                <RemoveButton
                  onClick={() => {
                    console.log('Removing video:', video._id, 'from playlist:', editingPlaylist._id);
                    handleRemoveVideoFromPlaylist(editingPlaylist._id, video._id);
                  }}
                  aria-label={`Remove ${video.title} from Playlist`}
                >
                  Remove
                </RemoveButton>
              </VideoItem>
            ))}
          </div>
        ) : (
          <NoPostsMessage>No videos in this playlist.</NoPostsMessage>
        )}
        <AddVideoButton
          onClick={handleAddVideo}
          aria-label="Add Video to Playlist"
        >
          Add Video
        </AddVideoButton>

        <ModalButtons>
          <ModalButtonCancel onClick={closeAllModals} aria-label="Cancel">
            Cancel
          </ModalButtonCancel>
          <ModalButtonSubmit
            onClick={handleSubmit}
            disabled={!newPlaylist.name.trim() || isLoadingPlaylists}
            aria-label="Save Playlist"
          >
            {isLoadingPlaylists ? 'Saving...' : 'Save'}
          </ModalButtonSubmit>
        </ModalButtons>
      </StyledPlaylistModal>
    </Modal>
  );
};

export default EditPlaylistModal;