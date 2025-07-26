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

const PlaylistModal = ({
  newPlaylist,
  setNewPlaylist,
  editingPlaylist,
  handleCreateOrUpdatePlaylist,
  isLoadingPlaylists,
  onClose,
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
      onClose(); // Close PlaylistModal before opening AddVideoModal
    }
  };

  console.log('Rendering PlaylistModal, mode:', editingPlaylist ? 'Edit' : 'Create', 'videos:', selectedPlaylistVideos);

  return (
    <Modal>
      <StyledPlaylistModal>
        <ModalTitle>{editingPlaylist ? 'Edit Playlist' : 'Create Playlist'}</ModalTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>
            Name:
            <input
              type="text"
              value={newPlaylist.name}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
              placeholder="Playlist Name"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
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
              aria-label="Playlist Description"
            />
          </label>
          <label>
            Visibility:
            <select
              value={newPlaylist.visibility}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, visibility: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              aria-label="Playlist Visibility"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>

        {editingPlaylist && (
          <>
            <ModalTitle style={{ marginTop: '20px' }}>Playlist Videos</ModalTitle>
            {isLoadingPlaylistVideos ? (
              <NoPostsMessage>Loading videos...</NoPostsMessage>
            ) : Array.isArray(selectedPlaylistVideos) && selectedPlaylistVideos.length > 0 ? (
              <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
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
          </>
        )}

        <ModalButtons>
          <ModalButtonCancel onClick={onClose} aria-label="Cancel">
            Cancel
          </ModalButtonCancel>
          <ModalButtonSubmit
            onClick={() => {
              console.log('Submitting playlist, mode:', editingPlaylist ? 'Edit' : 'Create');
              handleCreateOrUpdatePlaylist().then(() => {
                console.log('Playlist update/create successful, closing modal');
                onClose();
              }).catch((error) => {
                console.error('Playlist update/create failed:', error);
              });
            }}
            disabled={!newPlaylist.name.trim() || isLoadingPlaylists}
            aria-label={editingPlaylist ? 'Save Playlist' : 'Create Playlist'}
          >
            {isLoadingPlaylists ? 'Saving...' : editingPlaylist ? 'Save' : 'Create'}
          </ModalButtonSubmit>
        </ModalButtons>
      </StyledPlaylistModal>
    </Modal>
  );
};

export default PlaylistModal;