import React from 'react';
import { FaHeart, FaComment, FaTrash, FaClone } from 'react-icons/fa';
import Swal from 'sweetalert2';
import {
  FeedContainer,
  FeedGrid,
  FeedItem,
  FeedImage,
  CarouselIcon,
  NoPostsMessage,
  FeedPostCardContainer,
  MediaHoverOverlay,
  HoverIcon,
  FeedDeleteButton,
} from '../../styles/CreatorPageStyles';

const FeedSection = ({ feeds, isLoadingFeeds, onPostClick, onDelete }) => {
  if (isLoadingFeeds) {
    return <NoPostsMessage>Loading feeds...</NoPostsMessage>;
  }

  if (!feeds || feeds.length === 0) {
    return <NoPostsMessage>No feed posts yet.</NoPostsMessage>;
  }

  // Group feeds that belong to the same content
  const processedFeeds = feeds.reduce((acc, feed) => {
    const contentId = feed.content?._id || feed._id;
    const existingIndex = acc.findIndex(item => (item.content?._id || item._id) === contentId);

    if (existingIndex !== -1) {
      // Group with existing post
      const existing = acc[existingIndex];
      if (feed.media && feed.media.length > 0) {
        existing.media = existing.media ? [...existing.media, ...feed.media] : [...feed.media];
      }
      if (feed.content?.video && !existing.content?.video) {
        existing.content = existing.content ? { ...existing.content, video: feed.content.video } : { video: feed.content.video };
      }
    } else {
      // Create new grouped entry (deep copy to avoid modifying original prop)
      acc.push(JSON.parse(JSON.stringify(feed)));
    }

    return acc;
  }, []);

  const handleDelete = async (e, postId) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#541011',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await onDelete(postId);
        Swal.fire(
          'Deleted!',
          'Your feed post has been deleted.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          error.message || 'Failed to delete feed post.',
          'error'
        );
      }
    }
  };

  const renderFeedPost = (feed, index) => {
    const firstMedia = feed.media?.[0];
    const imageUrl = firstMedia?.thumbnail?.url || firstMedia?.url || feed.content?.thumbnail || feed.thumbnail;

    if (!imageUrl) {
      return null;
    }

    // Determine if it's a carousel (multiple images/videos)
    let mediaCount = 0;
    if (feed.media) mediaCount += feed.media.length;
    if (feed.highlightUrl) mediaCount++;
    if (feed.content?.video) mediaCount++;
    if (feed.content?.thumbnail) mediaCount++;
    if (feed.thumbnail) mediaCount++;
    // Correct logic for distinct media items (some URLs might overlap)
    const distinctUrls = new Set();
    if (feed.media) feed.media.forEach(m => distinctUrls.add(m.url));
    if (feed.highlightUrl) distinctUrls.add(feed.highlightUrl);
    if (feed.content?.video) distinctUrls.add(feed.content.video);
    if (feed.content?.thumbnail) distinctUrls.add(feed.content.thumbnail);
    if (feed.thumbnail) distinctUrls.add(feed.thumbnail);
    const isCarousel = distinctUrls.size > 1;

    return (
      <FeedPostCardContainer key={feed._id} onClick={() => onPostClick(feed, index)}>
        <FeedItem>
          <FeedImage src={imageUrl} alt={feed.caption || feed.title} />
          {isCarousel && (
            <CarouselIcon>
              <FaClone size={14} />
            </CarouselIcon>
          )}
          {onDelete && (
            <FeedDeleteButton onClick={(e) => handleDelete(e, feed._id)} title="Delete Feed Post">
              <FaTrash size={14} />
            </FeedDeleteButton>
          )}
          <MediaHoverOverlay className="media-hover-overlay">
            <HoverIcon>
              <FaHeart /> {feed.likes?.length || feed.content?.likesCount || 0}
            </HoverIcon>
            <HoverIcon>
              <FaComment /> {feed.comments?.length || feed.content?.commentsCount || 0}
            </HoverIcon>
          </MediaHoverOverlay>
        </FeedItem>
      </FeedPostCardContainer>
    );
  };

  return (
    <FeedContainer>
      <FeedGrid>{processedFeeds.map(renderFeedPost)}</FeedGrid>
    </FeedContainer>
  );
};

export default FeedSection;