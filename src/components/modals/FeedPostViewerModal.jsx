import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Modal,
  ModalContent,
  CloseButton,
  FeedImage,
} from '../../styles/CreatorPageStyles';

const FeedPostViewerModal = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post || !post.media) return null;

  const sliderSettings = {
    dots: true,
    infinite: post.media.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Slider {...sliderSettings}>
          {post.media.map((mediaItem) => (
            <div key={mediaItem.public_id}>
              <FeedImage src={mediaItem.url} alt={post.caption} />
            </div>
          ))}
        </Slider>
      </ModalContent>
    </Modal>
  );
};

export default FeedPostViewerModal;
