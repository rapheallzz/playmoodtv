
import React, { useState, useEffect } from 'react';
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
  DotsContainer,
  Dot,
} from '../../styles/CreatorPageStyles';

const FeedPostViewerModal = ({ post, onClose, onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [post]);

  if (!post) return null;

  // Add a guard to prevent rendering with an invalid index while the post is changing.
  if (currentIndex >= post.media.length) {
    return null;
  }

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
            <DotsContainer>
              {post.media.map((_, index) => (
                <Dot key={index} isActive={index === currentIndex} onClick={() => setCurrentIndex(index)} />
              ))}
            </DotsContainer>
          )}
        </ModalCardMedia>
        <NavigationArrow className="prev-arrow" onClick={onPrev}>
          <FaChevronLeft />
        </NavigationArrow>
        <NavigationArrow className="next-arrow" onClick={onNext}>
          <FaChevronRight />
        </NavigationArrow>
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
