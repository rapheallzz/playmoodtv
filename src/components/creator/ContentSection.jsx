import React from 'react';
import { StyledContentSection, SectionTitle, SubTabNav, SubTabButton, NoPostsMessage, VideoGrid } from '../../styles/CreatorPageStyles';
import PlaylistSection from './PlaylistSection';
import CommunitySection from './CommunitySection';
import CreatorVideoCard from './CreatorVideoCard';
import ContentModal from '../ContentModal';

const ContentSection = ({
  activeTab,
  activeSubTab,
  setActiveSubTab,
  data,
  communityPosts,
  isLoadingPosts,
  playlists,
  isLoadingPlaylists,
  user,
  handleOpenModal,
  handleOpenContentModal,
  handleCardClick,
  handleEditPlaylist,
  handleDeletePlaylist,
  handleRemoveVideoFromPlaylist,
  handleLikePost,
  handleDeletePost,
  setShowEditPostModal,
  setEditingPostId,
  setEditPostContent,
  newComment,
  setNewComment,
  handleAddComment,
  handleDeleteComment,
  errorMessage,
  fetchPlaylistById,
  selectedPlaylistId,
  selectedPlaylistVideos,
  isLoadingPlaylistVideos,
}) => {
  const approvedVideos = data.filter(content => content.isApproved === true && content.video);
  const pendingVideos = [...new Map(data.filter(content => content.isApproved === false && content.video).map(item => [item._id, item])).values()];

  return (
    <StyledContentSection>
      <SectionTitle>{activeTab === 'Uploads' ? 'Your Uploads' : activeTab === 'Playlist' ? 'Your Playlists' : 'Community Posts'}</SectionTitle>
      {activeTab === 'Uploads' ? (
        <>
          <SubTabNav>
            <SubTabButton
              className={activeSubTab === 'Approved' ? 'active' : ''}
              onClick={() => setActiveSubTab('Approved')}
              aria-label="Approved Videos"
            >
              Approved
            </SubTabButton>
            <SubTabButton
              className={activeSubTab === 'Pending' ? 'active' : ''}
              onClick={() => setActiveSubTab('Pending')}
              aria-label="Pending Videos"
            >
              Pending
            </SubTabButton>
          </SubTabNav>
          <div className="w-full">
            {activeSubTab === 'Approved' ? (
              approvedVideos.length === 0 ? (
                <NoPostsMessage>No approved videos yet.</NoPostsMessage>
              ) : (
                <VideoGrid>
                  {approvedVideos.map((content) => (
                    <CreatorVideoCard
                      key={content._id}
                      movie={content}
                      onClick={() => handleOpenContentModal(content)}
                      onEdit={handleOpenModal}
                    />
                  ))}
                </VideoGrid>
              )
            ) : (
              pendingVideos.length === 0 ? (
                <NoPostsMessage>No pending videos yet.</NoPostsMessage>
              ) : (
                <VideoGrid>
                  {pendingVideos.map((content) => (
                    <CreatorVideoCard
                      key={content._id}
                      movie={content}
                      onClick={() => handleOpenContentModal(content)}
                      onEdit={handleOpenModal}
                    />
                  ))}
                </VideoGrid>
              )
            )}
          </div>
        </>
      ) : activeTab === 'Playlist' ? (
        <>
          <PlaylistSection
            playlists={playlists}
            isLoadingPlaylists={isLoadingPlaylists}
            handleEditPlaylist={handleEditPlaylist}
            handleDeletePlaylist={handleDeletePlaylist}
            handleRemoveVideoFromPlaylist={handleRemoveVideoFromPlaylist}
            handleOpenModal={handleOpenModal}
            errorMessage={errorMessage}
            fetchPlaylistById={fetchPlaylistById}
            selectedPlaylistId={selectedPlaylistId}
          />
          {selectedPlaylistId && (
            <div className="w-full">
              <SectionTitle>Playlist Videos</SectionTitle>
              {isLoadingPlaylistVideos ? (
                <NoPostsMessage>Loading videos...</NoPostsMessage>
              ) : Array.isArray(selectedPlaylistVideos) && selectedPlaylistVideos.length > 0 ? (
                <VideoGrid>
                  {selectedPlaylistVideos.map((video) => (
                    <CreatorVideoCard
                      key={video._id}
                      movie={video}
                      onClick={() => handleOpenContentModal(video)}
                      onEdit={handleOpenModal}
                    />
                  ))}
                </VideoGrid>
              ) : (
                <NoPostsMessage>No videos in this playlist.</NoPostsMessage>
              )}
            </div>
          )}
        </>
      ) : (
        <CommunitySection
          communityPosts={communityPosts}
          isLoadingPosts={isLoadingPosts}
          user={user}
          handleLikePost={handleLikePost}
          handleDeletePost={handleDeletePost}
          setShowEditPostModal={setShowEditPostModal}
          setEditingPostId={setEditingPostId}
          setEditPostContent={setEditPostContent}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
      )}
    </StyledContentSection>
  );
};

export default ContentSection;