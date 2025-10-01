import styled, { keyframes } from 'styled-components';
import { FaTwitter, FaInstagram, FaLinkedin, FaTiktok, FaHeart, FaEdit, FaPaperPlane, FaComment, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

const pulse = keyframes`
  0% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.1); }
  100% { transform: translateY(-50%) scale(1); }
`;

export const Homecontent = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-x: hidden;

  > div:not(:last-child) {
    flex: 1 0 auto;
  }
`;

export const BannerSection = styled.div`
  width: 100%;
`;

export const BannerImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #94a3b8;

  @media screen and (max-width: 768px) {
    height: 150px;
  }

  @media screen and (max-width: 480px) {
    height: 120px;
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SocialIcons = styled.div`
  display: flex;
  position: absolute;
  right: 15px;
  top: 80%;
  transform: translateY(-50%);
  gap: 10px;
  padding: 5px;

  svg {
    font-size: 24px;
    color: white;
    cursor: pointer;
    transition: color 0.3s;

    &.disabled {
      color: #9ca3af;
      cursor: not-allowed;
    }
  }

  @media screen and (max-width: 768px) {
    right: 10px;
    gap: 8px;
    svg {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 480px) {
    top: 70%;
    flex-wrap: wrap;
    justify-content: center;
    right: 5px;
    svg {
      font-size: 18px;
    }
  }
`;

export const SocialLink = styled.a`
  color: white;
  &:hover {
    color: #541011;
  }
`;

export const StyledUserHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 60px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 16px 20px;
    gap: 16px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px 15px;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #94a3b8;
  overflow: hidden;

  @media screen and (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #6b7280;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
  }

  h6 {
    font-size: 0.875rem;
    color: white;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
    h6 {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 480px) {
    h2 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.7rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: 10px;
  }
`;

export const ActionButton = styled.button`
  background-color: #541011;
  color: #f3f3f3;
  padding: 10px 15px;
  border: 1px solid #541011;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  svg {
    font-size: 16px;
  }

  &:hover {
    background-color: white;
    color: #541011;
    border-color: #541011;
  }

  @media screen and (max-width: 768px) {
    padding: 8px;

    span {
      display: none;
    }

    svg {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 6px;

    svg {
      font-size: 18px;
    }
  }
`;

export const CreateDropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  width: 200px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s;

  svg {
    font-size: 16px;
    color: #541011;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const StlyedNavigation = styled.div`
  width: 100%;
  padding: 24px 60px;

  @media screen and (max-width: 768px) {
    padding: 16px 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px 15px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 53.33%;

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
`;

export const NavButton = styled.button`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;

  &.active {
    text-decoration: underline;
  }

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;



export const StyledSliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

  .slick-prev,
  .slick-next {
    display: none !important; // Hide default slick arrows
  }

  .custom-arrow {
    position: absolute;
    top: 50%; // Center vertically
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0; // Hidden by default

    &.prev-arrow {
      left: 0; // Position at left edge
    }

    &.next-arrow {
      right: 0; // Position at right edge
      &:hover {
        animation: ${pulse} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    opacity: 1; // Show arrows on hover
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;

    .custom-arrow {
      display: none !important; // Hide arrows on small screens
    }
  }
`;

export const CustomPrevArrow = styled(FaChevronLeft)`
  font-size: 24px;
  color: white;
`;

export const CustomNextArrow = styled(FaChevronRight)`
  font-size: 24px;
  color: white;
`;
export const SectionTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 32px 0;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
    margin: 24px 0;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
    margin: 16px 0;
  }
`;

export const StlyedCommunitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  margin-bottom: 40px;

  @media screen and (max-width: 1000px) {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 5px;
    gap: 15px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
    gap: 10px;
  }
`;

export const PostWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

export const PostCard = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  width: 100%;
  box-sizing: border-box;

  .edit-icon, .delete-icon, .share-icon {
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #541011;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
  }

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

export const PostProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;

  @media screen and (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export const PostCreator = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export const PostTimestamp = styled.span`
  font-size: 0.8rem;
  color: #999;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const PostContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ccc;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const PostActions = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;

  @media screen and (max-width: 480px) {
    gap: 10px;
  }
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isLiked ? '#541011' : '#ccc')};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const CommentButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const CommentsSection = styled.div`
  margin-bottom: 10px;
`;

export const Comment = styled.div`
  background: #222;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    padding: 8px;
  }
`;

export const CommentContent = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0;

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const CommentTimestamp = styled.span`
  font-size: 0.7rem;
  color: #999;

  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const CommentForm = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #333;
  color: #fff;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

export const CommentSubmit = styled.button`
  background: #541011;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #fff;
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 16px;
    max-width: 400px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px;
    max-width: 300px;
  }
`;

export const PlaylistModal = styled(ModalContent)`
  max-width: 600px;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  resize: vertical;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const ModalButtonCancel = styled.button`
  background-color: #d1d5db;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #9ca3af;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

export const ModalButtonSubmit = styled.button`
  background-color: #541011;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #fff;
    color: #541011;
  }

  @media screen and (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 8px;
    font-size: 0.8rem;
  }
`;

export const LoadingMessage = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1rem;
  padding: 20px;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 15px;
  }
`;

export const NoPostsMessage = styled.div`
  color: #ccc;
  text-align: center;
  font-size: 1rem;
  padding: 20px;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 15px;
  }
`;

export const InstagramLink = styled.div`
  display: flex;
  align-items: center;
  color: white;

  .instagram-links {
    margin-left: 5px;
    a {
      text-decoration: none;
      color: white;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 480px) {
    .instagram-links a {
      font-size: 0.7rem;
    }
  }

  @media screen and (max-width: 320px) {
    .instagram-links a {
      font-size: 0.6rem;
    }
  }
`;

export const InstagramIcon = styled.img`
  height: 20px;
  width: 20px;

  @media screen and (max-width: 480px) {
    height: 18px;
    width: 18px;
  }

  @media screen and (max-width: 320px) {
    height: 16px;
    width: 16px;
  }
`;

export const FooterLink = styled.p`
  font-size: 0.7rem;
  cursor: pointer;
  margin: 0;
  color: white;

  @media screen and (max-width: 480px) {
    font-size: 0.65rem;
  }

  @media screen and (max-width: 320px) {
    font-size: 0.6rem;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px 0 0;
  margin: 0;
  margin-left: 10px;

  .slick-slider {
    position: relative;
    touch-action: pan-y;
  }

  .slick-list {
    display: flex;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
  }

  .slick-track {
    display: flex;
    justify-content: flex-start;
    width: auto !important;
    margin-left: 0;
  }

  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: 0;
    }

    &.next-arrow {
      right: 0;
      &:hover {
        animation: ${pulse} 1s infinite;
        background: rgba(0, 0, 0, 0.7);
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 5px;
    flex-shrink: 0;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
    padding: 0 15px 0 0;
    margin-left: 8px;
  }

  @media (max-width: 600px) {
    padding: 0 10px 0 0;
    margin-left: 5px;
  }

  @media (max-width: 480px) {
    padding: 0 10px 0 0;
    margin-left: 5px;

    .custom-arrow {
      display: none !important;
    }
  }
`;

export const SubTabNav = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    gap: 12px;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 480px) {
    gap: 8px;
    margin-bottom: 12px;
  }
`;

export const SubTabButton = styled.button`
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;

  &.active {
    text-decoration: underline;
  }

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const PlaylistCard = styled.div`
  background: #2a2a2a;
  padding: 16px;
  border-radius: 12px;
  color: #fff;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #444;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .playlist-title {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .playlist-description {
    font-size: 0.9rem;
    color: #ccc;
  }

  .playlist-visibility {
    font-size: 0.8rem;
    color: #999;
  }

  .playlist-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .edit-icon, .delete-icon, .add-video-icon {
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #541011;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
    max-width: 250px;
  }

  @media screen and (max-width: 480px) {
    padding: 10px;
    max-width: 200px;
  }
`;

export const PlaylistContentWrapper = styled.div`
  margin-top: 20px;
  .playlist-videos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const StyledPlaylistModal = styled(ModalContent)`
  max-width: 600px;
`;

export const StyledContentSection = styled.div`
  width: 100%;
  padding: 0 60px;
  background-color: transparent;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 15px;
  }
`;

export const HighlightsSectionContainer = styled.div`
  padding: 24px 60px;
  width: 100%;
`;

export const HighlightsList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 10px;
`;

export const HighlightItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const HighlightCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 2px;
  background: ${(props) =>
    props.viewed
      ? 'transparent'
      : 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #1a1a1a;
  }
`;

export const HighlightTitle = styled.span`
  color: white;
  font-size: 0.8rem;
`;

export const HighlightViewerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10002;
`;

export const HighlightViewerContent = styled.div`
  position: relative;
  width: 360px;
  height: 640px;
  background-color: black;

  video {
    width: 100%;
    height: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ProgressBarContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 5%;
  width: 90%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #541011;
  border-radius: 2px;
  transition: width 0.1s linear;
`;

export const HighlightNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }

  ${(props) =>
    props.side === 'left' &&
    `
    left: 10px;
  `}

  ${(props) =>
    props.side === 'right' &&
    `
    right: 10px;
  `}
`;

export const HighlightTitleInViewer = styled.h3`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin: 0;
  z-index: 10;
`;

export const LargeHighlightCircle = styled(HighlightCircle)`
  width: 160px;
  height: 160px;
  padding: 4px;

  img {
    width: 152px;
    height: 152px;
    border-width: 4px;
  }
`;

export const LargeHighlightTitle = styled(HighlightTitle)`
  font-size: 1.1rem;
`;