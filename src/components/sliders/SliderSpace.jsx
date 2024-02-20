import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SliderSpace() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
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

  const handleSlideClick = (event, content) => {
    const clickedElement = event.target;
  
    // Check if the clicked element is a video
    if (clickedElement.tagName.toLowerCase() === 'video') {
      const cardElement = clickedElement.closest('.slidescircle');
  
      if (cardElement) {
        navigate('/movie', {
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
      {filteredData.map((content, index) => (
        <div
          key={content.id}
          className="slidescircle"
          onClick={(e) => handleSlideClick(e, content)}
        >
          <img src={content.thumbnail} alt={`Thumbnail ${index}`} />
        </div>
      ))}
    </Slider>
  );
}
