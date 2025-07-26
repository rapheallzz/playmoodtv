import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Pulse animation for right arrow
const pulse = keyframes`
  0% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.1); }
  100% { transform: translateY(-50%) scale(1); }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 20px;

  .slider-container {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
    }
  }

  .slider-item {
    flex: 0 0 ${({ slidesToShow }) => 100 / slidesToShow}%;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .custom-arrow {
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
        animation: ${pulse} 1s infinite;
        background: rgba(0, 0, 0, 0.7);
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }

  &:hover .custom-arrow {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    .slider-item {
      flex: 0 0 ${({ slidesToShow }) => 100 / slidesToShow.tablet}%;
    }
  }

  @media (max-width: 600px) {
    .slider-item {
      flex: 0 0 ${({ slidesToShow }) => 100 / slidesToShow.mobile}%;
    }
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    .slider-item {
      flex: 0 0 ${({ slidesToShow }) => 100 / slidesToShow.smallMobile}%;
      padding: 0 2px;
    }
    .custom-arrow {
      display: none !important;
    }
  }
`;

const CustomSlider = ({ children, settings }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(settings.initialSlide || 0);
  const [slidesToShow, setSlidesToShow] = useState({
    desktop: settings.slidesToShow || 5,
    tablet: settings.responsive?.find(r => r.breakpoint === 1024)?.settings.slidesToShow || 3,
    mobile: settings.responsive?.find(r => r.breakpoint === 600)?.settings.slidesToShow || 2,
    smallMobile: settings.responsive?.find(r => r.breakpoint === 480)?.settings.slidesToShow || 2,
  });

  const totalSlides = React.Children.count(children);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  // Responsive slidesToShow based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSlidesToShow(prev => ({ ...prev, current: prev.smallMobile }));
      } else if (window.innerWidth <= 600) {
        setSlidesToShow(prev => ({ ...prev, current: prev.mobile }));
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(prev => ({ ...prev, current: prev.tablet }));
      } else {
        setSlidesToShow(prev => ({ ...prev, current: prev.desktop }));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShow.desktop, slidesToShow.tablet, slidesToShow.mobile, slidesToShow.smallMobile]);

  // Scroll to current slide
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.scrollWidth / totalSlides;
      sliderRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex, totalSlides]);

  const handleNext = () => {
    if (currentIndex < totalSlides - slidesToShow.current) {
      setCurrentIndex(prev => prev + (settings.slidesToScroll || 1));
    } else if (settings.infinite) {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - (settings.slidesToScroll || 1));
    } else if (settings.infinite) {
      setCurrentIndex(totalSlides - slidesToShow.current);
    }
  };

  // Touch handling
  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    const deltaX = touchStart.current.x - touchEnd.current.x;
    const deltaY = Math.abs(touchStart.current.y - touchEnd.current.y);
    const threshold = settings.touchThreshold * 10 || 100;

    if (deltaY < 50 && Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <SliderWrapper slidesToShow={slidesToShow}>
      <div
        className="slider-container"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, index) => (
          <div className="slider-item" key={index}>
            {child}
          </div>
        ))}
      </div>
      {settings.arrows !== false && (
        <>
          <div className="custom-arrow prev-arrow" onClick={handlePrev}>
            <FaChevronLeft className="arrow-icon" />
          </div>
          <div className="custom-arrow next-arrow" onClick={handleNext}>
            <FaChevronRight className="arrow-icon" />
          </div>
        </>
      )}
    </SliderWrapper>
  );
};

export default CustomSlider;