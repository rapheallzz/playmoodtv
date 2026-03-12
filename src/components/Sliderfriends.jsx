import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Sliderfriends() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        setData(response.data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((content) => content.category === 'Top 10').map((content) => ({
    id: content.id,
    thumbnail: content.thumbnail,
  }));

  const settings = {
    dots: false,
    infinite: filteredData.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: filteredData.length > 5,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: filteredData.length > 3,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: filteredData.length > 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: filteredData.length > 1,
        }
      }
    ]
  };

  const handleSlideClick = (content) => {
    const formattedTitle = (content.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${formattedTitle}-${content._id}`;
    navigate(`/movie/${slug}`);
  };
  return (
    <FriendsSliderContainer $isSingle={filteredData.length === 1}>
      <Slider {...settings}>
        {filteredData.map((content, index) => (
          <div
            key={content.id}
            className="slidesfriends"
            onClick={() => handleSlideClick(content)}
          >
            <img src={content.thumbnail} alt={`Thumbnail ${index}`} />
          </div>
        ))}
      </Slider>
    </FriendsSliderContainer>
  );
}

const FriendsSliderContainer = styled.div`
  .slick-slider {
    position: relative;
    ${props => props.$isSingle && `
      .slick-track {
        margin-left: 0 !important;
        transform: none !important;
      }
      .slick-slide {
        width: 300px !important;
        @media (max-width: 768px) {
           width: 200px !important;
        }
      }
    `}
  }
`;
