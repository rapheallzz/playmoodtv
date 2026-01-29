import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/authSlice';
import axios from 'axios';
import DonationModal from '../DonationModal';
import SidebarSlider from '../slidersidebar';
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

export default function MobileBurger() {
  const [dropbar, set_drop_bar] = useState(false);
  const navigate = useNavigate();
  const [settings_hover, set_settings_hovered] = useState(true);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mountcategory, set_mountcategory] = useState(false);

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
  const [bestInFashionToggled, setBestInFashionToggled] = useState(false);
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
    if (excludeSetter !== setBestInFashionToggled) setBestInFashionToggled(false);
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

  const handleBestInFashionToggle = () => {
    if (bestInFashionToggled) {
      setBestInFashionToggled(false);
    } else {
      closeAllCategories(setBestInFashionToggled);
      setBestInFashionToggled(true);
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

  const handle_hovered_settings = () => {
    set_settings_hovered(!settings_hover);
  };

  const handle_hovered_settings_out = () => {
    set_settings_hovered(!settings_hover);
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
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
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
      <div className="flex justify-between flex-col bg-black items-center py-2 px-8 h-20">
        {/* Logo and Profile */}
        <div className="flex w-full items-center justify-around gap-10">
          <div className="w-32 cursor-pointer">
            <img src={playmood} alt="Playmood Logo" onClick={() => navigate('/')} />
          </div>
          <div
            className="w-15 h-15 flex justify-center items-center rounded-full cursor-pointer"
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

        <div className="flex justify-between w-full gab-10">
          <Link to="/" className="text-[0.5rem] text-white hover:text-red-600">
            HOME
          </Link>
          <Link to="/channels" className="text-white text-[0.5rem] hover:text-red-600">
            CHANNELS
          </Link>
          <Link onClick={handleDonationClick} className="text-white text-[0.5rem] hover:text-red-600">
            SCHEDULE
          </Link>
          <Link onClick={handleDonationClick} className="text-white text-[0.5rem] hover:text-red-600">
            SPACES
          </Link>
          <Link to="/stories" className="text-white text-[0.5rem] hover:text-red-600">
            STORIES
          </Link>
          <Link to="/diaries" className="text-white text-[0.5rem] hover:text-red-600">
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
              <GiHamburgerMenu className="mobile-hamburger" size={30} color="white" onClick={toggleSidebar} />
            ) : (
              <Settings>
                {settings_hover ? (
                  <img src={profile} onMouseEnter={handle_hovered_settings} />
                ) : (
                  <img src={profile} onMouseOut={handle_hovered_settings_out} />
                )}
              </Settings>
            )}
          </SettingsAndDropdown>
        ) : (
          <SidebarClicked onMouseLeave={toggleSidebar}>
            <div className="flex align-middle justify-between">
              {user && (
                <button
                  className="bg-red-600 text-white px-3 rounded-md text-xs cursor-pointer transition-colors duration-300 ease-in-out"
                  onClick={onLogout}
                >
                  Logout
                </button>
              )}
              <button className="w-8 h-8 text-sm rounded-full text-white" onClick={toggleSidebar}>
                X
              </button>
            </div>

            <div className="mt-33">
              {user && (
                <div>
                  <div className="flex gap-5 align-middle my-4">
                    <img className="w-8 h-8" src={profile} onClick={() => navigate('/dashboard')} />
                    <h1 className="text-sm self-center">{user.name}</h1>
                  </div>
                </div>
              )}

              {!mountcategory && (
                <>
                  {!user && (
                    <div onClick={() => navigate('/login')}>
                      <button className="font-semibold text-[10px] w-28 h-10 bg-red-950 text-white rounded-md">
                        Sign In / Register
                      </button>
                    </div>
                  )}

                  <div className="search_tab">
                    <div className="flex items-center">
                      {search_hover ? (
                        <img src={search_icon} onMouseEnter={handle_search_hover} />
                      ) : (
                        <img src={search_red} onMouseOut={handle_search_hover_out} />
                      )}
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="ml-2 p-1 bg-transparent border-b border-white text-red-200 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="search_results">
                    {searchResults.map((result, index) => (
                      <div key={index} className="search_result_item">
                        {result.name}
                      </div>
                    ))}
                  </div>

                  <div className="home_tab" onClick={() => navigate('/')}>
                    {home_hover ? (
                      <img src={home} onMouseEnter={handle_home_hover} />
                    ) : (
                      <img src={home_red} onMouseOut={handle_home_hover_out} />
                    )}
                    <p>Home</p>
                  </div>
                  <div className="recommended_tab" onClick={() => navigate('/recommended')}>
                    {thumbs_hover ? (
                      <img src={thumbs} onMouseEnter={handle_thumbs_hover} />
                    ) : (
                      <img src={thumbs_red} onMouseOut={handle_thumbs_hover_out} />
                    )}
                    <p>Recommended</p>
                  </div>
                  <div className="new_tab" onClick={() => navigate('/newplaymood')}>
                    {new_hover ? (
                      <img src={newp} onMouseEnter={handle_newp_hover} />
                    ) : (
                      <img src={newp_red} onMouseOut={handle_newp_hover_out} />
                    )}
                    <p>New on playmood</p>
                  </div>
                  <div className="channels_tab" onClick={() => navigate('/channels')}>
                    {snowflakes_hover ? (
                      <img src={snowflakes} onMouseEnter={handle_snowflakes_hover} />
                    ) : (
                      <img src={snowflakes_red} onMouseOut={handle_snowflakes_hover_out} />
                    )}
                    <p>Channels</p>
                  </div>
                  <div className="spaces_tab" onClick={handleDonationClick}>
                    {location_hover ? (
                      <img src={location} onMouseEnter={handle_location_hover} />
                    ) : (
                      <img src={location_red} onMouseOut={handle_location_hover_out} />
                    )}
                    <p>Spaces</p>
                  </div>
                  <div className="schedule_tab" onClick={handleDonationClick}>
                    {schedule_hover ? (
                      <img src={schedule_white} onMouseEnter={handle_schedule_hover} />
                    ) : (
                      <img src={schedule_red} onMouseOut={handle_schedule_hover_out} />
                    )}
                    <p>Schedule</p>
                  </div>
                  <div className="favorites_tab" onClick={() => (user ? navigate('/dashboard') : navigate('/login'))}>
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
                <p>Categories</p>
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
                  {diariesToggled && <SliderDairies />}
                  <h3 onClick={handleSpacesToggle}>Spaces</h3>
                  {spacesToggled && <SliderSpace />}
                  <h3 onClick={handleRecommendationsToggle}>Recommendations for you</h3>
                  {recommendationsToggled && <SliderRecommended />}
                  <h3 onClick={handleInterviewsToggle}>Interviews</h3>
                  {interviewsToggled && <SliderInterview />}
                  <h3 onClick={handleFashionShowsToggle}>Fashion Shows Stories</h3>
                  {fashionShowsToggled && <SliderFashion />}
                  <h3 onClick={handleDocumentariesToggle}>Documentaries and Reports</h3>
                  {documentariesToggled && <SliderDocumentaries />}
                  <h3 onClick={handleBehindTheCamerasToggle}>Behind the cameras</h3>
                  {behindTheCamerasToggled && <SliderCamera />}
                  <h3 onClick={handleSoonInPlaymoodToggle}>Soon in Playmood</h3>
                  {soonInPlaymoodToggled && <SliderSoon />}
                  <h3 onClick={handleTeenToggle}>Teen</h3>
                  {teenToggled && <SliderTeens />}
                  <h3 onClick={handleBestInFashionToggle}>Best in Fashion</h3>
                  {bestInFashionToggled && <SliderFashion />}
                  <h3 onClick={handleOnlyInPlaymoodToggle}>Only in Playmood</h3>
                  {onlyInPlaymoodToggled && <SliderOnly />}
                  <h3 onClick={handleWatchlistToggle}>Watchlist</h3>
                  {watchlistToggled && <SidebarSlider />}
                </div>
              )}
            </div>
          </SidebarClicked>
        )}
      </Side>
    </MobileHead>
  );
}

// Styled components remain unchanged
const MobileHead = styled.div`
  height: 80px;
  width: 100%;
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
`;

const Side = styled.div`
  display: flex;
  height: 10%;
  align-items: center;
  gap: 30px;
  position: relative;
  top: 2px;
  left: -10px;
`;

const SettingsAndDropdown = styled.div`
  width: 60px;
  height: 100vh;
  background-color: transparent;
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

  @media screen and (max-width: 768px) {
    left: 0;
    right: unset;
  }
`;

const Settings = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.4);
`;

const SidebarClicked = styled.div`
  width: 250px;
  height: 100vh;
  background-color: black;
  top: 0;
  left: 0;
  position: fixed;
  padding: 20px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  gap: 18px;

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

  .search_tab {
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 8px 10px 8px 10px;
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
    gap: 30px;
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

  @media screen and (max-width: 768px) {
    left: 0;
    right: unset;
  }
`;