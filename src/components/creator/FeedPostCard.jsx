import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHeart, FaComment, FaShare, FaPhotoVideo } from 'react-icons/fa';
import {
  FeedPostCardContainer,
  PostHeader,
  PostProfileImage,
  PostCreator,
  FeedImage,
  FeedVideo,
  CardActions,
  FeedActionButton,
  LikesCounter,
  CardCaption,
  UserInfo,
  Username,
  OptionsButton,
  CardMedia,
  MediaSlider,
} from '../../styles/CreatorPageStyles';

const FeedPostCard = ({ post, onLike, onComment, onShare, user }) => {
  const isLiked = post.likes.includes(user?._id);

  const sliderSettings = {
    dots: true,
    infinite: post.media.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderMedia = () => {
    if (post.media.length > 1) {
      return (
        <Slider {...sliderSettings}>
          {post.media.map((mediaItem) => (
            <div key={mediaItem.public_id}>
              <FeedImage src={mediaItem.url} alt={post.caption} />
            </div>
          ))}
        </Slider>
      );
    }

    if (post.type === 'video') {
      return <FeedVideo src={post.media[0].url} controls />;
    }

    return <FeedImage src={post.media[0].url} alt={post.caption} />;
  };

  return (
    <FeedPostCardContainer>
      <PostHeader>
        <UserInfo>
          <PostProfileImage src={post.user.profileImage} alt={post.user.name} />
          <Username>{post.user.name}</Username>
        </UserInfo>
        <OptionsButton>...</OptionsButton>
      </PostHeader>
      <CardMedia>
        {renderMedia()}
      </CardMedia>
      <CardActions>
        <div>
          <FeedActionButton onClick={() => onLike(post._id)} className={isLiked ? 'liked' : ''}>
            <FaHeart />
          </FeedActionButton>
          <FeedActionButton onClick={() => onComment(post)}>
            <FaComment />
          </FeedActionButton>
          <FeedActionButton onClick={() => onShare(post)}>
            <FaShare />
          </FeedActionButton>
        </div>
      </CardActions>
      <LikesCounter>{post.likes.length} likes</LikesCounter>
      <CardCaption>
        <p>
          <Username>{post.user.name}</Username>
          {post.caption}
        </p>
      </CardCaption>
    </FeedPostCardContainer>
  );
};

export default FeedPostCard;
