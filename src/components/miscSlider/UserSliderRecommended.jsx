import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from '../SlidercontPlain';
import { useNavigate } from 'react-router-dom';



export default function UserRecommended() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Requesting data from API');

        // Fetch all data
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        
        console.log('API response:', response);

        // Filter data by category 'Documentaries'
        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data.filter(content => content.category === 'Teen');
          setData(filteredData);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      }
    }

    fetchData();
  }, []);
   
  const handleOpenModal = (content) => {
    setModalContent(content); 
    setIsModalOpen(true);    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);   
    setModalContent(null);    
  };

  const createSlug = (title, _id) => {
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); 
    return `${formattedTitle}-${_id}`;
  };

  const handleNavigateToMovie = (content) => {
    const slug = createSlug(content.title, content._id); 
    console.log('Navigating to movie with slug:', slug);
    navigate(`/movie/${slug}`);
  };

  const settings ={
    dots: false ,
    infinite: true,
    speed: 500,
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


  const handleSlideClick = (event, content) => {
    const clickedElement = event.target;
  
    // Check if the clicked element is a video
    if (clickedElement.tagName.toLowerCase() === 'video') {
      const cardElement = clickedElement.closest('.dashslide');
  
      if (cardElement) {
        navigate(`/movie/{_id}`, {
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
      {data.map((content, index) => (
        <div
          key={content.id}
          className="dashslide"
          onClick={(e) => handleSlideClick(e, content)}
        >
  
          <Slidercontent
            img={content.thumbnail}
            title={content.title}
             movie={content.video} 
             id={content.id} 
             desc={content.description}
            customStyle={{ }}
          />
        </div>
      ))}
    </Slider>
  );
}