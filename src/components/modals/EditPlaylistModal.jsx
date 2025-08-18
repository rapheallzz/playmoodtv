import React, { useEffect, useState, useMemo } from 'react';
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

const ActionButton = styled.button`
  padding: 5px 10px;
  font-size: 0.8rem;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ actionType }) => actionType === 'add' ? '#007bff' : '#ff4d4d'};
  &:hover {
    background-color: ${({ actionType }) => actionType === 'add' ? '#0056b3' : '#cc0000'};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
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
  fetchAvailableVideos,
  errorMessage,
  setErrorMessage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (editingPlaylist?._id) {
      fetchPlaylistById(editingPlaylist._id);
      fetchAvailableVideos();
    }
  }, [editingPlaylist, fetchPlaylistById, fetchAvailableVideos]);

  const handleSubmit = async () => {
    const result = await handleCreateOrUpdatePlaylist();
    if (result.success) {
      closeAllModals();
    }
    // Error is handled by the errorMessage state in the component
  };

  const filteredAvailableVideos = useMemo(() => {
    const currentVideoIds = new Set(selectedPlaylistVideos.map(v => v._id));
    return availableVideos.filter(video =>
      !currentVideoIds.has(video._id) &&
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableVideos, selectedPlaylistVideos, searchTerm]);

  return (
    <Modal>
      <StyledPlaylistModal
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          maxWidth: '700px',
          width: '90%',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <ModalTitle>Edit Playlist</ModalTitle>
        {errorMessage && <NoPostsMessage style={{ color: 'red' }}>{errorMessage}</NoPostsMessage>}

        {/* Playlist Details Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
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

        {/* Current Videos Section */}
        <ModalTitle style={{ marginTop: '20px' }}>Playlist Videos</ModalTitle>
        {isLoadingPlaylistVideos ? (
          <NoPostsMessage>Loading videos...</NoPostsMessage>
        ) : selectedPlaylistVideos.length > 0 ? (
          <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '15px', border: '1px solid #eee' }}>
            {selectedPlaylistVideos.map((video) => (
              <VideoItem key={video._id}>
                <VideoThumbnail src={video.thumbnail} alt={video.title} onError={(e) => { e.target.src = '/placeholder-image.jpg'; }} />
                <VideoInfo><div>{video.title}</div></VideoInfo>
                <ActionButton actionType="remove" onClick={() => handleRemoveVideoFromPlaylist(editingPlaylist._id, video._id)}>Remove</ActionButton>
              </VideoItem>
            ))}
          </div>
        ) : (
          <NoPostsMessage>No videos in this playlist yet.</NoPostsMessage>
        )}

        {/* Add Videos Section */}
        <ModalTitle style={{ marginTop: '20px' }}>Add Videos to Playlist</ModalTitle>
        <SearchInput
          type="text"
          placeholder="Search your videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #eee' }}>
          {filteredAvailableVideos.length > 0 ? (
            filteredAvailableVideos.map((video) => (
              <VideoItem key={video._id}>
                <VideoThumbnail src={video.thumbnail} alt={video.title} onError={(e) => { e.target.src = '/placeholder-image.jpg'; }} />
                <VideoInfo><div>{video.title}</div></VideoInfo>
                <ActionButton actionType="add" onClick={() => handleAddVideoToPlaylist(editingPlaylist._id, video._id)}>Add</ActionButton>
              </VideoItem>
            ))
          ) : (
            <NoPostsMessage>No more videos to add.</NoPostsMessage>
          )}
        </div>

        <ModalButtons>
          <ModalButtonCancel onClick={closeAllModals}>Cancel</ModalButtonCancel>
          <ModalButtonSubmit
            onClick={handleSubmit}
            disabled={!newPlaylist.name.trim() || isLoadingPlaylists}
          >
            {isLoadingPlaylists ? 'Saving...' : 'Save Changes'}
          </ModalButtonSubmit>
        </ModalButtons>
      </StyledPlaylistModal>
    </Modal>
  );
};

export default EditPlaylistModal;