import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import MobileHeader from '../components/headers/MobileHeader'
import DesktopHeader from '../components/headers/DesktopHeader'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import background from "/documentaries/documentaries/10 Models Explain the Dangerous Power Dynamics in the Modeling Industry The Models Vogue.mp4";
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
import sendmessage from "/sendmessage.png";
import { AiOutlineClose } from 'react-icons/ai';
import { likeVideo, shareVideo } from '../features/authSlice';
import LikedContentCard from '../components/LikedContentCard';


export default function Home() {
  const [channels, set_channels] = useState(false)
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

     // Add the useDispatch hook
  const dispatch = useDispatch();

  const handleLike = async (videoId) => {
    try {
      // Check if user is available before dispatching the action
      if (user) {
        await dispatch(likeVideo({ userId: user.id, videoId }));
      } else {
        console.error('User is undefined.');
      }
    } catch (error) {
      console.error('Error liking video:', error);
    }
    };
    
    // const handleShare = async (videoId) => {
    //   try {
    //     await dispatch(shareVideo({ userId: user.id, videoId }));
    //   } catch (error) {
    //     console.error('Error sharing video:', error);
    //   }
    // };
  

  const [ shareModalOpen,setShareModalOpen] = useState(false);


   const [shareUrl, setShareUrl] = useState('');
   
   const handleShare = (videoUrl) => {
    const shareUrl = videoUrl;
    setShareUrl(shareUrl);
    setShareModalOpen(true);
  };
  
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  
  useEffect(() => {
    let timeoutId;
  
    if (!user) {
      // Hide the welcome popup after 20 seconds
      timeoutId = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 5000);
    }
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [user]);
  
       
  const likedContent = [
    {
      id: 1,
      title: 'Liked Video 1',
      thumbnail: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmovies.disney.com%2Felemental&psig=AOvVaw2YEHMmfEBBpgZ7QppTgioi&ust=1706729269820000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLiPgJHshYQDFQAAAAAdAAAAABAE',
    },

  ];


  return (
    <Homecontent>
        {isMobile ? (
        <MobileHeader channels={channels} set_channels={set_channels} />
      ) : (
        <DesktopHeader channels={channels} set_channels={set_channels} />
      )}
            <video className='video-background' muted loop autoPlay playsInline>
                <source src="https://res.cloudinary.com/di97mcvbu/video/upload/v1708430555/contents/q1xhinruadpovy0jxf6f.mp4" />
            </video>

        {channels && (
          <Popup>
            <CloseButton onClick={() => set_channels(false)}>
              <AiOutlineClose />
            </CloseButton>
            <img src={channelsimg} alt="" />
            <div>
            <h2>This feature is Coming Soon</h2>
            <p>Our content creators are doing great, and we are building a special platform for them! </p>
            <form className='form'>
                <input name='name' placeholder='name' type='text' className='inputfield' />
                <input name='email' placeholder='Email' type='email' className='inputfield' />
                <button className='subscribe-button'>Subscribe</button>
            </form>
            </div>
          </Popup>
        )}

        <Content>
          <Banner>
            <h1>10 Models Explain the Dangerous...</h1>            
            <p>In this episode of “The Models,” a new four-part Vogue docuseries which sheds light 
              on the realities of life in front of the camera, several of fashion’s... <span className='view_more'>View More</span>
            </p>
            <div className='main-video-function'>
              <button className='watch-now' onClick={() => { navigate('/movie') }}>WATCH N<span><img src={playbutton} /></span>W</button>
              <button className='add-to-watchlist' onClick={() => set_channels(!channels)}>ADD T<span><img src={plusbutton}/></span> WATCHLIST</button>
            </div>
            <div className='main-video-function'>
              <button className='like'onClick={() => handleLike('VIDEO_ID_1')}>
                <span><img src={whiteheart} /></span>
                LIKE
              </button>
              <button className='share' onClick={() => setShareModalOpen(!shareModalOpen)}>
                <span><img src={sendmessage}/></span>
                SHARE
              </button>
             
              <button className='share' onClick={() => set_channels(!channels)}>
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


          {/* <VideoCategory id="top10">
            <Videocategorytitle>Top 10</Videocategorytitle>
            <TopSlider/>       
          </VideoCategory> */}


          <VideoCategory id="top10">
            <Videocategorytitle>Top 10</Videocategorytitle>
            <Slidertop10/>       
          </VideoCategory>

          <VideoCategoryone id="newonplay">
            <Videocategorytitle>New on Playmood</Videocategorytitle>
            <SliderNew/>  
          </VideoCategoryone>

          <VideoCategoryeighteen id="channel">
            <Videocategorytitle>Channels</Videocategorytitle>
            <SliderChannel/>
          </VideoCategoryeighteen>

          <VideoCategoryeighteen id="diaries">
            <Videocategorytitle>Diaries</Videocategorytitle>
            <SliderDiaries/>
          </VideoCategoryeighteen>

          <VideoCategoryeighteen id="spaces">
            <Videocategorytitle>Spaces</Videocategorytitle>
            <SliderSpace/>
          </VideoCategoryeighteen>

          <VideoCategoryfour id="recommended">
            <Videocategorytitle>Recommended for you</Videocategorytitle>
            <SlideRecommended/>
          </VideoCategoryfour>

          <VideoCategoryfour id="interviews">
            <Videocategorytitle>Interviews</Videocategorytitle>
            <SliderInterview/>
          </VideoCategoryfour>

          
          <VideoCategoryfive id="fashion">
            <Videocategorytitle>Fashion Shows</Videocategorytitle>
            <SliderFashion/>
          </VideoCategoryfive>

          <VideoCategoryeighteen id="social">
            <Videocategorytitle>Social</Videocategorytitle>
            <SliderSocial/>
          </VideoCategoryeighteen>

          <VideoCategorysix id="documentaries">
            <Videocategorytitle>Documentaries and Reports</Videocategorytitle>
            <SliderDocumentaries/>
          </VideoCategorysix>

          <VideoCategorysix id="documentaries">
            <Videocategorytitle>Behind the Cameras</Videocategorytitle>
            <SliderCamera/>
          </VideoCategorysix>

          <VideoCategorysix id="documentaries">
            <Videocategorytitle>Soon in Playmood</Videocategorytitle>
            <SliderSoon/>
          </VideoCategorysix>

          <VideoCategorythirteen id="teens">
            <Videocategorytitle>Teens</Videocategorytitle>
            <SliderTeens/>
          </VideoCategorythirteen>  
       
          
          <VideoCategorynine id="social">
            <Videocategorytitle>Best in Fashion</Videocategorytitle>
            <SliderFashion/>
          </VideoCategorynine> 

          
          <VideoCategorynine id="infashion">
            <Videocategorytitle>Only in playmood</Videocategorytitle>
            <SliderOnly/>
          </VideoCategorynine>  

          
          <VideoCategorynine id="infashion">
            <Videocategorytitle>Watchlist</Videocategorytitle>
            <SliderWatchlist />
          </VideoCategorynine>  
              
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
            <img src={logo}/>            
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
              <p className='instagram-links'><a href="https://www.instagram.com/playmoodlat/" target='_blank'>Latem</a></p>
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
              <p onClick={() =>navigate('/privacy-policy')}>Privacy Policy</p>
              <p onClick={()=>navigate('/cookies')}>Cookies Policy</p>
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

    .main-video-function {
        display: flex;
        gap: 20px;

        .watch-now,
        .add-to-watchlist,
        .like,
        .share {
            padding: 5px 10px;
            background: none;
            border: 1px solid #fff;
            border-radius: 5px;
            color: white;
            cursor: pointer;

            span {
                position: relative;
                top: 1px;

                img {
                    height: 12px;
                    width: 12px;
                }
            }
        }

        .like,
        .share {
            span {
                position: relative;
                top: 2px;
                left: -5px;

                img {
                    height: 15px;
                    width: 15px;
                }
            }
        }
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

const VideoCategory = styled.div`
    height: 350px;
    width: 90%;
    margin: -10px 50px 160px 50px;
    display: flex;
    gap: 0px;
    flex-direction: column;

    @media screen and (max-width: 768px) {
        margin: 10px 20px 50px 20px;
        padding:
    }
`;

const Videocategorytitle = styled.h3`
    font-size: 1.5rem;
    color: white;
    padding-bottom: 30px;
    font-weight: 600;


    @media only screen and (min-width: 300px) {
        font-size: 1.5rem;
        padding:5px 5px 20px 60px;
    }

    @media only screen and (min-width: 800px) {
        font-size: 1.8rem;
        padding:5px 5px 20px 60px;
        
    }
`;

const VideoCategorytwo = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategorythree = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategoryfour = styled.div`
    height: 500px;
    width: 90%;
    margin: -100px 50px 100px 50px;
    display: flex;
    gap: 20px;
    flex-direction: column;

    @media screen and (max-width: 1000px) {
        margin: -100px 20px 100px 20px;
    }
`;

const VideoCategoryeighteen = styled.div`
    height: 400px;
    width: 90%;
    margin: -100px 50px 160px 100px;
    display: flex;
    gap: 20px;
    flex-direction: column;

    @media screen and (max-width: 1000px) {
        margin: -100px 10px 100px 20px;
    }
`;

const VideoCategoryone = styled.div`
    height: 500px;
    width: 90%;
    margin: 120px 50px 100px 50px;
    display: flex;
    gap: 20px;
    flex-direction: column;

    @media screen and (max-width: 1000px) {
        margin: 120px 20px 100px 20px;
    }
`;

const VideoCategoryfive = styled.div`
    height: 500px;
    width: 90%;
    margin: 20px 50px 100px 50px;
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

const VideoCategorysix = styled.div`
    height: 500px;
    width: 90%;
    margin: -100px auto 100px auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategoryseven = styled.div`
    height: 500px;
    width: 90%;
    margin: -100px auto -50px auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategoryeight = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategorynine = styled.div`
    height: 500px;
    width: 90%;
    margin: -100px auto 100px auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategoryten = styled.div`
    height: 500px;
    width: 90%;
    margin: -200px auto 100px auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategoryeleven = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategorytwelve = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategorythirteen = styled.div`
    height: 500px;
    width: 90%;
    margin: -100px auto 100px auto;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategoryfourteen = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;

const VideoCategoryfifteen = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
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
        gap: 10px;

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
                height: 40px;
                width: 40px;
            }
        }
    }

    div {
        height: fit-content;
        display: flex;
        gap: 20px;
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
        padding: 20px;
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
    VideoCategorytwo,
    VideoCategorythree,
    VideoCategoryfour,
    VideoCategoryeighteen,
    VideoCategoryone,
    VideoCategoryfive,
    VideoCategorysix,
    VideoCategoryseven,
    VideoCategoryeight,
    VideoCategorynine,
    VideoCategoryten,
    VideoCategoryeleven,
    VideoCategorytwelve,
    VideoCategorythirteen,
    VideoCategoryfourteen,
    VideoCategoryfifteen,
    Footer,
    Popup,
};