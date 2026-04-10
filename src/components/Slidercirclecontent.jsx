import React, { useState, useEffect, useRef } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePopup from '../components/Welcomepop';
import UniversalShareModal from './modals/UniversalShareModal';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import styled, { keyframes } from 'styled-components';

const breathe = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Slidercirclecontent = React.memo(function Slidercirclecontent({
  img,
  movie,
  onVideoClick,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchStartTime = useRef(0);
  const holdTimer = useRef(null);
  const [isHoldTriggered, setIsHoldTriggered] = useState(false);
  const isTouchActive = useRef(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e) => {
    if (e.type === 'touchstart') {
      isTouchActive.current = true;
    }
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    touchStart.current = { x: clientX, y: clientY };
    touchStartTime.current = Date.now();
    setIsHoldTriggered(false);

    if (isMobile) {
      holdTimer.current = setTimeout(() => {
        setIsHoldTriggered(true);
      }, 200);
    }
  };

  const handleTouchMove = (e) => {
    if (!touchStartTime.current) return;
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

    const distance = Math.sqrt(
      Math.pow(clientX - touchStart.current.x, 2) +
      Math.pow(clientY - touchStart.current.y, 2)
    );

    if (distance > 10) {
      if (holdTimer.current) {
        clearTimeout(holdTimer.current);
        holdTimer.current = null;
      }
      if (isMobile && isHoldTriggered) {
        setIsHoldTriggered(false);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (isMobile && isHoldTriggered && e.cancelable) {
      e.preventDefault();
    }

    if (e.type === 'touchend' || e.type === 'touchcancel') {
      setTimeout(() => {
        isTouchActive.current = false;
      }, 500);
    }

    const clientX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e.type === 'mouseup' ? e.clientY : e.changedTouches[0].clientY;
    const distance = Math.sqrt(
      Math.pow(clientX - touchStart.current.x, 2) +
      Math.pow(clientY - touchStart.current.y, 2)
    );

    const target = e.target;
    const isDotsIcon = target.closest('svg')?.classList.contains('text-white') || false;

    if (distance < 10 && !isDotsIcon) {
      const duration = Date.now() - touchStartTime.current;
      if (isMobile) {
        if (duration < 300 && !isHoldTriggered && onVideoClick) {
          if (e.cancelable) e.preventDefault();
          e.stopPropagation();
          onVideoClick();
        }
      } else if (onVideoClick) {
        onVideoClick();
      }
    }

    setIsHoldTriggered(false);
    touchStartTime.current = 0;
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

  const handleShare = (e) => {
    e.stopPropagation();
    if (movie?._id) {
      const formattedTitle = (movie.title || "content").toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const params = new URLSearchParams();
      if (img) params.append('img', img);
      if (movie.video) params.append('video', movie.video);
      const url = `${window.location.origin}/movie/${formattedTitle}-${movie._id}${params.toString() ? '?' + params.toString() : ''}`;
      setShareUrl(url);
      setIsShareModalOpen(true);
    }
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
      onMouseMove={handleTouchMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="relative flex items-center justify-center">
        <img
          className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-cover cursor-pointer rounded-full aspect-[1/1]"
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
            onClick={handleShare}
          />
        </div>
      )}

      <WelcomePopup
        showPopup={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />
      {isShareModalOpen && (
        <UniversalShareModal
          shareUrl={shareUrl}
          title={movie?.title}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </CircleContainer>
  );
});

const CircleContainer = styled.div`
  width: 160px;
  height: 160px;
  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 480px) {
    width: 40vw;
    height: 40vw;
    max-width: 140px;
    max-height: 140px;
  }
  @media (max-width: 360px) {
    width: 35vw;
    height: 35vw;
    max-width: 120px;
    max-height: 120px;
  }
  margin: 0 auto;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    animation: ${breathe} 1.5s infinite;
    z-index: 10;
  }
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