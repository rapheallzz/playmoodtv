
import React, { useState } from 'react';
import { GiCoins } from 'react-icons/gi';
import logo from '/PLAYMOOD_DEF.png';
import playbutton from '/play-button2.png';
import whiteheart from '/whiteheart.png';
import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import HeartOutlineIcon from '../Hearticon';
import { useDispatch, useSelector } from 'react-redux';
import { likeContent } from '../../features/authSlice';
import { CreatorSlider as StyledCreatorSlider } from '../../styles/CreatorPageStyles';

const CreatorSlider = React.memo(function CreatorSlider({ img, title, movie, id, customStyle, onVideoClick }) {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleHover = () => {
    setHover(true);
  };

  const handleHoverOut = () => {
    setHover(false);
  };

  const description = movie && movie.description ? movie.description.slice(0, 100) + '...' : '';

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // Prevent modal from opening
    try {
      if (!user || !user.id) {
        return;
      }
      const contentId = movie._id;
      await dispatch(likeContent({ contentId }));
    } catch (error) {
    }
  };

  return (
    <StyledCreatorSlider
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onClick={onVideoClick}
    >
      {!hover ? (
        <div className="flex flex-col justify-between h-full w-full bg-black">
          <div className="h-[70%] relative">
            <img className="w-full h-full object-cover" src={img} alt={title} />
            <div className="absolute top-2 left-2 flex justify-between items-center w-full p-2">
              <img src={logo} className="w-auto h-6" alt="Banner Stamp" />
            </div>
          </div>
          <div className="metadata-area w-full h-[30%] bg-black flex justify-between p-2 gap-2.5 relative">
            <h3 className="text-white text-xs md:text-base font-normal w-[85%] truncate self-center" style={customStyle || {}}>
              {title}
            </h3>
            <HiDotsVertical color="white" className="text-white w-fit cursor-pointer self-center" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full w-full bg-black">
          <div className="h-[70%]">
            <video playsInline loop autoPlay muted className="w-full h-full object-cover">
              <source src={movie?.shortPreview || movie?.video} />
            </video>
          </div>
          <div className="metadata-area w-full h-[30%] p-2 flex flex-col gap-1.5 overflow-hidden">
            <div>
              <h4 className="text-white text-xs md:text-sm font-semibold truncate">{title}</h4>
              <p className="text-white text-[0.65rem] font-light mt-0.5 line-clamp-2">{description}</p>
            </div>
            <div className="flex justify-end items-center mt-auto">
              <img src={whiteheart} alt="like" className="w-5 h-5 cursor-pointer" onClick={handleLikeClick} />
              <div className="w-2"></div>
              <FaPaperPlane color="white" className="text-sm cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </StyledCreatorSlider>
  );
});

export default CreatorSlider;
