import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StyledContentSection, SectionTitle, SubTabNav, SubTabButton, StyledSliderContainer, NoPostsMessage, CustomPrevArrow, CustomNextArrow, VideoGrid } from '../../styles/CreatorPageStyles';
import PlaylistSection from './PlaylistSection';
import CommunitySection from './CommunitySection';
import CreatorSlider from './CreatorSlider';
import ContentModal from '../ContentModal';

const getSliderSettings = (itemCount) => ({
  dots: false,
  infinite: itemCount > 5, // Only enable infinite scroll if there are more items than slides to show
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  swipe: true,
  touchThreshold: 10,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: itemCount > 3,
        dots: true,
        arrows: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: itemCount > 1,
        arrows: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: itemCount > 1,
        arrows: false,
      },
    },
  ],
});

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
  const approvedVideos = data.filter(content => content.isApproved === true);
  const pendingVideos = [...new Map(data.filter(content => content.isApproved === false).map(item => [item._id, item])).values()];

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
          <StyledSliderContainer>
            {activeSubTab === 'Approved' ? (
              approvedVideos.length === 0 ? (
                <NoPostsMessage>No approved videos yet.</NoPostsMessage>
              ) : approvedVideos.length > 5 ? (
                <Slider {...getSliderSettings(approvedVideos.length)}>
                  {approvedVideos.map((content) => (
                    <div key={content._id} className="slides">
                      <CreatorSlider
                        img={content.thumbnail}
                        title={content.title}
                        movie={content}
                        views={content.views}
                        desc={content.description}
                        shortPreview={content.shortPreview}
                        customStyle={{}}
                        onVideoClick={() => handleOpenContentModal(content)}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <VideoGrid>
                  {approvedVideos.map((content) => (
                    <div key={content._id} className="slides">
                      <CreatorSlider
                        img={content.thumbnail}
                        title={content.title}
                        movie={content}
                        views={content.views}
                        desc={content.description}
                        shortPreview={content.shortPreview}
                        customStyle={{}}
                        onVideoClick={() => handleOpenContentModal(content)}
                      />
                    </div>
                  ))}
                </VideoGrid>
              )
            ) : (
              pendingVideos.length === 0 ? (
                <NoPostsMessage>No pending videos yet.</NoPostsMessage>
              ) : pendingVideos.length > 5 ? (
                <Slider {...getSliderSettings(pendingVideos.length)}>
                  {pendingVideos.map((content) => (
                    <div key={content._id} className="slides">
                      <CreatorSlider
                        img={content.thumbnail}
                        title={content.title}
                        movie={content}
                        views={content.views}
                        desc={content.description}
                        shortPreview={content.shortPreview}
                        customStyle={{}}
                        onVideoClick={() => {
                          console.log('Uploads (Pending) slider clicked:', content);
                          handleOpenContentModal(content);
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <VideoGrid>
                  {pendingVideos.map((content) => (
                    <div key={content._id} className="slides">
                      <CreatorSlider
                        img={content.thumbnail}
                        title={content.title}
                        movie={content}
                        views={content.views}
                        desc={content.description}
                        shortPreview={content.shortPreview}
                        customStyle={{}}
                        onVideoClick={() => {
                          console.log('Uploads (Pending) slider clicked:', content);
                          handleOpenContentModal(content);
                        }}
                      />
                    </div>
                  ))}
                </VideoGrid>
              )
            )}
          </StyledSliderContainer>
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
            <StyledSliderContainer>
              <SectionTitle>Playlist Videos</SectionTitle>
              {isLoadingPlaylistVideos ? (
                <NoPostsMessage>Loading videos...</NoPostsMessage>
              ) : Array.isArray(selectedPlaylistVideos) && selectedPlaylistVideos.length > 0 ? (
                selectedPlaylistVideos.length > 5 ? (
                  <Slider {...getSliderSettings(selectedPlaylistVideos.length)}>
                    {selectedPlaylistVideos.map((video) => (
                      <div key={video._id} className="slides">
                        <CreatorSlider
                          img={video.thumbnail}
                          title={video.title}
                          movie={video}
                          views={video.views || 0}
                          desc={video.description || ''}
                          shortPreview={video.shortPreview || video.video}
                          customStyle={{}}
                          onVideoClick={() => handleOpenContentModal(video)}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <VideoGrid>
                    {selectedPlaylistVideos.map((video) => (
                      <div key={video._id} className="slides">
                        <CreatorSlider
                          img={video.thumbnail}
                          title={video.title}
                          movie={video}
                          views={video.views || 0}
                          desc={video.description || ''}
                          shortPreview={video.shortPreview || video.video}
                          customStyle={{}}
                          onVideoClick={() => handleOpenContentModal(video)}
                        />
                      </div>
                    ))}
                  </VideoGrid>
                )
              ) : (
                <NoPostsMessage>No videos in this playlist.</NoPostsMessage>
              )}
            </StyledSliderContainer>
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