import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const navLinks = [
  { to: "/newplaymood", label: "New on Playmood" },
  { to: "/channels", label: "Channels" },
  { to: "/diaries", label: "Diaries" },
  { to: "/spaces", label: "Spaces" },
  { to: "/stories", label: "Stories" },
  { to: "/recommended", label: "Recommendations for you" },
  { to: "/interviews", label: "Interviews" },
  { to: "/fashion", label: "Fashion Shows" },
  { to: "/documentaries", label: "Documentaries and report" },
  { to: "/cameras", label: "Behind the cameras" },
  { to: "/soon", label: "Soon in Playmood" },
  { to: "/teen", label: "Teen" },
  { to: "/onlyplaymood", label: "Only in Playmood" },
  { to: "/watchlist", label: "Watchlist" },
];

const Navigation = ({ isMobile, isDropdownOpen, toggleDropdown }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Filter links based on authentication
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.to === "/watchlist" || link.to === "/recommended") {
      return !!user;
    }
    return true;
  });
  
  // Find the current route's label, default to "NEW ON PLAYMOOD" if not found
  const currentNav = navLinks.find((link) => link.to === location.pathname) || navLinks[0];
  const currentLabel = currentNav.label.toUpperCase();

  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarContainer className="hidden md:block fixed left-0 w-[260px] top-[140px] bottom-0 pl-[0.8rem] overflow-y-auto pb-10 custom-sidebar">
        <div className="flex flex-col gap-1 text-sm md:text-base font-medium text-white pr-4">
          {filteredNavLinks.map((link) => (
            <StyledLink
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </StyledLink>
          ))}
        </div>
      </SidebarContainer>

      {/* Mobile Dropdown Trigger and Menu */}
      {isMobile && (
        <NavContainer>
          <div className="flex items-center justify-between px-6">
            {/* Dynamic title based on current route */}
            <h3 className="text-white text-lg font-bold tracking-wide">{currentLabel}</h3>
            <button
              onClick={toggleDropdown}
              className="text-white text-xl focus:outline-none transition-transform duration-300"
              style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-expanded={isDropdownOpen}
              aria-label="Toggle navigation menu"
            >
              <FaAngleDown />
            </button>
          </div>
          {isDropdownOpen && (
            <DropdownMenu>
              <div className="flex flex-col py-2">
                {filteredNavLinks.map((link) => (
                  <StyledLink
                    key={link.to}
                    to={link.to}
                    className={`px-6 py-3 border-b border-white border-opacity-5 ${location.pathname === link.to ? 'active' : ''}`}
                    onClick={toggleDropdown}
                  >
                    {link.label}
                  </StyledLink>
                ))}
              </div>
            </DropdownMenu>
          )}
        </NavContainer>
      )}
    </>
  );
};

const SidebarContainer = styled.div`
  z-index: 1000;

  &.custom-sidebar::-webkit-scrollbar {
    width: 4px;
  }
  &.custom-sidebar::-webkit-scrollbar-track {
    background: transparent;
  }
  &.custom-sidebar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  &.custom-sidebar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const NavContainer = styled.div`
  position: fixed;
  top: 80px; /* Directly below MobileHead (h-20 = 80px) */
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1001;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.95);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const StyledLink = styled(Link)`
  color: white;
  transition: color 0.3s ease;
  white-space: nowrap;
  display: block;
  line-height: 1.2;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #e53e3e; /* Red-700 equivalent */
  }

  &.active {
    color: #e53e3e; /* Highlight active link */
    font-weight: bold;
    border-left: 3px solid #e53e3e; /* Optional: visual indicator for desktop */
    padding-left: 8px;
  }

  @media screen and (min-width: 768px) {
    font-size: 1rem;
    padding: 4px 0;
    letter-spacing: -0.01em;
  }
`;

export default Navigation;