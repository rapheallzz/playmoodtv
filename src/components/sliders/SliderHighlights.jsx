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

import { useState, useEffect } from 'react';

export default function SliderHighlights({ highlights, handleSelectHighlight, recentHighlights, viewedHighlights }) {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchStartTime = useRef(0);
  const holdTimer = useRef(null);
  const [isHoldTriggered, setIsHoldTriggered] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e) => {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    touchStart.current = { x: clientX, y: clientY };
    touchStartTime.current = Date.now();
    setIsHoldTriggered(false);

    if (isMobile) {
      holdTimer.current = setTimeout(() => {
        setIsHoldTriggered(true);
      }, 200);
    }
  };

  const handleTouchMove = (e) => {
    if (!touchStartTime.current) return;
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

    const distance = Math.sqrt(
      Math.pow(clientX - touchStart.current.x, 2) +
      Math.pow(clientY - touchStart.current.y, 2)
    );

    if (distance > 10) {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
        holdTimer.current = null;
      }
      setIsHoldTriggered(false);
    }
  };

  const handleTouchEnd = (e, highlight, index) => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (isMobile && isHoldTriggered && e.cancelable) {
      e.preventDefault();
    }

    const clientX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e.type === 'mouseup' ? e.clientY : e.changedTouches[0].clientY;
    const distance = Math.sqrt(
      Math.pow(clientX - touchStart.current.x, 2) +
      Math.pow(clientY - touchStart.current.y, 2)
    );

    if (distance < 10) {
      const duration = Date.now() - touchStartTime.current;
      if (isMobile) {
        if (duration < 300 && !isHoldTriggered) {
          if (e.cancelable) e.preventDefault();
          handleSelectHighlight(highlight, index);
        }
      } else {
        handleSelectHighlight(highlight, index);
      }
    }

    setIsHoldTriggered(false);
    touchStartTime.current = 0;
  };

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
    lazyLoad: false,
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
          slidesToShow: 3.5,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: false,
          arrows: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          centerMode: false,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <SliderContainer $isShort={highlights.length < 8}>
      <Slider key={highlights.length} {...settings} ref={sliderRef}>
        {highlights.map((highlight, index) => (
          <div key={highlight._id} className="slides">
            <div
              data-testid={`highlight-item-home-${index}`}
              onMouseDown={handleTouchStart}
              onTouchStart={handleTouchStart}
              onMouseMove={handleTouchMove}
              onTouchMove={handleTouchMove}
              onMouseUp={(e) => handleTouchEnd(e, highlight, index)}
              onTouchEnd={(e) => handleTouchEnd(e, highlight, index)}
              onTouchCancel={(e) => handleTouchEnd(e, highlight, index)}
              style={{ cursor: 'pointer' }}
            >
              <LargeHighlightCircle
                viewed={!recentHighlights.has(highlight._id) && viewedHighlights.has(highlight._id)}
              >
                {(highlight.content?.thumbnail || highlight.thumbnail) && (
                  <img src={highlight.content?.thumbnail || highlight.thumbnail} alt="Highlight thumbnail" />
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
  padding: 5px 40px 5px 15px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 0 0 10px;
  }

  .slick-slider {
    position: relative;
    overflow: visible;
  }

  /* Force left alignment when items are fewer than slidesToShow on desktop */
  @media (min-width: 1025px) {
    ${(props) =>
      props.$isShort &&
      `
      .slick-track {
        margin-left: 0 !important;
        transform: none !important;
      }
    `}
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
      right: 0;
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
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }

  .slides {
    position: relative;
    display: flex;
    align-items: center;
    height: auto !important;
  }

  @media (max-width: 480px) {
    width: 100%; /* Ensure full width on mobile */
    margin: 0 auto;

    .custom-arrow {
      display: none !important;
    }
  }
`;