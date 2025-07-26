import React from 'react';
import { Modal, PlaylistModal, ModalTitle, NoPostsMessage, ModalButtons, ModalButtonCancel, ModalButtonSubmit } from '../../styles/CreatorPageStyles';

const AddVideoModal = ({
  playlists,
  selectedPlaylistId,
  setSelectedPlaylistId,
  availableVideos,
  handleAddVideoToPlaylist,
  isLoadingPlaylists,
  newPlaylistId,
  onClose,
  errorMessage,
}) => (
  <Modal>
    <PlaylistModal>
      <ModalTitle>Add Video to Playlist</ModalTitle>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      {isLoadingPlaylists ? (
        <NoPostsMessage>Loading playlists...</NoPostsMessage>
      ) : !Array.isArray(playlists) || playlists.length === 0 ? (
        <NoPostsMessage>No playlists available. Please create a playlist first.</NoPostsMessage>
      ) : (
        <>
          <label>
            Select Playlist:
            <select
              value={selectedPlaylistId || ''}
              onChange={(e) => setSelectedPlaylistId(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              aria-label="Select Playlist"
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </label>
          {selectedPlaylistId ? (
            availableVideos.length === 0 ? (
              <NoPostsMessage>
                No approved videos available to add.
                {newPlaylistId ? ' You can skip adding a video, but the playlist will be discarded.' : ''}
              </NoPostsMessage>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {availableVideos.map((video) => (
                  <div key={video._id} style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{ width: '100px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
                      onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                    />
                    <div style={{ flex: 1 }}>
                      <div>{video.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#999' }}>{video.description}</div>
                    </div>
                    <ModalButtonSubmit
                      onClick={() => handleAddVideoToPlaylist(selectedPlaylistId, video._id).then(() => onClose())}
                      style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                      aria-label={`Add ${video.title} to Playlist`}
                    >
                      Add
                    </ModalButtonSubmit>
                  </div>
                ))}
              </div>
            )
          ) : (
            <NoPostsMessage>Please select a playlist to add videos to.</NoPostsMessage>
          )}
        </>
      )}
      <ModalButtons>
        <ModalButtonCancel onClick={onClose} aria-label="Cancel">
          Cancel
        </ModalButtonCancel>
        {availableVideos.length === 0 && !newPlaylistId && (
          <ModalButtonSubmit onClick={onClose} aria-label="Close">
            Close
          </ModalButtonSubmit>
        )}
      </ModalButtons>
    </PlaylistModal>
  </Modal>
);

export default AddVideoModal;