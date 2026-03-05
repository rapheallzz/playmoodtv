import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaHeart, FaShare, FaPlus } from 'react-icons/fa';
import WelcomePopup from './Welcomepop';
import HighlightShareModal from './modals/HighlightShareModal';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';

const MobileBannerCard = ({ homePageData, isVisibleOnMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  // Take first 5 items or less for the banner
  const bannerContent = homePageData.slice(0, 5);
  const currentContent = bannerContent[activeSlide] || {};

  useEffect(() => {
    if (bannerContent.length > 1) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % bannerContent.length);
      }, 10000); // Switch every 10 seconds
      return () => clearInterval(interval);
    }
  }, [bannerContent.length]);

  if (!isVisibleOnMobile || bannerContent.length === 0) {
    return null;
  }

  const createSlug = (title, id) => {
    if (!title) return id;
    return `${title.replace(/\s+/g, '-').toLowerCase()}-${id}`;
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const slug = createSlug(currentContent.title, currentContent._id);
    const url = `${window.location.origin}/movie/${slug}`;
    setShareUrl(url);
    setIsShareModalOpen(true);
  };

  const handlePlayNow = () => {
    if (currentContent._id) {
      const slug = createSlug(currentContent.title, currentContent._id);
      navigate(`/movie/${slug}`, {
        state: {
          movie: currentContent.video || '',
          title: currentContent.title || '',
          desc: currentContent.description || '',
          credits: currentContent.credit || '',
        },
      });
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
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
    }
  };

  const handleWatchlistClick = async (e) => {
    e.stopPropagation();
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
    }
  };

  return (
    <CenteredContainer>
      <CardContainer
        backgroundImage={currentContent.thumbnail || '/16_models.png'}
        key={currentContent._id}
      >
        <CardContain>
          <Loveshare>
            <FaHeart
              onClick={handleLikeClick}
              style={{ color: user?.like?.includes(currentContent._id) ? '#ff0000' : 'white' }}
            />
            <FaShare onClick={handleShareClick} />
          </Loveshare>

          <CardContained>
            <TitleText>{currentContent.title || 'No Title'}</TitleText>
            <CategoryContainer>
              <CategoryText>
                {currentContent.category || 'N/A'}
                <DotSeparator>•</DotSeparator>
                {currentContent.credit || 'N/A'}
              </CategoryText>
            </CategoryContainer>

            <ButtonContainer>
              <LikecardButton>
                <ActionButton onClick={handlePlayNow} primary>
                  <FaPlay /> Play Now
                </ActionButton>
                <ActionButton onClick={handleWatchlistClick}>
                  <FaPlus /> Watchlist
                </ActionButton>
              </LikecardButton>
            </ButtonContainer>

            <RadioButtons>
              {bannerContent.map((_, index) => (
                <Dot
                  key={index}
                  active={index === activeSlide}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </RadioButtons>
          </CardContained>
        </CardContain>
      </CardContainer>

      <WelcomePopup
        showPopup={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />
      {isShareModalOpen && (
        <HighlightShareModal
          shareUrl={shareUrl}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  border-radius: 20px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: background-image 0.5s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.4) 40%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 480px) {
    height: 420px;
  }
`;

const CardContain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const CardContained = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const TitleText = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  text-align: center;
  font-weight: 800;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CategoryContainer = styled.div`
  margin-bottom: 20px;
`;

const CategoryText = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;

const DotSeparator = styled.span`
  margin: 0 8px;
  color: #541011;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 25px;
`;

const LikecardButton = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: ${(props) => (props.primary ? '#541011' : 'rgba(255, 255, 255, 0.1)')};
  color: white;
  border: ${(props) => (props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.3)')};
  border-radius: 50px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: all 0.2s;
  backdrop-filter: blur(5px);

  &:hover {
    background-color: ${(props) => (props.primary ? '#7a1719' : 'rgba(255, 255, 255, 0.2)')};
    transform: translateY(-2px);
  }
`;

const Loveshare = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  font-size: 24px;
  color: white;

  svg {
    cursor: pointer;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const RadioButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: ${(props) => (props.active ? '24px' : '8px')};
  height: 8px;
  background-color: ${(props) => (props.active ? '#541011' : 'rgba(255, 255, 255, 0.4)')};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export default MobileBannerCard;