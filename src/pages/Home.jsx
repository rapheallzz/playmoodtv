import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import styled from "styled-components";
import MobileBurger from "../components/headers/MobileBurger";
import DesktopHeader from '../components/headers/DesktopHeader'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slidertop10 from '../components/sliders/SliderTop10'
import SliderNew from '../components/sliders/SliderNew'
import SliderChannel from '../components/sliders/SliderChannels'
import SliderDiaries from '../components/sliders/SliderDaries'
import SliderSpace from '../components/sliders/SliderSpace'
import SlideRecommended from '../components/sliders/SliderRecommend'
import SliderInterview from '../components/sliders/SliderInterview'
import SliderFashion from '../components/sliders/SliderFashion'
import SliderDocumentaries from '../components/sliders/SliderDocumentaries'
import SliderCamera from '../components/sliders/SliderCameras'
import SliderSoon from '../components/sliders/SliderSoon'
import SliderTeens from '../components/sliders/SliderTeens'
import SliderOnly from '../components/sliders/SliderOnly'
import SliderWatchlist from '../components/sliders/SliderWatchlist'
import SliderSocial from '../components/sliders/SliderSocial'

import ShareModal from '../components/ShareModal';
import WelcomePopup from '../components/Welcomepop';
import instagram from "/instagram.png";
import channelsimg from "../assets/channels.png";
import logo from "/PLAYMOOD_DEF.png";
import { useNavigate } from 'react-router-dom';
import playbutton from "/play-button2.png";
import plusbutton from "/addbutton.png";
import whiteheart from "/whiteheart.png";
import redheart from "/redheart.png";
import sendmessage from "/sendmessage.png";
import { AiOutlineClose } from 'react-icons/ai';
// import { likeVideo, shareVideo } from '../features/authSlice';
import LikedContentCard from '../components/LikedContentCard';
import axios from 'axios';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import contentService from '../features/contentService'; // Update the path




export default function Home() {
  const [channels, set_channels] = useState(false)
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  //  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
   const [showCookiesPopup, setShowCookiesPopup] = useState(false);




   useEffect(() => {
    // const privacyAccepted = localStorage.getItem('privacyAccepted');
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    // if (!privacyAccepted) {
    //   setShowPrivacyPopup(true);
    // }
    
    if (!cookiesAccepted) {
      setShowCookiesPopup(true);
    }

  }, []);


  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookiesPopup(false);
  };

  const handleOptOutCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false'); // Optional: store opt-out preference
    setShowCookiesPopup(false);
  };

  const handleAcceptPrivacy = () => {
    localStorage.setItem('privacyAccepted', 'true');
    setShowPrivacyPopup(false);
  
      if (onAccept) {
        onAccept();
        navigate('/privacy');
      }
  
  };



  // state for changing color of heart icon
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();



  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const user = useSelector(state => state.auth.user);

  const [homePageData, setHomePageData] = useState(false);
  const [contentIndex, setContentIndex] = useState(0);


  const handleLike = async () => {
    setIsLiked(!isLiked); // to change the color of the heart icon

    try {

      if (user && user._id) {
        const currentContent = homePageData && homePageData[contentIndex];
        console.log(currentContent)
        if (currentContent) {
          const contentId = currentContent._id;

          // Check if user.likes is defined before calling includes
          const isLiked = user.like && user.like.includes(contentId);

          // console.log('user.like:', user.like);
          // console.log('user.id :', user._id);
          // console.log('contentId:', contentId);
          // console.log('isLiked:', isLiked);

          if (isLiked) {
            await dispatch(unlikeContent({ userId: user._id, contentId })); // Dispatch unlikeContent action
          } else {
            // If the content is not liked, dispatch likeContent action
            await dispatch(likeContent({ userId: user._id, contentId }));


            // Optionally, you can update UI to reflect that the content has been liked
          }
        }
      } else {
        // Handle case where user is not authenticated or user._id is null
        // You can show a message or redirect the user to login/register page
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
      // Handle error, show error message to the user
    }
  };

  const handleWatchlist = async () => {

    try {
      if (user && user._id) {
        const currentContent = homePageData && homePageData[contentIndex];
        if (currentContent) {
          const contentId = currentContent._id;

          // Check if user.watchlist is defined before calling includes
          const isWatchlisted = user.watchlist && user.watchlist.includes(contentId);
          console.log(isWatchlisted)

          if (isWatchlisted) {
            await dispatch(removeFromWatchlist({ userId: user._id, contentId })); // Dispatch removeFromWatchlist action
          } else {
            // If the content is not in the watchlist, dispatch addToWatchlist action
            await dispatch(addToWatchlist({ userId: user._id, contentId }));


          }
        }
      } else {
        // Handle case where user is not authenticated or user._id is null
        // You can show a message or redirect the user to login/register page
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error adding/removing from watchlist:', error);
      // Handle error, show error message to the user
    }
  };

  const [shareModalOpen, setShareModalOpen] = useState(false);


  const [shareUrl, setShareUrl] = useState('');

  const handleShare = (videoUrl) => {
    const shareUrl = videoUrl;
    setShareUrl(shareUrl);
    setShareModalOpen(true);
  };

  // const handle_sidebar_hover = () => {
  //   set_tab_hovered(!tab_hovered);
  // };
  // const handle_sidebar_hoverout = () => {
  //   set_tab_hovered(!tab_hovered);
  // };

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (!user) {
      // Hide the welcome popup after 20 seconds
      timeoutId = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 15000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user]);

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

    // Set interval to update content index every 30 seconds
    const intervalId = setInterval(() => {
      setContentIndex(prevIndex => (prevIndex + 1) % homePageData.length);
    }, 30000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [homePageData.length]);

  const likedContent = [
    {
      id: 1,
      title: 'Liked Video 1',
      thumbnail: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmovies.disney.com%2Felemental&psig=AOvVaw2YEHMmfEBBpgZ7QppTgioi&ust=1706729269820000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLiPgJHshYQDFQAAAAAdAAAAABAE',
    },

  ];


  const handleWatchNow = () => {
    const currentContent = homePageData && homePageData[contentIndex];
    if (currentContent) {
      navigate(`/movie/${currentContent._id}`, {
        state: {
          movie: currentContent.video,
          title: currentContent.title || '',
          desc: currentContent.description || '',
          credits: currentContent.credit || '',
        }
      });
    }
  };

  const handleLikeClick = () => {
    setShowWelcomePopup(true);
  };

  
  // const titleSpliced = title.slice(0, 30) + '...';
   
  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
  };


  // const PrivacyPopup = ({ onAccept }) => (
  //   <div className="fixed top-[-100] left-0 right-0 bottom-20 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
  //     <div className="bg-white p-5 rounded shadow-lg text-center">
  //       <h2 className="text-xl font-bold mb-3">Privacy Policy</h2>
  //       <p className="mb-5">We value your privacy. Please review our privacy policy.</p>
  //       <button className="bg-[#541011] text-white py-2 px-4 rounded" onClick={onAccept}>Accept</button>
  //     </div>
  //   </div>
  // );



  const CookiesPopup = ({ onAccept, onOptOut }) => (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-end bg-gray-800 bg-opacity-50 z-50 p-4">
      <div className="bg-white p-5 rounded-t-lg shadow-lg text-center w-full">
        <h2 className="text-x font-bold mb-1">Cookies Policy</h2>
        <p className="mb-1 text-sm">We use cookies to enhance your experience. Please accept our cookies policy.</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-[#541011] text-xs text-white py-1 px-2 rounded hover:bg-[#6b1516] transition-colors"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-gray-500 text-xs text-white py-1 px-2 rounded hover:bg-gray-600 transition-colors"
            onClick={onOptOut}
          >
            Opt Out
          </button>
        </div>
      </div>
    </div>
  );

  

  // console.log(homePageData && homePageData[contentIndex] ? homePageData[contentIndex]._id : '')
  return (
    <Homecontent>
                    {/* {showPrivacyPopup && <PrivacyPopup onAccept={handleAcceptPrivacy} />} */}
                    {showCookiesPopup && <CookiesPopup onAccept={handleAcceptCookies} onOptOut={handleOptOutCookies} />}

      {isMobile ? (
        
        // <MobileHeader channels={channels} set_channels={set_channels} />
        
        <Hamburger>
        <MobileBurger channels={channels} set_channels={set_channels} />
       </Hamburger>



      ) : (
        <DesktopHeader channels={channels} set_channels={set_channels} />
      )}
      <video className='video-background' muted loop autoPlay playsInline onError={(e) => console.error('Video error:', e)}>
        <source src="https://res.cloudinary.com/di97mcvbu/video/upload/v1708430555/contents/q1xhinruadpovy0jxf6f.mp4" />
        {/* <source src={homePageData && homePageData[contentIndex] ? homePageData[contentIndex].video : ''} />  */}

      </video>

         
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
         <h2 className="text-white text-2xl md:text-xl" style={{ textShadow: "2px 2px red" }}>
           This feature is Coming Soon
         </h2>
         <p className="text-white text-xl md:text-sm" style={{ textShadow: "1px 1px red" }}>
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

        <Banner>
        <div className="title-truncate">
        <h1>{homePageData && homePageData[contentIndex] ? truncateTitle(homePageData[contentIndex].title, 20) : ''}</h1>
         </div>
          <div className="description-truncate">
            <p>{homePageData && homePageData[contentIndex] ? homePageData[contentIndex].description : ''}</p>
            {homePageData && homePageData[contentIndex] && homePageData[contentIndex].description && homePageData[contentIndex].description.length > 150 && (
              <button className="view-more-btn">View more</button>
            )}
          </div>

          <div className="flex gap-5">
  <button 
    className="flex items-center justify-center p-1 bg-transparent border border-white rounded text-white cursor-pointer" 
    onClick={() => handleWatchNow(homePageData)}
  >
    WATCH N<span className="relative top-[1px] ml-1"><img src={playbutton} className="h-3 w-3" /></span>W
  </button>
  <button 
    className="flex items-center justify-center p-1 bg-transparent border border-white rounded text-white cursor-pointer" 
    onClick={handleWatchlist}
  >
    ADD T<span className="relative top-[1px] ml-1"><img src={plusbutton} className="h-3 w-3" /></span> WATCHLIST
  </button>
</div>

<div className="flex gap-5 mt-2">
  <button 
    className="flex items-center justify-center p-1 bg-transparent border border-white rounded text-white cursor-pointer" 
    onClick={handleLike}
  >
    <span className="relative top-[1px] -left-1"><img src={isLiked ? redheart : whiteheart} alt="heart" className="h-[15px] w-[15px]" /></span>
    LIKE
  </button>
  <button 
    className="flex items-center justify-center p-1 bg-transparent border border-white rounded text-white cursor-pointer" 
    onClick={() => setShareModalOpen(!shareModalOpen)}
  >
    <span className="relative top-[2px] -left-1"><img src={sendmessage} className="h-[15px] w-[15px]" /></span>
    SHARE
  </button>
  <button 
    className="flex items-center justify-center p-1 bg-transparent border border-white rounded text-white cursor-pointer" 
    onClick={() => set_channels(!channels)}
  >
    ADD TO FAVOURITE +
  </button>
</div>

          {shareModalOpen && (
            <ShareModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} shareUrl={shareUrl} />
          )}
        </Banner>

        {isMobile && (
          <LikedContentCard likedContent={likedContent} isVisibleOnMobile={isMobile} />
        )}





        <VideoCategory id="top10">
          <Videocategorytitle>Top 10</Videocategorytitle>
          <Slidertop10 />
        </VideoCategory>

        <VideoCategorythis id="newonplay">
          <Videocategorytitle>New on Playmood</Videocategorytitle>
          <SliderNew />
        </VideoCategorythis>

        <VideoCategoryCircle id="channel">
          <Videocategorytitle>Channels</Videocategorytitle>
          <SliderChannel />
        </VideoCategoryCircle>

        <VideoCategoryCircle id="diaries">
          <Videocategorytitle>Diaries</Videocategorytitle>
          <SliderDiaries />
        </VideoCategoryCircle>

        <VideoCategoryCircle id="spaces">
          <Videocategorytitle>Spaces</Videocategorytitle>
          <SliderSpace />
        </VideoCategoryCircle>

        <VideoCategory1 id="recommended">
          <Videocategorytitle>Recommended for you</Videocategorytitle>
          <SlideRecommended />
        </VideoCategory1>

        <VideoCategory1 id="interviews">
          <Videocategorytitle>Interviews</Videocategorytitle>
          <SliderInterview />
        </VideoCategory1>


        <VideoCategory1 id="fashion">
          <Videocategorytitle>Fashion Shows</Videocategorytitle>
          <SliderFashion />
        </VideoCategory1>

        <VideoCategory1 id="social">
          <Videocategorytitle>Social</Videocategorytitle>
          <SliderSocial />
        </VideoCategory1>

        <VideoCategory1 id="documentaries">
          <Videocategorytitle>Documentaries and Reports</Videocategorytitle>
          <SliderDocumentaries />
        </VideoCategory1>

        <VideoCategory1 id="documentaries">
          <Videocategorytitle>Behind the Cameras</Videocategorytitle>
          <SliderCamera />
        </VideoCategory1>

        <VideoCategory1 id="documentaries">
          <Videocategorytitle>Soon in Playmood</Videocategorytitle>
          <SliderSoon />
        </VideoCategory1>

        <VideoCategory1 id="teens">
          <Videocategorytitle>Teens</Videocategorytitle>
          <SliderTeens />
        </VideoCategory1>


        <VideoCategory1 id="social">
          <Videocategorytitle>Best in Fashion</Videocategorytitle>
          <SliderFashion />
        </VideoCategory1>


        <VideoCategory1 id="infashion">
          <Videocategorytitle>Only in playmood</Videocategorytitle>
          <SliderOnly />
        </VideoCategory1>


        <VideoCategory1 id="infashion">
          <Videocategorytitle>Watchlist</Videocategorytitle>
          <SliderWatchlist />
        </VideoCategory1>

        <WelcomePopup
          showPopup={showWelcomePopup}
          onClose={() => setShowWelcomePopup(false)}
          onLogin={() => {
            // Handle login logic
            setShowWelcomePopup(false);
          }}
          onRegister={() => {
            // Handle register logic
            setShowWelcomePopup(false);
          }}
        />


        <Footer>
          <div>
            <img src={logo} />
          </div>
          <div className='instagrams'>
            <div className='instagram-official'>
              <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==">
                <img src={instagram} />
              </a>
              <p className='instagram-links'><a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target='_blank'>Official</a></p>
            </div>
            <div className='instagram-official'>
              <a href="https://www.instagram.com/playmoodlat/">
                <img src={instagram} />
              </a>
              <p className='instagram-links'><a href="https://www.instagram.com/playmoodlat/" target='_blank'>Latam</a></p>
            </div>
            <div className='instagram-official'>
              <a href="https://www.instagram.com/playmoodmx/">
                <img src={instagram} />
              </a>
              <p className='instagram-links'><a href="https://www.instagram.com/playmoodmx/" target='_blank'>MX</a></p>
            </div>
          </div>
          <div></div>
          <div className='contact-footer'>
            <h2>Contact us:</h2>
            <h3>Creators@playmoodtv.com</h3>
            <div>
              <p onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
              <p onClick={() => navigate('/cookies')}>Cookies Policy</p>
            </div>
            <div>
              <p>All rights reserved to PlaymoodTV 2023</p>
            </div>
          </div>
        </Footer>
      </Content>
    </Homecontent>
  )
}

const Homecontent = styled.div`
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.70);

    .video-background {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: -1;
        object-fit: cover;
    }

    @media screen and (max-width: 1000px) {
        .video-background {
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: -1;
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
`;

const Content = styled.div`
    height: fit-content;
    width: 100%;
    margin-top: 15%;

    @media screen and (max-width: 1000px) {
        margin-top: 10%;
    }
`;

const Hamburger = styled.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top:60px;
    left:8px;
    cursor: pointer;
    color: white;
    &:hover{
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }

  
`;


const Banner = styled.div`
    width: 400px;
    height: 370px;
    color: white;
    margin-left: 60%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    @media screen and (max-width: 768px) {
        display:none;
        width: 250px;
        margin-left: 20%;
        margin-top: 20%;
    }

    h1 {
        font-size: 2rem;
        color: white;

        @media screen and (max-width: 1000px) {
            font-size: 1.2rem;
        }
    }

    p {
        font-size: 0.8rem;
        line-height: 2;

        @media screen and (max-width: 1000px) {
            font-size: 0.6rem;
        }
    }
`;

const VideoCategoryCircle = styled.div`
   height: 230px;
    width: 92%;
    margin: 50px 20px 150px 20px;
    display: flex;
    gap: 0px;
    flex-direction: column;

       @media screen and (max-width: 768px) {
       margin: 0px 20px 40px 20px;
    }


`

const VideoCategory = styled.div`
    height: 390px;
    width: 92%;
    margin: 0px 20px 100px 20px;
    display: flex;
    gap: 0px;
    flex-direction: column;

       @media screen and (max-width: 395px) {
       margin-top: 70px;
       }


`;

const VideoCategorythis = styled.div`
    height: 380px;
    width: 92%;
    margin: 0px 20px 100px 20px;
    display: flex;
    gap: 0px;
    flex-direction: column;

       @media screen and (max-width: 395px) {
       margin-top: 80px;
       }


`;


const VideoCategory1 = styled.div`
    height: 350px;
    width: 92%;
    margin: 10px 20px 100px 20px;
    display: flex;
    gap: 0px;
    flex-direction: column;


`;


const Videocategorytitle = styled.h3`
    font-size: 1.5rem;
    color: white;
    padding-bottom: 30px;
    font-weight: 600;


    @media only screen and (min-width: 300px) {
        font-size: 1.5rem;
        padding:5px 5px 20px 25px;
    }

    @media only screen and (min-width: 800px) {
        font-size: 1.8rem;
        padding:5px 5px 20px 60px;
        
    }
`;


const Footer = styled.div`
    height: fit-content;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 20px 60px 20px 60px;

    .contact-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;

        div {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    }

    .instagrams {
        display: flex;
        gap: 5px;

        .instagram-official {
            display: flex;
            height: fit-content;
            align-items: center;
            color: white;

            .instagram-links {
                a {
                    text-decoration: none;
                    color: white;
                }
            }

            img {
                height: 20px;
                width: 20px;
            }
        }
    }

    div {
        height: fit-content;
        display: flex;
        gap: 10px;
        color: white;

        p {
            font-size: 0.7rem;
            cursor: pointer;
        }

        img {
            height: 80px;
            width: 100%;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 600px) {
        flex-direction: column;
        padding: 10px;
    }
`;

const Popup = styled.div`
    height: 500px;
    width: 1000px;
    position: absolute;
    top: 100px;
    left: 250px;
    z-index: 1001;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

    @media screen and (max-width: 1000px) {
        width: 70%;
        height: 70%;
        left: 80px;
        top: 100px;
    }

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        z-index: -1;
    }

    div {
        height: fit-content;
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;

        h2 {
            color: white;
            font-size: 2rem;
            text-shadow: 2px 2px red;

            @media screen and (max-width: 1000px) {
                font-size: 1.2rem;
            }
        }

        p {
            color: white;
            font-size: 1.2rem;
            text-shadow: 1px 1px red;

            @media screen and (max-width: 1000px) {
                font-size: 0.9rem;
            }
        }

        .form {
            display: flex;
            justify-content: center;
            align-item: center;
            gap: 20px;
            width: 50%;
            margin: 0px auto 0px auto;

            @media screen and (max-width: 1000px) {
                flex-direction: column;
            }

            .inputfield {
                padding: 10px 20px;
                border-radius: 20px;
            }

            .subscribe-button {
                background-color: red;
                padding: 10px 20px;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
            }
        }
    }
`;

const CloseButton = styled.button`
  position: absolute;
  width:20px;
  height:20px;
  top: 10px;
  right: 10px;
  background: red;
  border: none;
  border-radius: 100%;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

export {
  Homecontent,
  Content,
  Banner,
  VideoCategory,
  Videocategorytitle,
  Footer,
  Popup,
};