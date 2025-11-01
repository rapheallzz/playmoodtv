
import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaHeart, FaComment } from 'react-icons/fa';
import {
  FeedItem,
  FeedImage,
  FeedPostCardContainer,
  MediaHoverOverlay,
  HoverIcon,
} from '../../styles/CreatorPageStyles';

const FeedPost = ({ feed, onPostClick }) => {
  const [isDragging, setIsDragging] = useState(false);

  const mediaSliderSettings = {
    dots: true,
    infinite: feed.media.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  };

  const handleClick = () => {
    if (!isDragging) {
      onPostClick(feed);
    }
  };

  return (
    <FeedPostCardContainer onClick={handleClick}>
      <FeedItem>
        {feed.media.length > 1 ? (
          <Slider {...mediaSliderSettings}>
            {feed.media.map((mediaItem) => (
              <div key={mediaItem._id}>
                <FeedImage src={mediaItem.url} alt={feed.caption} />
              </div>
            ))}
          </Slider>
        ) : (
          <FeedImage src={feed.media[0].url} alt={feed.caption} />
        )}
        <MediaHoverOverlay className="media-hover-overlay">
          <HoverIcon>
            <FaHeart /> {feed.likes.length}
          </HoverIcon>
          <HoverIcon>
            <FaComment /> {feed.comments.length}
          </HoverIcon>
        </MediaHoverOverlay>
      </FeedItem>
    </FeedPostCardContainer>
  );
};

export default FeedPost;
