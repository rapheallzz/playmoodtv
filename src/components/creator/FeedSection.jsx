import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FeedContainer,
  FeedGrid,
  FeedItem,
  FeedImage,
  FeedCaption,
  NoPostsMessage,
  CustomPrevArrow,
  CustomNextArrow,
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

const FeedSection = ({ feeds, isLoadingFeeds }) => {
  if (isLoadingFeeds) {
    return <NoPostsMessage>Loading feeds...</NoPostsMessage>;
  }

  if (!feeds || feeds.length === 0) {
    return <NoPostsMessage>No feed posts yet.</NoPostsMessage>;
  }

  return (
    <FeedContainer>
      <div className="desktop-slider">
        <Slider {...getSliderSettings(feeds.length)}>
          {feeds.map((feed) => (
            <FeedItem key={feed._id}>
              <FeedImage src={feed.media[0].url} alt={feed.caption} />
              <FeedCaption>{feed.caption}</FeedCaption>
            </FeedItem>
          ))}
        </Slider>
      </div>
      <div className="mobile-collage">
        <FeedGrid>
          {feeds.map((feed) => (
            <FeedItem key={feed._id}>
              <FeedImage src={feed.media[0].url} alt={feed.caption} />
              <FeedCaption>{feed.caption}</FeedCaption>
            </FeedItem>
          ))}
        </FeedGrid>
      </div>
    </FeedContainer>
  );
};

export default FeedSection;