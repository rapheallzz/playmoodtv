import React, { useEffect, useState } from 'react';
import { StlyedCommunitySection, PlaylistCard, NoPostsMessage } from '../../styles/CreatorPageStyles';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

// Styled component for the thumbnail
const PlaylistThumbnail = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 10px;
`;

const PlaylistSection = ({
  playlists,
  isLoadingPlaylists,
  handleEditPlaylist,
  handleDeletePlaylist,
  handleOpenAddVideoModal,
  handleRemoveVideoFromPlaylist,
  handleOpenModal,
  errorMessage,
  fetchPlaylistById,
  selectedPlaylistId,
  selectedPlaylistVideos,
}) => {
  // Local state to track loading and cached video data for each playlist
  const [playlistVideoData, setPlaylistVideoData] = useState({});

  // Fetch video data for playlists when component mounts or playlists change
  useEffect(() => {
    const fetchMissingData = async () => {
      for (const playlist of playlists) {
        if (!playlistVideoData[playlist._id] && !playlist.videoCount && !playlist.thumbnail) {
          try {
            const videos = await fetchPlaylistById(playlist._id);
            setPlaylistVideoData((prev) => ({
              ...prev,
              [playlist._id]: {
                videoCount: Array.isArray(videos) ? videos.length : 0,
                thumbnail: Array.isArray(videos) && videos.length > 0 ? videos[0].thumbnail : '/placeholder-image.jpg',
              },
            }));
          } catch (error) {
            // Errors are handled in fetchPlaylistById; avoid setting state here
          }
        }
      }
    };

    if (playlists.length > 0) {
      fetchMissingData();
    }
  }, [playlists, fetchPlaylistById, playlistVideoData]);

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
            const isSelected = selectedPlaylistId === playlist._id;
            const videoCount = isSelected && Array.isArray(selectedPlaylistVideos)
              ? selectedPlaylistVideos.length
              : playlistVideoData[playlist._id]?.videoCount || playlist.videoCount || 0;
            const thumbnail = isSelected && Array.isArray(selectedPlaylistVideos) && selectedPlaylistVideos.length > 0
              ? selectedPlaylistVideos[0].thumbnail
              : playlistVideoData[playlist._id]?.thumbnail || playlist.thumbnail || '/placeholder-image.jpg';

            return (
              <PlaylistCard
                key={playlist._id}
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
                      aria-label="Edit Playlist"
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlaylist(playlist._id);
                      }}
                      title="Delete Playlist"
                      aria-label="Delete Playlist"
                    />
                    <FaPlus
                      className="add-video-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAddVideoModal(playlist._id);
                      }}
                      title="Add Video"
                      aria-label="Add Video to Playlist"
                    />
                  </div>
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