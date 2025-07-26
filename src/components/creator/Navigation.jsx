import React from 'react';
import { StlyedNavigation, NavLinks, NavButton } from '../../styles/CreatorPageStyles';

const Navigation = ({ activeTab, setActiveTab, navigate, setShowDonationModal }) => (
  <StlyedNavigation>
    <NavLinks>
      <NavButton onClick={() => navigate('/dashboard')} aria-label="Analytics">
        HOME
      </NavButton>
      <NavButton
        className={activeTab === 'Uploads' ? 'active' : ''}
        onClick={() => setActiveTab('Uploads')}
        aria-label="Uploads"
      >
        UPLOADS
      </NavButton>
      <NavButton
        className={activeTab === 'Playlist' ? 'active' : ''}
        onClick={() => setActiveTab('Playlist')}
        aria-label="Playlist"
      >
        PLAYLIST
      </NavButton>
      <NavButton
        className={activeTab === 'Donations' ? 'active' : ''}
        onClick={() => setShowDonationModal(true)}
        aria-label="Donations"
      >
        DONATIONS
      </NavButton>
      <NavButton
        className={activeTab === 'Community' ? 'active' : ''}
        onClick={() => setActiveTab('Community')}
        aria-label="Community"
      >
        COMMUNITY
      </NavButton>
      <NavButton
         onClick={() => setShowDonationModal(true)}
      //  onClick={() => navigate('/analytics')} aria-label="Analytics"
       >
        ANALYTICS
      </NavButton>
    </NavLinks>
  </StlyedNavigation>
);

export default Navigation;