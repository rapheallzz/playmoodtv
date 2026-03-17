
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaHeart, FaComment, FaPaperPlane, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import contentService from '../../features/contentService';
import UniversalShareModal from './UniversalShareModal';
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
  LikesContainer,
  CommentInputContainer,
  SendButton,
} from '../../styles/CreatorPageStyles';

const FeedPostViewerModal = ({ post, onClose, onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
  };

  const onTouchMove = (e) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    // Only trigger if horizontal movement is greater than vertical movement
    // to avoid triggering when scrolling comments
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe && typeof onNext === 'function') {
        onNext();
      } else if (isRightSwipe && typeof onPrev === 'function') {
        onPrev();
      }
    }
  };
  const { user } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

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

  const handleShare = () => {
    if (post) {
      const creator = post.user;
      const creatorSlug = `${creator.name.replace(/\s+/g, '-')}-${btoa(creator._id)}`;
      const params = new URLSearchParams();
      params.append('feedId', post._id);
      if (post.content?.thumbnail) params.append('img', post.content.thumbnail);
      else if (post.thumbnail) params.append('img', post.thumbnail);

      const video = post.highlightUrl || post.content?.video;
      if (video) params.append('video', video);

      const url = `${window.location.origin}/creator/${creatorSlug}?${params.toString()}`;
      setShareUrl(url);
      setIsShareModalOpen(true);
    }
  };

  if (!post) return null;

  const isHighlight = post.feedType === 'highlight' || (!post.media?.length && post.highlightUrl);

  // Create a combined list of all media including content video, highlight, and thumbnails
  const allMedia = [];
  const addedUrls = new Set();

  const addMediaItem = (url, type) => {
    if (url && !addedUrls.has(url)) {
      allMedia.push({ url, type: type || (url.endsWith('.mp4') ? 'video' : 'image') });
      addedUrls.add(url);
    }
  };

  // 1. Highlight Video
  if (post.highlightUrl) {
    addMediaItem(post.highlightUrl, 'video');
  }

  // 2. Content Video
  if (post.content?.video) {
    addMediaItem(post.content.video, 'video');
  }

  // 3. Content Thumbnail
  if (post.content?.thumbnail) {
    addMediaItem(post.content.thumbnail, 'image');
  }

  // 4. Post Thumbnail
  if (post.thumbnail) {
    addMediaItem(post.thumbnail, 'image');
  }

  // 5. Additional Media Array
  if (post.media) {
    post.media.forEach((m) => addMediaItem(m.url));
  }

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
      <CloseButton onClick={onClose}>
        <FaTimes />
      </CloseButton>
      <ModalCard
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <ModalCardMedia>
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={allMedia.length > 1}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            className="w-full h-full"
            style={{
              '--swiper-pagination-color': '#fff',
              '--swiper-navigation-color': '#fff',
              '--swiper-navigation-size': '25px',
            }}
          >
            {allMedia.map((media, idx) => (
              <SwiperSlide key={idx} className="flex items-center justify-center">
                {media.type === 'video' ? (
                  <video src={media.url} controls autoPlay={idx === currentIndex} loop className="max-w-full max-h-full object-contain" />
                ) : (
                  <img src={media.url} alt={post.caption || post.title} className="max-w-full max-h-full object-contain" />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Post Navigation Arrows positioned over media */}
          <NavigationArrow
            className="prev-arrow"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <FaChevronLeft />
          </NavigationArrow>
          <NavigationArrow
            className="next-arrow"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <FaChevronRight />
          </NavigationArrow>
        </ModalCardMedia>
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
            <FaPaperPlane onClick={handleShare} style={{ cursor: 'pointer' }} />
          </ModalCardActions>
          <LikesContainer>{likesCount} likes</LikesContainer>
        </ModalCardContent>
      </ModalCard>
      {isShareModalOpen && (
        <UniversalShareModal
          shareUrl={shareUrl}
          title={post.caption || post.title}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </ModalOverlay>
  );
};

export default FeedPostViewerModal;
