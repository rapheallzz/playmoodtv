import React, { useState, useEffect, useRef } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePopup from './Welcomepop';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import styled from 'styled-components';

const Slidercirclecontent = React.memo(function Slidercirclecontent({
  img,
  movie,
  onVideoClick,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [copyModal, setCopyModal] = useState({ show: false, message: '', isError: false });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchTimeout = useRef(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e) => {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    touchStart.current = { x: clientX, y: clientY };
  };

  const handleTouchEnd = (e) => {
    clearTimeout(touchTimeout.current);
    touchTimeout.current = setTimeout(() => {
      const clientX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
      const clientY = e.type === 'mouseup' ? e.clientY : e.changedTouches[0].clientY;
      const distance = Math.sqrt(
        Math.pow(clientX - touchStart.current.x, 2) +
        Math.pow(clientY - touchStart.current.y, 2)
      );

      const target = e.target;
      const isDotsIcon = target.closest('svg')?.classList.contains('text-white') || false;

      if (distance < 10 && !isDotsIcon) {
        e.preventDefault();
        e.stopPropagation();
        onVideoClick();
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
        return;
      }
      if (isLiked) {
        await dispatch(unlikeContent({ contentId })).unwrap();
      } else {
        await dispatch(likeContent({ contentId })).unwrap();
      }
    } catch (error) {
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
      setLocalError('Failed to update watchlist. Please try again.');
    }
  };

  const handleDotsClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
        setCopyModal({ show: true, message: 'Failed to copy link. Please try again.', isError: true });
        setTimeout(() => setCopyModal({ show: false, message: '', isError: false }), 3000);
      });
  };

  const handleCloseCopyModal = () => {
    setCopyModal({ show: false, message: '', isError: false });
  };

  const isLiked = user?.like?.includes(movie?._id) || false;
  const isInWatchlist = user?.watchlist?.includes(movie?._id) || false;

  return (
    <CircleContainer
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

      <div className="relative flex items-center justify-center">
        <img
          className="w-[60px] h-[60px] object-cover cursor-pointer rounded-full aspect-[1/1]"
          src={img}
          alt="Content thumbnail"
        />
      </div>

      {showPopup && (
        <div
          className="absolute bottom-14 right-3 p-3 bg-black bg-opacity-80 text-white rounded-lg shadow-lg flex flex-col items-center space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          <FaHeart
            className={`cursor-pointer w-6 h-6 ${isLiked ? 'text-red-600 fill-current' : 'text-gray-400'}`}
            onClick={handleLike}
          />
          <span
            className={`cursor-pointer w-6 h-6 ${isInWatchlist ? 'text-green-600' : 'text-gray-400'}`}
            onClick={handleWatchlist}
          >
            {isInWatchlist ? <FaCheck /> : <FaPlus />}
          </span>
          <FaPaperPlane
            className="text-white cursor-pointer w-6 h-6"
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
    </CircleContainer>
  );
});

const CircleContainer = styled.div`
  width: 60px;
  height: 60px;
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
  @media (max-width: 480px) {
    width: 20vw;
    height: 20vw;
    max-width: 100px;
    max-height: 100px;
  }
  @media (max-width: 360px) {
    width: 15vw;
    height: 15vw;
    max-width: 80px;
    max-height: 80px;
  }
  margin: 0 auto;
  position: relative;
`;

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

export default Slidercirclecontent;