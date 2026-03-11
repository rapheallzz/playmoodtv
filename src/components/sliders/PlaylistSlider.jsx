import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slidercontent from '../Slidercont';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const pulse = keyframes`
  0% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.1); }
  100% { transform: translateY(-50%) scale(1); }
`;

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

const PlaylistSliderContainer = styled.div`
  margin-bottom: 40px;
  position: relative;
  width: 100%;
  padding: 0 40px 0 0;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0;
  }

  .slick-prev, .slick-next {
    display: none !important;
  }

  .custom-arrow {
    display: none;
    position: absolute;
    top: 50%;
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

    &.prev-arrow { left: -10px; }
    &.next-arrow {
      right: 0px;
      &:hover {
        animation: ${pulse} 1s infinite;
        background: rgba(0, 0, 0, 0.7);
      }
    }
    .arrow-icon { font-size: 24px; }
  }

  &:hover .custom-arrow {
    display: flex;
    opacity: 1;
  }

  .slides {
    position: relative;
    padding: 0 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    .custom-arrow { display: none !important; }
  }
`;

const PlaylistTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 64px;
`;

const getSliderSettings = (itemCount) => ({
  dots: false,
  infinite: itemCount > 4,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

const PlaylistSlider = ({ playlist }) => {
  const navigate = useNavigate();
  const itemCount = playlist?.videos?.length || 0;

  const handleCardClick = (content) => {
    navigate(`/movie/${content._id}`, {
      state: {
        movie: content.video,
        title: content.title || '',
        desc: content.description || '',
        credits: content.credit || '',
      },
    });
  };

  if (!playlist || !Array.isArray(playlist.videos) || playlist.videos.length === 0) {
    return null;
  }

  return (
    <PlaylistSliderContainer>
      <PlaylistTitle>{playlist.name}</PlaylistTitle>
      <Slider {...getSliderSettings(itemCount)}>
        {playlist.videos.map((video) => (
          <div key={video._id} className="slides" onClick={() => handleCardClick(video)}>
            <Slidercontent
              img={video.thumbnail}
              title={video.title}
              movie={video.video}
              id={video._id}
              desc={video.description}
              customStyle={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </Slider>
    </PlaylistSliderContainer>
  );
};

export default PlaylistSlider;
