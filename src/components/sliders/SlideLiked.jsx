import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from '../SlidercontPlain';
import { useNavigate } from 'react-router-dom';

export default function SliderLiked() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user._id) {
        console.warn('User or user._id is undefined, skipping fetch');
        setData([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/likes`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log('API Response:', response.data);
        setData(response.data.likedContents || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load liked content. Please try again later.');
        setData([]);
      }
    };

    fetchData();
  }, [user]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSlideClick = (event, content) => {
    const clickedElement = event.target;

    if (clickedElement.tagName.toLowerCase() === 'video') {
      const cardElement = clickedElement.closest('.dashslide');

      if (cardElement) {
        navigate(`/movie/${content.id}`, {
          state: {
            movie: content.video,
            title: content.title || '',
            desc: content.description || '',
            credits: content.credit || '',
          },
        });
      }
    }
  };

  return (
    <Slider {...settings}>
      {error ? (
        <div>{error}</div>
      ) : data && data.length > 0 ? (
        data.map((content, index) => (
          <div
            key={content.id || index}
            className="dashslide"
            onClick={(e) => handleSlideClick(e, content)}
          >
            <Slidercontent
              img={content.thumbnail}
              title={content.title}
              movie={content.video}
              id={content.id}
              desc={content.description}
              customStyle={{}}
            />
          </div>
        ))
      ) : (
        <div className='text-white flex text-center' >No liked content available</div>
      )}
    </Slider>
  );
}