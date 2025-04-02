
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MovieBurger from '../components/headers/MovieBurger';
import instagram from '/instagram.png';
import logo from '/PLAYMOOD_DEF.png';
import profile from '/icon-profile.png';
import { FaBars, FaPlay, FaHeart, FaBell, FaDonate, FaUser, FaEye, FaLink } from 'react-icons/fa';
import Sliderinterviews from '../components/sliders/SliderInterview';
import SliderDocumentaries from '../components/sliders/SliderDocumentaries'
import WelcomePopup from '../components/Welcomepop';
import DesktopHeader from '../components/headers/DesktopHeader';
import MovieHeader from '../components/headers/MovieHeader';






export default function MoviePage() {
  const [info, setInfo] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [spank, setSpank] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const toggleInfo = () => {
    setInfo(!info);
  };

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { slug } = useParams(); // Extract slug from URL

  // Extract content ID from slug
  const contentId = slug.split('-').pop();
  const videoRef = useRef(null);


  useEffect(() => {
    const fetchMovieDataById = async () => {
      try {
        const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${contentId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDataById();
  }, [contentId]);



  // Check if user is already subscribed
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe/check/${movie?.user?._id}`);
        setSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    if (movie && user) {
      checkSubscription();
    }
  }, [movie, user]);

  // Subscribe to the creator's channel
  const handleSubscribeClick = async () => {
    try {
      const response = await axios.post('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe/', {
        creatorId: movie?.user?._id,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 201) {
        setSubscribed(true);
        alert('Subscribed successfully');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  // Unsubscribe from the creator's channel
  const handleUnsubscribeClick = async () => {
    try {
      const response = await axios.put('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/subscribe/', {
        creatorId: movie?.user?._id,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        setSubscribed(false);
        alert('Unsubscribed successfully');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Loading logo" className="w-32 mb-5 animate-bounce" />
          <p className="text-lg font-semibold animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-semibold mb-4">Movie Not Found</h1>
        <p className="text-gray-600 mb-6">
          The movie you're looking for doesn't seem to exist. Please return to the homepage and try selecting a different movie.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('/')}
        >
          Back to Homepage
        </button>
      </div>
    );
  }
  
  

  const handleWatchFromBeginning = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // const handleSubscribeClick = () => {
  //   setSubscribed(!subscribed);
  //   setSpank(true);
  //   setTimeout(() => {
  //     setSpank(false);
  //   }, 1000);
  // };

  const handleLikeClick = () => {
    setShowFavoriteMessage(true);
    setTimeout(() => {
      setShowFavoriteMessage(false);
    }, 4000);
  };

  const handleCopyLink = () => {
    const pageUrl = window.location.href; // Get the current page URL
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        alert('URL copied to clipboard!'); 
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleHeartClick = () => {
    if (!user) {
      setShowWelcomePopup(true);  // Show popup if user is not logged in
    } else {
      // Logic for liking/favoriting the movie goes here
      console.log('User liked the movie');
    }
  };


  const { title, description, credits, views, like, user: movieUser } = movie;

  return (
    <Movie>

      {/* all holder */}

           
      <div className='h-auto'>
      <MovieHeader />
  
           {/* Video Holder */}
           <div className="video-container relative mt-20">
  <video
    muted
    playsInline
    loop
    autoPlay
    controls
    ref={videoRef}
    controlsList="nodownload"
    className={`object-cover z-1 ${isMinimized ? 'bottom-0 right-0 w-52' : 'w-full h-550px static'} md:${isMinimized ? 'h-auto' : 'h-200px'}`}
  >
    <source src={movie?.video} type="video/mp4" />
  </video>
</div>


                <Hamburger onClick={() => handle_sidebar_hover()}>
                 <MovieBurger />
                </Hamburger>

                  
                <div className='movie-title'>
                   <h1>{title}</h1>
                   </div>


                   <div className='home-page-icon'>
                   <img src={logo} alt="" onClick={() => navigate('/')} />
                       <img src={profile} onClick={() => {
                       // Check if the user is logged in
                   if (user) {
                       navigate('/dashboard');
                     } else {
                    navigate('/login');
                       }
                          }} />
                          </div>
      



              {/* main section Section */}

                    {/*  info Section */}

                     
    <div className='flex flex-col md:flex-row  w-[100%] gap-[3rem] md:gap-[8rem] h-auto my-[2rem] mx-12'>



    {/* left Section */}


    <div className='w-[35%]'>
        <div className="mb-3">
             
             <div className="h-[auto] w-[300px] md:flex-row  my-5 md:my-0">

              <div>

              <p className="text-[15px] md:text-[12px] sm:text-[10px] p-[15px] md:p-[5px] cursor-pointer text-white hover:text-red-500">Title: {title}</p>
                
              </div>

              <div className='flex gap-2 px-3 justify-between align-middle my-5 '>
                     
                             
             <div className="flex  gap-1 items-center">
                <FaEye className="text-white" />
                <h6 className="text-white text-[0.6rem]">0</h6>
              </div>

                 
              <div className="flex gap-1 items-center" onClick={handleHeartClick}>
                <FaHeart className="text-white cursor-pointer" />
                <h6 className="text-white text-[0.6rem]">0</h6>
              </div>


              <div className="flex gap-1 items-center" onClick={handleCopyLink}>
                <FaLink className="text-white cursor-pointer" />
              
              </div>


              </div>
              
              


             </div>
   
               <div className="h-[50px] w-[300px] flex  gap-[50px] relative  md:p-[5px]">
               <button className="w-[50%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]" onClick={handleWatchFromBeginning}>
               <FaPlay /> Play Again
              </button>

              <button className="w-[50%] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]">
                NEXT VIDEO
              </button>


               </div>



        </div>

        

        {/* buttons */}
              

        <div className=' h-[50px] w-[300px] flex  gap-[10px] relative md:  md:flex-col p-[5px] mb-0 md:mb-8'>
            <button className=" md:w-[40%] w-[200] gap-2 bg-[#541011] text-[#f3f3f3] p-[10px]  border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px]">
                <FaUser /> By: {movieUser ? movieUser.name : 'Anonymous'}
            </button>
            
            <button onClick={handleLikeClick} className="bg-[#541011] gap-2 md:w-[40%] text-[#f3f3f3] p-[10px]  border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px]">
                <FaDonate /> Donate
            </button>
            {/* <button className={`bg-[#541011] md:w-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px] ${spank ? 'spank' : ''}`} onClick={handleSubscribeClick}>
                <FaBell /> {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </button> */}
            <button
        onClick={subscribed ? handleUnsubscribeClick : handleSubscribeClick}
        className={`bg-[#541011] md:w-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[1px] btn ${subscribed ? 'btn-danger' : 'btn-success'}`}
      >
        {subscribed ? <FaBell /> : <FaBell />} {subscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
        </div>



    </div>

    {/* right section */}
    <div className="mt-1 md:mt-0 h-auto">
                


        <div className="movie-right-cont   h-auto w-[85%] md:w-[65%]">
            <div className="menutitle ml-[18px] flex items-center gap-[30px] h-[50px]  mx-auto">
                {/* <FaStar onClick={handleAddToFavorites} className="favorite-icon absolute top-[-60px] left-[920px] text-yellow-400" /> */}
                <p className="production_par cursor-pointer text-white hover:text-red-500" onClick={() => setInfo(false)}>Information</p>
                <button className=" gap-2 bg-[#541011] text-[#f3f3f3] p-[10px] px-[15px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]" onClick={toggleInfo}>Production ~ Credits</button>
            </div>
            {showFavoriteMessage && (
                <div className="popup-message fixed top-[200px] right-[100px] bg-[rgba(0,0,0,0.8)] text-white p-[10px_20px] rounded z-[9999] text-[12px] animate-fadeOut">
                    Added to favorites!
                </div>
            )}
            <div className="">
                {info ? (
                    <div className="flex items-center justify-between text-white w-[70%] mx-auto">
                        <div>
                            <p><b>Credits: </b>{credits}</p>
                        </div>
                    </div>
                ) : (
                    <div className="movieinformation text-white w-[75%] h-auto flex mx-auto relative  md:left-[-170px] md:text-[12px]">
                        <p>{description}</p>
                    </div>
                )}
            </div>
        </div>

        {/* next button */}

                      </div>
                       </div>




                      

                {/* Slider Section */}
<div className='md:my-32'>
    <div id="interviews" className="video-category-four h-[390px] w-[90%] mx-[30px] mb-[40px] flex flex-col md:mx-[20px] md:my-[20px] md:mb-[50px]">
        <h3 className="video-category-title text-white pb-[20px] font-semibold text-[1.5rem] md:text-[1.3rem] lg:text-[1.5rem]">Recommended for you</h3>
        <Sliderinterviews />
    </div>

    {user && (
        <div id="interviews" className="video-category-four h-[380px] w-[90%] my-[30px] mx-[50px] mt-[50px] flex flex-col gap-[20px] md:mx-[20px] md:my-[20px] md:mb-[50px]">
            <h3 className="video-category-title text-white pb-[20px] font-semibold text-[1.5rem] md:text-[1.3rem] lg:text-[1.5rem]">Continue Watching</h3>
            <SliderDocumentaries />
        </div>
    )}
    


  

    <WelcomePopup
        showPopup={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
        onLogin={() => {
          // Handle login logic here
          setShowWelcomePopup(false);
        }}
        onRegister={() => {
          // Handle register logic here
          setShowWelcomePopup(false);
        }}
      />


</div>



                     {/* footer */}

                           
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

                  
              
            

      </div>

    </Movie>
  );
}


const Movie = styled.div`
  width: auto;
  // height: auto;
  height: ${props => props.isMinimized ? '100px' : 'auto'};
  position:relative;
  display flex;
  flex-direction: column;
  overflow: hidden;
  background: black;

`

const Hamburger = styled.div`
  display: none; /* Hide by default */

  @media (max-width: 768px) {
    display: block; 
    position: absolute;
    top: 10px;
    left: 5px;
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

  @media (max-width: 790px) {
    svg{
      position: relative;
       z-index: 1000;
      font-size: 30px;
      top:6px;
      left:8px
    }
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
        text-align: center;
    }
`;


