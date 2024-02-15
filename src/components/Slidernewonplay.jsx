import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { data_interviews } from '../../data';
import Slidercontent from './Slidercontent';
import { useNavigate } from 'react-router-dom';

const Slidernewplay = () => {
  const navigate = useNavigate();

  const handleSlideClick = (event, content) => {
    // Check if the clicked element is a video
    if (event.target.tagName.toLowerCase() === 'video') {
      navigate('/movie', {
        state: {
          movie: content.video,
          title: content.title,
          desc: content.desc,
          credits: content.credits,
          creditss: content.creditss,
          creditsss: content.creditsss,
          creditssss: content.creditssss,
          creditsssss: content.creditsssss,
          creditssssss: content.creditssssss,
          creditsssssss: content.creditsssssss,
          creditssssssss: content.creditssssssss,
        },
      });
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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

  return (
    <Slider {...settings}>
      {data_interviews.map((content, index) => (
        <div key={content.id} className="slides" onClick={(e) => handleSlideClick(e, content)}>
          <Slidercontent img={content.img} title={content.title} movie={content.video} id={content.id} desc={content.desc} />
        </div>
      ))}
    </Slider>
  );
};

export default Slidernewplay ;

