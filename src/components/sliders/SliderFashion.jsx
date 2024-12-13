import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from '../Slidercont';
import { useNavigate } from 'react-router-dom';
import ContentModal from '../ContentModal'; 

export default function SliderSocial() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        const filteredData = response.data.filter(content => content.category === 'Top 10');
        setData(filteredData);
      } catch (error) {
        setError('Error fetching data.');
      }
    }

    fetchData();
  }, []);

  const createSlug = (title, _id) => {
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); 
    return `${formattedTitle}-${_id}`;
  };

  const handleNavigateToMovie = (content) => {
    const slug = createSlug(content.title, content._id); 
    navigate(`/movie/${slug}`);
  };

  const handleOpenModal = (content) => {
    setModalContent(content); 
    setIsModalOpen(true);    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);   
    setModalContent(null);    
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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

  return (
    <>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Slider {...settings}> 
          {Array.isArray(data) && data.map((content) => (
            <div key={content._id} className="slides" onClick={() => handleOpenModal(content)}>
              <Slidercontent 
                img={content.thumbnail} 
                title={content.title} 
                movie={content.video} 
                views={content.views}
                desc={content.description} 
                customStyle={{}}
              />
            </div>
          ))}
        </Slider>
      )}

      <ContentModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={handleCloseModal}
        handleNavigateToMovie={handleNavigateToMovie}
      />
    </>
  );
}
