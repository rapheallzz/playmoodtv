
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
    <div className="card" onMouseEnter={handleHover} onMouseLeave={handleHoverOut}>
      <div className="attached-movie-actions">
        <img src={logo} className="banner-stamp" alt="Banner Stamp" />
      </div>
      {!hover && (
        <div className="prev-movie-info">
          <h3 style={customStyle || {}}>{titleSpliced}</h3>
          <HiDotsVertical color="white" className="more-info-dots" />
        </div>
      )}
      {hover ? (
        <div className="video-hovered">
          <div className="video-hovered-top"></div>
          <video playsInline loop autoPlay muted className="movie-slider">
            <source src={movie} />
          </video>
          <div className="video-hovered-bottom">
            <div className="movie-action-icons">
              <div className="icons-right">
                <img src={whiteheart} alt="" className='movie-action-like' onClick={handleLikeClick} />
                <div className="icon-space"></div>
                <FaPaperPlane color="white" className="send-icon" />
              </div>
            </div>
            <h4 style={customStyle || {}}>{titleSpliced}</h4>
            <p>{description}</p>
          </div>
        </div>
      ) : (
        <img className="img-movies" src={img} alt={title} />
      )}
    </div>
  );
});

export default Slidercontent;
