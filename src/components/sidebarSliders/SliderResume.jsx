import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import SideBarSlidercont from '../SideBarSlidercont';
import { useNavigate } from 'react-router-dom';
import ContentModal from '../ContentModal';
import { useSelector } from 'react-redux';
import BASE_API_URL from '../../apiConfig';

export default function SliderResume() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchContinueWatching() {
      if (!user || !user.token) {
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_API_URL}/api/content/continue-watching`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data && response.data.continueWatching) {
          const formattedData = response.data.continueWatching.map(item => ({
            ...item,
            _id: item.contentId || item._id
          }));
          setData(formattedData);
        } else {
          setData([]);
        }
      } catch (error) {
        setError(error.response?.data?.error || 'Error fetching continue watching data.');
      }
    }

    fetchContinueWatching();
  }, [user]);

  const handleOpenModal = (content) => {
    if (content && content._id) {
      setModalContent(content);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const createSlug = (title, _id) => {
    if (!title || !_id) {
      return '';
    }
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${formattedTitle}-${_id}`;
  };

  const handleNavigateToMovie = (content) => {
    if (content && content._id && content.title) {
      const slug = createSlug(content.title, content._id);
      navigate(`/movie/${slug}`);
    }
  };

  const settings = {
    dots: false,
    infinite: data.length > 3,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: data.length > 3,
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

  return (
    <>
      {error ? (
        <div className="error-message">{error}</div>
      ) : data.length === 0 ? (
        <div className="no-content-message text-white">No videos in Continue Watching.</div>
      ) : (
        <Slider {...settings}>
          {Array.isArray(data) &&
            data.map((content) => (
              <div key={content._id} className="slides" onClick={() => handleOpenModal(content)}>
                <SideBarSlidercont
                  img={content.thumbnail}
                  title={content.title}
                  movie={content}
                  views={content.views}
                  desc={content.description}
                  customStyle={{}}
                  progress={content.progress || 0}
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