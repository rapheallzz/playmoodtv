import React from 'react';
import { FaHeart, FaComment, FaPaperPlane, FaTimes } from 'react-icons/fa';
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
} from '../../styles/CreatorPageStyles';

const FeedPostViewerModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <ModalOverlay onClick={onClose} data-testid="feed-post-viewer-modal">
      <CloseButton onClick={onClose} style={{ top: '20px', right: '20px', fontSize: '1.5rem' }}>
        <FaTimes />
      </CloseButton>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalCardMedia>
          {post.media[0].url.endsWith('.mp4') ? (
            <video src={post.media[0].url} controls autoPlay loop />
          ) : (
            <img src={post.media[0].url} alt={post.caption} />
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
