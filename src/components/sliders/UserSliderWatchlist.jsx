// In src/components/sliders/UserWatchlist.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from '../Slidercont';
import { useNavigate } from 'react-router-dom';
import ContentModal from '../ContentModal';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Add jwt-decode

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

export default function UserWatchlist() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);
  const { user, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !userToken) {
        console.warn('User or userToken is undefined, skipping fetch');
        setData([]);
        navigate('/login');
        return;
      }

      // Derive userId from user.userId or token
      let userId;
      try {
        const decoded = jwtDecode(userToken);
        userId = user.userId || decoded.id || user._id;
        if (!userId) {
          throw new Error('No userId found in user or token');
        }
        // Validate token expiration
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.warn('Token expired, redirecting to login');
          setData([]);
          navigate('/login');
          return;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setError('Session invalid. Please log in again.');
        setData([]);
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/watchlist/all`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log('API Response:', response.data);
        console.log('Token:', userToken);
        setData(response.data.watchList || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load watchlist content. Please try again later.');
        setData([]);
        if (error.response?.status === 401) {
          console.warn('Unauthorized, redirecting to login');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [user, userToken, navigate]);

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
    infinite: data.length > 5,
    speed: 300,
    slidesToShow: 5,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: true,
          infinite: data.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
          infinite: data.length > 1.5,
        },
      },
    ],
  };

  return (
    <SliderContainer>
      {error ? (
        <div className="error-message">{error}</div>
      ) : data && data.length > 0 ? (
        <Slider {...settings} ref={sliderRef}>
          {data.map((content, index) => (
            <div key={content._id || index} className="slides">
              <Slidercontent
                img={content.thumbnail}
                title={content.title}
                movie={content}
                views={content.views}
                desc={content.description}
                shortPreview={content.shortPreview}
                customStyle={{}}
                onVideoClick={() => handleOpenModal(content)}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-white flex text-center">You have no watchlist</div>
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

// Styled Components (unchanged)
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  .slick-slider {
    position: relative;
  }

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