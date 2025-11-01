
import React, { useState } from 'react';
import { FaHeart, FaComment, FaPaperPlane, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  ModalOverlay,
  ModalCard,
  ModalCardMedia,
  ModalCardContent,
  ModalCardHeader,
  ModalCardCaption,
  ModalCardComments,
  ModalCardComment,
  ModalCardCommentUser,
  ModalCardActions,
  ModalCardInput,
  ProfileImage,
  CreatorName,
  CloseButton,
  NavigationArrow,
} from '../../styles/CreatorPageStyles';

const FeedPostViewerModal = ({ post, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!post) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.media.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + post.media.length) % post.media.length);
  };

  const currentMedia = post.media[currentIndex];

  return (
    <ModalOverlay onClick={onClose} data-testid="feed-post-viewer-modal">
      <CloseButton onClick={onClose} style={{ top: '20px', right: '20px', fontSize: '1.5rem' }}>
        <FaTimes />
      </CloseButton>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalCardMedia>
          {currentMedia.url.endsWith('.mp4') ? (
            <video src={currentMedia.url} controls autoPlay loop />
          ) : (
            <img src={currentMedia.url} alt={post.caption} />
          )}
          {post.media.length > 1 && (
            <>
              <NavigationArrow className="prev-arrow" onClick={handlePrev}>
                <FaChevronLeft />
              </NavigationArrow>
              <NavigationArrow className="next-arrow" onClick={handleNext}>
                <FaChevronRight />
              </NavigationArrow>
            </>
          )}
        </ModalCardMedia>
        <ModalCardContent>
          <ModalCardHeader>
            <ProfileImage src={post.user?.profileImage} alt={post.user?.name} style={{ width: '40px', height: '40px' }} />
            <CreatorName>{post.user?.name}</CreatorName>
          </ModalCardHeader>
          <ModalCardCaption>{post.caption}</ModalCardCaption>
          <ModalCardComments>
            {post.comments.map((comment) => (
              <ModalCardComment key={comment._id}>
                <ModalCardCommentUser>{comment.user.name}</ModalCardCommentUser>
                <span>{comment.text}</span>
              </ModalCardComment>
            ))}
          </ModalCardComments>
          <ModalCardActions>
            <FaHeart />
            <FaComment />
            <FaPaperPlane />
          </ModalCardActions>
          <ModalCardInput placeholder="Add a comment..." />
        </ModalCardContent>
      </ModalCard>
    </ModalOverlay>
  );
};

export default FeedPostViewerModal;
