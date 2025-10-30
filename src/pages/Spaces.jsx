import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import BASE_API_URL from '../apiConfig';
import Navigation from '../components/Navigation';
import Slidercirclecontent from '../components/Slidercirclecontent';
import CreatorContentModal from '../components/CreatorContentModal';
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

export default function Spaces() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [creatorData, setCreatorData] = useState([]);
  const [creatorError, setCreatorError] = useState(null);
  const [modalCreator, setModalCreator] = useState(null);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const creatorSliderRef = useRef(null);

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

  // Fetch creator data
  useEffect(() => {
    async function fetchCreators() {
      try {
        console.log('Requesting creators from API');
        const response = await axios.get(`${BASE_API_URL}/api/users/creators`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        console.log('Creators API response:', response);
        if (Array.isArray(response.data)) {
          setCreatorData(response.data);
        } else {
          console.error('Unexpected creators data format:', response.data);
          setCreatorError('Unexpected creators data format.');
        }
      } catch (error) {
        console.error('Error fetching creators:', error);
        setCreatorError('Error fetching creators.');
      }
    }

    fetchCreators();
  }, []);

  const handleOpenCreatorModal = (creator) => {
    setModalCreator(creator);
    setIsCreatorModalOpen(true);
  };

  const handleCloseCreatorModal = () => {
    setIsCreatorModalOpen(false);
    setModalCreator(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const creatorSliderSettings = {
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
          arrows: true,
          centerMode: true,
          centerPadding: '20px',
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
              <h3 className="text-white text-[1.5rem] font-bold">SPACES</h3>
            </HeaderWrapper>
          )}

          {/* Creator Slider */}
          <SliderContainer>
            {creatorError ? (
              <div className="error-message">{creatorError}</div>
            ) : (
              <Slider {...creatorSliderSettings} ref={creatorSliderRef}>
                {Array.isArray(creatorData) &&
                  creatorData.map((creator) => (
                    <div key={creator._id} className="slidescircle">
                      <Slidercirclecontent
                        img={creator.profileImage}
                        movie={creator}
                        onVideoClick={() => handleOpenCreatorModal(creator)}
                      />
                    </div>
                  ))}
              </Slider>
            )}
            <CreatorContentModal
              isOpen={isCreatorModalOpen}
              creator={modalCreator}
              onClose={handleCloseCreatorModal}
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
  margin-top: ${(props) => (props.isMobile ? '240px' : '8%')};
  margin-bottom: 0; /* No gap before footer */
  flex-grow: 1;

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

  .error-message {
    color: white;
    text-align: center;
    padding: 20px;
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