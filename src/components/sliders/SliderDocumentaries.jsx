import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import BASE_API_URL from '../../apiConfig';
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

const VideoCategory = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  height: auto;
  box-sizing: border-box;
  z-index: 210;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 5px 0 10px 0;
    padding-bottom: 10px;
    z-index: 210;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: auto;
    margin: 5px 0 15px 0;
    padding-bottom: 10px;
    z-index: 210;
  }
`;

const Videocategorytitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
  padding: 5px 5px 5px 15px;

  @media only screen and (min-width: 769px) {
    font-size: 1.8rem;
    padding: 5px 5px 5px 25px;
  }
`;

export default function SliderDocumentaries({ title }) {
const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_API_URL}/api/content/category?category=Documentaries`);
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setError('Unexpected data format.');
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
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


  const handleViewMore = () => {
    navigate('/documentaries');
  };

  const settings = {
    dots: false,
    infinite: data.length > 5,
    speed: 300,
    slidesToShow: 5,
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
        },
      },
    ],
  };

  if (!loading && data.length === 0) {
    return null;
  }

  return (
    <VideoCategory>
      {title && <Videocategorytitle>{title}</Videocategorytitle>}
      <SliderContainer $isShort={data.length < 5}>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Slider key={data.length} {...settings} ref={sliderRef}>
            {Array.isArray(data) &&
              data.slice(0, 10).map((content) => ( // Limit to 10 slides
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
            {data.length >= 5 && ( // Only show View More if there are 5 or more items
              <div className="slides view-more-slide">
                <ViewMoreSlide>
                  <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
                </ViewMoreSlide>
              </div>
            )}
          </Slider>
        )}

        <ContentModal
          isOpen={isModalOpen}
          content={modalContent}
          onClose={handleCloseModal}
          handleNavigateToMovie={handleNavigateToMovie}
        />
      </SliderContainer>
    </VideoCategory>
  );
}

// Styled Components
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 40px 0 20px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 0 0 10px;
  }

  .slick-slider {
    position: relative;
  }

  /* Force left alignment when items are fewer than slidesToShow */
  ${(props) =>
    props.$isShort &&
    `
    .slick-track {
      margin-left: 0 !important;
      transform: none !important;
    }
  `}

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

  .view-more-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; /* Match the height of other slides */
  }

  @media (max-width: 480px) {
    .custom-arrow {
      display: none !important;
    }
  }
`;

const ViewMoreSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 200px; /* Match Slidercontent max-width */
  margin: 0 auto;
`;

const ViewMoreButton = styled.button`
  padding: 10px 20px;
  background-color: #541011;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  height: 70%; /* Match the height of the Slidercontent image container */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: #3d0c0e;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 16px;
  }
`;