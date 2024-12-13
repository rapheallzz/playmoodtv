import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContentModal from '../ContentModal'; 

export default function SliderSpace() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
    const [modalContent, setModalContent] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Requesting data from API');

        // Fetch all data
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        
        console.log('API response:', response);

        // Filter data by category 'Documentaries'
        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data.filter(content => content.category === 'Top 10');
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

  const createSlug = (title, _id) => {
    if (!title) {
      console.error('Missing title for content:', _id);
      return _id; // Fallback to just using the ID if the title is missing
    }
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); 
    return `${formattedTitle}-${_id}`;
  };

  const handleNavigateToMovie = (content) => {
    const slug = createSlug(content.title, content._id); 
    console.log('Navigating to movie with slug:', slug);
    navigate(`/movie/${slug}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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

  return (
    <Slider {...settings}>
      {Array.isArray(data) && data.map((content, index ) => (
        <div
          key={content._id}
          className="slidescircle"
          onClick={() => handleNavigateToMovie(content)}
        >
          <img src={content.thumbnail} alt={`Thumbnail ${index}`} />
        </div>
      ))}
    </Slider>
  );
}