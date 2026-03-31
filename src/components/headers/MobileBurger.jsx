import BASE_API_URL from '../../apiConfig';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineUser } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/authSlice';
import axios from 'axios';
import DonationModal from '../DonationModal';
import SidebarSlider from '../slidersidebar';
import Slidertop10 from '../sidebarSliders/SliderTop10';
import SliderNew from '../sidebarSliders/SliderNew';
import SliderChannel from '../sidebarSliders/SliderChannels';
import SliderDiaries from '../sidebarSliders/SliderDiaries';
import SliderSpace from '../sidebarSliders/SliderSpace';
import SliderRecommended from '../sidebarSliders/SliderRecommend';
import SliderInterview from '../sidebarSliders/SliderInterview';
import SliderFashion from '../sidebarSliders/SliderFashion';
import SliderDocumentaries from '../sidebarSliders/SliderDocumentaries';
import SliderCamera from '../sidebarSliders/SliderCameras';
import SliderSoon from '../sidebarSliders/SliderSoon';
import SliderTeens from '../sidebarSliders/SliderTeens';
import SliderOnly from '../sidebarSliders/SliderOnly';
import WelcomePopup from '../Welcomepop';

// Import your images
import playmood from '/PLAYMOOD_DEF.png';
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

export default function MobileBurger({ channels, set_channels }) {
  const navigate = useNavigate();
  const [showDonationModal, setShowDonationModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mountcategory, set_mountcategory] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  // State for category toggles
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
  const [onlyInPlaymoodToggled, setOnlyInPlaymoodToggled] = useState(false);
  const [watchlistToggled, setWatchlistToggled] = useState(false);

  // Hover states
  const [search_hover, set_search_hover] = useState(true);
  const [home_hover, set_home_hover] = useState(true);
  const [thumbs_hover, set_thumbs_hover] = useState(true);
  const [new_hover, set_new_hover] = useState(true);
  const [snowflakes_hover, set_snow_flakes] = useState(true);
  const [location_hover, set_location_flakes] = useState(true);
  const [schedule_hover, setschedule_hover] = useState(true);
  const [favourites_hover, set_favourites_hover] = useState(true);
  const [categories_hover, set_categories_hover] = useState(true);

  // Function to close all categories except the one being toggled
  const closeAllCategories = (excludeSetter) => {
    if (excludeSetter !== setTop10Toggled) setTop10Toggled(false);
    if (excludeSetter !== setNewPlaymoodToggled) setNewPlaymoodToggled(false);
    if (excludeSetter !== setChannelsToggled) setChannelsToggled(false);
    if (excludeSetter !== setDiariesToggled) setDiariesToggled(false);
    if (excludeSetter !== setSpacesToggled) setSpacesToggled(false);
    if (excludeSetter !== setRecommendationsToggled) setRecommendationsToggled(false);
    if (excludeSetter !== setInterviewsToggled) setInterviewsToggled(false);
    if (excludeSetter !== setFashionShowsToggled) setFashionShowsToggled(false);
    if (excludeSetter !== setDocumentariesToggled) setDocumentariesToggled(false);
    if (excludeSetter !== setBehindTheCamerasToggled) setBehindTheCamerasToggled(false);
    if (excludeSetter !== setSoonInPlaymoodToggled) setSoonInPlaymoodToggled(false);
    if (excludeSetter !== setTeenToggled) setTeenToggled(false);
    if (excludeSetter !== setOnlyInPlaymoodToggled) setOnlyInPlaymoodToggled(false);
    if (excludeSetter !== setWatchlistToggled) setWatchlistToggled(false);
  };

  // Updated toggle handlers
  const handleTop10Toggle = () => {
    if (top10Toggled) {
      setTop10Toggled(false);
    } else {
      closeAllCategories(setTop10Toggled);
      setTop10Toggled(true);
    }
  };

  const handleNewPlaymoodToggle = () => {
    if (newPlaymoodToggled) {
      setNewPlaymoodToggled(false);
    } else {
      closeAllCategories(setNewPlaymoodToggled);
      setNewPlaymoodToggled(true);
    }
  };

  const handleChannelsToggle = () => {
    if (channelsToggled) {
      setChannelsToggled(false);
    } else {
      closeAllCategories(setChannelsToggled);
      setChannelsToggled(true);
    }
  };

  const handleDiariesToggle = () => {
    if (diariesToggled) {
      setDiariesToggled(false);
    } else {
      closeAllCategories(setDiariesToggled);
      setDiariesToggled(true);
    }
  };

  const handleSpacesToggle = () => {
    if (spacesToggled) {
      setSpacesToggled(false);
    } else {
      closeAllCategories(setSpacesToggled);
      setSpacesToggled(true);
    }
  };

  const handleRecommendationsToggle = () => {
    if (recommendationsToggled) {
      setRecommendationsToggled(false);
    } else {
      closeAllCategories(setRecommendationsToggled);
      setRecommendationsToggled(true);
    }
  };

  const handleInterviewsToggle = () => {
    if (interviewsToggled) {
      setInterviewsToggled(false);
    } else {
      closeAllCategories(setInterviewsToggled);
      setInterviewsToggled(true);
    }
  };

  const handleFashionShowsToggle = () => {
    if (fashionShowsToggled) {
      setFashionShowsToggled(false);
    } else {
      closeAllCategories(setFashionShowsToggled);
      setFashionShowsToggled(true);
    }
  };

  const handleDocumentariesToggle = () => {
    if (documentariesToggled) {
      setDocumentariesToggled(false);
    } else {
      closeAllCategories(setDocumentariesToggled);
      setDocumentariesToggled(true);
    }
  };

  const handleBehindTheCamerasToggle = () => {
    if (behindTheCamerasToggled) {
      setBehindTheCamerasToggled(false);
    } else {
      closeAllCategories(setBehindTheCamerasToggled);
      setBehindTheCamerasToggled(true);
    }
  };

  const handleSoonInPlaymoodToggle = () => {
    if (soonInPlaymoodToggled) {
      setSoonInPlaymoodToggled(false);
    } else {
      closeAllCategories(setSoonInPlaymoodToggled);
      setSoonInPlaymoodToggled(true);
    }
  };

  const handleTeenToggle = () => {
    if (teenToggled) {
      setTeenToggled(false);
    } else {
      closeAllCategories(setTeenToggled);
      setTeenToggled(true);
    }
  };

  const handleOnlyInPlaymoodToggle = () => {
    if (onlyInPlaymoodToggled) {
      setOnlyInPlaymoodToggled(false);
    } else {
      closeAllCategories(setOnlyInPlaymoodToggled);
      setOnlyInPlaymoodToggled(true);
    }
  };

  const handleWatchlistToggle = () => {
    if (watchlistToggled) {
      setWatchlistToggled(false);
    } else {
      closeAllCategories(setWatchlistToggled);
      setWatchlistToggled(true);
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const handleDonationClose = () => {
    setShowDonationModal(false);
  };

  const handleSubscriptionSubmit = (event) => {
    event.preventDefault();
    setShowDonationModal(false);
  };


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

  const handle_category_hover = () => {
    set_categories_hover(!categories_hover);
  };

  const handle_category_hover_out = () => {
    set_categories_hover(!categories_hover);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handle_mountcategory = () => {
    set_mountcategory(!mountcategory);
  };

  const handleDonationClick = () => {
    setShowDonationModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);
        setData(response.data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const results = data.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    };
    handleSearch();
  }, [searchQuery, data]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MobileHead>
      {sidebarOpen && (
      <div className="flex flex-col bg-black items-center w-full">
        {/* Top Row: Hamburger, Logo, Profile */}
        <div className="flex items-center justify-between w-full px-5 h-16">
          {/* Hamburger Menu Icon */}
          <div className="flex-1 flex justify-start">
            <GiHamburgerMenu
              className="cursor-pointer"
              size={28}
              color="white"
              onClick={toggleSidebar}
            />
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <img
              src={playmood}
              alt="Playmood Logo"
              className="w-28 cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>

          {/* Profile Icon */}
          <div className="flex-1 flex justify-end">
            <div
              className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer overflow-hidden border border-white/10 relative"
              onClick={() => {
                if (user) {
                  navigate('/dashboard');
                } else {
                  navigate('/login');
                }
              }}
            >
              <AiOutlineUser size={20} color="white" style={{ position: 'absolute' }} />
              {user && (user.profileImage?.url || user.profileImage) && (
                <img
                  src={user.profileImage?.url || user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover relative z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links Row */}
        <NavLinks className="flex justify-between w-full px-5 pb-3 gap-4 overflow-x-auto">
          <Link to="/" className="text-[0.6rem] font-medium text-white hover:text-red-600 whitespace-nowrap">
            HOME
          </Link>
          <Link to="/channels" className="text-white text-[0.6rem] font-medium hover:text-red-600 whitespace-nowrap">
            CHANNELS
          </Link>
          <Link to="/schedule" className="text-white text-[0.6rem] font-medium hover:text-red-600 whitespace-nowrap">
            SCHEDULE
          </Link>
          <Link onClick={handleDonationClick} className="text-white text-[0.6rem] font-medium hover:text-red-600 whitespace-nowrap">
            SPACES
          </Link>
          <Link to="/stories" className="text-white text-[0.6rem] font-medium hover:text-red-600 whitespace-nowrap">
            STORIES
          </Link>
          <Link to="/diaries" className="text-white text-[0.6rem] font-medium hover:text-red-600 whitespace-nowrap">
            DIARIES
          </Link>
        </NavLinks>
      </div>
      )}

      <DonationModal
        isOpen={showDonationModal}
        onClose={handleDonationClose}
        onSubmit={handleSubscriptionSubmit}
      />
      <WelcomePopup
        showPopup={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />

      <Side>
        {!sidebarOpen && (
          <>
          <div className="fixed inset-0 bg-black/60 z-[-1]" onClick={toggleSidebar} />
          <SidebarClicked onMouseLeave={toggleSidebar}>
            <div className="flex items-center justify-between mb-6">
              {user ? (
                <button
                  className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors duration-300 hover:bg-red-700"
                  onClick={onLogout}
                >
                  Logout
                </button>
              ) : (
                <div onClick={() => navigate('/login')}>
                  <button className="font-semibold text-xs px-4 py-1.5 bg-[#541011] text-white rounded-full transition-colors duration-300 hover:bg-red-900">
                    Sign In / Register
                  </button>
                </div>
              )}
              <button className="w-8 h-8 flex items-center justify-center text-lg rounded-full text-white hover:bg-white/10" onClick={toggleSidebar}>
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {user && (
                <div className="flex gap-4 items-center py-3 mb-4 border-b border-white/10">
                  <div
                    className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center font-semibold cursor-pointer overflow-hidden relative border border-white/20"
                    onClick={() => { navigate('/dashboard'); toggleSidebar(); }}
                  >
                    <AiOutlineUser size={20} color="#541011" />
                    {(user.profileImage?.url || user.profileImage) && (
                      <img
                        src={user.profileImage?.url || user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover absolute inset-0 z-10"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <h1 className="text-sm font-semibold truncate text-white">{user.name}</h1>
                </div>
              )}

              {!mountcategory && (
                <>
                  <div className="py-2 mb-4">
                    <div className="flex items-center gap-4 bg-white/5 rounded-lg px-4 py-2.5 border border-white/10 focus-within:border-red-600 transition-colors">
                      <div className="w-5 flex justify-center">
                        <img
                          src={search_hover ? search_icon : search_red}
                          alt="Search"
                          className="w-5 h-5 object-contain"
                          onMouseEnter={handle_search_hover}
                          onMouseLeave={handle_search_hover_out}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="bg-transparent text-white text-sm focus:outline-none w-full"
                      />
                    </div>
                    {searchResults.length > 0 && searchQuery && (
                      <div className="mt-2 max-h-40 overflow-y-auto bg-zinc-900 rounded-lg border border-white/10">
                        {searchResults.map((result, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 text-xs text-white hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0"
                            onClick={() => {
                              const slug = result.name
                                ? `${result.name.replace(/\s+/g, '-').toLowerCase()}-${result._id}`
                                : result._id;
                              navigate(`/movie/${slug}`);
                              toggleSidebar();
                            }}
                          >
                            {result.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="home_tab" onClick={() => { navigate('/'); toggleSidebar(); }}>
                    {home_hover ? (
                      <img src={home} onMouseEnter={handle_home_hover} />
                    ) : (
                      <img src={home_red} onMouseOut={handle_home_hover_out} />
                    )}
                    <p>Home</p>
                  </div>
                  <div className="recommended_tab" onClick={() => {
                    if (user) {
                      navigate('/recommended');
                      toggleSidebar();
                    } else {
                      setShowWelcomePopup(true);
                    }
                  }}>
                    {thumbs_hover ? (
                      <img src={thumbs} onMouseEnter={handle_thumbs_hover} />
                    ) : (
                      <img src={thumbs_red} onMouseOut={handle_thumbs_hover_out} />
                    )}
                    <p>Recommended</p>
                  </div>
                  <div className="new_tab" onClick={() => { navigate('/newplaymood'); toggleSidebar(); }}>
                    {new_hover ? (
                      <img src={newp} onMouseEnter={handle_newp_hover} />
                    ) : (
                      <img src={newp_red} onMouseOut={handle_newp_hover_out} />
                    )}
                    <p>New on Playmood</p>
                  </div>
                  <div className="channels_tab" onClick={() => { navigate('/channels'); toggleSidebar(); }}>
                    {snowflakes_hover ? (
                      <img src={snowflakes} onMouseEnter={handle_snowflakes_hover} />
                    ) : (
                      <img src={snowflakes_red} onMouseOut={handle_snowflakes_hover_out} />
                    )}
                    <p>Channels</p>
                  </div>
                  <div className="spaces_tab" onClick={() => { handleDonationClick(); toggleSidebar(); }}>
                    {location_hover ? (
                      <img src={location} onMouseEnter={handle_location_hover} />
                    ) : (
                      <img src={location_red} onMouseOut={handle_location_hover_out} />
                    )}
                    <p>Spaces</p>
                  </div>
                  <div className="schedule_tab" onClick={() => { navigate('/schedule'); toggleSidebar(); }}>
                    {schedule_hover ? (
                      <img src={schedule_white} onMouseEnter={handle_schedule_hover} />
                    ) : (
                      <img src={schedule_red} onMouseOut={handle_schedule_hover_out} />
                    )}
                    <p>Schedule</p>
                  </div>
                  <div className="favorites_tab" onClick={() => { (user ? navigate('/dashboard') : navigate('/login')); toggleSidebar(); }}>
                    {favourites_hover ? (
                      <img src={favourite} onMouseEnter={handle_favourites_hover} />
                    ) : (
                      <img src={favourite_red} onMouseOut={handle_favourites_hover_out} />
                    )}
                    <p>Favorites</p>
                  </div>
                </>
              )}
              <div className="categories" onClick={handle_mountcategory}>
                {categories_hover ? (
                  <img src={categories} onMouseEnter={handle_category_hover} />
                ) : (
                  <img src={plus} onMouseOut={handle_category_hover_out} />
                )}
                <p>{mountcategory ? 'Close Categories' : 'Categories'}</p>
              </div>
              {mountcategory && (
                <div className="categories_subsection">
                  <h3 onClick={handleTop10Toggle}>TOP 10</h3>
                  {top10Toggled && <Slidertop10 />}
                  <h3 onClick={handleNewPlaymoodToggle}>New on Playmood</h3>
                  {newPlaymoodToggled && <SliderNew />}
                  <h3 onClick={handleChannelsToggle}>Channels</h3>
                  {channelsToggled && <SliderChannel />}
                  <h3 onClick={handleDiariesToggle}>Diaries</h3>
                  {diariesToggled && <SliderDiaries />}
                  <h3 onClick={handleSpacesToggle}>Spaces</h3>
                  {spacesToggled && <SliderSpace />}
                  <h3 onClick={() => {
                    if (user) {
                      handleRecommendationsToggle();
                    } else {
                      setShowWelcomePopup(true);
                    }
                  }}>Recommendations for you</h3>
                  {user && recommendationsToggled && <SliderRecommended />}
                  <h3 onClick={handleInterviewsToggle}>Interviews</h3>
                  {interviewsToggled && <SliderInterview />}
                  <h3 onClick={handleFashionShowsToggle}>Fashion Shows</h3>
                  {fashionShowsToggled && <SliderFashion />}
                  <h3 onClick={handleDocumentariesToggle}>Documentaries and Reports</h3>
                  {documentariesToggled && <SliderDocumentaries />}
                  <h3 onClick={handleBehindTheCamerasToggle}>Behind the cameras</h3>
                  {behindTheCamerasToggled && <SliderCamera />}
                  <h3 onClick={handleSoonInPlaymoodToggle}>Soon in Playmood</h3>
                  {soonInPlaymoodToggled && <SliderSoon />}
                  <h3 onClick={handleTeenToggle}>Teen</h3>
                  {teenToggled && <SliderTeens />}
                  <h3 onClick={handleOnlyInPlaymoodToggle}>Only in Playmood</h3>
                  {onlyInPlaymoodToggled && <SliderOnly />}
                  <h3 onClick={() => {
                    if (user) {
                      handleWatchlistToggle();
                    } else {
                      setShowWelcomePopup(true);
                    }
                  }}>Watchlist</h3>
                  {user && watchlistToggled && <SidebarSlider />}
                </div>
              )}
            </div>
          </SidebarClicked>
          </>
        )}
      </Side>
    </MobileHead>
  );
}

// Styled components remain unchanged
const NavLinks = styled.div`
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MobileHead = styled.div`
  width: 100%;
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 50;
`;

const Side = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const SidebarClicked = styled.div`
  width: 280px;
  height: 100vh;
  background-color: black;
  top: 0;
  left: 0;
  position: fixed;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 10px 0 30px rgba(0,0,0,0.5);

  .categories_subsection {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: 10px 0 20px 45px;
    gap: 18px;
    border-left: 1px solid rgba(255,255,255,0.1);
    margin-left: 12px;
    text-align: left;
    h3 {
      color: rgba(255,255,255,0.7);
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s;
      margin: 0;
      display: block;
      &:hover {
        color: white;
      }
    }
  }

  .home_tab,
  .recommended_tab,
  .new_tab,
  .channels_tab,
  .spaces_tab,
  .schedule_tab,
  .favorites_tab,
  .categories {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 12px 14px;
    margin: 0 -10px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s;
    text-align: left;
    justify-content: flex-start;

    &:hover {
      background-color: rgba(255,255,255,0.1);
    }

    img {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      object-fit: contain;
    }
    p {
      font-size: 0.85rem;
      font-weight: 500;
      color: white;
      margin: 0;
      line-height: 1;
    }
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;