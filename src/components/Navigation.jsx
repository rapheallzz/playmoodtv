import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleDown } from 'react-icons/fa';

const navLinks = [
  { to: "/newplaymood", label: "New on Playmood" },
  { to: "/channels", label: "Channels" },
  { to: "/diaries", label: "Diaries" },
  { to: "/spaces", label: "Spaces" },
  { to: "/recommended", label: "Recommendations for you" },
  { to: "/interviews", label: "Interviews" },
  { to: "/fashion", label: "Fashion Shows Stories" },
  { to: "/documentaries", label: "Documentaries and report" },
  { to: "/cameras", label: "Behind the cameras" },
  { to: "/soon", label: "Soon in Playmood" },
  { to: "/teen", label: "Teen" },
  { to: "/bestfashion", label: "Best in Fashion" },
  { to: "/onlyplaymood", label: "Only in Playmood" },
  { to: "/watchlist", label: "Watchlist" },
];

const Navigation = ({ isMobile, isDropdownOpen, toggleDropdown }) => {
  const location = useLocation();
  
  // Find the current route's label, default to "NEW ON PLAYMOOD" if not found
  const currentNav = navLinks.find((link) => link.to === location.pathname) || navLinks[0];
  const currentLabel = currentNav.label.toUpperCase();

  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarContainer className="hidden md:block fixed left-0 w-[300px] mt-[8%] pl-[0.5rem]">
        <div className="flex flex-col gap-1 text-sm md:text-base font-medium text-white">
          {navLinks.map((link) => (
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
          <div className="flex items-center pl-4 pb-2 mt-10">
            {/* Dynamic title based on current route */}
            <h3 className="text-white text-[1.5rem] font-bold">{currentLabel}</h3>
            <button
              onClick={toggleDropdown}
              className="ml-4 text-white text-2xl focus:outline-none"
              aria-expanded={isDropdownOpen}
              aria-label="Toggle navigation menu"
            >
              <FaAngleDown />
            </button>
          </div>
          {isDropdownOpen && (
            <DropdownMenu>
              <div className="flex flex-col gap-2 text-sm font-medium text-white bg-black bg-opacity-80 p-4 rounded-lg">
                {navLinks.map((link) => (
                  <StyledLink
                    key={link.to}
                    to={link.to}
                    className={location.pathname === link.to ? 'active' : ''}
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
`;

const NavContainer = styled.div`
  position: fixed;
  top: 60px; /* Below MobileBurger (top: 20px + 40px height) */
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 90%;
  left: 16px;
  z-index: 1001;
  width: 90%;
  max-width: 300px;
  max-height: 50vh;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #e53e3e; /* Red-700 equivalent */
  }

  &.active {
    color: #e53e3e; /* Highlight active link */
    font-weight: bold;
    border-left: 3px solid #e53e3e; /* Optional: visual indicator for desktop */
    padding-left: 8px;
  }
`;

export default Navigation;