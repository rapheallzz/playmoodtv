
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { logout, reset } from '../../features/authSlice';
import axios from 'axios';
import BASE_API_URL from '../../apiConfig';
import WelcomePopup from '../Welcomepop';
import SidebarSlider from '../slidersidebar';
import profile from '/icon-profile.png';
import logo from '/PLAYMOOD_DEF.png';
import search_icon from '/search_white.png';
import search_red from '/search_red.png';
import home from '/home.png';
import home_red from '/home_red.png';
import thumbs from '/thumbs.png';
import thumbs_red from '/thumbs_red.png';
import newp from '/newp.png';
import newp_red from '/newp_red.png';
import snowflakes from '/snowflakes.png';
import snowflakes_red from '/snowflakes_red.png';
import location from '/location_white.png';
import location_red from '/location.png';
import schedule_white from '/schedule_white.png';
import schedule_red from '/schedule_red.png';
import favourite from '/favourite.png';
import favourite_red from '/star_red.png';
import categories from '/categories.png';
import plus from '/plus.png';

export default function MovieHeader({ title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [mountcategory, set_mountcategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);

  // States for hover effects
  const [hoverStates, setHoverStates] = useState({
    search: true,
    home: true,
    thumbs: true,
    new: true,
    snowflakes: true,
    location: true,
    schedule: true,
    favourites: true,
    categories: true,
  });

  const [categoryToggles, setCategoryToggles] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);
        setData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!Array.isArray(data)) return;
    const results = data.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, data]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCategory = (cat) => setCategoryToggles(prev => ({ ...prev, [cat]: !prev[cat] }));

  const handleHover = (key, val) => {
    setHoverStates(prev => ({ ...prev, [key]: val }));
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const sidebarContent = (
    <SidebarOverlay onClick={toggleSidebar}>
      <SidebarContent onClick={(e) => e.stopPropagation()}>
        <SidebarHeader>
          {user && (
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          )}
          <CloseButton onClick={toggleSidebar}>X</CloseButton>
        </SidebarHeader>

        <SidebarScrollArea>
          {user && (
            <UserInfo onClick={() => navigate('/dashboard')}>
              <UserAvatar src={user.profileImage || profile} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          )}

          {!user && (
            <SignInButton onClick={() => navigate('/login')}>
              Sign In / Register
            </SignInButton>
          )}

          <SidebarItem>
            <SearchContainer>
              <img
                src={hoverStates.search ? search_icon : search_red}
                onMouseEnter={() => handleHover('search', false)}
                onMouseLeave={() => handleHover('search', true)}
                alt="Search"
              />
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
            {searchQuery && (
              <SearchResults>
                {searchResults.map((result, index) => (
                  <SearchResultItem key={index} onClick={() => handleNavItemClick(`/movie/${result.slug}`)}>
                    {result.name}
                  </SearchResultItem>
                ))}
              </SearchResults>
            )}
          </SidebarItem>

          <SidebarNavItems>
            <NavItem onClick={() => handleNavItemClick('/')} onMouseEnter={() => handleHover('home', false)} onMouseLeave={() => handleHover('home', true)}>
              <img src={hoverStates.home ? home : home_red} alt="" />
              <span>Home</span>
            </NavItem>

            <NavItem onClick={() => user ? handleNavItemClick('/recommended') : setShowWelcomePopup(true)} onMouseEnter={() => handleHover('thumbs', false)} onMouseLeave={() => handleHover('thumbs', true)}>
              <img src={hoverStates.thumbs ? thumbs : thumbs_red} alt="" />
              <span>Recommended</span>
            </NavItem>

            <NavItem onClick={() => handleNavItemClick('/newplaymood')} onMouseEnter={() => handleHover('new', false)} onMouseLeave={() => handleHover('new', true)}>
              <img src={hoverStates.new ? newp : newp_red} alt="" />
              <span>New on Playmood</span>
            </NavItem>

            <NavItem onClick={() => handleNavItemClick('/channels')} onMouseEnter={() => handleHover('snowflakes', false)} onMouseLeave={() => handleHover('snowflakes', true)}>
              <img src={hoverStates.snowflakes ? snowflakes : snowflakes_red} alt="" />
              <span>Channels</span>
            </NavItem>

            <NavItem onClick={() => handleNavItemClick('/spaces')} onMouseEnter={() => handleHover('location', false)} onMouseLeave={() => handleHover('location', true)}>
              <img src={hoverStates.location ? location : location_red} alt="" />
              <span>Spaces</span>
            </NavItem>

            <NavItem onClick={() => handleNavItemClick('/schedule')} onMouseEnter={() => handleHover('schedule', false)} onMouseLeave={() => handleHover('schedule', true)}>
              <img src={hoverStates.schedule ? schedule_white : schedule_red} alt="" />
              <span>Schedule</span>
            </NavItem>

            <NavItem onClick={() => handleNavItemClick('/favourites')} onMouseEnter={() => handleHover('favourites', false)} onMouseLeave={() => handleHover('favourites', true)}>
              <img src={hoverStates.favourites ? favourite : favourite_red} alt="" />
              <span>Favorites</span>
            </NavItem>

            <NavItem onClick={() => set_mountcategory(!mountcategory)} onMouseEnter={() => handleHover('categories', false)} onMouseLeave={() => handleHover('categories', true)}>
              <img src={hoverStates.categories ? categories : plus} alt="" />
              <span>Categories</span>
            </NavItem>

            {mountcategory && (
              <CategorySubsection>
                {[
                  'TOP 10', 'New on Playmood', 'Channels', 'Diaries', 'Spaces',
                  'Recommendations for you', 'Interviews', 'Fashion Shows',
                  'Documentaries and Reports', 'Behind the cameras', 'Soon in Playmood',
                  'Teen', 'Only in Playmood', 'Watchlist'
                ].map(cat => (
                  <React.Fragment key={cat}>
                    <h3 onClick={() => toggleCategory(cat)}>{cat}</h3>
                    {categoryToggles[cat] && <SidebarSlider />}
                  </React.Fragment>
                ))}
              </CategorySubsection>
            )}
          </SidebarNavItems>
        </SidebarScrollArea>
      </SidebarContent>
    </SidebarOverlay>
  );

  return (
    <HeaderWrapper>
      <HeaderContent>
        <LeftSection>
          <GiHamburgerMenu size={28} color="white" onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
          <Logo src={logo} alt="Playmood Logo" onClick={() => navigate('/')} />
        </LeftSection>

        <CenterSection>
          {title && <MovieTitle>{title}</MovieTitle>}
        </CenterSection>

        <RightSection>
          <ProfileIcon
            src={user?.profileImage || profile}
            alt="Profile"
            onClick={() => (user ? navigate('/dashboard') : navigate('/login'))}
          />
        </RightSection>
      </HeaderContent>

      <WelcomePopup showPopup={showWelcomePopup} onClose={() => setShowWelcomePopup(false)} />

      {sidebarOpen && createPortal(sidebarContent, document.body)}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
`;

const HeaderContent = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 35px;
  cursor: pointer;
  @media (max-width: 480px) {
    height: 25px;
  }
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0; /* Important for truncation */
`;

const MovieTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
`;

const ProfileIcon = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  border: 2px solid transparent;
  transition: border-color 0.2s;
  &:hover {
    border-color: #541011;
  }
  @media (max-width: 480px) {
    height: 30px;
    width: 30px;
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000;
  display: flex;
`;

const SidebarContent = styled.div`
  width: 280px;
  height: 100%;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0,0,0,0.5);
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #333;
`;

const SidebarScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

const SignInButton = styled.button`
  width: 100%;
  background: #541011;
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  margin-bottom: 25px;
  border: none;
  cursor: pointer;
`;

const SidebarItem = styled.div`
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1a1a1a;
  padding: 8px 12px;
  border-radius: 20px;
  img {
    width: 20px;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const SearchResults = styled.div`
  margin-top: 10px;
  background: #1a1a1a;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
`;

const SearchResultItem = styled.div`
  padding: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;

const SidebarNavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1a1a1a;
    border-right: 4px solid #541011;
  }
  img {
    width: 22px;
    height: 22px;
  }
  span {
    font-size: 0.9rem;
  }
`;

const CategorySubsection = styled.div`
  padding-left: 37px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
    cursor: pointer;
    color: #ccc;
    &:hover {
      color: white;
    }
  }
`;
