import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaPhotoVideo, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import {
  FeedContainer,
  FeedGrid,
  FeedItem,
  FeedImage,
  FeedVideo,
  FeedCaption,
  NoPostsMessage,
  CustomPrevArrow,
  CustomNextArrow,
  MultiMediaIndicator,
  FeedActions,
  ActionButton,
} from '../../styles/CreatorPageStyles';

const getSliderSettings = (itemCount) => ({
  dots: false,
  infinite: itemCount > 3,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: itemCount > 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: itemCount > 1,
      },
    },
  ],
});

const FeedSection = ({
  feeds,
  isLoadingFeeds,
  onPostClick,
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

  const renderMedia = (feed) => {
    if (!feed.media || feed.media.length === 0) return null;

    if (feed.type === 'video') {
      return <FeedVideo src={feed.media[0].url} controls />;
    }

    // Default to image
    return <FeedImage src={feed.media[0].url} alt={feed.caption} />;
  };

  const renderFeedItem = (feed) => {
    const isLiked = feed.likes.includes(user?._id);

    return (
      <FeedItem key={feed._id}>
        <div onClick={() => onPostClick(feed)}>
          {renderMedia(feed)}
          <FeedCaption>{feed.caption}</FeedCaption>
          {feed.media && feed.media.length > 1 && (
            <MultiMediaIndicator>
              <FaPhotoVideo />
            </MultiMediaIndicator>
          )}
        </div>
        <FeedActions>
          <ActionButton onClick={() => onLike(feed._id)} isLiked={isLiked}>
            <FaHeart /> {feed.likes.length}
          </ActionButton>
          <ActionButton onClick={() => onComment(feed._id)}>
            <FaComment /> {feed.comments.length}
          </ActionButton>
          <ActionButton onClick={() => onShare(feed)}>
            <FaShare />
          </ActionButton>
        </FeedActions>
      </FeedItem>
    );
  };

  return (
    <FeedContainer>
      <div className="desktop-slider">
        <Slider {...getSliderSettings(feeds.length)}>
          {feeds.map(renderFeedItem)}
        </Slider>
      </div>
      <div className="mobile-collage">
        <FeedGrid>
          {feeds.map(renderFeedItem)}
        </FeedGrid>
      </div>
    </FeedContainer>
  );
};

export default FeedSection;
