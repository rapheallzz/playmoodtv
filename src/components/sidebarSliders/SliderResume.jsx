import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import SideBarSlidercont from '../SideBarSlidercont';
import { useNavigate } from 'react-router-dom';
import ContentModal from '../ContentModal';
import { useSelector } from 'react-redux';

export default function SliderResume() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchProgressAndContent() {
      if (!user || !user.token || !user._id) {
        setError('User not logged in or invalid user data.');
        console.warn('User data missing:', { user });
        return;
      }

      try {
        // Step 1: Fetch content IDs with progress for the user
        console.log('Fetching user progress for user:', user._id);
        const userProgressResponse = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/progress/{contentId}${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // Extract content IDs
        const contentIds = [];
        if (userProgressResponse.data && Array.isArray(userProgressResponse.data)) {
          userProgressResponse.data.forEach((item) => {
            if (item.contentId && /^[0-9a-fA-F]{24}$/.test(item.contentId)) {
              contentIds.push(item.contentId);
            } else {
              console.warn('Invalid contentId in user progress data:', item);
            }
          });
        } else {
          console.warn('Unexpected user progress data format:', userProgressResponse.data);
          setData([]);
          return;
        }
        console.log('Content IDs with progress:', contentIds);

        if (contentIds.length === 0) {
          console.log('No progress data found for user.');
          setData([]);
          return;
        }

        // Step 2: Fetch progress for each content ID
        const progressMap = {};
        const progressPromises = contentIds.map((contentId) =>
          axios
            .get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/progress/${contentId}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .catch((err) => {
              console.warn(`Failed to fetch progress for contentId ${contentId}:`, err.response?.data || err.message);
              return null;
            })
        );
        const progressResponses = await Promise.all(progressPromises);
        progressResponses.forEach((res, index) => {
          if (res && res.data && res.data.progress) {
            progressMap[contentIds[index]] = res.data.progress;
          }
        });
        console.log('Progress data:', progressMap);
        setProgressData(progressMap);

        // Step 3: Fetch content details for the contentIds
        if (contentIds.length > 0) {
          console.log('Fetching content for IDs:', contentIds);
          const contentPromises = contentIds.map((id) =>
            axios
              .get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api//continue-watching/${user._id}`)
              .catch((err) => {
                console.warn(`Failed to fetch content for ID ${id}:`, err.response?.data || err.message);
                return null;
              })
          );
          const contentResponses = await Promise.all(contentPromises);
          const contentData = contentResponses
            .filter((res) => res && res.data)
            .map((res) => res.data);

          if (Array.isArray(contentData) && contentData.length > 0) {
            setData(contentData.filter((item) => item && item._id));
          } else {
            console.error('No valid content data fetched:', contentData);
            setError('No content available for the progress data.');
          }
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching progress or content:', error.response?.data || error.message);
        setError(error.response?.data?.error || 'Error fetching continue watching data.');
      }
    }

    fetchProgressAndContent();
  }, [user]);

  const handleOpenModal = (content) => {
    if (content && content._id) {
      setModalContent(content);
      setIsModalOpen(true);
    } else {
      console.warn('Invalid content for modal:', content);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const createSlug = (title, _id) => {
    if (!title || !_id) {
      console.warn('Invalid title or _id for slug:', { title, _id });
      return '';
    }
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${formattedTitle}-${_id}`;
  };

  const handleNavigateToMovie = (content) => {
    if (content && content._id && content.title) {
      const slug = createSlug(content.title, content._id);
      console.log('Navigating to movie with slug:', slug);
      navigate(`/movie/${slug}`);
    } else {
      console.warn('Invalid content for navigation:', content);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
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
                <Slidercontent
                  img={content.thumbnail}
                  title={content.title}
                   movie={content}
                  views={content.views}
                  desc={content.description}
                  customStyle={{}}
                  progress={progressData[content._id] || 0}
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