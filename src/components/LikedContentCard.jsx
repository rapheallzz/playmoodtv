import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaHeart, FaShare, FaPlus } from 'react-icons/fa';
import LinkCopied from './sliders/linkCopied';
import WelcomePopup from './Welcomepop';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';

const LikedContentCard = ({ likedContent, homePageData, contentIndex, isVisibleOnMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  // Use likedContent if available, otherwise fall back to homePageData
  const contentArray = likedContent.length > 0 ? likedContent : homePageData;
  const currentContent = contentArray[contentIndex % contentArray.length] || {};

  // Debugging logs
  useEffect(() => {
    console.log('LikedContentCard props:', {
      likedContent,
      homePageData,
      contentIndex,
      isVisibleOnMobile,
      currentContent,
      contentArrayLength: contentArray.length,
    });
  }, [likedContent, homePageData, contentIndex, isVisibleOnMobile, currentContent, contentArray]);

  if (!isVisibleOnMobile || !currentContent._id) {
    console.log('Not rendering LikedContentCard: isVisibleOnMobile or currentContent._id missing');
    return null;
  }

  const handleShareClick = () => {
    const videoUrl = currentContent.video || '';
    console.log('Sharing video URL:', videoUrl);
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  const handlePlayNow = () => {
    if (currentContent._id) {
      navigate(`/movie/${currentContent._id}`, {
        state: {
          movie: currentContent.video || '',
          title: currentContent.title || '',
          desc: currentContent.description || '',
          credits: currentContent.credit || '',
        },
      });
    }
  };

  const handleLikeClick = async () => {
    if (!user) {
      setShowWelcomePopup(true);
      return;
    }
    try {
      const contentId = currentContent._id;
      const isLiked = user.like && user.like.includes(contentId);
      if (isLiked) {
        await dispatch(unlikeContent({ userId: user._id, contentId }));
      } else {
        await dispatch(likeContent({ userId: user._id, contentId }));
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
    }
  };

  const handleWatchlistClick = async () => {
    if (!user) {
      setShowWelcomePopup(true);
      return;
    }
    try {
      const contentId = currentContent._id;
      const isWatchlisted = user.watchlist && user.watchlist.includes(contentId);
      if (isWatchlisted) {
        await dispatch(removeFromWatchlist({ userId: user._id, contentId }));
      } else {
        await dispatch(addToWatchlist({ userId: user._id, contentId }));
      }
    } catch (error) {
      console.error('Error adding/removing from watchlist:', error);
    }
  };

  return (
    <CenteredContainer>
      <CardContainer backgroundImage={currentContent.thumbnail || '/16_models.png'}>
        <CardContain>
          <Loveshare>
            <FaHeart
              onClick={handleLikeClick}
              style={{ color: user?.like?.includes(currentContent._id) ? '#ff0000' : '#541011' }}
            />
            <FaShare onClick={handleShareClick} />
          </Loveshare>
          <CardContained>

           <TitleText>{currentContent.title || 'No Title'}</TitleText>
          <CategoryContainer>
            <CategoryText>
              Category
              <DotSeparator>•</DotSeparator>
              {currentContent.category || 'N/A'}
              <DotSeparator>•</DotSeparator>
              {currentContent.credit || 'N/A'}
            </CategoryText>
          </CategoryContainer>
          <ButtonContainer>
            <LikecardButton>
              <LikeButton onClick={handlePlayNow}>
                <FaPlay /> Play Now
              </LikeButton>
              <LikeButton onClick={handleWatchlistClick}>
                <FaPlus /> {user?.watchlist?.includes(currentContent._id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </LikeButton>
            </LikecardButton>
          </ButtonContainer>

          </CardContained>
        </CardContain>
      </CardContainer>
      <LinkCopied showPopup={showPopup} onClose={() => setShowPopup(false)} />
      <WelcomePopup
        showPopup={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  position: relative;
  top: 20px;

  @media screen and (max-width: 414px) {
    min-height: 350px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 450px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  overflow: hidden; /* Ensure the gradient doesn't overflow */

  /* Gradient overlay */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%; /* Adjust height to control gradient coverage */
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 2) 0%, /* Darker at the bottom */
      rgba(0, 0, 0, 0.9) 50%, /* Slightly transparent in the middle */
      rgba(0, 0, 0, 0) 100% /* Fully transparent at the top */
    );
    pointer-events: none; /* Allow clicks to pass through */
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: 350px;
    height: 400px;
  }

  @media (max-width: 320px) {
    width: 85%;
    height: 350px;
  }
`;

const CardContain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 10px;
`;

const CardContained = styled.div`
  position: absolute;
  bottom: 10px; /* Add some padding from the bottom */
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Ensure content is above the gradient */
`;

const TitleText = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: #ffffff; /* White for better contrast */
  background-color: rgba(0, 0, 0, 0.5); /* Slightly darker background for readability */
  padding: 5px 30px;
  margin: 5px 10px;
  border-radius: 4px;
`;

const CategoryContainer = styled.div`
  margin-bottom: 12px;
`;

const CategoryText = styled.p`
  margin: 0px 10px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  color: #ffffff; 
`;

const DotSeparator = styled.span`
  margin: 0 6px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikecardButton = styled.div`
  display: flex;
  align-self: center;
`;

const Loveshare = styled.div`
  width: full;
  display: flex;
  gap:8px;
  color: #541011;

  // @media (max-width: 768px) {
  //   top: -180px;
  //   right: -120px;
  // }

  // @media (max-width: 425px) {
  //   right: -100px;
  // }

  // @media (max-width: 320px) {
  //   top: -240px;
  //   right: -80px;
  // }
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  max-width: 200px;
  width: auto;
  height: auto;
  margin: 7px;
  padding: 10px;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;

  &:hover {
    background-color: #541011;
    color: white;
  }
`;

export default LikedContentCard;