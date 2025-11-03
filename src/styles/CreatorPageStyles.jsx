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
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

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
  display: flex;
  justify-content: flex-start;

  .slick-slider {
    position: relative;
    width: 100%;
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

export const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

export const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? 'white' : 'rgba(255, 255, 255, 0.5)')};
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const FeedPostCardContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover .media-hover-overlay {
    opacity: 1;
  }
`;

export const MediaHoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

export const HoverIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
`;

export const ModalCard = styled.div`
  display: flex;
  background-color: #1a1a1a;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  width: 80%;
  max-width: 900px;
  height: 80vh;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90vw;
    height: 90vh;
    max-width: 500px;
  }
`;

export const ModalCardMedia = styled.div`
  position: relative;
  flex: 1.5;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    flex: 1;
    height: 60%;
  }
`;

export const ModalCardContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 1;
    min-height: 40%;
    padding: 10px;
  }
`;

export const ModalCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

export const ModalCardCaption = styled.p`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 0;
  border-bottom: 1px solid #333;
`;

export const ModalCardComments = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 10px 0;
`;

export const ModalCardComment = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const ModalCardCommentUser = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const ModalCardActions = styled.div`
  display: flex;
  gap: 15px;
  padding-top: 10px;
  border-top: 1px solid #333;
  svg {
    font-size: 1.5rem;
    cursor: pointer;
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
  z-index: 1001;
`;

export const ModalCardInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 5px;
  color: white;
  margin-top: 10px;

  &::placeholder {
    color: #888;
  }
`;

export const FeedContainer = styled.div`
  width: 100%;
  padding: 0 60px;

  .desktop-slider {
    display: block;
  }

  .mobile-collage {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px;

    .desktop-slider {
      display: none;
    }

    .mobile-collage {
      display: block;
    }
  }
`;

export const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const FeedItem = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
`;

export const FeedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const FeedCaption = styled.p`
  color: white;
  padding: 10px;
  font-size: 0.9rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

export const ModalBody = styled.div`
  padding: 20px 0;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #ddd;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 10px;
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
  text-align: left;
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
  padding: 24px 50px;
  width: 100%;
`;

export const HighlightsList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 10px;
`;

export const HighlightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 120px;
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
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  cursor: pointer;

  &.expanded {
    white-space: normal;
    overflow: visible;
  }
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 0.7rem;
  margin-top: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const HighlightCard = styled.div`
  width: 120px;
  height: 160px;
  border-radius: 8px;
  padding: 2px;
  background: ${(props) =>
    props.viewed
      ? 'transparent'
      : 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const HighlightImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #1a1a1a;
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

  @media (max-width: 1024px) {
    width: 120px;
    height: 120px;
    padding: 3px;

    img {
      width: 114px;
      height: 114px;
      border-width: 3px;
    }
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    padding: 2px;

    img {
      width: 86px;
      height: 86px;
      border-width: 2px;
    }
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    padding: 2px;

    img {
      width: 76px;
      height: 76px;
      border-width: 2px;
    }
  }
`;

export const LargeHighlightTitle = styled(HighlightTitle)`
  font-size: 1.1rem;
`;

export const VideoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  width: 100%;
`;

export const VerticalScrollViewer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  z-index: 10002;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const HighlightStory = styled.div`
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 360px;
  height: 640px;
  max-width: 90vw;
  max-height: 90vh;
  background-color: black;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 12px 24px rgba(0,0,0,0.5);
  transition: transform 0.4s ease-in-out;

  &.shifted {
    transform: translateX(-175px);
  }
`;

export const VideoControlsContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 11;
  opacity: 1;
  transition: opacity 0.3s ease;
`;

export const PlayerControl = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 5px;
`;

export const LikesContainer = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 10px;
  padding-left: 5px;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const SendButton = styled.button`
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7a181a;
  }
`;

export const CenterPlayPauseButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  svg {
    font-size: 3rem;
  }
`;


export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HighlightOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 30%);
`;

export const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CreatorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CreatorName = styled.span`
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

export const BottomInfoContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
  z-index: 10;
`;

export const TextInfoContainer = styled.div`
  max-width: 75%;
`;

export const HighlightViewerTitle = styled.h4`
  margin: 10px 0 0 0;
  font-weight: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ViewerActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;

  svg {
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }

  &.liked {
    svg {
      color: #e53e3e; /* A red color for liked state */
    }
  }
`;

export const NavigationArrow = styled.button`
  position: absolute;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &.up-arrow {
    bottom: 300px;
    right: 20px;
  }

  &.down-arrow {
    bottom: 240px;
    right: 20px;
  }

  svg {
    font-size: 1.5rem;
  }

  &.prev-arrow {
    left: 10px;
  }

  &.next-arrow {
    right: 10px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 0.9rem;

  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  }
`;