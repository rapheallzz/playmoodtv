
import React from 'react';
import Slider from 'react-slick';
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

  const mediaSliderSettings = {
    dots: true,
    infinite: post.media.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <ModalOverlay onClick={onClose} data-testid="feed-post-viewer-modal">
      <CloseButton onClick={onClose} style={{ top: '20px', right: '20px', fontSize: '1.5rem' }}>
        <FaTimes />
      </CloseButton>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalCardMedia>
          {post.media.length > 1 ? (
            <Slider {...mediaSliderSettings}>
              {post.media.map((mediaItem) => (
                <div key={mediaItem._id}>
                  {mediaItem.url.endsWith('.mp4') ? (
                    <video src={mediaItem.url} controls autoPlay loop />
                  ) : (
                    <img src={mediaItem.url} alt={post.caption} />
                  )}
                </div>
              ))}
            </Slider>
          ) : (
            post.media[0].url.endsWith('.mp4') ? (
              <video src={post.media[0].url} controls autoPlay loop />
            ) : (
              <img src={post.media[0].url} alt={post.caption} />
            )
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
