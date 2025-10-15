import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  LargeHighlightCircle,
} from '../../styles/CreatorPageStyles';

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

export default function SliderHighlights({ highlights, handleSelectHighlight, recentHighlights, viewedHighlights }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: highlights.length > 8,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipeToSlide: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: highlights.length > 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: highlights.length > 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: highlights.length > 3,
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <SliderContainer>
      <Slider {...settings} ref={sliderRef}>
        {highlights.map((highlight, index) => (
          <div key={highlight._id} className="slides">
            <div
              data-testid={`highlight-item-home-${index}`}
              onClick={() => handleSelectHighlight(highlight, index)}
              style={{ cursor: 'pointer' }}
            >
              <LargeHighlightCircle
                viewed={!recentHighlights.has(highlight._id) && viewedHighlights.has(highlight._id)}
              >
                {highlight.content.thumbnail && (
                  <img src={highlight.content.thumbnail} alt="Highlight thumbnail" />
                )}
              </LargeHighlightCircle>
            </div>
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
}

// Styled Components
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
  margin: 0 auto;

  .slick-slider {
    position: relative;
    overflow: visible;
  }

  // Hide default slick arrows
  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    width: 50px;
    height: 100px;
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
        animation: ${pulse} 1s infinite; // Pulse effect on hover
        background: rgba(0, 0, 0, 0.7); // Slightly darker on hover
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
    padding: 0 10px;
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
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
`;