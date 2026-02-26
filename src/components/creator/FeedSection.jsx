import React from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import {
  FeedContainer,
  FeedGrid,
  FeedItem,
  FeedImage,
  NoPostsMessage,
  FeedPostCardContainer,
  MediaHoverOverlay,
  HoverIcon,
} from '../../styles/CreatorPageStyles';

const FeedSection = ({ feeds, isLoadingFeeds, onPostClick }) => {
  if (isLoadingFeeds) {
    return <NoPostsMessage>Loading feeds...</NoPostsMessage>;
  }

  if (!feeds || feeds.length === 0) {
    return <NoPostsMessage>No feed posts yet.</NoPostsMessage>;
  }

  const renderFeedPost = (feed, index) => {
    const imageUrl = feed.media?.[0]?.url || feed.content?.thumbnail || feed.thumbnail;
    if (!imageUrl) {
      return null;
    }
    return (
      <FeedPostCardContainer key={feed._id} onClick={() => onPostClick(feed, index)}>
        <FeedItem>
          <FeedImage src={imageUrl} alt={feed.caption || feed.title} />
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