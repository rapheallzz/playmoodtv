import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CreatorContentModal from '../CreatorContentModal';
import Slidercirclecontent from '../Slidercirclecontent';

// Pulse animation for right arrow
const pulse = keyframes`
  0% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
  }
  100% {
    transform: translateY(-50%) scale(1);
  }
`;

// Custom Arrow Components
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <FaChevronLeft className="arrow-icon" />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <FaChevronRight className="arrow-icon" />
    </div>
  );
};

// Styled Container for Slider
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
    touch-action: pan-y; /* Allow vertical scrolling, enable horizontal swipe */
  }

  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 120px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    opacity: 0;

    &.prev-arrow {
      left: -10px;
    }

    &.next-arrow {
      right: -10px;
      &:hover {
        animation: ${pulse} 1s infinite;
        background: rgba(0, 0, 0, 0.7);
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slick-slide {
    padding: 0 12px;
    min-height: 160px;
    @media (min-width: 768px) {
      min-height: 200px;
    }
    @media (max-width: 480px) {
      min-height: 40vw;
      max-height: 140px;
    }
    @media (max-width: 360px) {
      min-height: 35vw;
      max-height: 120px;
    }
  }

  .slidescircle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    -webkit-touch-callout: none;
    width: 160px;
    height: 160px;
    @media (min-width: 768px) {
      width: 200px;
      height: 200px;
    }
    @media (max-width: 480px) {
      width: 40vw;
      height: 40vw;
      max-width: 140px;
      max-height: 140px;
    }
    @media (max-width: 360px) {
      width: 35vw;
      height: 35vw;
      max-width: 120px;
      max-height: 120px;
    }
  }

  @media (max-width: 1024px) {
    padding: 0 15px;
  }

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    .custom-arrow {
      display: none !important;
    }
  }
`;

export default function SliderSubscriptions({ subscriptions }) {
  const [modalCreator, setModalCreator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (creator) => {
    setModalCreator(creator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalCreator(null);
  };

  const numSubscriptions = subscriptions ? subscriptions.length : 0;
  const slidesToShow = Math.max(1, Math.min(numSubscriptions, 4));

  const settings = {
    dots: false,
    infinite: numSubscriptions > slidesToShow,
    speed: 300,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipeToSlide: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.max(1, Math.min(numSubscriptions, 3)),
          slidesToScroll: 1,
          infinite: numSubscriptions > Math.max(1, Math.min(numSubscriptions, 3)),
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.max(1, Math.min(numSubscriptions, 2)),
          slidesToScroll: 1,
          arrows: true,
          centerMode: true,
          centerPadding: '15px',
          infinite: numSubscriptions > Math.max(1, Math.min(numSubscriptions, 2)),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.max(1, Math.min(numSubscriptions, 2)),
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '5px',
          infinite: numSubscriptions > Math.max(1, Math.min(numSubscriptions, 2)),
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: Math.max(1, Math.min(numSubscriptions, 2)),
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          infinite: numSubscriptions > Math.max(1, Math.min(numSubscriptions, 2)),
        },
      },
    ],
  };

  return (
    <SliderContainer>
      {!subscriptions || subscriptions.length === 0 ? (
        <div className="error-message">No subscriptions found.</div>
      ) : (
        <>
          <Slider {...settings}>
            {subscriptions.map((creator) => (
                <div key={creator._id} className="slidescircle">
                  <Slidercirclecontent
                    img={creator.profileImage}
                    movie={creator}
                    onVideoClick={() => handleOpenModal(creator)}
                  />
                </div>
              ))}
          </Slider>
          <CreatorContentModal
            isOpen={isModalOpen}
            creator={modalCreator}
            onClose={handleCloseModal}
          />
        </>
      )}
    </SliderContainer>
  );
}