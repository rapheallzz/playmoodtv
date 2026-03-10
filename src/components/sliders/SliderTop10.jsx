import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from '../Slidercont';
import { useNavigate } from 'react-router-dom';
import ContentModal from '../ContentModal';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

export default function Slidertop10() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data
            .filter((content) => content.category === 'Top 10')
            .slice(0, 10);
          setData(filteredData);
        } else {
          setError('Unexpected data format.');
        }
      } catch (error) {
        setError('Error fetching data.');
      }
    }

    fetchData();
  }, []);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const createSlug = (title, _id) => {
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${formattedTitle}-${_id}`;
  };

  const handleNavigateToMovie = (content) => {
    const slug = createSlug(content.title, content._id);
    navigate(`/movie/${slug}`);
  };

  const settings = {
    dots: false,
    infinite: data.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    touchThreshold: 10,
    swipeToSlide: true,
    lazyLoad: false,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: data.length > 3,
        dots: true,
        arrows: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: false,
        arrows: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        centerMode: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        touchThreshold: 10,
      },
    },
  ],
};

  return (
    <SliderContainer>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Slider key={data.length} {...settings} ref={sliderRef}>
          {Array.isArray(data) &&
            data.map((content, index) => (
              <div key={content._id} className="slides">
                <h1 className="movie-ids" aria-label={`Rank ${index + 1}`}>
                  {index + 1}
                </h1>
                <Slidercontent
                  img={content.thumbnail}
                  title={content.title}
                  movie={content}
                  views={content.views}
                  desc={content.description}
                  customStyle={{}}
                  onVideoClick={() => handleOpenModal(content)}
                />
              </div>
            ))}
        </Slider>
      )}

      <ContentModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={handleCloseModal}
        handleNavigateToMovie={handleNavigateToMovie}
      />
    </SliderContainer>
  );
}

// Styled Components
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0;
  }

  .slick-slider {
    position: relative;
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
    padding: 0 5px;
  }

  .slides {
    position: relative;
    padding: 0 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .movie-ids {
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 110px;
    font-weight: 900;
    z-index: 5;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
    font-style: italic;
    pointer-events: none;
    margin: 0;
    line-height: 1;
  }

  @media (max-width: 1024px) {
    .movie-ids {
      font-size: 90px;
      left: -12px;
    }
  }

  @media (max-width: 768px) {
    .movie-ids {
      font-size: 70px;
      left: -10px;
    }
  }

  @media (max-width: 480px) {
    .movie-ids {
      font-size: 60px;
      left: -8px;
    }
  }

  .slick-slide {
    padding: 0 5px;
  }
`;