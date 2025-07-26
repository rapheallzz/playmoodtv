import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import instagram from '/instagram.png';
import logo from '/PLAYMOOD_DEF.png';
import Slidercontent from '../components/Slidercont';

export default function Spaces() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [data, setData] = useState([]);

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
    const fetchData = async () => {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((content) => content.category === 'Top 10');

  const handleSlideClick = (content) => {
    navigate(`/newplaymood`, {
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


            <div className='flex '>
                   
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
         <h3 className='pl-16 pb-2 text-white text-[1.5rem] font-bold'>SPACES</h3>  
        
        
         <Content>
             
         

         {filteredData.map((content, index) => (
        <div
          key={content.id}
          className="slidescircle"
          onClick={(e) => handleSlideClick(e, content)}
        >
          <img src={content.thumbnail} alt={`Thumbnail ${index}`} />
        </div>
      ))}
           </Content>


          </div>  
              </div> 


                  {/* FOOTER  */}

           <div className="h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 fixed bottom-0 ">
  
        <div className='flex flex-column'>
        <div className="flex-shrink-0">
    <img className="md:h-20 md:w-auto h-10 w-28 cursor-pointer" src={logo} alt="Logo" />
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
        <div className="flex items-center text-white gap-2">
      <a className="no-underline text-white" href="https://www.instagram.com/playmoodindia/" target="_blank" rel="noopener noreferrer">
        <img className="h-7 w-7" src={instagram} alt="Instagram" />
      </a>
      <p><a className="no-underline text-white" href="https://www.instagram.com/playmoodindia/" target="_blank" rel="noopener noreferrer">IN</a></p>
    </div>
        <div className="flex items-center text-white gap-2">
      <a className="no-underline text-white" href="https://www.instagram.com/playmoodargentina/" target="_blank" rel="noopener noreferrer">
        <img className="h-7 w-7" src={instagram} alt="Instagram" />
      </a>
      <p><a className="no-underline text-white" href="https://www.instagram.com/playmoodargentina/" target="_blank" rel="noopener noreferrer">AR</a></p>
    </div>
        <div className="flex items-center text-white gap-2">
      <a className="no-underline text-white" href="https://www.instagram.com/playmoodcolombia/" target="_blank" rel="noopener noreferrer">
        <img className="h-7 w-7" src={instagram} alt="Instagram" />
      </a>
      <p><a className="no-underline text-white" href="https://www.instagram.com/playmoodcolombia/" target="_blank" rel="noopener noreferrer">COL</a></p>
    </div>
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
