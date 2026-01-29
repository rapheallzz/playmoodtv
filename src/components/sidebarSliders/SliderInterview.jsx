import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import SideBarSlidercont from '../SideBarSlidercont';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContentModal from '../ContentModal';

export default function SidebarInterview() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data.filter(content => content.category === 'InterView');
          setData(filteredData);
        } else {
          setError('Unexpected data format.');
        }
      } catch (error) {
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
    navigate(`/movie/${slug}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides for sidebar
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: false, 
    swipeToSlide: true,
    lazyLoad: 'ondemand',
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
        centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <SliderContainer>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Slider {...settings}>
          {Array.isArray(data) &&
            data.map((content, index) => (
              <div key={content._id} className="sidebar-slide">
                <SideBarSlidercont
                  img={content.thumbnail}
                  title={content.title}
                  movie={content}
                  views={content.views}
                  desc={content.description}
                  customStyle={{}}
                  onVideoClick={() => handleOpenModal(content)}
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
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  .sidebar-slide {
    width: 300px; /* Increased width for better visibility */
  
    margin: 0 4px; /* Horizontal spacing */
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    overflow: visible; /* Prevent clipping of content */
    z-index: 10; /* Ensure clickable */
  }

  .sidebar-slide img,
  .sidebar-slide video {
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .sidebar-slide:hover img,
  .sidebar-slide:hover video {
    transform: scale(1.05); /* Zoom on hover */
  }

  .slick-slider {
    width: 100%;
    max-width: 1000px; /* Increased to accommodate arrows and slides */
    margin: 0 auto;
    position: relative; /* Ensure arrows are positioned relative to slider */
  }

  .slick-list,
  .slick-track {
    display: flex;
    align-items: center;
  }

  /* Style default arrows */
  .slick-prev,
  .slick-next {
    display: block !important; /* Show default arrows */
    z-index: 20; /* Ensure arrows are above slides */
    width: 30px;
    height: 30px;
    transform: translate(0, -50%); /* Center vertically */
  }

  .slick-prev {
    left: -40px; /* Position left arrow outside slider */
  }

  .slick-next {
    right: -40px; /* Position right arrow outside slider */
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px; /* Increase arrow size */
    color: #ffffff; /* White arrows for visibility */
    opacity: 0.8; /* Slightly transparent */
    transition: opacity 0.3s ease;
  }

  .slick-prev:hover:before,
  .slick-next:hover:before {
    opacity: 1; /* Full opacity on hover */
  }

  /* Ensure touch events are not blocked */
  .sidebar-slide * {
    pointer-events: auto;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .sidebar-slide {
      width: 120px;
      height: 180px;
      margin: 0 2px;
    }

    .slick-slider {
      max-width: 300px;
    }

    .slick-prev {
      left: -30px;
    }

    .slick-next {
      right: -30px;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 24px; /* Smaller arrows for tablet */
    }
  }

  @media (max-width: 480px) {
    .sidebar-slide {
      width: 100px;
      height: 100px;
    }

    .slick-slider {
      max-width: 200px;
    }

    .slick-prev {
      left: -25px;
    }

    .slick-next {
      right: -25px;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 20px; /* Smaller arrows for mobile */
    }
  }
`;