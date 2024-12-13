
import React, { useState } from 'react';
import { GiCoins } from 'react-icons/gi';
import logo from '/PLAYMOOD_DEF.png';
import playbutton from '/play-button2.png';
import whiteheart from '/whiteheart.png';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import HeartOutlineIcon from './Hearticon';
import { useDispatch, useSelector } from 'react-redux';
import { likeVideo } from '../features/authSlice';


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

  const titleSpliced = title.slice(0, 30) + '...';
  const description = desc.slice(0, 100) + '...';

  const handleLikeClick = async () => {
    try {
      // Check if the user is logged in
      if (!user || !user.id) {
        console.log('User not logged in');
        return;
      }

      const userId = user.id; 
      const contentId = id; 

      // Dispatch the likeVideo action
      await dispatch(likeVideo({ userId, videoId: contentId }));
    } catch (error) {
      console.error('Error liking content:', error);
    }
  };

  return (
    <div
      className="relative flex flex-col justify-between w-full h-full cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
    >
      <div className="absolute top-2 left-2 flex justify-between items-center w-full p-2">
        <img src={logo} className="w-auto h-6" alt="Banner Stamp" />
      </div>
      {!hover && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-4 flex justify-between items-center gap-2">
          <h3 className={`${customStyle ? customStyle : ""} text-white text-lg`}>{titleSpliced}</h3>
          <HiDotsVertical color="white" className="text-xl" />
        </div>
      )}
      {hover ? (
        <div className="flex flex-col justify-between w-full h-full">
          <div className="w-full h-20 bg-black"></div>
          <video playsInline loop autoPlay muted className="w-full h-36 object-cover">
            <source src={movie} />
          </video>
          <div className="flex flex-col  w-full h-44 bg-black p-5">
            <div className="flex justify-end items-center">
              <img src={whiteheart} alt="like" className="w-5 h-5" onClick={handleLikeClick} />
              <div className="w-2"></div>
              <FaPaperPlane color="white" className="text-xl" />
            </div>
            <h4 className={`${customStyle ? customStyle : ""} text-white text-sm font-semibold`}>{titleSpliced}</h4>
            <p className="text-white text-xs font-light">{description}</p>
          </div>
        </div>
      ) : (
        <img className="w-full h-full object-cover" src={img} alt={title} />
      )}
    </div>
  );
  
});

export default Slidercontent;
