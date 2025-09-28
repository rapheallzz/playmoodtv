import React, { useState } from 'react';
import {
  StyledUserHeader,
  ProfileSection,
  ProfileImageWrapper,
  ProfileImage,
  ProfilePlaceholder,
  ProfileInfo,
  ButtonGroup,
  ActionButton,
  CreateDropdown,
  DropdownItem,
} from '../../styles/CreatorPageStyles';
import {
  FaPlus, FaVideo, FaList, FaPenSquare, FaUpload, FaEdit,
} from 'react-icons/fa';

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
  setShowCreateHighlightModal,
}) => {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  return (
    <StyledUserHeader>
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
        <div style={{ position: 'relative' }}>
          <ActionButton
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            aria-label="Create"
          >
            <FaPlus />
            <span>Create</span>
          </ActionButton>
          {showCreateDropdown && (
            <CreateDropdown>
              <DropdownItem onClick={() => { setShowCreateHighlightModal(true); setShowCreateDropdown(false); }}>
                <FaVideo />
                <span>Create Highlight</span>
              </DropdownItem>
              <DropdownItem onClick={() => { handleOpenPlaylistModal(); setShowCreateDropdown(false); }}>
                <FaList />
                <span>Create Playlist</span>
              </DropdownItem>
              <DropdownItem onClick={() => { setShowCommunityModal(true); setShowCreateDropdown(false); }}>
                <FaPenSquare />
                <span>Create Post</span>
              </DropdownItem>
            </CreateDropdown>
          )}
        </div>
        <ActionButton
          onClick={() => setShowVideoModal(true)}
          aria-label="Upload a Video"
        >
          <FaUpload />
          <span>Upload Video</span>
        </ActionButton>
        <ActionButton
          onClick={() => setShowEditModal(true)}
          aria-label="Edit Channel"
        >
          <FaEdit />
          <span>Edit Channel</span>
        </ActionButton>
      </ButtonGroup>
    </StyledUserHeader>
  );
};

export default UserHeader;