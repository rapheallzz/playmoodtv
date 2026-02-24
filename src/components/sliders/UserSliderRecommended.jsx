import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from '../Slidercont';
import { useNavigate } from 'react-router-dom';
import BASE_API_URL from '../../apiConfig';



export default function UserRecommended() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const id = localStorage.getItem('lastWatchedContentId');

      if (!id) {
        setData([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_API_URL}/api/recommended/${id}`);

        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setError('Unexpected data format.');
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
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
    const target = event.target;
    const isMetadataArea = target.closest('.metadata-area');

    if (!isMetadataArea) {
      const formattedTitle = content.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const slug = `${formattedTitle}-${content._id}`;
      navigate(`/movie/${slug}`);
    }
  };

  if (!loading && data.length === 0) {
    return null;
  }

  return (
    <Slider {...settings}>
      {data.map((content) => (
        <div
          key={content._id}
          className="dashslide"
          onClick={(e) => handleSlideClick(e, content)}
        >
          <Slidercontent
            img={content.thumbnail}
            title={content.title}
            movie={content}
            id={content._id}
            desc={content.description}
            customStyle={{}}
          />
        </div>
      ))}
    </Slider>
  );
}