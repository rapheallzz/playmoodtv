
import React, { useState } from 'react';
import styled from 'styled-components';
import { GiCoins } from 'react-icons/gi';
import logo from '/PLAYMOOD_DEF.png';
import playbutton from '/play-button2.png';
import whiteheart from '/whiteheart.png';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import HeartOutlineIcon from './Hearticon';
import { useDispatch, useSelector } from 'react-redux';
import { likeVideo } from '../features/authSlice';


const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 35%;
  background-color: black;
  padding: 1.25rem;
`;

const Title = styled.h4`
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.p`
  color: white;
  font-size: 0.75rem;
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Slidercontent = React.memo(function Slidercontent({ img, title, movie, id, desc, customStyle, onVideoClick }) {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const touchStart = React.useRef({ x: 0, y: 0 });
  const touchStartTime = React.useRef(0);
  const holdTimer = React.useRef(null);
  const [isHoldTriggered, setIsHoldTriggered] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHover = () => {
    if (!isMobile) {
      setHover(true);
    }
  };

  const handleHoverOut = () => {
    if (!isMobile) {
      setHover(false);
    }
  };

  const handleTouchStart = (e) => {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    touchStart.current = { x: clientX, y: clientY };
    touchStartTime.current = Date.now();
    setIsHoldTriggered(false);

    if (isMobile) {
      holdTimer.current = setTimeout(() => {
        setHover(true);
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
        setIsHoldTriggered(false);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (isMobile) {
      setHover(false);
    }

    const clientX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e.type === 'mouseup' ? e.clientY : e.changedTouches[0].clientY;

    const distance = Math.sqrt(
      Math.pow(clientX - touchStart.current.x, 2) +
      Math.pow(clientY - touchStart.current.y, 2)
    );

    const target = e.target;
    const isMetadataArea = target.closest('.metadata-area');

    if (distance < 10 && !isMetadataArea) {
      const duration = Date.now() - touchStartTime.current;
      if (isMobile) {
        if (e.cancelable) e.preventDefault();
        if (duration < 300 && !isHoldTriggered && onVideoClick) {
          onVideoClick();
        }
      } else if (onVideoClick) {
        onVideoClick();
      }
    }

    setIsHoldTriggered(false);
    touchStartTime.current = 0;
  };

  const handleLikeClick = async () => {
    try {
      // Check if the user is logged in
      if (!user || !user.id) {
        return;
      }

      const userId = user.id;
      const contentId = id;

      // Dispatch the likeVideo action
      await dispatch(likeVideo({ userId, videoId: contentId }));
    } catch (error) {
    }
  };

  return (
    <div
      data-testid="slider-content-item"
      className="relative flex flex-col overflow-hidden justify-between w-full h-full cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onMouseDown={handleTouchStart}
      onTouchStart={handleTouchStart}
      onMouseMove={handleTouchMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-2 left-2 flex justify-between items-center w-full p-2">
        <img src={logo} className="w-auto h-6" alt="Banner Stamp" />
      </div>
      {!hover && (
        <div className="metadata-area absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-4 flex justify-between items-center gap-2">
          <h3
            className={`${customStyle ? customStyle : ""} text-white text-lg truncate`}
            title={title}
          >
            {title}
          </h3>
          <HiDotsVertical color="white" className="text-xl" />
        </div>
      )}
      {hover ? (
        <div className="flex flex-col justify-between w-full h-full bg-black">
          <div className="w-full h-[20%] bg-black"></div>
          <video playsInline loop autoPlay muted className="w-full h-[45%] object-cover">
            <source src={movie?.shortPreviewUrl || movie?.video || movie} />
          </video>
          <InfoSection className="metadata-area">
            <div className="flex justify-end items-center mb-1">
              <img src={whiteheart} alt="like" className="w-5 h-5" onClick={handleLikeClick} />
              <div className="w-2"></div>
              <FaPaperPlane color="white" className="text-xl" />
            </div>
            <Title className={customStyle} title={title}>{title}</Title>
            <Description>{desc}</Description>
          </InfoSection>
        </div>
      ) : (
        <img className="w-full h-full object-cover" src={img} alt={title} />
      )}
    </div>
  );

});

export default Slidercontent;
