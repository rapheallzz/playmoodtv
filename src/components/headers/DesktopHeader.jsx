import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import playmood from '/PLAYMOOD_DEF.png';
import { GiHamburgerMenu } from 'react-icons/gi';
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
import SidebarSlider from '../slidersidebar';
import SidebarSliderc from '../slidersidebarc';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '.././../features/authSlice';
import DonationModal from '../DonationModal';
import { FaPlus } from 'react-icons/fa';
import { VideoModal } from '../ModalVU';
import CreatorApplicationModal from '../modals/CreatorApplicationModal';

// sliders

import Slidertop10 from '../sidebarSliders/SliderTop10';
import SliderNew from '../sidebarSliders/SliderNew';
import SliderChannel from '../sidebarSliders/SliderChannels';
import SliderDairies from '../sidebarSliders/SliderDaries';
import SliderSpace from '../sidebarSliders/SliderSpace';
import SliderRecommended from '../sidebarSliders/SliderRecommend';
import SliderInterview from '../sidebarSliders/SliderInterview';
import SliderFashion from '../sidebarSliders/SliderFashion';
import SliderDocumentaries from '../sidebarSliders/SliderDocumentaries';
import SliderCamera from '../sidebarSliders/SliderCameras';
import SliderSoon from '../sidebarSliders/SliderSoon';
import SliderTeens from '../sidebarSliders/SliderTeens';
import SliderOnly from '../sidebarSliders/SliderOnly';


export default function DesktopHeader({ }) {
  const [dropbar, set_drop_bar] = useState(false);
  const navigate = useNavigate();
  const [top, set_top] = useState(false);
  const [settings_hover, set_settings_hovered] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCreatorApplicationModal, setShowCreatorApplicationModal] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
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

  const [sidebar, sidebar_hovered] = useState(true);

  const handle_settings_hovered = () => {
    sidebar_hovered(!sidebar);
  };

  const [mountcategory, set_mountcategory] = useState(false);

  const handle_mountcategory = () => {
    set_mountcategory(!mountcategory);
  };

  const handleDonationClick = () => {
    setShowDonationModal(true);
  };

  const handleDonationClose = () => {
    setShowDonationModal(false);
  };

  const handleSubscriptionSubmit = (event) => {
    event.preventDefault();
    setShowDonationModal(false);
  };

  const [openCategory, setOpenCategory] = useState(null);

  const handleToggle = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Add ref for sidebar to detect outside clicks
  const sidebarRef = useRef(null);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !sidebar) {
        sidebar_hovered(true); // Close sidebar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebar]);

  return (
    <DesktopHead>
      <DesktopNavigation>
        <nav className="w-full h-full flex gap-16 justify-between">
          <div className="flex h-full flex-row gap-8 items-center">
            <Link to="/" className="text-white text-sm font-medium hover:text-[#541011]">
              HOME
            </Link>
            <Link to="/channels" className="text-white text-sm font-medium hover:text-[#541011]">
              CHANNELS
            </Link>
            <Link onClick={handleDonationClick} className="text-white text-sm font-medium hover:text-[#541011]">
              SCHEDULE
            </Link>
            <Link onClick={handleDonationClick} className="text-white text-sm font-medium hover:text-[#541011]">
              SPACES
            </Link>
            <Link to="/stories" className="text-white text-sm font-medium hover:text-[#541011]">
              STORIES
            </Link>
            <Link to="/diaries" className="text-white text-sm font-medium hover:text-[#541011]">
              DIARIES
            </Link>
          </div>
          <div className="flex gap-8 items-center">
            <div
              className="flex items-center justify-center gap-4 w-auto h-10 border border-white cursor-pointer px-6"
              onClick={() => {
                if (user && user.role === 'creator') {
                  setShowVideoModal(true);
                } else if (user) {
                  setShowCreatorApplicationModal(true);
                } else {
                  navigate('/login');
                }
              }}
            >
              <p className="text-base">Post</p>
              <FaPlus />
            </div>
            <img src={playmood} className="h-10 cursor-pointer" alt="Playmood" onClick={() => navigate('/')} />
          </div>

          <DonationModal
            isOpen={showDonationModal}
            onClose={handleDonationClose}
            onSubmit={handleSubscriptionSubmit}
          />
          {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
          {showCreatorApplicationModal && <CreatorApplicationModal onClose={() => setShowCreatorApplicationModal(false)} />}
        </nav>
        <Side>
          {sidebar ? (
            <SettingsAndDropdown onMouseEnter={handle_settings_hovered} onMouseLeave={handle_settings_hovered}>
              <Settings>
                {settings_hover ? (
                  <img src={profile} onMouseEnter={handle_hovered_settings} />
                ) : (
                  <img
                    src={profile}
                    onMouseOut={handle_hovered_settings_out}
                    onMouseEnter={handle_settings_hovered}
                  />
                )}
              </Settings>
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
            <SidebarClicked ref={sidebarRef}>
              {user && (
                <div className="user_and_settings">
                  <div className="head_section">
                    <h1>{user.name}</h1>
                    <ul>
                      <li>
                        <button className="lgt_btn" onClick={onLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                  {user && (
                    <img
                      src={`${user.profileImage}?${new Date().getTime()}`}
                      alt="Profile"
                      className="w-32 h-32 rounded-full cursor-pointer"
                      onClick={() => {
                        navigate('/dashboard');
                      }}
                    />
                  )}
                </div>
              )}
              {!mountcategory && (
                <>
                  {!user && (
                    <div onClick={() => { navigate('/login'); }}>
                      <button className="font-semibold w-44 h-10 bg-red-950 text-white text-[14px] rounded-md">
                        Sign In / Register
                      </button>
                    </div>
                  )}
                  <div className="search_tab">
                    {search_hover ? <img src={search_icon} onMouseEnter={handle_search_hover} /> : <img src={search_red} onMouseOut={handle_search_hover_out} />}
                    <p>Search</p>
                  </div>
                  <div className="home_tab" onClick={() => { navigate('/'); }}>
                    {home_hover ? <img src={home} onMouseEnter={handle_home_hover} /> : <img src={home_red} onMouseOut={handle_home_hover_out} />}
                    <p>Home</p>
                  </div>
                  <div className="recommended_tab" onClick={() => { navigate('/recommended'); }}>
                    {thumbs_hover ? <img src={thumbs} onMouseEnter={handle_thumbs_hover} /> : <img src={thumbs_red} onMouseOut={handle_thumbs_hover_out} />}
                    <p>Recommended</p>
                  </div>
                  <div className="new_tab" onClick={() => { navigate('/newplaymood'); }}>
                    {new_hover ? <img src={newp} onMouseEnter={handle_newp_hover} /> : <img src={newp_red} onMouseOut={handle_newp_hover_out} />}
                    <p>New on playmood</p>
                  </div>
                  <div className="channels_tab" onClick={() => { navigate('/channels'); }}>
                    {snowflakes_hover ? <img src={snowflakes} onMouseEnter={handle_snowflakes_hover} /> : <img src={snowflakes_red} onMouseOut={handle_snowflakes_hover_out} />}
                    <p>Channels</p>
                  </div>
                  <div className="spaces_tab" onClick={handleDonationClick}>
                    {location_hover ? <img src={location} onMouseEnter={handle_location_hover} /> : <img src={location_red} onMouseOut={handle_location_hover_out} />}
                    <p>Spaces</p>
                  </div>
                  <div className="schedule_tab" onClick={handleDonationClick}>
                    {schedule_hover ? <img src={schedule_white} onMouseEnter={handle_schedule_hover} /> : <img src={schedule_red} onMouseOut={handle_schedule_hover_out} />}
                    <p>Schedule</p>
                  </div>
                  <div className="favorites_tab" onClick={() => { user ? navigate('/dashboard') : navigate('/login'); }}>
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
                  <h3 onClick={() => handleToggle('top10')}>TOP 10</h3>
                  {openCategory === 'top10' && <Slidertop10 />}
                  <h3 onClick={() => handleToggle('newPlaymood')}>New on Playmood</h3>
                  {openCategory === 'newPlaymood' && <SliderNew />}
                  <h3 onClick={() => handleToggle('channels')}>Channels</h3>
                  {openCategory === 'channels' && <SliderChannel />}
                  <h3 onClick={() => handleToggle('diaries')}>Diaries</h3>
                  {openCategory === 'diaries' && <SliderDairies />}
                  <h3 onClick={() => handleToggle('spaces')}>Spaces</h3>
                  {openCategory === 'spaces' && <SliderSpace />}
                  <h3 onClick={() => handleToggle('recommendations')}>Recommendations for you</h3>
                  {openCategory === 'recommendations' && <SliderRecommended />}
                  <h3 onClick={() => handleToggle('interviews')}>Interviews</h3>
                  {openCategory === 'interviews' && <SliderInterview />}
                  <h3 onClick={() => handleToggle('fashionShows')}>Fashion Shows Stories</h3>
                  {openCategory === 'fashionShows' && <SliderFashion />}
                  <h3 onClick={() => handleToggle('documentaries')}>Documentaries and Reports</h3>
                  {openCategory === 'documentaries' && <SliderDocumentaries />}
                  <h3 onClick={() => handleToggle('behindTheCameras')}>Behind the cameras</h3>
                  {openCategory === 'behindTheCameras' && <SliderCamera />}
                  <h3 onClick={() => handleToggle('soonInPlaymood')}>Soon in Playmood</h3>
                  {openCategory === 'soonInPlaymood' && <SliderSoon />}
                  <h3 onClick={() => handleToggle('teen')}>Teen</h3>
                  {openCategory === 'teen' && <SliderTeens />}
                  <h3 onClick={() => handleToggle('bestInFashion')}>Best in Fashion</h3>
                  {openCategory === 'bestInFashion' && <SliderFashion />}
                  <h3 onClick={() => handleToggle('onlyInPlaymood')}>Only in Playmood</h3>
                  {openCategory === 'onlyInPlaymood' && <SliderOnly />}
                  <h3 onClick={() => handleToggle('watchlist')}>Watchlist</h3>
                  {openCategory === 'watchlist' && <SidebarSlider />}
                </div>
              )}
            </SidebarClicked>
          )}
        </Side>
      </DesktopNavigation>
    </DesktopHead>
  );
}

const DesktopHead = styled.div`
  height: 80px;
  width: 100%;
  background-color: rgba(0,0,0,0.6);
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1001;
`;

const DesktopNavigation = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 260px 0px 80px;
`;

const DesktopNav = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  p {
    cursor: pointer;
  }
  .links {
    color: white;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const LogoAndSettings = styled.div`
  height: fit-content;
  display: flex;
  margin-left: 600px;
`;

const Logo = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-right: 70px;
  .profile-container {
    width: 80px;
    height: 40px;
    display: flex;
    font-size: 15px;
    border-style: solid;
    border-color: white;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 1px;
    img {
      width: 25%;
      height: 40%;
      padding-left: 4px;
    }
  }
  .main-logo {
    height: 40px;
    width: auto;
    cursor: pointer;
  }
`;

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
  img {
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
`;

const Settings = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid rgba(255,255,255,0.4);
`;

const DropdownArea = styled.div`
  height: fit-content;
  width: 100%;
  background-color: black;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 30px 0px 30px 0px;
  gap: 40px;
  img {
    width: 25px;
    height: 25px;
  }
`;

const Side = styled.div`
  display: flex;
  height: 10%;
  align-items: center;
  gap: 30px;
`;

const SidebarClicked = styled.div`
  width: 240px;
  height: 100vh;
  background-color: black;
  top: 0;
  right: 0;
  position: fixed;
  padding: 20px 10px 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .categories_subsection {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding-left: 50px;
    gap: 15px;
    h3 {
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .user_and_settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
    .head_section {
      h1 {
        font-size: 0.8rem;
      }
      p {
        font-size: 0.6rem;
      }
      cursor: pointer;
    }
  }
  .search_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .home_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .recommended_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .new_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .channels_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .spaces_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .schedule_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .favorites_tab {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
  .categories {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px 10px 8px 20px;
    cursor: pointer;
    &:hover {
      background-color: grey;
      border-right: 4px solid red;
    }
    img {
      width: 25px;
      height: 25px;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;