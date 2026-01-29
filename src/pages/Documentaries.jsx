import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import BASE_API_URL from '../apiConfig';
import Navigation from '../components/Navigation';
import Slidercontent from '../components/Slidercont';
import ContentModal from '../components/ContentModal';
import Footer from '../components/footer/Footer';
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

export default function Documentarie() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) setIsDropdownOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);
        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data.filter((content) => content.category === 'Documentarie');
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
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
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <Homecontent>
      {isMobile ? (
        <Hamburger onClick={toggleDropdown}>
          <MobileBurger />
        </Hamburger>
      ) : (
        <DesktopHeader />
      )}

      <MainContainer>
        {/* Navigation Component */}
        <Navigation
          isMobile={isMobile}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />

        {/* Main Content */}
        <ContentWrapper isMobile={isMobile}>
          {!isMobile && (
            <HeaderWrapper>
              <h3 className="text-white text-[1.5rem] font-bold">DOCUMENTARIES</h3>
            </HeaderWrapper>
          )}

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
                        customStyle={{ minWidth: '200px', height: 'auto' }}
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
        </ContentWrapper>
      </MainContainer>

      <Footer />
    </Homecontent>
  );
}

// Styled Components
const Homecontent = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.70);
   @media (max-width: 768px) {

   height: auto;
  
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-top: ${(props) => (props.isMobile ? '240px' : '8%')}; /* Increased for mobile */
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    width: calc(100% - 170px);
    margin-left: 170px;
    padding: 0 30px;
  }
`;

const HeaderWrapper = styled.div`
  padding-left: 1rem;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    padding-left: 0;
    text-align: center;
  }
`;

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
const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 20px;
    left: 8px;
    cursor: pointer;
    color: white;
    z-index: 1000;

    svg {
      font-size: 40px;
    }
    &:hover {
      color: #541011;
    }
  }
`;

export { Homecontent };