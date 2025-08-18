import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slidercontent from '../Slidercont';
import { useNavigate } from 'react-router-dom';

const PlaylistSliderContainer = styled.div`
  margin-bottom: 40px;
`;

const PlaylistTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 64px;
`;

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
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
        slidesToShow: 2,
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
      <Slider {...sliderSettings}>
        {playlist.videos.map((video) => (
          <div key={video._id} onClick={() => handleCardClick(video)}>
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
