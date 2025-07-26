import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Homecontent } from '../styles/CreatorPageStyles';
import Banner from '../components/creator/Banner';
import UserHeader from '../components/creator/UserHeader';
import Navigation from '../components/creator/Navigation';
import ContentSection from '../components/creator/ContentSection';
import Footer from '../components/footer/Footer';
import { VideoModal } from '../components/ModalVU';
import ContentModal from '../components/ContentModal';
import EditChannelModal from '../components/EditChannelModal';
import DonationModal from '../components/DonationModal';
import CommunityPostModal from '../components/modals/CommunityPostModal';
import EditPostModal from '../components/modals/EditPostModal';
import CreatePlaylistModal from '../components/modals/CreatePlaylistModal';
import EditPlaylistModal from '../components/modals/EditPlaylistModal';
import AddVideoModal from '../components/modals/AddVideoModal';
import useChannelDetails from '../hooks/useChannelDetails';
import usePlaylists from '../hooks/usePlaylists';
import useCommunityPosts from '../hooks/useCommunityPosts';

export default function CreatorPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('Uploads');
  const [activeSubTab, setActiveSubTab] = useState('Approved');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [showEditPlaylistModal, setShowEditPlaylistModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Channel details hook
  const {
    bannerImage,
    setBannerImageFile,
    profileImage,
    creatorName,
    setCreatorName,
    about,
    setAbout,
    instagram,
    setInstagram,
    tiktok,
    setTiktok,
    linkedin,
    setLinkedin,
    twitter,
    setTwitter,
    data,
    errorMessage: channelErrorMessage,
    handleUpdateChannelInfo,
  } = useChannelDetails(user);

  // Playlists hook
  const {
    playlists,
    isLoadingPlaylists,
    newPlaylist,
    setNewPlaylist,
    editingPlaylist,
    setEditingPlaylist,
    selectedPlaylistId,
    setSelectedPlaylistId,
    newPlaylistId,
    setNewPlaylistId,
    availableVideos,
    handleCreateOrUpdatePlaylist,
    handleDeletePlaylist,
    handleAddVideoToPlaylist,
    handleRemoveVideoFromPlaylist,
    errorMessage: playlistErrorMessage,
    fetchPlaylistById,
    selectedPlaylistVideos,
    isLoadingPlaylistVideos,
  } = usePlaylists(user);

  // Community posts hook
  const {
    communityPosts,
    isLoadingPosts,
    newPostContent,
    setNewPostContent,
    newComment,
    setNewComment,
    editingPostId,
    setEditingPostId,
    editPostContent,
    setEditPostContent,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
    handleAddComment,
    handleDeleteComment,
    handleLikePost,
    errorMessage: postErrorMessage,
  } = useCommunityPosts(user, activeTab);

  // Close all modals
  const closeAllModals = () => {
    console.log('Closing all modals');
    setShowCreatePlaylistModal(false);
    setShowEditPlaylistModal(false);
    setShowAddVideoModal(false);
    setShowCommunityModal(false);
    setShowEditModal(false);
    setShowVideoModal(false);
    setShowDonationModal(false);
    setShowEditPostModal(false);
    setShowContentModal(false);
    setModalContent(null);
    setEditingPlaylist(null);
    setSelectedPlaylistId(null);
    setNewPlaylist({ name: '', description: '', visibility: 'public' });
  };

  // Modal handlers
  const handleOpenCreatePlaylistModal = () => {
    console.log('Opening CreatePlaylistModal');
    closeAllModals();
    setNewPlaylist({ name: '', description: '', visibility: 'public' });
    setShowCreatePlaylistModal(true);
  };

  const handleOpenAddVideoModal = (playlistId) => {
    if (!playlists.some(p => p._id === playlistId)) {
      console.error('Invalid playlistId:', playlistId);
      return;
    }
    console.log('Opening AddVideoModal for playlist:', playlistId);
    closeAllModals();
    setSelectedPlaylistId(playlistId);
    setShowAddVideoModal(true);
  };

  const handleCancelAddVideo = () => {
    console.log('Canceling AddVideoModal');
    if (newPlaylistId) {
      handleDeletePlaylist(newPlaylistId).then(() => {
        setNewPlaylistId(null);
        setNewPlaylist({ name: '', description: '', visibility: 'public' });
      });
    }
    closeAllModals();
    if (selectedPlaylistId) {
      const playlist = playlists.find(p => p._id === selectedPlaylistId);
      if (playlist) {
        setEditingPlaylist(playlist);
        setNewPlaylist({
          name: playlist.name || '',
          description: playlist.description || '',
          visibility: playlist.visibility || 'public',
        });
        setShowEditPlaylistModal(true);
      }
    }
  };

  // Utility function for creating slug
  const createSlug = (title, id) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `${slug}-${id}`;
  };

  // Handler for navigating to movie page
  const handleNavigateToMovie = (content) => {
    console.log('Navigating to movie:', content);
    navigate(`/movie/${createSlug(content.title, content._id)}`);
  };

  return (
    <Homecontent>
      {(channelErrorMessage || playlistErrorMessage || postErrorMessage) && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {channelErrorMessage || playlistErrorMessage || postErrorMessage}
        </div>
      )}
      <Banner
        bannerImage={bannerImage}
        twitter={twitter}
        instagram={instagram}
        linkedin={linkedin}
        tiktok={tiktok}
      />
      <UserHeader
        profileImage={profileImage}
        creatorName={creatorName}
        user={user}
        navigate={navigate}
        handleOpenPlaylistModal={handleOpenCreatePlaylistModal}
        setShowCommunityModal={setShowCommunityModal}
        setShowVideoModal={setShowVideoModal}
        setShowEditModal={setShowEditModal}
      />
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigate={navigate}
        setShowDonationModal={setShowDonationModal}
      />
      <ContentSection
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        setActiveSubTab={setActiveSubTab}
        data={data}
        communityPosts={communityPosts}
        isLoadingPosts={isLoadingPosts}
        playlists={playlists}
        isLoadingPlaylists={isLoadingPlaylists}
        user={user}
        handleOpenModal={(content) => {
          console.log('Opening VideoModal with content:', content);
          closeAllModals();
          setModalContent(content);
          setShowVideoModal(true);
        }}
        handleOpenContentModal={(content) => {
          console.log('Opening ContentModal with content:', content);
          closeAllModals();
          setModalContent(content);
          setShowContentModal(true);
        }}
        handleCardClick={(content) => {
          console.log('Card clicked, navigating:', content);
          navigate(`/movie/${createSlug(content.title, content._id)}`);
        }}
        handleEditPlaylist={(playlist) => {
          console.log('Opening EditPlaylistModal for:', playlist._id);
          closeAllModals();
          setNewPlaylist({ name: playlist.name, description: playlist.description || '', visibility: playlist.visibility || 'public' });
          setEditingPlaylist(playlist);
          setSelectedPlaylistId(playlist._id);
          fetchPlaylistById(playlist._id);
          setShowEditPlaylistModal(true);
        }}
        handleDeletePlaylist={handleDeletePlaylist}
        handleOpenAddVideoModal={handleOpenAddVideoModal}
        handleRemoveVideoFromPlaylist={handleRemoveVideoFromPlaylist}
        handleLikePost={handleLikePost}
        handleDeletePost={handleDeletePost}
        setShowEditPostModal={setShowEditPostModal}
        setEditingPostId={setEditingPostId}
        setEditPostContent={setEditPostContent}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        errorMessage={playlistErrorMessage}
        fetchPlaylistById={fetchPlaylistById}
        selectedPlaylistId={selectedPlaylistId}
        selectedPlaylistVideos={selectedPlaylistVideos}
        isLoadingPlaylistVideos={isLoadingPlaylistVideos}
      />
      {showContentModal && (
        <ContentModal
          isOpen={showContentModal}
          content={modalContent}
          onClose={closeAllModals}
          handleNavigateToMovie={handleNavigateToMovie}
        />
      )}
      {showVideoModal && (
        <VideoModal
          content={modalContent}
          onClose={closeAllModals}
        />
      )}
      {showEditModal && (
        <EditChannelModal
          isOpen={showEditModal}
          onClose={closeAllModals}
          creatorName={creatorName}
          setCreatorName={setCreatorName}
          about={about}
          setAbout={setAbout}
          instagram={instagram}
          setInstagram={setInstagram}
          tiktok={tiktok}
          setTiktok={setTiktok}
          linkedin={linkedin}
          setLinkedin={setLinkedin}
          twitter={twitter}
          setTwitter={setTwitter}
          bannerImage={bannerImage}
          setBannerImageFile={setBannerImageFile}
          handleUpdateChannelInfo={handleUpdateChannelInfo}
        />
      )}
      {showDonationModal && (
        <DonationModal
          isOpen={showDonationModal}
          onClose={closeAllModals}
          onSubmit={closeAllModals}
        />
      )}
      {showCommunityModal && (
        <CommunityPostModal
          newPostContent={newPostContent}
          setNewPostContent={setNewPostContent}
          handleCreatePost={handleCreatePost}
          onClose={closeAllModals}
        />
      )}
      {showEditPostModal && (
        <EditPostModal
          editPostContent={editPostContent}
          setEditPostContent={setEditPostContent}
          handleUpdatePost={handleUpdatePost}
          onClose={() => {
            console.log('Closing EditPostModal');
            closeAllModals();
            setEditPostContent('');
            setEditingPostId(null);
          }}
        />
      )}
      {showCreatePlaylistModal && (
        <CreatePlaylistModal
          newPlaylist={newPlaylist}
          setNewPlaylist={setNewPlaylist}
          handleCreateOrUpdatePlaylist={handleCreateOrUpdatePlaylist}
          isLoadingPlaylists={isLoadingPlaylists}
          closeAllModals={closeAllModals} // Pass closeAllModals
        />
      )}
      {showEditPlaylistModal && (
        <EditPlaylistModal
          newPlaylist={newPlaylist}
          setNewPlaylist={setNewPlaylist}
          editingPlaylist={editingPlaylist}
          handleCreateOrUpdatePlaylist={handleCreateOrUpdatePlaylist}
          isLoadingPlaylists={isLoadingPlaylists}
          closeAllModals={closeAllModals} // Pass closeAllModals
          fetchPlaylistById={fetchPlaylistById}
          selectedPlaylistVideos={selectedPlaylistVideos}
          isLoadingPlaylistVideos={isLoadingPlaylistVideos}
          handleAddVideoToPlaylist={handleAddVideoToPlaylist}
          handleRemoveVideoFromPlaylist={handleRemoveVideoFromPlaylist}
          availableVideos={availableVideos}
          selectedPlaylistId={selectedPlaylistId}
          setShowAddVideoModal={setShowAddVideoModal}
          setSelectedPlaylistId={setSelectedPlaylistId}
        />
      )}
      {showAddVideoModal && (
        <AddVideoModal
          playlists={playlists}
          selectedPlaylistId={selectedPlaylistId}
          setSelectedPlaylistId={setSelectedPlaylistId}
          availableVideos={availableVideos}
          handleAddVideoToPlaylist={handleAddVideoToPlaylist}
          isLoadingPlaylists={isLoadingPlaylists}
          newPlaylistId={newPlaylistId}
          onClose={handleCancelAddVideo}
          errorMessage={playlistErrorMessage}
        />
      )}
      <Footer />
    </Homecontent>
  );
}