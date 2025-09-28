import React from 'react';
import { StlyedUserHeader, ProfileSection, ProfileImageWrapper, ProfileImage, ProfilePlaceholder, ProfileInfo, ButtonGroup, ActionButton, } from '../../styles/CreatorPageStyles';
import { FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaHeart, FaEdit, FaPaperPlane, FaComment, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

const UserHeader = ({
  profileImage,
  creatorName,
  user,
  subscribers,
  navigate,
  handleOpenPlaylistModal,
  setShowCommunityModal,
  setShowVideoModal,
  setShowEditModal,
  setShowCreateHighlightModal, // New prop
}) => (
  <StlyedUserHeader>
    <ProfileSection>
      <ProfileImageWrapper>
        {profileImage ? (
          <ProfileImage
            src={`${profileImage}?${new Date().getTime()}`}
            alt="Profile"
            onClick={() => navigate('/dashboard')}
          />
        ) : (
          <ProfilePlaceholder />
        )}
      </ProfileImageWrapper>
      <ProfileInfo>
        <h2>{creatorName || user?.name}</h2>
        <h6>{subscribers} subscribers</h6>
      </ProfileInfo>
    </ProfileSection>
    <ButtonGroup>
      <ActionButton onClick={() => setShowCreateHighlightModal(true)} aria-label="Create Highlight">
        Create Highlight
      </ActionButton>
      <ActionButton onClick={handleOpenPlaylistModal} aria-label="Create Playlist">
        Create Playlist
      </ActionButton>
      <ActionButton
        onClick={() => {
          console.log('Opening Community Post Modal');
          setShowCommunityModal(true);
          setShowEditModal(false);
          setShowVideoModal(false);
        }}
        aria-label="Create Community Post"
      >
        Create Post
      </ActionButton>
      <ActionButton
        onClick={() => {
          console.log('Opening Upload Video Modal');
          setShowVideoModal(true);
          setShowCommunityModal(false);
          setShowEditModal(false);
        }}
        aria-label="Upload a Video"
      >
        Upload a Video
      </ActionButton>
      <ActionButton
        onClick={() => {
          console.log('Opening Edit Channel Modal');
          setShowEditModal(true);
          setShowCommunityModal(false);
          setShowVideoModal(false);
        }}
        aria-label="Edit Channel"
      >
        Edit Channel <FaEdit />
      </ActionButton>
    </ButtonGroup>
  </StlyedUserHeader>
);

export default UserHeader;