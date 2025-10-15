import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slidertop10 from '../components/sliders/SliderTop10';
import SliderNew from '../components/sliders/SliderNew';
import SliderChannel from '../components/sliders/SliderChannels';
import SliderDiaries from '../components/sliders/SliderDaries';
import SliderSpace from '../components/sliders/SliderSpace';
import SlideRecommended from '../components/sliders/SliderRecommend';
import SliderInterview from '../components/sliders/SliderInterview';
import SliderFashion from '../components/sliders/SliderFashion';
import SliderDocumentaries from '../components/sliders/SliderDocumentaries';
import SliderCamera from '../components/sliders/SliderCameras';
import SliderSoon from '../components/sliders/SliderSoon';
import SliderTeens from '../components/sliders/SliderTeens';
import SliderOnly from '../components/sliders/SliderOnly';
import SliderSocial from '../components/sliders/SliderSocial';
import ShareModal from '../components/ShareModal';
import WelcomePopup from '../components/Welcomepop';
import instagram from '/instagram.png';
import channelsimg from '../assets/channels.png';
import logo from '/PLAYMOOD_DEF.png';
import { useNavigate, useParams } from 'react-router-dom';
import playbutton from '/play-button2.png';
import plusbutton from '/addbutton.png';
import VerticalHighlightViewer from '../components/creator/VerticalHighlightViewer';
import whiteheart from '/whiteheart.png';
import redheart from '/redheart.png';
import sendmessage from '/sendmessage.png';
import { AiOutlineClose } from 'react-icons/ai';
import LikedContentCard from '../components/LikedContentCard';
import axios from 'axios';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import Footer from '../components/footer/Footer';
import SliderTopTen from '../components/sliders/SliderTopTen';
import HighlightsHome from '../components/HighlightsHome';

// CookiesPopupContainer styled component
const CookiesPopupContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  padding: 1rem;

  .popup-content {
    background-color: white;
    padding: 1.25rem;
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    max-width: 500px;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .accept-btn {
    background-color: #541011;
    &:hover {
      background-color: #6b1516;
    }
  }

  .opt-out-btn {
    background-color: #6b7280;
    &:hover {
      background-color: #4b5563;
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    .popup-content {
      padding: 1rem;
    }

    h2 {
      font-size: 1rem;
    }

    p {
      font-size: 0.75rem;
    }

    button {
      font-size: 0.7rem;
      padding: 0.4rem 0.8rem;
    }
  }
`;

const breathe = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const NeonButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  img {
    height: 15px;
    width: 15px;
    margin-left: 4px;
    position: relative;
    top: 1px;
  }

  &:hover {
    animation: ${breathe} 1.5s infinite;
    box-shadow: 0 0 8px 2px #541011, 0 0 16px 4px #54101180;
    border-color: #541011;
    color: #ffffff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: ${(props) => (props.marginTop ? '8px' : '0')};
`;

const Homecontent = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  overflow-y: auto;
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;
    svg {
      font-size: 40px;
    }
  }
`;

const Banner = styled.div`
  width: 100vw;
  height: 55vh;
  position: relative;
  top: 0;
  left: 0;
  z-index: 300;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    height: auto;
    flex-direction: column;
    z-index: 200;
  }
`;

const BannerVideoContainer = styled.div`
  width: 60vw;
  height: 55vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 301;

  .banner-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
  }

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 300px;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 70px 100px 70px 60%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.0) 0%,
    rgba(0, 0, 0.0, 1.2) 60%,
    rgba(0, 0, 0, 0.9) 70%,
    rgba(0, 0, 0, 0.95) 100%
  );
  z-index: 303;
  color: white;

  h1 {
    font-size: 1.9rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    max-width: 500px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    max-width: 500px;
  }

  .view-more-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  }

  .flex {
    max-width: 500px;
  }

  @media screen and (max-width: 1000px) {
    padding: 50px 60px 50px 40%;
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    padding: 20px;
    align-items: center;
    background: rgba(0, 0, 0, 0.85);
    text-align: center;

    h1,
    p,
    .flex {
      max-width: 100%;
    }
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  align-items: center;
`;

const RadioButtons = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 304;

  input[type="radio"] {
    appearance: none;
    width: 12px;
    height: 12px;
    background-color: #ffffff80;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:checked {
      background-color: #541011;
    }

    &:hover {
      background-color: #54101180;
    }
  }

  @media screen and (max-width: 768px) {
    bottom: 10px;

    input[type="radio"] {
      width: 10px;
      height: 10px;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  z-index: 200;
  background-color: black;
  padding-top: 80px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding-top: 20px;
    padding-bottom: 20px;
    overflow-y: auto;
    min-height: 100vh;
  }
`;

const LikedContentCardWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  color: white;
  min-height: 400px;

  @media screen and (max-width: 768px) {
    padding: 10px;
    margin-top: 80px;
    margin-bottom: 60px;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
  z-index: 200;
  box-sizing: border-box;
  margin: 20px 0;
  padding: 0 10px;

  @media screen and (max-width: 495px) {
    margin: 50px 0 20px 0;
    padding: 0 5px;
    overflow-y: visible;
    touch-action: pan-y;
  }
`;

const VideoCategory = styled.div`
  width: 92%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  height:380px;
  min-height: 220px;
  box-sizing: border-box;
  z-index: 210;

  @media screen and (max-width: 768px) {
    min-height: 180px;
    margin: 10px 10px 20px 10px;
    padding-bottom: 20px;
    z-index: 210;
  }

  @media screen and (max-width: 495px) {
    min-height: 180px;
    height: auto;
    margin: 10px 10px 30px 10px;
    padding-bottom: 20px;
    z-index: 210;
  }
`;

const VideoCategoryHighlights = styled.div`
  width: 92%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  height: auto; /* Allow height to be flexible */
  min-height: 220px;
  box-sizing: border-box;
  z-index: 210;
  padding-top: 30px;

  @media screen and (max-width: 768px) {
    min-height: 180px;
    margin: 10px;
    padding-bottom: 10px; /* Reduce bottom padding */
  }

  @media screen and (max-width: 495px) {
    min-height: 150px;
    padding-bottom: 5px; /* Further reduce padding */
  }
`;

const VideoCategoryResponsive = styled(VideoCategory)`
  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 180px;
    margin: 10px;
    padding-bottom: 20px;
  }

  @media screen and (max-width: 495px) {
    height: auto;
    min-height: 150px;
    margin: 10px;
    padding-bottom: 15px;
  }
`;

const VideoCategoryCircle = styled.div`
  width: 92%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  height:300px;
  min-height: 220px;
  box-sizing: border-box;
  z-index: 210;

  @media screen and (max-width: 768px) {
    min-height: 180px;
    margin: 10px 10px 20px 10px;
    padding-bottom: 20px;
    z-index: 210;
  }

  @media screen and (max-width: 495px) {
    min-height: 220px;
    height: auto;
    margin: 10px 10px 30px 10px;
    padding-bottom: 20px;
    z-index: 210;
  }
`;


const Videocategorytitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  padding-bottom: 30px;
  font-weight: 600;

  @media only screen and (min-width: 300px) {
    font-size: 1.5rem;
    padding: 5px 5px 20px 25px;
  }

  @media only screen and (min-width: 800px) {
    font-size: 1.8rem;
    padding: 5px 5px 20px 60px;
  }
`;

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #000;
  color: white;
  padding: 20px 0;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    margin-top: 30px;
    padding: 15px 0;
  }
`;

function HomeContent({
  channels,
  set_channels,
  isMobile,
  setIsMobile,
  showCookiesPopup,
  setShowCookiesPopup,
  isLiked,
  setIsLiked,
  user,
  homePageData,
  setHomePageData,
  contentIndex,
  setContentIndex,
  shareModalOpen,
  setShareModalOpen,
  shareUrl,
  showWelcomePopup,
  setShowWelcomePopup,
  likedContent,
  setLikedContent,
  sliderContainerRef,
  highlights,
  setHighlights,
  isLoadingHighlights,
  setIsLoadingHighlights,
  selectedHighlight,
  setSelectedHighlight,
  viewedHighlights,
  setViewedHighlights,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FALLBACK_VIDEO_URL = 'https://res.cloudinary.com/di97mcvbu/video/upload/v1708430555/contents/q1xhinruadpovy0jxf6f.mp4';
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowCookiesPopup(true);
    }
  }, [setShowCookiesPopup]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  useEffect(() => {
    let timeoutId;
    if (!user) {
      timeoutId = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 15000);
    }
    return () => clearTimeout(timeoutId);
  }, [user, setShowWelcomePopup]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        setHomePageData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setHomePageData]);

  useEffect(() => {
    if (user && user.like && homePageData.length > 0) {
      const liked = homePageData.filter((content) => user.like.includes(content._id));
      setLikedContent(liked);
    } else {
      setLikedContent([]);
    }
  }, [user, homePageData, setLikedContent]);

  useEffect(() => {
    if (homePageData.length > 0) {
      const intervalId = setInterval(() => {
        setActiveSlide((prevIndex) => (prevIndex + 1) % Math.min(3, homePageData.length));
      }, 30000);
      return () => clearInterval(intervalId);
    }
  }, [homePageData.length]);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookiesPopup(false);
  };

  const handleOptOutCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowCookiesPopup(false);
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
      if (user && user._id) {
        const currentContent = homePageData[activeSlide];
        if (currentContent) {
          const contentId = currentContent._id;
          const isContentLiked = user.like && user.like.includes(contentId);
          if (isContentLiked) {
            await dispatch(unlikeContent({ userId: user._id, contentId }));
          } else {
            await dispatch(likeContent({ userId: user._id, contentId }));
          }
        }
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
    }
  };

  const handleWatchlist = async () => {
    try {
      if (user && user._id) {
        const currentContent = homePageData[activeSlide];
        if (currentContent) {
          const contentId = currentContent._id;
          const isWatchlisted = user.watchlist && user.watchlist.includes(contentId);
          if (isWatchlisted) {
            await dispatch(removeFromWatchlist({ userId: user._id, contentId }));
          } else {
            await dispatch(addToWatchlist({ userId: user._id, contentId }));
          }
        }
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error adding/removing from watchlist:', error);
    }
  };

  const handleWatchNow = () => {
    const currentContent = homePageData[activeSlide];
    if (currentContent) {
      navigate(`/movie/${currentContent._id}`, {
        state: {
          movie: currentContent.video,
          title: currentContent.title || '',
          desc: currentContent.description || '',
          credits: currentContent.credit || '',
        },
      });
    }
  };

  const truncateTitle = (title, maxLength) => {
    return title && title.length > maxLength ? title.slice(0, maxLength) + '...' : title || '';
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const CookiesPopup = () => (
    <CookiesPopupContainer>
      <div className="popup-content">
        <h2>Cookies Policy</h2>
        <p>We use cookies to enhance your experience. Please accept our cookies policy.</p>
        <div className="button-group">
          <button className="accept-btn" onClick={handleAcceptCookies}>
            Accept
          </button>
          <button className="opt-out-btn" onClick={handleOptOutCookies}>
            Opt Out
          </button>
        </div>
      </div>
    </CookiesPopupContainer>
  );

  return (
    <Homecontent>
      {showCookiesPopup && <CookiesPopup />}
      {isMobile ? (
        <Hamburger>
          <MobileBurger channels={channels} set_channels={set_channels} />
        </Hamburger>
      ) : (
        <DesktopHeader channels={channels} set_channels={set_channels} />
      )}
      {channels && (
        <div className="h-[500px] w-[1000px] absolute top-[100px] left-[250px] z-[1001] overflow-hidden flex justify-center items-center rounded-2xl md:w-4/5 md:h-4/5 md:left-20 md:top-[100px]">
          <button
            className="absolute w-5 h-5 top-2.5 right-2.5 bg-red-500 border-none rounded-full text-white text-lg cursor-pointer"
            onClick={() => set_channels(false)}
          >
            <AiOutlineClose />
          </button>
          <img
            src={channelsimg}
            alt=""
            className="w-full h-full absolute object-cover top-0 left-0 z-[-1]"
          />
          <div className="h-fit w-4/5 flex justify-center items-center flex-col gap-2.5">
            <h2 className="text-white text-2xl md:text-xl" style={{ textShadow: '2px 2px red' }}>
              This feature is Coming Soon
            </h2>
            <p className="text-white text-xl md:text-sm" style={{ textShadow: '1px 1px red' }}>
              Our content creators are doing great, and we are building a special platform for them!
            </p>
            <form className="flex justify-center items-center gap-5 w-1/2 mx-auto md:flex-col">
              <input
                name="name"
                placeholder="Name"
                type="text"
                className="px-5 py-2.5 rounded-full"
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="px-5 py-2.5 rounded-full"
              />
              <button className="bg-red-500 px-5 py-2.5 text-white border-none rounded-full cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
      <Content>
        {isMobile ? (
          <>
            <LikedContentCardWrapper>
              {homePageData.length === 0 ? (
                <p style={{ color: 'white', textAlign: 'center' }}>Loading content...</p>
              ) : (
                <LikedContentCard
                  likedContent={likedContent}
                  homePageData={homePageData}
                  contentIndex={contentIndex}
                  isVisibleOnMobile={isMobile}
                />
              )}
            </LikedContentCardWrapper>
          </>
        ) : (
          <Banner>
            <SliderWrapper>
              {homePageData.slice(0, 3).map((content, index) => (
                <Slide key={`slide-${content._id}`} active={index === activeSlide}>
                  <BannerVideoContainer>
                    <video
                      key={`banner-${content._id}`}
                      className="banner-video"
                      muted
                      loop
                      autoPlay
                      playsInline
                      onError={(e) => {
                        console.error('Banner video error:', e);
                        e.target.src = FALLBACK_VIDEO_URL;
                      }}
                    >
                      <source src={content.video} type="video/mp4" />
                    </video>
                  </BannerVideoContainer>
                  <BannerContent>
                    <div className="title-truncate mb-4">
                      <h1 className="font-semibold">{truncateTitle(content.title, 20)}</h1>
                    </div>
                    <div className="description-truncate mb-8">
                      <p>{content.description || ''}</p>
                      {content.description?.length > 150 && (
                        <button className="view-more-btn">View more</button>
                      )}
                    </div>
                    <ButtonContainer>
                      <NeonButton onClick={handleWatchNow}>
                        WATCH NOW
                        <img src={playbutton} alt="play" />
                      </NeonButton>
                      <NeonButton onClick={handleWatchlist}>
                        ADD TO WATCHLIST
                        <img src={plusbutton} alt="add" />
                      </NeonButton>
                    </ButtonContainer>
                    <ButtonContainer marginTop>
                      <NeonButton onClick={handleLike}>
                        LIKE
                        <img src={isLiked ? redheart : whiteheart} alt="heart" />
                      </NeonButton>
                      <NeonButton onClick={() => setShareModalOpen((prev) => !prev)}>
                        SHARE
                        <img src={sendmessage} alt="share" />
                      </NeonButton>
                      <NeonButton onClick={() => set_channels((prev) => !prev)}>
                        ADD TO FAVOURITE +
                      </NeonButton>
                    </ButtonContainer>
                    {shareModalOpen && (
                      <ShareModal
                        open={shareModalOpen}
                        onClose={() => setShareModalOpen(false)}
                        shareUrl={shareUrl}
                      />
                    )}
                  </BannerContent>
                </Slide>
              ))}
              <RadioButtons>
                {[0, 1, 2].map((index) => (
                  <input
                    key={`radio-${index}`}
                    type="radio"
                    name="banner-slide"
                    checked={activeSlide === index}
                    onChange={() => handleSlideChange(index)}
                  />
                ))}
              </RadioButtons>
            </SliderWrapper>
          </Banner>
        )}
        <SliderContainer ref={sliderContainerRef}>
          <VideoCategory>
            <Videocategorytitle>Top 10</Videocategorytitle>
            <SliderTopTen />
          </VideoCategory>
          <VideoCategoryHighlights>
            <Videocategorytitle>Highlights</Videocategorytitle>
            <HighlightsHome />
          </VideoCategoryHighlights>
          <VideoCategoryResponsive>
            <Videocategorytitle>New on Playmood</Videocategorytitle>
            <SliderNew />
          </VideoCategoryResponsive>
          <VideoCategoryCircle >
            <Videocategorytitle>Channels</Videocategorytitle>
            <SliderChannel />
          </VideoCategoryCircle>
          <VideoCategoryCircle >
            <Videocategorytitle>Diaries</Videocategorytitle>
            <SliderDiaries />
          </VideoCategoryCircle>
          <VideoCategoryCircle >
            <Videocategorytitle>Spaces</Videocategorytitle>
            <SliderSpace />
          </VideoCategoryCircle>
          <VideoCategory>
            <Videocategorytitle>Recommended for you</Videocategorytitle>
            <SlideRecommended />
          </VideoCategory>
          <VideoCategory >
            <Videocategorytitle>Interviews</Videocategorytitle>
            <SliderInterview />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Fashion Shows</Videocategorytitle>
            <SliderFashion />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Social</Videocategorytitle>
            <SliderSocial />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Documentaries and Reports</Videocategorytitle>
            <SliderDocumentaries />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Behind the Cameras</Videocategorytitle>
            <SliderCamera />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Soon in Playmood</Videocategorytitle>
            <SliderSoon />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Teens</Videocategorytitle>
            <SliderTeens />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Best in Fashion</Videocategorytitle>
            <SliderFashion />
          </VideoCategory>
          <VideoCategory>
            <Videocategorytitle>Only in Playmood</Videocategorytitle>
            <SliderOnly />
          </VideoCategory>
        </SliderContainer>
        <WelcomePopup
          showPopup={showWelcomePopup}
          onClose={() => setShowWelcomePopup(false)}
          onLogin={() => setShowWelcomePopup(false)}
          onRegister={() => setShowWelcomePopup(false)}
        />
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Content>
    </Homecontent>
  );
}

export default function Home() {
  const { encodedContentId } = useParams();
  const navigate = useNavigate();
  const [channels, set_channels] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showCookiesPopup, setShowCookiesPopup] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [homePageData, setHomePageData] = useState([]);
  const [contentIndex, setContentIndex] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl] = useState('');
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [likedContent, setLikedContent] = useState([]);
  const sliderContainerRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const [highlights, setHighlights] = useState([]);
  const [isLoadingHighlights, setIsLoadingHighlights] = useState(true);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [viewedHighlights, setViewedHighlights] = useState(new Set());
  const [showVerticalHighlightViewer, setShowVerticalHighlightViewer] = useState(false);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);

  useEffect(() => {
    if (encodedContentId) {
      const fetchHighlight = async () => {
        try {
          const contentId = atob(encodedContentId);
          const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${contentId}`);
          if (response.data) {
            const contentDetails = response.data;
            const creatorId = contentDetails.user._id;
            const creatorResponse = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${creatorId}`);
            const creatorInfo = {
              name: creatorResponse.data.name,
              profileImage: creatorResponse.data.profileImage || '',
            };
            const highlightData = {
              _id: contentDetails._id,
              content: contentDetails,
              creator: creatorInfo,
            };
            setHighlights([highlightData]);
            setShowVerticalHighlightViewer(true);
          }
        } catch (error) {
          console.error('Error fetching highlight:', error);
        }
      };
      fetchHighlight();
    }
  }, [encodedContentId]);

  return (
    <>
      {showVerticalHighlightViewer && (
        <VerticalHighlightViewer
          highlights={highlights}
          startIndex={highlightStartIndex}
          onClose={() => {
            setShowVerticalHighlightViewer(false);
            navigate('/');
          }}
        />
      )}
      <HomeContent
        channels={channels}
      set_channels={set_channels}
      isMobile={isMobile}
      setIsMobile={setIsMobile}
      showCookiesPopup={showCookiesPopup}
      setShowCookiesPopup={setShowCookiesPopup}
      isLiked={isLiked}
      setIsLiked={setIsLiked}
      user={user}
      homePageData={homePageData}
      setHomePageData={setHomePageData}
      contentIndex={contentIndex}
      setContentIndex={setContentIndex}
      shareModalOpen={shareModalOpen}
      setShareModalOpen={setShareModalOpen}
      shareUrl={shareUrl}
      showWelcomePopup={showWelcomePopup}
      setShowWelcomePopup={setShowWelcomePopup}
      likedContent={likedContent}
      setLikedContent={setLikedContent}
      sliderContainerRef={sliderContainerRef}
      highlights={highlights}
      setHighlights={setHighlights}
      isLoadingHighlights={isLoadingHighlights}
      setIsLoadingHighlights={setIsLoadingHighlights}
      selectedHighlight={selectedHighlight}
      setSelectedHighlight={setSelectedHighlight}
      viewedHighlights={viewedHighlights}
      setViewedHighlights={setViewedHighlights}
    />
  );
}

export {
  Homecontent,
  Content,
  Banner,
  VideoCategory,
  Videocategorytitle,
  LikedContentCardWrapper,
  SliderContainer,
  FooterContainer
};