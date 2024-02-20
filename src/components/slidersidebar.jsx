import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from './Slidercont';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 


export default function SidebarSlider() {
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

  const filteredData = data.filter((content) => content.category === 'Top 10');
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
   
  };


  const handleSlideClick = (event, content) => {
    const clickedElement = event.target;
  
    // Check if the clicked element is a video
    if (clickedElement.tagName.toLowerCase() === 'video') {
      const cardElement = clickedElement.closest('.slides');
  
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
    <SliderContainer>
    <Slider {...settings}>
      {filteredData.map((content, index) => (
        <div
          key={content.id}
          className="sidebar-slide"
          onClick={(e) => handleSlideClick(e, content)}
        >
          <Slidercontent
            img={content.thumbnail}
            title={content.title}
             movie={content.video} 
             id={content.id} 
             desc={content.description}
            customStyle={{ fontSize: '5px',   position: 'absolute',
            bottom: '10px', }}
          />
        </div>
      ))}
    </Slider>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  .sidebar-slide {
    height: 80px;
    width:100px;
    margin: 0 1px; /* Adjust the margin to fit your layout */
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);
  }

  .sidebar-slide img {
    max-width: 100%;
    border-radius: 8px;
    transition: transform 0.3s;
  }

  .sidebar-slide:hover img {
    transform: scale(1.05); /* Zoom in on hover */
  }

  .slick-prev,
  .slick-next {
    display: none; /* Hide navigation arrows */
  }
  
  .sidebar-text {
    color: #ffffff; /* Change text color if needed */
    /* Add other styles you want for the sidebar text */
  }
`;