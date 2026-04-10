import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import BASE_API_URL from '../apiConfig';
import Navigation from '../components/Navigation';
import Slidercirclecontent from '../components/Slidercirclecontent';
import CreatorContentModal from '../components/CreatorContentModal';
import { shuffleArray } from '../utils/shuffle';
import Footer from '../components/footer/Footer';

export default function Diaries() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [creatorData, setCreatorData] = useState([]);
  const [creatorError, setCreatorError] = useState(null);
  const [modalCreator, setModalCreator] = useState(null);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) setIsDropdownOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch creator data
  useEffect(() => {
    async function fetchCreators() {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/users/creators`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (Array.isArray(response.data)) {
          setCreatorData(shuffleArray(response.data));
        } else {
          setCreatorError('Unexpected creators data format.');
        }
      } catch (error) {
        setCreatorError('Error fetching creators.');
      }
    }

    fetchCreators();
  }, []);

  const handleOpenCreatorModal = (creator) => {
    setModalCreator(creator);
    setIsCreatorModalOpen(true);
  };

  const handleCloseCreatorModal = () => {
    setIsCreatorModalOpen(false);
    setModalCreator(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <Homecontent>
      {isMobile ? (
        <Hamburger onClick={toggleDropdown}>
          <MobileBurger />
        </Hamburger>
      ) : (
        <DesktopHeader />
      )}

      <MainContainer>
        {/* Navigation Component */}
        <Navigation
          isMobile={isMobile}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
        />

        {/* Main Content */}
        <ContentWrapper isMobile={isMobile}>
          {!isMobile && (
            <HeaderWrapper>
              <h3 className="text-white text-[1.5rem] font-bold">DIARIES</h3>
            </HeaderWrapper>
          )}

          {/* Creator Grid */}
          <GridWrapper>
            {creatorError ? (
              <div className="error-message">{creatorError}</div>
            ) : (
              <CreatorGrid>
                {Array.isArray(creatorData) &&
                  creatorData.slice(0, visibleCount).map((creator) => (
                    <div key={creator._id} className="grid-item">
                      <Slidercirclecontent
                        img={creator.profileImage}
                        movie={creator}
                        onVideoClick={() => handleOpenCreatorModal(creator)}
                      />
                    </div>
                  ))}
              </CreatorGrid>
            )}

            {visibleCount < creatorData.length && (
              <ViewMoreButton onClick={handleViewMore}>
                VIEW MORE
              </ViewMoreButton>
            )}

            <CreatorContentModal
              isOpen={isCreatorModalOpen}
              creator={modalCreator}
              onClose={handleCloseCreatorModal}
            />
          </GridWrapper>
        </ContentWrapper>
      </MainContainer>

      <Footer />
    </Homecontent>
  );
}

// Styled Components
const Homecontent = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.70);
   @media (max-width: 768px) {

   height: auto;
  
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin-top: ${(props) => (props.isMobile ? '140px' : '8%')};
  margin-bottom: 0; /* No gap before footer */
  flex-grow: 1;

  @media (min-width: 768px) {
    width: calc(100% - 260px);
    margin-left: 260px;
  }
`;

const HeaderWrapper = styled.div`
  padding-left: 25px;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    padding-left: 15px;
    text-align: left;
  }
`;

const GridWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  .error-message {
    color: white;
    text-align: center;
    padding: 20px;
  }
`;

const CreatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ViewMoreButton = styled.button`
  background-color: #541011;
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  margin: 20px auto 40px auto;
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #6b1516;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(84, 16, 17, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 20px;
    left: 8px;
    cursor: pointer;
    color: white;
    z-index: 1000;

    svg {
      font-size: 40px;
    }
    &:hover {
      color: #541011;
    }
  }
`;
