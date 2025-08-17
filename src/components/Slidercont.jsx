import React, { useState, useEffect, useRef } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePopup from '../components/Welcomepop';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import styled from 'styled-components';

const Slidercontent = React.memo(function Slidercontent({
  img,
  title,
  movie,
  views,
  desc,
  customStyle,
  progress,
  onVideoClick,
}) {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [copyModal, setCopyModal] = useState({ show: false, message: '', isError: false });
  const [previewTimestamps, setPreviewTimestamps] = useState({ start: 0, end: 15 });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const videoRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchTimeout = useRef(null);

  // Compute preview timestamps when movie changes
  useEffect(() => {
    if (movie?.shortPreview?.start && movie?.shortPreview?.end) {
      setPreviewTimestamps({
        start: movie.shortPreview.start,
        end: movie.shortPreview.end,
      });
    }
  }, [movie]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHover = () => {
    if (!isMobile) {
      setHover(true);
      setIsVideoPlaying(true);
    }
  };

  const handleHoverOut = () => {
    if (!isMobile) {
      setHover(false);
      setIsVideoPlaying(false);
    }
  };

  // Track touch start position
  const handleTouchStart = (e) => {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    touchStart.current = { x: clientX, y: clientY };
  };

  // Handle touch end to detect tap vs. drag
  const handleTouchEnd = (e) => {
    clearTimeout(touchTimeout.current);
    touchTimeout.current = setTimeout(() => {
      const clientX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
      const clientY = e.type === 'mouseup' ? e.clientY : e.changedTouches[0].clientY;
      const distance = Math.sqrt(
        Math.pow(clientX - touchStart.current.x, 2) +
        Math.pow(clientY - touchStart.current.y, 2)
      );

      // Check if the tap target is the image or its container, not the dots icon
      const target = e.target;
      const isDotsIcon = target.closest('svg')?.classList.contains('text-white') || false;

      if (distance < 10 && !isDotsIcon) {
        e.preventDefault();
        e.stopPropagation();
        if (isMobile) {
          if (!isVideoPlaying) {
            setHover(true);
            setIsVideoPlaying(true);
            setShowPopup(false); // Ensure popup closes when video preview is triggered
          } else {
            onVideoClick();
            setHover(false);
            setIsVideoPlaying(false);
            setShowPopup(false); // Ensure popup closes when video preview is closed
          }
        } else {
          onVideoClick();
        }
      }
    }, 100);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    setLocalError(null);
    try {
      if (!user) {
        setShowWelcomePopup(true);
        return;
      }
      const contentId = movie?._id;
      if (!contentId) {
        setLocalError('Content ID is missing. Please try again.');
        console.error('Content ID not found in movie object:', movie);
        return;
      }
      if (isLiked) {
        await dispatch(unlikeContent({ contentId })).unwrap();
      } else {
        await dispatch(likeContent({ contentId })).unwrap();
      }
    } catch (error) {
      console.error('Like error:', error);
      setLocalError('Failed to like/unlike content. Please try again.');
    }
  };

  const handleWatchlist = async (e) => {
    e.stopPropagation();
    setLocalError(null);
    try {
      if (!user) {
        setShowWelcomePopup(true);
        return;
      }
      const contentId = movie?._id;
      if (!contentId) {
        setLocalError('Content ID is missing. Please try again.');
        return;
      }
      const userId = user.userId || user._id;
      if (!userId) {
        setLocalError('User ID is missing. Please log in again.');
        setShowWelcomePopup(true);
        return;
      }
      if (isInWatchlist) {
        await dispatch(removeFromWatchlist({ userId, contentId })).unwrap();
      } else {
        await dispatch(addToWatchlist({ userId, contentId })).unwrap();
      }
    } catch (error) {
      console.error('Watchlist error:', error);
      setLocalError('Failed to update watchlist. Please try again.');
    }
  };

  const handleDotsClick = (e) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent default to avoid triggering parent touch events
    setShowPopup(!showPopup);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const pageUrl = window.location.href;
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        setCopyModal({ show: true, message: 'Link copied to clipboard!', isError: false });
        setTimeout(() => setCopyModal({ show: false, message: '', isError: false }), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        setCopyModal({ show: true, message: 'Failed to copy link. Please try again.', isError: true });
        setTimeout(() => setCopyModal({ show: false, message: '', isError: false }), 3000);
      });
  };

  const handleCloseCopyModal = () => {
    setCopyModal({ show: false, message: '', isError: false });
  };

  const titleSpliced = title?.slice(0, 30) + '...';
  const description = desc?.slice(0, 100) + '...';
  const isLiked = user?.like?.includes(movie?._id) || false;
  const isInWatchlist = user?.watchlist?.includes(movie?._id) || false;
  const movieUser = movie?.user;

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  return (
    <div
      className="relative overflow-hidden md:w-full h-[78%] w-full max-w-[200px] md:max-w-none md:mr-0.5"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onMouseDown={handleTouchStart}
      onTouchStart={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
    >
      {copyModal.show && (
        <CopyModal isError={copyModal.isError}>
          <p>{copyModal.message}</p>
          <button onClick={handleCloseCopyModal}>Close</button>
        </CopyModal>
      )}

      <div className="absolute top-2.5 w-full px-1 flex justify-between"></div>
      {!hover && !isVideoPlaying ? (
        <>
          <div className="md:h-[70%] h-[70%]">
            <img
              className="w-full h-full object-cover cursor-pointer"
              src={img}
              alt={title}
            />
          </div>
          <div className="absolute md:bottom-3  w-full bg-black bg-opacity-50 flex justify-between p-3 gap-2.5">
            <h3 className="text-white text-[8px] md:text-[16px]  font-normal  w-[80%]" style={customStyle || {}}>
              {titleSpliced}
            </h3>
            {isMobile && !hover && !isVideoPlaying && (
              <HiDotsVertical
                className="text-white w-1/5 cursor-pointer"
                onClick={handleDotsClick}
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-between h-full w-full">
          <div className="h-20 w-full bg-black"></div>
          <video
            ref={videoRef}
            playsInline
            loop
            autoPlay={isVideoPlaying}
            muted
            className="w-full object-cover h-36 cursor-pointer max-w-[200px] md:max-w-none mx-auto"
          >
            <source
              src={
                movie?.video
                  ? `${movie.video}#t=${previewTimestamps.start},${previewTimestamps.end}`
                  : ''
              }
            />
          </video>
          <div
            className="h-52 w-full bg-black p-2 flex flex-col gap-2 mb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between align-middle ">
              <div className="flex items-center gap-2">
                <div className="flex w-8 h-4  md:w-20 md:h-4  rounded-sm bg-white justify-center gap-1 items-center">
                  <h6 className="text-black text-[0.15rem] md:text-[0.40rem] text-center">
                    By: {movieUser?.name || 'Anonymous'}
                  </h6>
                </div>
                <div className="flex items-center gap-1 text-white text-[0.5rem]">
                  <FaEye className="text-white" />
                  <span>{views || 0}</span>
                </div>
              </div>
              <div className="flex justify-end gap-1 items-center text-[10px]  md:text-[16px]">
                <FaHeart
                  className={`cursor-pointer ${isLiked ? 'text-red-600 fill-current' : 'text-gray-400'}`}
                  onClick={handleLike}
                />
                <span
                  className={`cursor-pointer ${isInWatchlist ? 'text-green-600' : 'text-gray-400'}`}
                  onClick={handleWatchlist}
                >
                  {isInWatchlist ? <FaCheck /> : <FaPlus />}
                </span>
                <FaPaperPlane
                  className="text-white text-[10px]  md:text-[16px] cursor-pointer"
                  onClick={handleCopyLink}
                />
              </div>
            </div>
            <h4 className="text-white text-[12px] md:text-[16px] font-semibold" style={customStyle || {}}>
              {titleSpliced}
            </h4>
            <p className="text-white text-[8px] md:text-[12px] font-light">{description}</p>
            {progress > 0 && (
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${(progress / 300) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
      {showPopup && (
        <div
          className="absolute bottom-12 right-5 p-2 bg-black bg-opacity-80 text-white rounded-lg shadow-lg flex flex-col items-center space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          <FaHeart
            className={`cursor-pointer ${isLiked ? 'text-red-600 fill-current' : 'text-gray-400'}`}
            onClick={handleLike}
          />
          <span
            className={`cursor-pointer ${isInWatchlist ? 'text-green-600' : 'text-gray-400'}`}
            onClick={handleWatchlist}
          >
            {isInWatchlist ? <FaCheck /> : <FaPlus />}
          </span>
          <FaPaperPlane
            className="text-white cursor-pointer"
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

const CopyModal = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ isError }) => (isError ? '#541011' : '#541011')};
  color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 300px;

  p {
    margin: 0;
    font-size: 14px;
    text-align: center;
  }

  button {
    background: #fff;
    color: ${({ isError }) => (isError ? '#ff4d4f' : '#28a745')};
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }
`;

export default Slidercontent;