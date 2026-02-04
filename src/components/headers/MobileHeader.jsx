
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import playmood from '/PLAYMOOD_DEF.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import profile from '/icon-profile.png';
import settings from '/settings-icon.png';
import settings_red from '/settings-red-icon.png';
import search from '/search.png';
import recommended from '/recommended.png';
import newp from '/newp.png';
import snowflakes from '/snowflakes.png';
import schedule from '/schedule.png';
import favourite from '/favourite.png';
import categories from '/categories.png';
import home from '/home.png';
import search_icon from '/search_white.png';
import search_red from '/search_red.png';
import thumbs from '/thumbs.png';
import thumbs_red from '/thumbs_red.png';
import location from '/location_white.png';
import home_red from '/home_red.png';
import newp_red from '/newp_red.png';
import snowflakes_red from '/snowflakes_red.png';
import location_red from '/location.png';
import schedule_white from '/schedule_white.png';
import schedule_red from '/schedule_red.png';
import plus from '/plus.png';
import favourite_red from '/star_red.png';
import SidebarSlider from '../sidebarSliders/slidersidebar';
import SidebarSliderc from '../sidebarSliders/slidersidebarc';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '.././../features/authSlice'
import DonationModal from '../DonationModal';
import Slidertop10 from '../sidebarSliders/SliderTop10';
import SliderNew from '../sidebarSliders/SliderNew';
import SliderChannel from '../sidebarSliders/SliderChannels';
import SliderDairies from '../sidebarSliders/SliderDaries';

export default function MobileHeader({ channels, set_channels }) {
  const [dropbar, set_drop_bar] = useState(false);
  const navigate = useNavigate();
  const [top, set_top] = useState(false);
  const [settings_hover, set_settings_hovered] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

    const handleDonationClose = () => {
    setShowDonationModal(false);
  };

  
  
  const handleSubscriptionSubmit = (event) => {
    event.preventDefault();
    setShowDonationModal(false); 
  };


  const handleTopClick = () => {
    set_top(!top);
    set_newplaymood(false);
    set_chanels(false);
    set_diaries(false);
  };

  const [newplaymood, set_newplaymood] = useState(false);
  const handleNewPlaymoodClick = () => {
    set_newplaymood(!newplaymood);
    set_top(false);
    set_chanels(false);
    set_diaries(false);
  };

  const [chanels, set_chanels] = useState(false);

  const handleChannelClick = () => {
    set_chanels(!chanels);
    set_newplaymood(false);
    set_top(false);
    set_diaries(false);
  };

  const [diaries, set_diaries] = useState(false);

  const handleDiaries = () => {
    set_diaries(!diaries);
    set_newplaymood(false);
    set_top(false);
    set_chanels(false);
  };

  const handle_hovered_settings = () => {
    set_settings_hovered(!settings_hover);
  };

  const handle_hovered_settings_out = () => {
    set_settings_hovered(!settings_hover);
  };

  const [search_hover, set_search_hover] = useState(true);
  const [home_hover, set_home_hover] = useState(true);
  const [thumbs_hover, set_thumbs_hover] = useState(true);
  const [new_hover, set_new_hover] = useState(true);
  const [snowflakes_hover, set_snow_flakes] = useState(true);
  const [location_hover, set_location_flakes] = useState(true);
  const [schedule_hover, setschedule_hover] = useState(true);
  const [favourites_hover, set_favourites_hover] = useState(true);
  const [categories_hover, set_categories_hover] = useState(true);

  const handle_search_hover = () => {
    set_search_hover(!search_hover);
  };

  const handle_search_hover_out = () => {
    set_search_hover(!search_hover);
  };

  const handle_home_hover = () => {
    set_home_hover(!home_hover);
  };

  const handle_home_hover_out = () => {
    set_home_hover(!home_hover);
  };

  const handle_thumbs_hover = () => {
    set_thumbs_hover(!thumbs_hover);
  };

  const handle_thumbs_hover_out = () => {
    set_thumbs_hover(!thumbs_hover);
  };

  const handle_newp_hover = () => {
    set_new_hover(!new_hover);
  };

  const handle_newp_hover_out = () => {
    set_new_hover(!new_hover);
  };

  const handle_snowflakes_hover = () => {
    set_snow_flakes(!snowflakes_hover);
  };

  const handle_snowflakes_hover_out = () => {
    set_snow_flakes(!snowflakes_hover);
  };

  const handle_location_hover = () => {
    set_location_flakes(!location_hover);
  };

  const handle_location_hover_out = () => {
    set_location_flakes(!location_hover);
  };

  const handle_schedule_hover = () => {
    setschedule_hover(!schedule_hover);
  };

  const handle_schedule_hover_out = () => {
    setschedule_hover(!schedule_hover);
  };

  const handle_favourites_hover = () => {
    set_favourites_hover(!favourites_hover);
  };

  const handle_favourites_hover_out = () => {
    set_favourites_hover(!favourites_hover);
  };

  const handle_category_hover_out = () => {
    set_categories_hover(!categories_hover);
  };

  const handle_category_hover = () => {
    set_categories_hover(!categories_hover);
  };


  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const [mountcategory, set_mountcategory] = useState(false);

  const handle_mountcategory = () => {
    set_mountcategory(!mountcategory);
  };


  const [top10Toggled, setTop10Toggled] = useState(false);
  const [newPlaymoodToggled, setNewPlaymoodToggled] = useState(false);
  const [channelsToggled, setChannelsToggled] = useState(false);
  const [diariesToggled, setDiariesToggled] = useState(false);
  const [spacesToggled, setSpacesToggled] = useState(false);
  const [recommendationsToggled, setRecommendationsToggled] = useState(false);
  const [interviewsToggled, setInterviewsToggled] = useState(false);
  const [fashionShowsToggled, setFashionShowsToggled] = useState(false);
  const [documentariesToggled, setDocumentariesToggled] = useState(false);
  const [behindTheCamerasToggled, setBehindTheCamerasToggled] = useState(false);
  const [soonInPlaymoodToggled, setSoonInPlaymoodToggled] = useState(false);
  const [teenToggled, setTeenToggled] = useState(false);
  const [bestInFashionToggled, setBestInFashionToggled] = useState(false);
  const [onlyInPlaymoodToggled, setOnlyInPlaymoodToggled] = useState(false);
  const [watchlistToggled, setWatchlistToggled] = useState(false);


    const handleDonationClick = () => {
    setShowDonationModal(true);
  };



  const handleTop10Toggle = () => {
    setTop10Toggled(!top10Toggled);
  };
  
  const handleNewPlaymoodToggle = () => {
    setNewPlaymoodToggled(!newPlaymoodToggled);
  };
  
  const handleDiariesToggle = () => {
    setDiariesToggled(!diariesToggled);
  };
  
  const handleChannelsToggle = () => {
    setChannelsToggled(!channelsToggled);
  };
  
  const handleSpacesToggle = () => {
    setSpacesToggled(!spacesToggled);
  };
  
  const handleRecommendationsToggle = () => {
    setRecommendationsToggled(!recommendationsToggled);
  };
  
  const handleInterviewsToggle = () => {
    setInterviewsToggled(!interviewsToggled);
  };
  
  const handleFashionShowsToggle = () => {
    setFashionShowsToggled(!fashionShowsToggled);
  };
  
  const handleDocumentariesToggle = () => {
    setDocumentariesToggled(!documentariesToggled);
  };
  
  const handleBehindTheCamerasToggle = () => {
    setBehindTheCamerasToggled(!behindTheCamerasToggled);
  };
  
  const handleSoonInPlaymoodToggle = () => {
    setSoonInPlaymoodToggled(!soonInPlaymoodToggled);
  };
  
  const handleTeenToggle = () => {
    setTeenToggled(!teenToggled);
  };
  
  const handleBestInFashionToggle = () => {
    setBestInFashionToggled(!bestInFashionToggled);
  };
  
  const handleOnlyInPlaymoodToggle = () => {
    setOnlyInPlaymoodToggled(!onlyInPlaymoodToggled);
  };
  
  const handleWatchlistToggle = () => {
    setWatchlistToggled(!watchlistToggled);
  };

  return (
    <MobileHead>
      {/* <MobileNavigation></MobileNavigation> */}
<div className="flex justify-between flex-col bg-black  items-center py-2 px-8 h-20">

{/* Logo and Profile */}
<div className="flex w-full items-center justify-around gap-10">


  <div className="w-48 cursor-pointer">
    <img src={playmood} alt="Playmood Logo" onClick={() => navigate('/')} />
  </div>

  <div
    className="w-10 h-10 flex justify-center items-center rounded-full bg-red-600 cursor-pointer"
    onClick={() => {
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }}
  >
    <img src={profile} alt="Profile Icon" className="w-6 h-6" />
  </div>
      
</div>


<div className=" flex justify-around w-full gab-8 ">
  <Link to="/" className=" text-xs  text-white hover:text-[#541011]">
    HOME
  </Link>
  <Link onClick={handleDonationClick} className="text-white  text-xs hover:text-[#541011]">
   CHANNELS
  </Link>
  <Link to="/schedule" className="text-white  text-xs hover:text-[#541011]" >
    SCHEDULE
  </Link>
  <Link onClick={handleDonationClick} className="text-white  text-xs hover:text-[#541011]">
    SPACES
  </Link>
  <Link to="/stories" className="text-white  text-xs hover:text-[#541011]">
    STORIES
  </Link>
  <Link to="/diaries" className="text-white  text-xs hover:text-[#541011]">
    DIARIES
  </Link>
</div>


</div>
     
             <DonationModal 
             isOpen={showDonationModal} 
             onClose={handleDonationClose} 
             onSubmit={handleSubscriptionSubmit} 
           />

        <Side>

          {sidebarOpen ? (
            <SettingsAndDropdown>
              
                {window.innerWidth <= 768 ? (
                  <GiHamburgerMenu size={30} color="white" onClick={toggleSidebar}/>
                ) : (
                  <Settings>
                    {settings_hover ? (
                      <img src={profile}  />
                    ) : (
                      <img
                        src={profile}
                      />
                    )}
                  </Settings>
                )}
              <DropdownArea>
                {search_hover ? <img src={search_icon} onMouseEnter={handle_search_hover} /> : <img src={search_red} onMouseOut={handle_search_hover_out} />}
                {home_hover ? <img src={home} onMouseEnter={handle_home_hover} /> : <img src={home_red} onMouseOut={handle_home_hover_out} />}
                {thumbs_hover ? <img src={thumbs} onMouseEnter={handle_thumbs_hover} /> : <img src={thumbs_red} onMouseOut={handle_thumbs_hover_out} />}
                {new_hover ? <img src={newp} onMouseEnter={handle_newp_hover} /> : <img src={newp_red} onMouseOut={handle_newp_hover_out} />}
                {snowflakes_hover ? <img src={snowflakes} onMouseEnter={handle_snowflakes_hover} /> : <img src={snowflakes_red} onMouseOut={handle_snowflakes_hover_out} />}
                {location_hover ? <img src={location} onMouseEnter={handle_location_hover} /> : <img src={location_red} onMouseOut={handle_location_hover_out} />}
                {schedule_hover ? <img src={schedule_white} onMouseEnter={handle_schedule_hover} /> : <img src={schedule_red} onMouseOut={handle_schedule_hover_out} />}
                {favourites_hover ? <img src={favourite} onMouseEnter={handle_favourites_hover} /> : <img src={favourite_red} onMouseOut={handle_favourites_hover_out} />}
                {categories_hover ? <img src={categories} onMouseEnter={handle_category_hover} /> : <img src={plus} onMouseOut={handle_category_hover_out} />}
              </DropdownArea>
            </SettingsAndDropdown>
          ) : (
            <SidebarClicked onMouseLeave={toggleSidebar} >
        {user && (
         <div className="user_and_settings" >
            <div className="head_section">
              <h1>{user.name}</h1>
             
               <ul>
                <li>
                 <button className='lgt_btn' onClick={onLogout}>
                  Logout
                  </button>
               </li>
               </ul>
               </div>
                  {/* Conditionally render the user profile image */}
                  {user && (
                    <div
                      className="w-16 h-16 rounded-full bg-white flex items-center justify-center font-semibold cursor-pointer overflow-hidden relative"
                      onClick={() => navigate('/dashboard')}
                    >
                      <AiOutlineUser size={32} color="#541011" style={{ position: 'absolute' }} />
                      {(user.profileImage?.url || user.profileImage) && (
                        <img
                          src={`${user.profileImage?.url || user.profileImage}?${new Date().getTime()}`}
                          alt="Profile"
                          className="w-full h-full object-cover relative z-10"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  )}
                     </div>
                       )}

              {!mountcategory && (
                <>
                  <div className="search_tab">
                    {search_hover ? <img src={search_icon} onMouseEnter={handle_search_hover} /> : <img src={search_red} onMouseOut={handle_search_hover_out} />}
                    <p>Search</p>
                  </div>
                  <div className="home_tab" onClick={() => { navigate('/') }}>
                    {home_hover ? <img src={home} onMouseEnter={handle_home_hover} /> : <img src={home_red} onMouseOut={handle_home_hover_out} />}
                    <p>Home</p>
                  </div>
                  <div className="recommended_tab" onClick={() => { navigate('/recommended') }}>
                    {thumbs_hover ? <img src={thumbs} onMouseEnter={handle_thumbs_hover} /> : <img src={thumbs_red} onMouseOut={handle_thumbs_hover_out} />}
                    <p>Recommended</p>
                  </div>
                  <div className="new_tab" onClick={() => { navigate('/newplaymood') }}>
                    {new_hover ? <img src={newp} onMouseEnter={handle_newp_hover} /> : <img src={newp_red} onMouseOut={handle_newp_hover_out} />}
                    <p>New on playmood</p>
                  </div>
                  <div className="channels_tab" onClick={handleDonationClick}>
                    {snowflakes_hover ? <img src={snowflakes} onMouseEnter={handle_snowflakes_hover} /> : <img src={snowflakes_red} onMouseOut={handle_snowflakes_hover_out} />}
                    <p>Channels</p>
                  </div>
                  <div className="spaces_tab" onClick={handleDonationClick}>
                    {location_hover ? <img src={location} onMouseEnter={handle_location_hover} /> : <img src={location_red} onMouseOut={handle_location_hover_out} />}
                    <p>Spaces</p>
                  </div>
                  <div className="schedule_tab" onClick={() => { navigate('/schedule') }}>
                    {schedule_hover ? <img src={schedule_white} onMouseEnter={handle_schedule_hover} /> : <img src={schedule_red} onMouseOut={handle_schedule_hover_out} />}
                    <p>Schedule</p>
                  </div>
                  <div className="favorites_tab" onClick={() => { user ? navigate('/dashboard') : navigate('/login') }}>
                   {favourites_hover ? <img src={favourite} onMouseEnter={handle_favourites_hover} /> : <img src={favourite_red} onMouseOut={handle_favourites_hover_out} />}
                   <p>Favorites</p>
                  </div>
                </>
              )}
              <div className="categories" onClick={handle_mountcategory}>
                {categories_hover ? <img src={categories} onMouseEnter={handle_category_hover} /> : <img src={plus} onMouseOut={handle_category_hover_out} />}
                <p>Categories</p>
              </div>
              {mountcategory && (
                <div className="categories_subsection">
                <h3 onClick={handleTop10Toggle}>TOP 10</h3>
                {top10Toggled && <Slidertop10 />}
                <h3 onClick={handleNewPlaymoodToggle}>New on Playmood</h3>
                {newPlaymoodToggled && <SliderNew />}
                <h3 onClick={handleChannelsToggle}>Channels</h3>
                {channelsToggled && <SliderChannel/>}
                <h3 onClick={handleDiariesToggle}>Diaries</h3>
                {diariesToggled && < SliderDairies />}
                <h3 onClick={handleSpacesToggle}>Spaces</h3>
                {spacesToggled && < SliderSpace />}
                <h3 onClick={handleRecommendationsToggle}>Recommendations for you</h3>
                {recommendationsToggled && <SidebarSliderc />}
                <h3 onClick={handleInterviewsToggle}>Interviews</h3>
                {interviewsToggled && <SidebarSliderc />}
                <h3 onClick={handleFashionShowsToggle}>Fashion Shows Stories</h3>
                {fashionShowsToggled && <SidebarSliderc />}
                <h3 onClick={handleSpacesToggle}>Spaces</h3>
                {spacesToggled && <SidebarSliderc />}
                <h3 onClick={handleDocumentariesToggle}>Documentaries and Reports</h3>
                {documentariesToggled && <SidebarSliderc />}
                <h3 onClick={handleBehindTheCamerasToggle}>Behind the cameras</h3>
                {behindTheCamerasToggled && <SidebarSliderc />}
                <h3 onClick={handleSoonInPlaymoodToggle}>Soon in Playmood</h3>
                {soonInPlaymoodToggled && <SidebarSliderc />}
                <h3 onClick={handleTeenToggle}>Teen</h3>
                {teenToggled && <SidebarSliderc />}
                <h3 onClick={handleBestInFashionToggle}>Best in Fashion</h3>
                {bestInFashionToggled && <SidebarSliderc />}
                <h3 onClick={handleOnlyInPlaymoodToggle}>Only in Playmood</h3>
                {onlyInPlaymoodToggled && <SidebarSliderc />}
                <h3 onClick={handleWatchlistToggle}>Watchlist</h3>
                {watchlistToggled && <SidebarSliderc />}
              </div>
               
              )}
            </SidebarClicked>
          )}
        </Side>

    </MobileHead>
  );
}


const MobileHead = styled.div`
    height: 80px;
    width: 100%;
    background-color: rgba(0,0,0,0.6);
    color: white;
    position: fixed;
    top: 0px;
    left: 0px; 
    z-index: 1001;
`
const MobileNav = styled.div` 
    width:100%;
    height: fit-content;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    padding:5px 5px 5px 60px;

   
`

const MobileNavi = styled.div`h
  width:100%;
  display:flex;
  justify-content: space-between;
  margin-top:15px;
  .links{
    display:flex;
    color: white;
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: 500;
    padding-left:5px;
    @media screen and (max-width: 600px){
        font-size: 0.5rem;
    }
    &:hover{
        color:rgb(140,7,52);
        font-weight: 700;
    }
}
}
`


const Logo = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: Space-between;
    gap: 10px; 
    .profile-container{
      width: 40px;
      background-color:rgb(140,7,52);
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:100%;
        cursor: pointer;
       
        img{
            width: 80%;
            height: 80%;
            
          
           
        }
    }
    .main-logo{
        height: 40px;
        width:auto;
        cursor: pointer;
        padding-right:150px;
    }
`

const SettingsAndDropdown = styled.div`
    width: 60px; 
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    img{
        height: 40px;
        width: 40px;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
      left: 0;  // Align to the left instead of right
      right: unset;  // Remove the right positioning
      // Full width on mobile screens
  }
`
const Settings = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid rgba(255,255,255,0.4);
`
const DropdownArea = styled.div`
    height: fit-content;
    width:100%;
    background-color: black;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 30px 0px 30px 0px;
    gap: 40px;
    img{
        width: 25px;
        height: 25px;
    }
`
const Side = styled.div`
    display: flex;
    height: 10%;
    align-items: center;
    gap: 30px;
    position: relative; 
    top: -65px;
    // left: -90px;
    // z-index: 1000;

`
const SidebarClicked = styled.div`
width: 240px;
height: 100vh;
background-color: black;
top: 0;
left: 0; // Align to the left
position: fixed;
padding: 20px 10px 0px 20px;
display: flex;
flex-direction: column;
gap: 18px;

    .categories_subsection{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        padding-left: 50px;
        gap: 15px;
        h3{
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .user_and_settings{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 64px;
            height: 64px;
        }
        .head_section{
            h1{
                font-size: 0.8rem;
            }
            p{
                font-size: 0.6rem;
            }
            cursor: pointer;
        }
    }
    .search_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .home_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .recommended_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .new_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .channels_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .spaces_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .schedule_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .favorites_tab{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }
    .categories{
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 8px 10px 8px 20px;
        cursor: pointer;
        &:hover{
            background-color: grey;
            border-right: 4px solid red;
        }
        img{
            width: 25px;
            height: 25px;
        }
        p{
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 768px) {
      left: 0;  // Align to the left instead of right
      right: unset;  // Remove the right positioning
      // Full width on mobile screens
  }

`
