import React, { useState, useEffect, useRef } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePopup from '../components/Welcomepop';
import UniversalShareModal from './modals/UniversalShareModal';
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [previewTimestamps, setPreviewTimestamps] = useState({ start: 0, end: 15 });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const videoRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchStartTime = useRef(0);
  const holdTimer = useRef(null);
  const [isHoldTriggered, setIsHoldTriggered] = useState(false);

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
      setIsMobile(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isVideoPlaying && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = previewTimestamps.start;
    }
  }, [isVideoPlaying, previewTimestamps.start]);

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
    touchStartTime.current = Date.now();
    setIsHoldTriggered(false);

    if (isMobile) {
      // Delay playing video to distinguish between tap and hold
      holdTimer.current = setTimeout(() => {
        setHover(true);
        setIsVideoPlaying(true);
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
        setHover(false);
        setIsVideoPlaying(false);
        setIsHoldTriggered(false);
      }
    }
  };

  // Handle touch end to detect tap vs. drag
  const handleTouchEnd = (e) => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (isMobile) {
      setHover(false);
      setIsVideoPlaying(false);
    }

    const clientX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e.type === 'mouseup' ? e.clientY : e.changedTouches[0].clientY;

    const distance = Math.sqrt(
      Math.pow(clientX - touchStart.current.x, 2) +
      Math.pow(clientY - touchStart.current.y, 2)
    );

    // Check if the tap target is the image or its container, not the dots icon or metadata area
    const target = e.target;
    const isMetadataArea = target.closest('.metadata-area');
    const isDotsIcon = target.closest('svg')?.classList.contains('text-white') || false;

    if (distance < 10 && !isDotsIcon && !isMetadataArea) {
      const duration = Date.now() - touchStartTime.current;
      if (isMobile) {
        if (e.cancelable) e.preventDefault();
        // If it was a short tap (hold wasn't triggered)
        if (duration < 300 && !isHoldTriggered && onVideoClick) {
          onVideoClick();
        }
      } else {
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
    e.preventDefault(); // Prevent default to avoid triggering parent touch events
    setShowPopup(!showPopup);
  };

  const createSlug = (title, _id) => {
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${formattedTitle}-${_id}`;
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (movie?._id) {
      const slug = createSlug(title, movie._id);
      const params = new URLSearchParams();
      if (img) params.append('img', img);
      if (movie.video) params.append('video', movie.video);
      const url = `${window.location.origin}/movie/${slug}${params.toString() ? '?' + params.toString() : ''}`;
      setShareUrl(url);
      setIsShareModalOpen(true);
    }
  };

  const isLiked = user?.like?.includes(movie?._id) || false;
  const isInWatchlist = user?.watchlist?.includes(movie?._id) || false;
  const movieUser = movie?.user;

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const truncateTitle = (str, maxLength = 20) => {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  return (
    <div
      data-testid="slider-item"
      className="relative overflow-hidden w-full h-full md:mr-0.5"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onMouseDown={handleTouchStart}
      onTouchStart={handleTouchStart}
      onMouseMove={handleTouchMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-2.5 w-full px-1 flex justify-between"></div>
      {!hover && !isVideoPlaying ? (
        <div className="flex flex-col h-full w-full bg-[#111]">
          <div className="h-[70%] w-full overflow-hidden">
            <img
              className="w-full h-full object-cover cursor-pointer"
              src={img}
              alt={title}
            />
          </div>
          <div className="metadata-area w-full h-[30%] bg-[#111] flex justify-between p-2 gap-2.5">
            <h3
              className="text-white text-xs md:text-sm font-normal w-[85%] truncate self-center"
              style={customStyle || {}}
              title={title}
            >
              {title}
            </h3>
            {isMobile && (
              <HiDotsVertical
                className="text-white w-[15%] cursor-pointer self-center"
                onClick={handleDotsClick}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full w-full bg-[#111]">
          <div className="h-[70%] w-full overflow-hidden">
            <video
              ref={videoRef}
              playsInline
              loop
              autoPlay={isVideoPlaying}
              muted
              className="w-full h-full object-cover cursor-pointer"
            >
              <source
                src={
                  movie?.shortPreviewUrl
                    ? movie.shortPreviewUrl
                    : movie?.video
                      ? `${movie.video}#t=${previewTimestamps.start},${previewTimestamps.end}`
                      : ''
                }
              />
            </video>
          </div>
          <div
            className="metadata-area w-full h-[30%] p-2 flex flex-col gap-1.5 bg-[#111]"
            onClick={(e) => e.stopPropagation()}
          >
            <MetaContainer>
              <InfoGroup>
                <CreatorBadge>
                  <h6 title={movieUser?.username || movieUser?.name || movie?.username || 'Anonymous'}>
                    <span className="by-prefix">By: </span>
                    {movieUser?.username || movieUser?.name || movie?.username || 'Anonymous'}
                  </h6>
                </CreatorBadge>
                <ViewStats>
                  <FaEye />
                  <span>{views || 0}</span>
                </ViewStats>
              </InfoGroup>
              <ActionButtons $isLiked={isLiked} $isInWatchlist={isInWatchlist}>
                <FaHeart className="like-icon" onClick={handleLike} title={isLiked ? "Unlike" : "Like"} />
                <span className="watchlist-icon" onClick={handleWatchlist}>
                  {isInWatchlist ? <FaCheck /> : <FaPlus />}
                </span>
                <FaPaperPlane className="share-icon" onClick={handleShare} />
              </ActionButtons>
            </MetaContainer>
            <Title style={customStyle || {}}>{title}</Title>
            <Description>{desc}</Description>
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
          title={title}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
});

const MetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
  gap: 4px;
  flex-shrink: 0;
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const CreatorBadge = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;

  h6 {
    color: #ccc;
    font-size: 0.6rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
      font-size: 0.75rem;
    }

    .by-prefix {
      @media (max-width: 480px) {
        display: none;
      }
    }
  }
`;

const ViewStats = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: white;
  font-size: 0.6rem;
  flex-shrink: 0;

  svg {
    font-size: 0.65rem;
    @media (min-width: 768px) {
      font-size: 0.8rem;
    }
  }

  @media (min-width: 768px) {
    font-size: 0.75rem;
    gap: 4px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;

  svg, span {
    font-size: 0.7rem;
    @media (min-width: 768px) {
      font-size: 0.85rem;
    }
  }

  @media (min-width: 768px) {
    gap: 10px;
  }

  svg, span {
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .like-icon {
    color: ${props => props.$isLiked ? '#dc2626' : '#9ca3af'};
    fill: currentColor;
  }

  .watchlist-icon {
    color: ${props => props.$isInWatchlist ? '#16a34a' : '#9ca3af'};
    display: flex;
    align-items: center;
  }

  .share-icon {
    color: white;
  }
`;

const Title = styled.h4`
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  color: white;
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default Slidercontent;