import React, { useState, useMemo } from 'react';
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
import CreateHighlightModal from '../components/modals/CreateHighlightModal';
import HighlightsSection from '../components/creator/HighlightsSection';
import HighlightViewer from '../components/creator/HighlightViewer';
import CreatorPageSkeleton from '../components/skeletons/CreatorPageSkeleton';
import useChannelDetails from '../hooks/useChannelDetails';
import usePlaylists from '../hooks/usePlaylists';
import useCommunityPosts from '../hooks/useCommunityPosts';
import useHighlights from '../hooks/useHighlights';
import axios from 'axios';

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
  const [showCreateHighlightModal, setShowCreateHighlightModal] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [viewedHighlights, setViewedHighlights] = useState(new Set());

  // Channel details hook
  const {
    bannerImage, setBannerImageFile, profileImage, creatorName, setCreatorName,
    about, setAbout, instagram, setInstagram, tiktok, setTiktok,
    linkedin, setLinkedin, twitter, setTwitter, data, subscribers,
    errorMessage: channelErrorMessage, handleUpdateChannelInfo,
    isLoading: isLoadingChannel,
  } = useChannelDetails(user);

  // Playlists hook
  const {
    playlists, isLoadingPlaylists, newPlaylist, setNewPlaylist,
    editingPlaylist, setEditingPlaylist, selectedPlaylistId, setSelectedPlaylistId,
    availableVideos, fetchAvailableVideos, handleCreateOrUpdatePlaylist,
    handleDeletePlaylist, handleAddVideoToPlaylist, handleRemoveVideoFromPlaylist,
    errorMessage: playlistErrorMessage, setErrorMessage: setPlaylistErrorMessage,
    fetchPlaylistById, selectedPlaylistVideos, isLoadingPlaylistVideos,
  } = usePlaylists(user);

  // Community posts hook
  const {
    communityPosts, isLoadingPosts, newPostContent, setNewPostContent, newComment,
    setNewComment, editingPostId, setEditingPostId, editPostContent, setEditPostContent,
    handleCreatePost, handleUpdatePost, handleDeletePost, handleAddComment,
    handleDeleteComment, handleLikePost, errorMessage: postErrorMessage,
  } = useCommunityPosts(user, activeTab);

  // Highlights hook
  const {
    highlights,
    isLoading: isLoadingHighlights,
    error: highlightsError,
    createHighlight,
    fetchHighlights,
  } = useHighlights(user);

  const approvedVideos = useMemo(() => {
    return data.filter(content => content.isApproved && content.video) || [];
  }, [data]);

  // Close all modals
  const closeAllModals = () => {
    setShowCreatePlaylistModal(false);
    setShowEditPlaylistModal(false);
    setShowCommunityModal(false);
    setShowEditModal(false);
    setShowVideoModal(false);
    setShowDonationModal(false);
    setShowEditPostModal(false);
    setShowContentModal(false);
    setShowCreateHighlightModal(false);
    setSelectedHighlight(null);
    setModalContent(null);
    setEditingPlaylist(null);
    setSelectedPlaylistId(null);
    setNewPlaylist({ name: '', description: '', visibility: 'public' });
    setPlaylistErrorMessage('');
  };

  // Modal handlers
  const handleOpenCreatePlaylistModal = () => {
    setNewPlaylist({ name: '', description: '', visibility: 'public' });
    setShowCreatePlaylistModal(true);
  };

  // Utility function for creating slug
  const createSlug = (title, id) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${slug}-${id}`;
  };

  // Handler for navigating to movie page
  const handleNavigateToMovie = (content) => {
    navigate(`/movie/${createSlug(content.title, content._id)}`);
  };

  const handleSelectHighlight = async (highlight) => {
    try {
      const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${highlight.content._id}`);
      const content = response.data;

      if (content && content.video) {
        setSelectedHighlight({
          ...highlight,
          content: {
            ...highlight.content,
            video: content.video,
          },
        });
        setViewedHighlights((prev) => new Set(prev).add(highlight._id));
      } else {
        console.error('Video content for this highlight is not available.');
      }
    } catch (error) {
      console.error('Error fetching content details for highlight:', error);
    }
  };

  const handleNextHighlight = () => {
    const currentIndex = highlights.findIndex((h) => h._id === selectedHighlight._id);
    if (currentIndex < highlights.length - 1) {
      handleSelectHighlight(highlights[currentIndex + 1]);
    }
  };

  const handlePreviousHighlight = () => {
    const currentIndex = highlights.findIndex((h) => h._id === selectedHighlight._id);
    if (currentIndex > 0) {
      handleSelectHighlight(highlights[currentIndex - 1]);
    }
  };

  const isLoading = isLoadingChannel || isLoadingHighlights;

  if (isLoading) {
    return <CreatorPageSkeleton />;
  }

  return (
    <Homecontent>
      {(channelErrorMessage || playlistErrorMessage || postErrorMessage || highlightsError) && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {channelErrorMessage || playlistErrorMessage || postErrorMessage || highlightsError}
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
        subscribers={subscribers}
        navigate={navigate}
        handleOpenPlaylistModal={handleOpenCreatePlaylistModal}
        setShowCommunityModal={setShowCommunityModal}
        setShowVideoModal={setShowVideoModal}
        setShowEditModal={setShowEditModal}
        setShowCreateHighlightModal={setShowCreateHighlightModal}
      />
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigate={navigate}
        setShowDonationModal={setShowDonationModal}
      />
      <HighlightsSection
        highlights={highlights}
        onSelectHighlight={handleSelectHighlight}
        viewedHighlights={viewedHighlights}
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
          closeAllModals();
          setModalContent(content);
          setShowVideoModal(true);
        }}
        handleOpenContentModal={(content) => {
          closeAllModals();
          setModalContent(content);
          setShowContentModal(true);
        }}
        handleCardClick={(content) => {
          navigate(`/movie/${createSlug(content.title, content._id)}`);
        }}
        handleEditPlaylist={(playlist) => {
          setNewPlaylist({ name: playlist.name, description: playlist.description || '', visibility: playlist.visibility || 'public' });
          setEditingPlaylist(playlist);
          setShowEditPlaylistModal(true);
        }}
        handleDeletePlaylist={handleDeletePlaylist}
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
      {showVideoModal && <VideoModal content={modalContent} onClose={closeAllModals} />}
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
      {showDonationModal && <DonationModal isOpen={showDonationModal} onClose={closeAllModals} onSubmit={closeAllModals} />}
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
          handleCreateOrUpdatePlaylist={async () => {
            const result = await handleCreateOrUpdatePlaylist();
            if (result.success && result.playlist) {
              setShowCreatePlaylistModal(false);
              setNewPlaylist({
                name: result.playlist.name,
                description: result.playlist.description,
                visibility: result.playlist.visibility,
              });
              setEditingPlaylist(result.playlist);
              setShowEditPlaylistModal(true);
            }
          }}
          isLoadingPlaylists={isLoadingPlaylists}
          closeAllModals={closeAllModals}
          errorMessage={playlistErrorMessage}
          setErrorMessage={setPlaylistErrorMessage}
        />
      )}
      {showEditPlaylistModal && (
        <EditPlaylistModal
          newPlaylist={newPlaylist}
          setNewPlaylist={setNewPlaylist}
          editingPlaylist={editingPlaylist}
          handleCreateOrUpdatePlaylist={handleCreateOrUpdatePlaylist}
          isLoadingPlaylists={isLoadingPlaylists}
          closeAllModals={closeAllModals}
          fetchPlaylistById={fetchPlaylistById}
          selectedPlaylistVideos={selectedPlaylistVideos}
          isLoadingPlaylistVideos={isLoadingPlaylistVideos}
          handleAddVideoToPlaylist={handleAddVideoToPlaylist}
          handleRemoveVideoFromPlaylist={handleRemoveVideoFromPlaylist}
          availableVideos={availableVideos}
          fetchAvailableVideos={fetchAvailableVideos}
          errorMessage={playlistErrorMessage}
          setErrorMessage={setPlaylistErrorMessage}
        />
      )}
      {showCreateHighlightModal && (
        <CreateHighlightModal
          isOpen={showCreateHighlightModal}
          onClose={closeAllModals}
          onCreate={createHighlight}
          availableVideos={approvedVideos}
        />
      )}
      {selectedHighlight && (
        <HighlightViewer
          highlight={selectedHighlight}
          onClose={() => setSelectedHighlight(null)}
          onNext={handleNextHighlight}
          onPrevious={handlePreviousHighlight}
          isFirst={highlights.findIndex((h) => h._id === selectedHighlight._id) === 0}
          isLast={
            highlights.findIndex((h) => h._id === selectedHighlight._id) === highlights.length - 1
          }
        />
      )}
      <Footer />
    </Homecontent>
  );
}