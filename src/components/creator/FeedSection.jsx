import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHeart, FaComment } from 'react-icons/fa';
import {
  FeedContainer,
  FeedGrid,
  FeedItem,
  FeedImage,
  NoPostsMessage,
  CustomPrevArrow,
  CustomNextArrow,
  FeedPostCardContainer,
  MediaHoverOverlay,
  HoverIcon,
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

const FeedSection = ({ feeds, isLoadingFeeds, onPostClick }) => {
  if (isLoadingFeeds) {
    return <NoPostsMessage>Loading feeds...</NoPostsMessage>;
  }

  if (!feeds || feeds.length === 0) {
    return <NoPostsMessage>No feed posts yet.</NoPostsMessage>;
  }

  const renderFeedPost = (feed) => {
    const mediaSliderSettings = {
      dots: true,
      infinite: feed.media.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };

    return (
      <FeedPostCardContainer key={feed._id} onClick={() => onPostClick(feed)}>
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

  return (
    <FeedContainer>
      <div className="desktop-slider">
        <Slider {...getSliderSettings(feeds.length)}>
          {feeds.map(renderFeedPost)}
        </Slider>
      </div>
      <div className="mobile-collage">
        <FeedGrid>{feeds.map(renderFeedPost)}</FeedGrid>
      </div>
    </FeedContainer>
  );
};

export default FeedSection;