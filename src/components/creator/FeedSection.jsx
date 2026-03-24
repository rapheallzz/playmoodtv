import React from 'react';
import { FaHeart, FaComment, FaTrash, FaClone, FaVideo } from 'react-icons/fa';
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
    // Helper to check if a URL is an image
    const isImage = (url) => {
      if (!url || typeof url !== 'string') return false;
      const cleanUrl = url.split('?')[0].toLowerCase();
      return (
        cleanUrl.endsWith('.jpg') ||
        cleanUrl.endsWith('.jpeg') ||
        cleanUrl.endsWith('.png') ||
        cleanUrl.endsWith('.webp') ||
        cleanUrl.endsWith('.heic')
      );
    };

    // 1. Try to find an image in media array
    let resolvedImage =
      feed.media?.find((m) => isImage(m.url))?.url ||
      feed.media?.find((m) => isImage(m.thumbnail?.url))?.thumbnail?.url;

    // 2. Fallbacks
    if (!resolvedImage) {
      const candidates = [
        feed.thumbnail?.url || feed.thumbnail,
        feed.content?.thumbnail?.url || feed.content?.thumbnail,
        feed.highlightUrl,
        feed.shortPreviewUrl,
        feed.content?.video,
      ];

      // Prioritize actual images from the candidates
      resolvedImage = candidates.find((c) => isImage(c));

      // If still no image found, take the first non-null candidate
      if (!resolvedImage) {
        resolvedImage = candidates.find((c) => !!c);
      }
    }

    // Ensure resolvedImage is a string if it exists
    // Using a data URI for the initial placeholder to avoid external dependency issues
    const placeholderUrl = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232a2a2a%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20fill%3D%22%23888%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Preview%3C%2Ftext%3E%3C%2Fsvg%3E';
    const imageUrl = typeof resolvedImage === 'string' ? resolvedImage : placeholderUrl;

    // Determine unique key for React rendering
    const groupKey = feed.feedType === 'feedPost'
      ? feed._id
      : ((typeof feed.content === 'object' ? feed.content?._id : feed.content) || feed._id);

    // Determine if it's a carousel (multiple images/videos)
    const distinctUrls = new Set();
    if (feed.media) feed.media.forEach(m => { if (m.url) distinctUrls.add(m.url); });
    if (feed.highlightUrl) distinctUrls.add(feed.highlightUrl);
    if (feed.shortPreviewUrl) distinctUrls.add(feed.shortPreviewUrl);
    if (feed.content?.video) distinctUrls.add(feed.content.video);
    if (feed.content?.thumbnail) distinctUrls.add(feed.content.thumbnail.url || feed.content.thumbnail);
    if (feed.thumbnail) distinctUrls.add(feed.thumbnail.url || feed.thumbnail);

    const firstMedia = feed.media?.[0];
    const isCarousel = distinctUrls.size > 1;
    const isVideo = feed.type === 'video' || !!feed.highlightUrl || !!feed.shortPreviewUrl || !!feed.content?.video || firstMedia?.url?.toLowerCase().endsWith('.mp4') || firstMedia?.type?.startsWith('video/');

    return (
      <FeedPostCardContainer key={groupKey} onClick={() => onPostClick(feed, index)}>
        <FeedItem>
          <FeedImage
            src={imageUrl}
            alt={feed.caption || feed.title}
            onError={(e) => {
              // Switch to a data URI placeholder on error to stop any network loops
              e.target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%232a2a2a%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20fill%3D%22%23888%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Preview%3C%2Ftext%3E%3C%2Fsvg%3E';
              e.target.onerror = null; // Prevent infinite loop
            }}
          />
          {isCarousel ? (
            <CarouselIcon>
              <FaClone size={14} />
            </CarouselIcon>
          ) : isVideo ? (
            <CarouselIcon>
              <FaVideo size={12} />
            </CarouselIcon>
          ) : null}
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
      <FeedGrid>{feeds.map(renderFeedPost)}</FeedGrid>
    </FeedContainer>
  );
};

export default FeedSection;