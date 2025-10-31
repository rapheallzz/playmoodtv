import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeedPostCard from './FeedPostCard';
import {
  FeedContainer,
  FeedGrid,
  NoPostsMessage,
  StyledSliderContainer,
  CustomNextArrow,
  CustomPrevArrow,
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

  const sliderSettings = {
    dots: false,
    infinite: feeds.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: feeds.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: feeds.length > 1,
        },
      },
    ],
  };

  return (
    <FeedContainer>
      <div className="desktop-slider">
        <StyledSliderContainer>
          <Slider {...sliderSettings}>
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
          </Slider>
        </StyledSliderContainer>
      </div>
      <div className="mobile-collage">
        <FeedGrid>
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
        </FeedGrid>
      </div>
    </FeedContainer>
  );
};

export default FeedSection;
