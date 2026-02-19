
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

const Slidercontent = React.memo(function Slidercontent({ img, title, movie, id, desc, customStyle }) {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleHover = () => {
    setHover(true);
  };

  const handleHoverOut = () => {
    setHover(false);
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
    >
      <div className="absolute top-2 left-2 flex justify-between items-center w-full p-2">
        <img src={logo} className="w-auto h-6" alt="Banner Stamp" />
      </div>
      {!hover && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-4 flex justify-between items-center gap-2">
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
          <InfoSection>
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
