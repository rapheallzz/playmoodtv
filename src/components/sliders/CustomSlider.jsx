import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContentModal from "../ContentModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slidercontent from "../CustomSlidercontent";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: ${({ translateX }) => `translateX(-${translateX}px)`};
  user-select: none;
`;

const Slide = styled.div`
  flex: 0 0 ${({ slideWidth }) => slideWidth}px;
  position: relative;
  padding: 0 5px;
  box-sizing: border-box;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ glow }) =>
    glow &&
    `
    animation: glow 1.5s infinite alternate;
    @keyframes glow {
      from { box-shadow: 0 0 5px white; }
      to { box-shadow: 0 0 15px white; }
    }
  `}
  ${({ direction }) =>
    direction === "left" ? "left: 10px;" : "right: 10px;"}
`;

const SpotsLayer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  z-index: 20;
`;

const Spot = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${({ img }) => img});
  background-size: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid ${({ active }) => (active ? "#ff0000" : "transparent")};
`;

const CustomSlider = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [showSpots, setShowSpots] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const indicationRef = useRef(null);

  // Responsive slide settings
  const getSlidesToShow = () => {
    const width = window.innerWidth;
    if (width <= 480) return { slidesToShow: 1, slideWidth: window.innerWidth };
    if (width <= 600) return { slidesToShow: 2, slideWidth: window.innerWidth / 2 };
    if (width <= 1024) return { slidesToShow: 3, slideWidth: window.innerWidth / 3 };
    return { slidesToShow: 5, slideWidth: window.innerWidth / 5 };
  };

  const [slideSettings, setSlideSettings] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => setSlideSettings(getSlidesToShow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/"
        );
        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data
            .filter((content) => content.category === "Top 10")
            .slice(0, 10);
          setData(filteredData);
        } else {
          setError("Unexpected data format.");
        }
      } catch (error) {
        setError("Error fetching data.");
      }
    }
    fetchData();
  }, []);

  // Auto-slide logic
  const startAutoSlide = () => {
    autoSlideRef.current = setInterval(() => {
      if (!isHolding && !isHovering && !showSpots) {
        setCurrentIndex((prev) => (prev + 1) % data.length);
      }
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideRef.current);
  };

  // Slide indication animation
  const triggerSlideIndication = () => {
    indicationRef.current = setTimeout(() => {
      if (!isHolding && !isHovering && !showSpots) {
        setTranslateX((prev) => prev + slideSettings.slideWidth * 0.1);
        setShowGlow(true);
        setTimeout(() => {
          setTranslateX((prev) => prev - slideSettings.slideWidth * 0.1);
          setShowGlow(false);
        }, 1000);
      }
    }, 3000);
  };

  useEffect(() => {
    if (data.length) {
      startAutoSlide();
      triggerSlideIndication();
    }
    return () => {
      stopAutoSlide();
      clearTimeout(indicationRef.current);
    };
  }, [data, isHolding, isHovering, showSpots]);

  // Update translateX based on currentIndex
  useEffect(() => {
    if (data.length) {
      const maxIndex = Math.max(0, data.length - slideSettings.slidesToShow);
      const boundedIndex = Math.min(currentIndex, maxIndex);
      setTranslateX(boundedIndex * slideSettings.slideWidth);
    }
  }, [currentIndex, slideSettings, data]);

  // Handle drag
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleDragStart = (e) => {
    setIsHolding(true);
    setShowSpots(true);
    stopAutoSlide();
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e) => {
    if (!isHolding || dragStart === null) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const offset = dragStart - clientX;
    setDragOffset(offset);
    setTranslateX((prev) => prev + offset);
    setDragStart(clientX);
  };

  const handleDragEnd = () => {
    setIsHolding(false);
    const threshold = slideSettings.slideWidth * 0.3;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, data.length - slideSettings.slidesToShow));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
    setDragStart(null);
    setDragOffset(0);
    setShowSpots(false);
    if (!isHovering) startAutoSlide();
  };

  // Combined onMouseLeave handler
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isHolding) {
      handleDragEnd(); // End drag if in progress
    }
    if (!isHolding && !showSpots) {
      startAutoSlide();
    }
  };

  // Navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    stopAutoSlide();
    startAutoSlide();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, data.length - slideSettings.slidesToShow));
    stopAutoSlide();
    startAutoSlide();
  };

  // Modal and navigation
  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    stopAutoSlide();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    startAutoSlide();
  };

  const createSlug = (title, _id) => {
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `${formattedTitle}-${_id}`;
  };

  const handleNavigateToMovie = (content) => {
    const slug = createSlug(content.title, content._id);
    navigate(`/movie/${slug}`);
  };

  // Spot click
  const handleSpotClick = (index) => {
    setCurrentIndex(index);
    setShowSpots(false);
    stopAutoSlide();
  };

  return (
    <>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <SliderContainer
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave} // Single onMouseLeave handler
          ref={sliderRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <Arrow direction="left" glow={showGlow} onClick={handlePrev}>
            <FaArrowLeft />
          </Arrow>
          <Arrow direction="right" glow={showGlow} onClick={handleNext}>
            <FaArrowRight />
          </Arrow>
          <SlidesWrapper translateX={translateX}>
            {data.map((content, index) => (
              <Slide key={content._id} slideWidth={slideSettings.slideWidth}>
                <h1 className="movie-id">{index + 1}</h1>
                <Slidercontent
  img={content.thumbnail}
  title={content.title}
  movie={content}
  views={content.views}
  desc={content.description}
  customStyle={{}}
  onVideoClick={() => handleOpenModal(content)}
  onHoverStart={() => setIsHovering(true)}
  onHoverEnd={() => {
    setIsHovering(false);
    if (!isHolding && !showSpots) startAutoSlide();
  }}
/>
              </Slide>
            ))}
          </SlidesWrapper>
          {showSpots && (
            <SpotsLayer>
              {data.map((content, index) => (
                <Spot
                  key={content._id}
                  img={content.thumbnail}
                  active={index === currentIndex}
                  onClick={() => handleSpotClick(index)}
                />
              ))}
            </SpotsLayer>
          )}
        </SliderContainer>
      )}
      <ContentModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={handleCloseModal}
        handleNavigateToMovie={handleNavigateToMovie}
      />
    </>
  );
};

export default CustomSlider;