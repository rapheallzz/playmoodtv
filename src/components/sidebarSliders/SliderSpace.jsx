import BASE_API_URL from '../../apiConfig';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CreatorContentModal from '../CreatorContentModal';
import Slidercirclecontent from '../SideSlidercirclecontent';

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

// Styled Container for Slider
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  // padding: 0 20px;
  // margin: 0 auto;

  .slick-slider {
    position: relative;
    touch-action: pan-y; /* Allow vertical scrolling, enable horizontal swipe */
  }

  .slick-prev,
  .slick-next {
    display: none !important;
  }

  .slick-list,
  .slick-track {
    display: flex;
    align-items: center;
  }

  // .custom-arrow {
  //   display: none;
  //   position: absolute;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   width: 50px;
  //   height: 120px;
  //   background: rgba(0, 0, 0, 0.5);
  //   color: white;
  //   z-index: 10;
  //   cursor: pointer;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   transition: opacity 0.3s ease, background-color 0.3s ease;
  //   opacity: 0;

  //   &.prev-arrow {
  //     left: -10px;
  //   }

  //   &.next-arrow {
  //     right: -10px;
  //     &:hover {
  //       animation: ${pulse} 1s infinite;
  //       background: rgba(0, 0, 0, 0.7);
  //     }
  //   }

  //   .arrow-icon {
  //     font-size: 24px;
  //   }
  // }

  // &:hover .custom-arrow {
  //   display: flex;
  //   opacity: 1;
  // }

  // .slick-slide {
  //   padding: 0 12px;
  //   min-height: 160px;
  //   @media (min-width: 768px) {
  //     min-height: 200px;
  //   }
  //   @media (max-width: 480px) {
  //     min-height: 40vw;
  //     max-height: 140px;
  //   }
  //   @media (max-width: 360px) {
  //     min-height: 35vw;
  //     max-height: 120px;
  //   }
  // }

  .slidescircle {
    position: relative;
    display: flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    -webkit-touch-callout: none;
    width: 60px !important;
    height: 60px !important;
    margin: 0 auto;
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

export default function SliderSpace() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalCreator, setModalCreator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/users/creators`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setError('Unexpected data format.');
        }
      } catch (error) {
        setError('Error fetching creators.');
      }
    };

    fetchCreators();
  }, []);

  const handleOpenModal = (creator) => {
    setModalCreator(creator);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalCreator(null);
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: false,
    swipeToSlide: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
        },
      },
    ],
  };

  return (
    <SliderContainer>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <Slider {...settings}>
            {Array.isArray(data) &&
              data.map((creator, index) => (
                <div key={creator._id} className="slidescircle">
                  <Slidercirclecontent
                    img={creator.profileImage}
                    movie={creator}
                    onVideoClick={() => handleOpenModal(creator)}
                  />
                </div>
              ))}
          </Slider>
          <CreatorContentModal
            isOpen={isModalOpen}
            creator={modalCreator}
            onClose={handleCloseModal}
          />
        </>
      )}
    </SliderContainer>
  );
}