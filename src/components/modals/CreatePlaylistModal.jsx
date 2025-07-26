import React, { useState } from 'react';
import { Modal, StyledPlaylistModal, ModalTitle, ModalTextarea, ModalButtons, ModalButtonCancel, ModalButtonSubmit } from '../../styles/CreatorPageStyles';
import styled from 'styled-components';

// Styled component for error message
const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;

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
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  console.log('Rendering CreatePlaylistModal');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(''); // Clear previous errors
    try {
      console.log('Submitting create playlist');
      await handleCreateOrUpdatePlaylist(); // Wait for the promise to resolve
      console.log('Playlist creation successful');
      closeAllModals(); // Close modal only on success
    } catch (error) {
      console.error('Playlist creation failed:', error);
      setError(error.message || 'Failed to create playlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting || isLoadingPlaylists}
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
              disabled={isSubmitting || isLoadingPlaylists}
            />
          </label>
          <label>
            Visibility:
            <select
              value={newPlaylist.visibility}
              onChange={(e) => setNewPlaylist({ ...newPlaylist, visibility: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              aria-label="Playlist Visibility"
              disabled={isSubmitting || isLoadingPlaylists}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ModalButtons>
          <ModalButtonCancel
            onClick={closeAllModals}
            aria-label="Cancel"
            disabled={isSubmitting || isLoadingPlaylists}
          >
            Cancel
          </ModalButtonCancel>
          <ModalButtonSubmit
            onClick={handleSubmit}
            disabled={!newPlaylist.name.trim() || isSubmitting || isLoadingPlaylists}
            aria-label="Create Playlist"
          >
            {isSubmitting || isLoadingPlaylists ? (
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