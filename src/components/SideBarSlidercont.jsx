import React, { useState, useEffect } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePopup from './Welcomepop';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';

const SideBarSlidercont = React.memo(function SideBarSlidercont({
  img,
  title,
  movie,
  views,
  desc,
  customStyle,
  progress,
  onVideoClick, // Prop to handle video click for modal
}) {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const dispatch = useDispatch();
  const [sliderContentData, setSliderContentData] = useState([]);
  const [contentIndex, setContentIndex] = useState(0);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
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

    if (sliderContentData.length > 0) {
      const intervalId = setInterval(() => {
        setContentIndex((prevIndex) => (prevIndex + 1) % sliderContentData.length);
      }, 30000);
      return () => clearInterval(intervalId);
    }
  }, [sliderContentData.length]);

  if (isError) {
    return <div>Error: {message}</div>;
  }

  const handleHover = () => {
    setHover(true);
    setIsVideoPlaying(true);
  };

  const handleHoverOut = () => {
    setHover(false);
    setIsVideoPlaying(false);
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    if (isMobile) {
      if (!isVideoPlaying) {
        setHover(true);
        setIsVideoPlaying(true); // Show video on first click
      }
    } else {
      onVideoClick(); // Open modal on desktop click (non-hover state)
    }
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (isVideoPlaying) {
      onVideoClick(); // Open modal when video is clicked
      setHover(false); // Reset hover state
      setIsVideoPlaying(false); // Reset video state
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent modal trigger
    try {
      if (user && user._id && currentContent?._id) {
        const contentId = currentContent._id;
        if (isLiked) {
          await dispatch(unlikeContent({ userId: user._id, contentId })).unwrap();
        } else {
          await dispatch(likeContent({ userId: user._id, contentId })).unwrap();
        }
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
    }
  };

  const handleWatchlist = async (e) => {
    e.stopPropagation(); // Prevent modal trigger
    try {
      if (user && user._id && currentContent?._id) {
        const contentId = currentContent._id;
        if (isInWatchlist) {
          await dispatch(removeFromWatchlist({ userId: user._id, contentId })).unwrap();
        } else {
          await dispatch(addToWatchlist({ userId: user._id, contentId })).unwrap();
        }
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error adding/removing from watchlist:', error);
    }
  };

  const handleDotsClick = (e) => {
    e.stopPropagation(); // Prevent modal trigger
    setShowPopup(!showPopup);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation(); // Prevent modal trigger
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl)
      .then(() => alert('URL copied to clipboard!'))
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const titleSpliced = title?.slice(0, 30) + '...';
  const description = desc?.slice(0, 100) + '...';

  const currentContent = sliderContentData && sliderContentData[contentIndex];
  const contentId = currentContent?._id;
  const isLiked = user?.like?.includes(contentId);
  const isInWatchlist = user?.watchlist?.includes(contentId);

  const movieUser = movie?.user;

  return (
    <div
      className="relative overflow-hidden w-full h-full"
      style={{ maxWidth: '150px', height: '200px' }} // Constrain size for sidebar
      onMouseEnter={!isMobile ? handleHover : null}
      onMouseLeave={!isMobile ? handleHoverOut : null}
    >
      <div className="absolute top-2 w-full px-1 flex justify-between z-10"></div>
      {!hover && !isVideoPlaying ? (
        <>
          <img
            className="w-full h-full object-cover cursor-pointer rounded-md"
            src={img}
            alt={title}
            onClick={handleClick} // Handle click for mobile and desktop
          />
          <div className="absolute bottom-0 w-full bg-black bg-opacity-70 flex justify-between p-2 gap-2 z-10">
            <h3
              className="text-white text-sm font-normal leading-5 w-4/5 truncate"
              style={customStyle || {}}
            >
              {titleSpliced}
            </h3>
            {isMobile && (
              <HiDotsVertical
                className="text-white w-1/5 h-8 cursor-pointer"
                onClick={handleDotsClick}
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-between h-full w-full">
          <div className="h-10 w-full bg-black"></div>
          <video
            playsInline
            loop
            autoPlay={isVideoPlaying}
            muted
            className="w-full h-28 object-cover cursor-pointer rounded-md"
            onClick={handleVideoClick} // Handle video click for modal
          >
            <source src={`${movie?.video || movie}#t=0,15`} />
          </video>
          <div
            className="h-36 w-full bg-black p-2 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()} // Prevent modal trigger on info/icons
          >
            <div className="flex justify-between items-center">
              <div className="flex w-12 h-3 rounded-sm bg-white justify-center gap-1 items-center">
                <h6 className="text-black text-[0.4rem]">
                  By: {movieUser?.name || 'Anonymous'}
                </h6>
              </div>
              <div className="flex justify-end gap-1 items-center">
                <FaHeart
                  className={`cursor-pointer text-sm ${isLiked ? 'text-red-600 fill-current' : 'text-gray-400'}`}
                  onClick={handleLike}
                />
                <span
                  className={`cursor-pointer text-sm ${isInWatchlist ? 'text-green-600' : 'text-gray-400'}`}
                  onClick={handleWatchlist}
                >
                  {isInWatchlist ? <FaCheck /> : <FaPlus />}
                </span>
                <FaPaperPlane
                  className="text-white cursor-pointer text-sm"
                  onClick={handleCopyLink}
                />
              </div>
            </div>
            <h4 className="text-white text-xs font-semibold truncate" style={customStyle || {}}>
              {titleSpliced}
            </h4>
            <p className="text-white text-[0.6rem] font-light line-clamp-2">{description}</p>
            {progress > 0 && (
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-red-600 h-1.5 rounded-full"
                  style={{ width: `${(progress / 300) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
      {showPopup && (
        <div
          className="absolute bottom-10 right-2 p-1 bg-black bg-opacity-80 text-white rounded-lg shadow-lg flex flex-col items-center space-y-1 z-20"
          onClick={(e) => e.stopPropagation()} // Prevent modal trigger
        >
          <FaHeart
            className={`cursor-pointer text-sm ${isLiked ? 'text-red-600 fill-current' : 'text-gray-400'}`}
            onClick={handleLike}
          />
          <span
            className={`cursor-pointer text-sm ${isInWatchlist ? 'text-green-600' : 'text-gray-400'}`}
            onClick={handleWatchlist}
          >
            {isInWatchlist ? <FaCheck /> : <FaPlus />}
          </span>
          <FaPaperPlane
            className="text-white cursor-pointer text-sm"
            onClick={handleCopyLink}
          />
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

export default SideBarSlidercont;