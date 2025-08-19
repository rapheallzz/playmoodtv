import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import instagram from '/instagram.png';
import PlaylistSlider from '../components/sliders/PlaylistSlider';
import logo from '/PLAYMOOD_DEF.png';
import Slidercontent from '../components/Slidercont';

export default function Creator() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState('Videos');
  const [creatorContent, setCreatorContent] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (location.state?.creator?._id) {
        const creatorId = location.state.creator._id;
        try {
          setError(null);
          // Fetch creator's videos
          const contentResponse = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/creator/${creatorId}`);
          setCreatorContent(contentResponse.data);

          // Fetch creator's public playlists
          const playlistResponse = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/playlists/user/${creatorId}/public`);
          setPlaylists(playlistResponse.data.playlists || []);

        } catch (err) {
          console.error('Error fetching creator data:', err);
          setError('Failed to load creator data.');
        }
      }
    };

    fetchCreatorData();
  }, [location.state]);

  const handleCardClick = (content) => {
    navigate(`/movie/${content.id}`, {
      state: {
        movie: content.video,
        title: content.title || '',
        desc: content.description || '',
        credits: content.credit || '',
      },
    });
  };

  return (
    <Homecontent>
      {isMobile ? (
        <Hamburger onClick={() => handle_sidebar_hover()}>
          <MobileBurger />
        </Hamburger>
      ) : (
        <DesktopHeader/>
      )}

      <div className='flex'>
        <div className=' hidden md:block fixed left-2 w-[40%] mt-[28%] pl-[2%] md:left-20 md:mt-[8%]  '>
          <div className=' flex flex-col gap-1 text-sm  md:text-xl font-medium text-white '>
            <Link to="/newplaymood" className='hover:text-red-700'>New on Playmood</Link>
            <Link to="/channels" className='hover:text-red-700'>Channels</Link>
            <Link to="/diaries" className='hover:text-red-700'>Diaries</Link>
            <Link to="/spaces" className='hover:text-red-700'>Spaces</Link>
            <Link to="/recommended" className='hover:text-red-700'>Recommendations for you</Link>
            <Link to="/interviews" className='hover:text-red-700'>Interviews</Link>
            <Link to="/fashion" className='hover:text-red-700'>Fashion Shows Stories</Link>
            <Link to="/documentaries" className='hover:text-red-700'>Documentaries and report</Link>
            <Link to="/cameras" className='hover:text-red-700'>Behind the cameras</Link>
            <Link to="/soon" className='hover:text-red-700'>Soon in Playmood</Link>
            <Link to="/teen" className='hover:text-red-700'>Teen</Link>
            <Link to="/bestfashion" className='hover:text-red-700'>Best in Fashion</Link>
            <Link to="/onlyplaymood" className='hover:text-red-700'>Only in Playmood</Link>
            <Link to="/watchlist" className='hover:text-red-700'>Watchlist</Link>
          </div>
        </div>

        <div className='h-full relative  md:right-[-40%] w-full md:w-3/5 mt-[28%]  mb-36 md:mt-[8%] md:mb-8'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='pl-16 pb-2 text-white text-[1.5rem] font-bold'>{location.state?.creator?.name || 'Creator Name'}</h3>
            <button className="bg-[#541011] text-white px-2 py-1 rounded hover:bg-[#461718]">
              Subscribe
            </button>
          </div>

          <TabNav>
            <TabButton onClick={() => setActiveTab('Videos')} active={activeTab === 'Videos'}>
              Videos
            </TabButton>
            <TabButton onClick={() => setActiveTab('Playlists')} active={activeTab === 'Playlists'}>
              Playlists
            </TabButton>
          </TabNav>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {activeTab === 'Videos' && (
            <Content>
              {creatorContent.map((content) => (
                <div className="flex-grow w-[210px] max-h-[310px] max-w-[210px] md:flex-none md:w-[250px] md:max-w-[250px] md:max-h-[350px] box-border cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" key={content.id} onClick={() => handleCardClick(content)}>
                  <Slidercontent
                    img={content.thumbnail}
                    title={content.title}
                    movie={content.video}
                    id={content.id}
                    desc={content.description}
                    customStyle={{}}
                  />
                </div>
              ))}
            </Content>
          )}

          {activeTab === 'Playlists' && (
            <div data-testid="playlists-container">
              {playlists.length > 0 ? (
                playlists.map(playlist => (
                  <PlaylistSlider key={playlist._id} playlist={playlist} />
                ))
              ) : (
                <NoContentMessage>No public playlists found for this creator.</NoContentMessage>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ">
  <div className="flex-shrink-0">
    <img className="h-20 w-auto cursor-pointer" src={logo} alt="Logo" />
  </div>
  <div className="flex flex-row md:flex-row gap-4 md:gap-5">
    <div className="flex items-center text-white gap-2">
      <a className="no-underline text-white" href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
        <img className="h-7 w-7" src={instagram} alt="Instagram" />
      </a>
      <p><a className="no-underline text-white" href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">Official</a></p>
    </div>
    <div className="flex items-center text-white gap-2">
      <a className="no-underline text-white" href="https://www.instagram.com/playmoodlat/" target="_blank" rel="noopener noreferrer">
        <img className="h-7 w-7" src={instagram} alt="Instagram" />
      </a>
      <p><a className="no-underline text-white" href="https://www.instagram.com/playmoodlat/" target="_blank" rel="noopener noreferrer">Latam</a></p>
    </div>
    <div className="flex items-center text-white gap-2">
      <a className="no-underline text-white" href="https://www.instagram.com/playmoodmx/" target="_blank" rel="noopener noreferrer">
        <img className="h-7 w-7" src={instagram} alt="Instagram" />
      </a>
      <p><a className="no-underline text-white" href="https://www.instagram.com/playmoodmx/" target="_blank" rel="noopener noreferrer">MX</a></p>
    </div>
  </div>
  <div className="flex flex-row text-white text-xs gap-2 md:mr-10">
    <div>
    <h2 className="cursor-pointer">Contact us:</h2>
    <h3 className="cursor-pointer">Creators@playmoodtv.com</h3>
    </div>

    <div className="flex flex-row md:flex-col gap-1">
      <p className="cursor-pointer" onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>
      <p className="cursor-pointer" onClick={() => navigate('/cookies')}>Cookies Policy</p>
    </div>
    <div>
      <p className="cursor-pointer">All rights reserved to PlaymoodTV 2023</p>
    </div>
  </div>
               </div>


    </Homecontent>
  );
}

const Homecontent = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
`;

const ContentHolder = styled.div
`
  height: fit-content;
  width: 60%;
  margin-top: 6%;
    margin-bottom: 8%;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 20px; /* Space between items */
  width: 100%;


  @media screen and (max-width: 1000px) {
    margin-top: 10%;
  }
`;



const TabNav = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-left: 64px; // to align with creator name
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#541011' : 'white')};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: 2px solid ${({ active }) => (active ? '#541011' : 'transparent')};
  transition: color 0.3s, border-bottom-color 0.3s;

  &:hover {
    color: #541011;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const NoContentMessage = styled.p`
  color: #ccc;
  text-align: center;
  font-size: 1.1rem;
  padding: 40px;
`;

const Hamburger = styled.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top: 60px;
    left: 8px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }
`;


export {
  Homecontent,
  Content,
  ContentHolder,
};

