import React from 'react';
import { Modal, StyledPlaylistModal, ModalTitle, ModalTextarea, ModalButtons, ModalButtonCancel, ModalButtonSubmit, NoPostsMessage } from '../../styles/CreatorPageStyles';
import styled from 'styled-components';

// Styled component for loading indicator
const LoadingSpinner = styled.div`
  display: inline-block;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-left: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CreatePlaylistModal = ({
  newPlaylist,
  setNewPlaylist,
  handleCreateOrUpdatePlaylist,
  isLoadingPlaylists,
  closeAllModals,
  errorMessage,
  setErrorMessage,
}) => {
  const handleSubmit = async () => {
    setErrorMessage(''); // Clear previous errors
    const result = await handleCreateOrUpdatePlaylist();
    if (result.success) {
      closeAllModals();
    }
    // Error is handled by the errorMessage state
  };

  return (
    <Modal>
      <StyledPlaylistModal>
        <ModalTitle>Create Playlist</ModalTitle>
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
              disabled={isLoadingPlaylists}
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
              disabled={isLoadingPlaylists}
            />
          </label>
          <label>
            Visibility:
            <select
              value={newPlaylist.visibility}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, visibility: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              aria-label="Playlist Visibility"
              disabled={isLoadingPlaylists}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
        {errorMessage && <NoPostsMessage style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</NoPostsMessage>}
        <ModalButtons>
          <ModalButtonCancel
            onClick={closeAllModals}
            aria-label="Cancel"
            disabled={isLoadingPlaylists}
          >
            Cancel
          </ModalButtonCancel>
          <ModalButtonSubmit
            onClick={handleSubmit}
            disabled={!newPlaylist.name.trim() || isLoadingPlaylists}
            aria-label="Create Playlist"
          >
            {isLoadingPlaylists ? (
              <>
                Saving
                <LoadingSpinner />
              </>
            ) : (
              'Create'
            )}
          </ModalButtonSubmit>
        </ModalButtons>
      </StyledPlaylistModal>
    </Modal>
  );
};

export default CreatePlaylistModal;