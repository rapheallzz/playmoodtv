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

export default function SliderSoon() {
const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Requesting data from API');
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        console.log('API response:', response);
        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data.filter((content) => content.category === 'Documentarie');
          console.log('Filtered Documentaries data:', filteredData);
          setData(filteredData);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
    console.log('Navigating to movie with slug:', slug);
    navigate(`/movie/${slug}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <SliderContainer>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Slider {...settings} ref={sliderRef}>
          {Array.isArray(data) &&
            data.map((content) => (
              <div key={content._id} className="slides">
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
    display: flex;
    align-items: center;
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