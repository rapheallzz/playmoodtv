import React from 'react';
import FeedPostCard from './FeedPostCard';
import {
  FeedContainer,
  FeedGrid,
  NoPostsMessage,
} from '../../styles/CreatorPageStyles';

const FeedSection = ({
  feeds,
  isLoadingFeeds,
  onLike,
  onComment,
  onShare,
  user,
}) => {
  if (isLoadingFeeds) {
    return <NoPostsMessage>Loading feeds...</NoPostsMessage>;
  }

  if (!feeds || feeds.length === 0) {
    return <NoPostsMessage>No feed posts yet.</NoPostsMessage>;
  }

  return (
    <FeedContainer>
      {feeds.map((feed) => (
        <FeedPostCard
          key={feed._id}
          post={feed}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          user={user}
        />
      ))}
    </FeedContainer>
  );
};

export default FeedSection;
