import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SliderChannel() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/creators', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching creators:', error);
      }
    };

    fetchCreators();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleSlideClick = (creator) => {
    console.log('Slide clicked', creator);
    navigate('/creator', {
      state: {
        creatorId: creator._id || ''
      }
    });
  };

  return (
    <Slider {...settings}>
      {Array.isArray(data) && data.map((creator, index) => (
        <div
          key={creator._id}
          className="slidescircle relative"
          onClick={() => handleSlideClick(creator)}
        >
          <img src={creator.profileImage} alt={`Creator ${index}`} className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col justify-center items-center space-y-2">
          </div>
        </div>
      ))}
    </Slider>
  );
}