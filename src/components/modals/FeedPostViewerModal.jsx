
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaHeart, FaComment, FaPaperPlane, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import contentService from '../../features/contentService';
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
  MediaNavigationArrow,
  DotsContainer,
  Dot,
  LikesContainer,
  CommentInputContainer,
  SendButton,
} from '../../styles/CreatorPageStyles';

const FeedPostViewerModal = ({ post, onClose, onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    if (post) {
      setIsLiked(post.likes?.includes(user?._id) || false);
      setLikesCount(post.likes?.length || 0);
      setComments(post.comments || []);
    }
  }, [post, user]);

  const handleLikeToggle = async () => {
    if (!user) return; // or show a login prompt
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;
    const originalIsLiked = isLiked;
    const originalLikesCount = likesCount;

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    try {
      if (newIsLiked) {
        await contentService.likeFeedPost({ feedId: post._id, token: user.token });
      } else {
        await contentService.unlikeFeedPost({ feedId: post._id, token: user.token });
      }
    } catch  (error) {
      // Revert the state on error
      setIsLiked(originalIsLiked);
      setLikesCount(originalLikesCount);
    }
  };

  const submitComment = async () => {
    if (newComment.trim() === '' || !user) {
      return;
    }
    try {
      const updatedPost = await contentService.commentOnFeedPost({
        feedId: post._id,
        comment: newComment,
        token: user.token,
      });
      setComments(updatedPost.comments || []);
      setNewComment('');
    } catch (error) {
    }
  };

  const handleCommentKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitComment();
    }
  };

  if (!post) return null;

  const isHighlight = post.feedType === 'highlight' || (!post.media?.length && post.highlightUrl);

  // Create a combined list of all media including content video
  const allMedia = [];
  if (post.content?.video) {
    allMedia.push({ url: post.content.video, type: 'video' });
  }
  if (post.media) {
    post.media.forEach(m => allMedia.push({ ...m, type: m.url.endsWith('.mp4') ? 'video' : 'image' }));
  }
  if (isHighlight && post.highlightUrl) {
    allMedia.push({ url: post.highlightUrl, type: 'video' });
  }

  const currentMedia = allMedia[currentIndex];
  if (!currentMedia) return null;

  const handleNextMedia = (e) => {
    e.stopPropagation();
    if (currentIndex < allMedia.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <ModalOverlay onClick={onClose} data-testid="feed-post-viewer-modal">
      <CloseButton onClick={onClose} style={{ top: '20px', right: '20px', fontSize: '1.5rem' }}>
        <FaTimes />
      </CloseButton>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalCardMedia>
          {currentMedia.type === 'video' ? (
            <video src={currentMedia.url} controls autoPlay loop />
          ) : (
            <img src={currentMedia.url} alt={post.caption || post.title} />
          )}

          {allMedia.length > 1 && (
            <>
              {currentIndex > 0 && (
                <MediaNavigationArrow direction="left" onClick={handlePrevMedia} aria-label="Previous Media">
                  <FaChevronLeft />
                </MediaNavigationArrow>
              )}
              {currentIndex < allMedia.length - 1 && (
                <MediaNavigationArrow direction="right" onClick={handleNextMedia} aria-label="Next Media">
                  <FaChevronRight />
                </MediaNavigationArrow>
              )}
              <DotsContainer>
                {allMedia.map((_, index) => (
                  <Dot
                    key={index}
                    $isActive={index === currentIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                  />
                ))}
              </DotsContainer>
            </>
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
          <ModalCardCaption>{post.caption || post.title}</ModalCardCaption>
          {isCommentsOpen && (
            <>
              <ModalCardComments>
                {comments.map((comment) => (
                  <ModalCardComment key={comment._id}>
                    <ModalCardCommentUser>{comment.user.name}</ModalCardCommentUser>
                    <span>{comment.text}</span>
                  </ModalCardComment>
                ))}
              </ModalCardComments>
              <CommentInputContainer>
                <ModalCardInput
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleCommentKeyDown}
                />
                <SendButton onClick={submitComment}>Send</SendButton>
              </CommentInputContainer>
            </>
          )}
          <ModalCardActions>
            <FaHeart
              style={{ color: isLiked ? 'red' : 'inherit', cursor: 'pointer' }}
              onClick={handleLikeToggle}
            />
            <FaComment
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              style={{ cursor: 'pointer' }}
            />
            <FaPaperPlane />
          </ModalCardActions>
          <LikesContainer>{likesCount} likes</LikesContainer>
        </ModalCardContent>
      </ModalCard>
    </ModalOverlay>
  );
};

export default FeedPostViewerModal;
