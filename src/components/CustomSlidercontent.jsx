import React, { useState, useEffect, useRef, memo } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePopup from '../components/Welcomepop';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Slidercontent = memo(({ img, title, movie, views, desc, customStyle, progress, onVideoClick }) => {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update preview timestamps
  useEffect(() => {
    if (movie?.shortPreview?.start && movie?.shortPreview?.end) {
      setPreviewTimestamps({
        start: movie.shortPreview.start,
        end: movie.shortPreview.end,
      });
    }
  }, [movie]);

  // Handle video play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (video && isVideoPlaying) {
      video.play().catch((err) => {});
    } else if (video) {
      video.pause();
    }
  }, [isVideoPlaying]);

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

      if (distance < 10) {
        e.preventDefault();
        e.stopPropagation();
        if (isMobile) {
          setHover(!hover);
          setIsVideoPlaying(!isVideoPlaying);
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
      if (!contentId) throw new Error('Content ID is missing');
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
      const userId = user.userId || user._id;
      if (!contentId || !userId) throw new Error('Missing content or user ID');
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
    setShowPopup(!showPopup);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(window.location.href)
      .then(() =>
        setCopyModal({ show: true, message: 'Link copied to clipboard!', isError: false })
      )
      .catch(() =>
        setCopyModal({ show: true, message: 'Failed to copy link.', isError: true })
      );
    setTimeout(() => setCopyModal({ show: false, message: '', isError: false }), 3000);
  };

  const titleSpliced = title?.slice(0, 30) + (title?.length > 30 ? '...' : '');
  const description = desc?.slice(0, 100) + (desc?.length > 100 ? '...' : '');
  const isLiked = user?.like?.includes(movie?._id) || false;
  const isInWatchlist = user?.watchlist?.includes(movie?._id) || false;
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  return (
    <SlideWrapper
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      {copyModal.show && (
        <CopyModal isError={copyModal.isError}>
          <p>{copyModal.message}</p>
          <button onClick={() => setCopyModal({ show: false, message: '', isError: false })}>
            Close
          </button>
        </CopyModal>
      )}
      {!hover && !isVideoPlaying ? (
        <ImageWrapper>
          <LazyLoadImage
            src={img}
            alt={title}
            effect="blur"
            className="w-full h-full object-cover cursor-pointer"
            placeholderSrc="/placeholder.jpg"
          />
          <Overlay>
            <Title style={customStyle}>{titleSpliced}</Title>
            {isMobile && (
              <HiDotsVertical
                className="text-white w-1/5 h-10 cursor-pointer"
                onClick={handleDotsClick}
                aria-label="More options"
              />
            )}
          </Overlay>
        </ImageWrapper>
      ) : (
        <ContentWrapper>
          <video
            ref={videoRef}
            playsInline
            loop
            muted
            className="w-full object-cover h-36 cursor-pointer"
            src={movie?.video ? `${movie.video}#t=${previewTimestamps.start},${previewTimestamps.end}` : ''}
            onClick={onVideoClick}
            aria-label={`Preview for ${title}`}
          />
          <DetailsWrapper onClick={(e) => e.stopPropagation()}>
            <MetaData>
              <UserInfo>
                By: {movie?.user?.name || 'Anonymous'}
              </UserInfo>
              <ViewCount>
                <FaEye /> {views || 0}
              </ViewCount>
            </MetaData>
            <Actions>
              <FaHeart
                className={`cursor-pointer ${isLiked ? 'text-red-600 fill-current' : 'text-gray-400'}`}
                onClick={handleLike}
                aria-label={isLiked ? 'Unlike' : 'Like'}
              />
              <span
                className={`cursor-pointer ${isInWatchlist ? 'text-green-600' : 'text-gray-400'}`}
                onClick={handleWatchlist}
                aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                {isInWatchlist ? <FaCheck /> : <FaPlus />}
              </span>
              <FaPaperPlane
                className="text-white cursor-pointer"
                onClick={handleCopyLink}
                aria-label="Share link"
              />
            </Actions>
            <Title style={customStyle}>{titleSpliced}</Title>
            <Description>{description}</Description>
            {progress > 0 && (
              <ProgressBar>
                <Progress style={{ width: `${(progress / 300) * 100}%` }} />
              </ProgressBar>
            )}
          </DetailsWrapper>
        </ContentWrapper>
      )}
      {showPopup && (
        <Popup onClick={(e) => e.stopPropagation()}>
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
          <FaPaperPlane className="text-white cursor-pointer" onClick={handleCopyLink} />
        </Popup>
      )}
      {showWelcomePopup && (
        <WelcomePopup
          showPopup={showWelcomePopup}
          onClose={() => setShowWelcomePopup(false)}
          onLogin={() => setShowWelcomePopup(false)}
          onRegister={() => setShowWelcomePopup(false)}
        />
      )}
      {localError && <ErrorMessage>{localError}</ErrorMessage>}
    </SlideWrapper>
  );
});

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 300px;
  margin: 0 auto;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:focus {
    outline: 2px solid #007bff;
  }

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 70%;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DetailsWrapper = styled.div`
  background: #000;
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MetaData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.span`
  font-size: 0.7rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
`;

const ViewCount = styled.span`
  font-size: 0.7rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Title = styled.h4`
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const Description = styled.p`
  color: #fff;
  font-size: 0.8rem;
  margin: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  background: #444;
  height: 4px;
  border-radius: 2px;
`;

const Progress = styled.div`
  background: #e50914;
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const Popup = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CopyModal = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${({ isError }) => (isError ? '#ff4d4f' : '#28a745')};
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff4d4f;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
`;

export default Slidercontent;