import React, { useState, useEffect } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane, FaEye, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePopup from '../components/Welcomepop';
import { likeContent, unlikeContent } from '../features/authSlice';

const Slidercontent = React.memo(function Slidercontent({ img, title, movie, views, desc, customStyle }) {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for popup visibility
  const dispatch = useDispatch();
  const [sliderContentData, setSliderContentData] = useState(false);
  const [contentIndex, setContentIndex] = useState(0);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const { user, isError, message } = useSelector((state) => state.auth);

  // Detect screen size for mobile or desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile size threshold
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        setSliderContentData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setContentIndex((prevIndex) => (prevIndex + 1) % sliderContentData.length);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [sliderContentData.length]);

  if (isError) {
    return <div>Error: {message}</div>;
  }

  const handleHover = () => setHover(true);
  const handleHoverOut = () => setHover(false);

  const handleTouchStart = () => setHover(true);
  const handleTouchEnd = () => setHover(false);

  const titleSpliced = title.slice(0, 30) + '...';
  const description = desc.slice(0, 100) + '...';

  const handleLike = async () => {
    try {
      if (user && user._id) {
        const currentContent = sliderContentData && sliderContentData[contentIndex];
        if (currentContent) {
          const contentId = currentContent._id;
          const isLiked = user.like && user.like.includes(contentId);

          if (isLiked) {
            await dispatch(unlikeContent({ userId: user._id, contentId }));
          } else {
            await dispatch(likeContent({ userId: user._id, contentId }));
          }
        }
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
    }
  };

  // Toggle popup on HiDotsVertical click
  const handleDotsClick = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  const handleCopyLink = () => {
    const pageUrl = window.location.href; // Get the current page URL
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        alert('URL copied to clipboard!'); 
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const { user: movieUser } = movie;

  return (
<div className="relative overflow-hidden w-full h-full mr-0.5"
  onMouseEnter={!isMobile ? handleHover : null}  // Hover only on desktop
  onMouseLeave={!isMobile ? handleHoverOut : null}
  onTouchStart={isMobile ? handleTouchStart : null}  // Touch only on mobile
  onTouchEnd={isMobile ? handleTouchEnd : null}
>
  <div className="absolute top-2.5 w-full px-1 flex justify-between"></div>
  {!hover && (
    <div className="absolute bottom-0 w-full bg-black bg-opacity-70 flex justify-between p-3 gap-2.5">
      <h3 className="text-white text-base font-normal leading-6 w-4/5" style={customStyle || {}}>
        {titleSpliced}
      </h3>
      {isMobile && (
        <HiDotsVertical className="text-white w-1/5 h-10" onClick={handleDotsClick} />
      )}
    </div>
  )}
  {hover ? (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="h-20 w-full bg-black"></div>
      <video playsInline loop autoPlay muted className="w-full object-cover h-36">
        <source src={`${movie}#t=0,15`} />
      </video>
      <div className="h-52 w-full bg-black p-2 flex flex-col gap-2 mb-8">
        <div className="flex justify-between align-middle">
          <div className="flex w-16 h-4 rounded-sm bg-white justify-center gap-1 items-center">
            <h6 className="text-black text-[0.45rem]">
              By: {movie && movie.user && movie.user.name ? movie.user.name : 'Anonymous'}
            </h6>
          </div>
          <div className="flex justify-end gap-1 items-center">
            <FaHeart className="text-white" onClick={handleLike} />
            <div className="flex w-16 h-4 rounded-sm bg-white justify-start gap-1 items-center">
              <h6 className="text-black text-[0.6rem]">Watch Later</h6>
            </div>
            <FaPaperPlane className="text-white" onClick={handleCopyLink}/>
          </div>
        </div>
        <h4 className="text-white text-sm font-semibold" style={customStyle || {}}>
          {titleSpliced}
        </h4>
        <p className="text-white text-xs font-light">{description}</p>
      </div>
    </div>
  ) : (
    <img className="w-full h-full object-cover" src={img} alt={title} />
  )}
  {showPopup && (
    <div className="absolute bottom-12 right-5 p-2 bg-black bg-opacity-80 text-white rounded-lg shadow-lg flex flex-col items-center space-y-2">
      <FaHeart className="text-white" onClick={handleLike} />
      <FaPaperPlane className="text-white" />
    </div>
  )}
  {showWelcomePopup && (
    <WelcomePopup
      showPopup={showWelcomePopup}
      onClose={() => setShowWelcomePopup(false)}
      onLogin={() => setShowWelcomePopup(false)}
      onRegister={() => setShowWelcomePopup(false)}
    />
  )}
</div>

  );
});

export default Slidercontent;
