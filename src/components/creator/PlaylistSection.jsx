import React, { useState, useEffect } from 'react';
import { StlyedCommunitySection, PlaylistCard, NoPostsMessage } from '../../styles/CreatorPageStyles';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const PlaylistThumbnail = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 10px;
`;

const DeleteConfirmation = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  & > button {
    margin-left: 10px;
    padding: 3px 8px;
    cursor: pointer;
  }
`;

const PlaylistSection = ({
  playlists,
  isLoadingPlaylists,
  handleEditPlaylist,
  handleDeletePlaylist,
  errorMessage,
  fetchPlaylistById,
  selectedPlaylistId,
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteClick = (e, playlistId) => {
    e.stopPropagation();
    setConfirmDeleteId(playlistId);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setConfirmDeleteId(null);
  };

  const confirmDelete = (e, playlistId) => {
    e.stopPropagation();
    handleDeletePlaylist(playlistId);
    setConfirmDeleteId(null);
  };

  return (
    <StlyedCommunitySection>
      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      {isLoadingPlaylists ? (
        <NoPostsMessage>Loading playlists...</NoPostsMessage>
      ) : !Array.isArray(playlists) || playlists.length === 0 ? (
        <NoPostsMessage>No playlists yet. Create one to get started!</NoPostsMessage>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {playlists.map((playlist) => {
            const videoCount = Array.isArray(playlist.videos) ? playlist.videos.length : 0;
            const thumbnail = videoCount > 0 ? playlist.videos[0].thumbnail : '/placeholder-image.jpg';

            return (
              <PlaylistCard
                key={playlist._id}
                data-testid="playlist-card"
                onClick={() => fetchPlaylistById(playlist._id)}
                style={{
                  cursor: 'pointer',
                  border: selectedPlaylistId === playlist._id ? '2px solid #007bff' : '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="playlist-title">{playlist.name}</div>
                  <div className="playlist-description">{playlist.description || 'No description'}</div>
                  <div className="playlist-visibility">Visibility: {playlist.visibility}</div>
                  <div className="playlist-video-count">Videos: {videoCount}</div>
                  <div className="playlist-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <FaEdit
                      className="edit-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditPlaylist(playlist);
                      }}
                      title="Edit Playlist"
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={(e) => handleDeleteClick(e, playlist._id)}
                      title="Delete Playlist"
                    />
                  </div>
                  {confirmDeleteId === playlist._id && (
                    <DeleteConfirmation>
                      Are you sure?
                      <button onClick={(e) => confirmDelete(e, playlist._id)}>Yes</button>
                      <button onClick={cancelDelete}>No</button>
                    </DeleteConfirmation>
                  )}
                </div>
                {videoCount > 0 && (
                  <PlaylistThumbnail
                    src={thumbnail}
                    alt={`${playlist.name} thumbnail`}
                    onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
                  />
                )}
              </PlaylistCard>
            );
          })}
        </div>
      )}
    </StlyedCommunitySection>
  );
};

export default PlaylistSection;