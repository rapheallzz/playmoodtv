import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import instagram from '/instagram.png';
import logo from '/PLAYMOOD_DEF.png';
import Slidercontent from '../components/Slidercont';
import {FaBell} from 'react-icons/fa';
import Slidertop10 from '../components/sliders/SliderTop10'
import SliderFashion from '../components/sliders/SliderFashion'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';

import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';



export default function CreatorChannel() {
  const { state } = useLocation();
  const [subscribed, setSubscribed] = useState(false);
  const [spank, setSpank] = useState(false);
  const [data, setData] = useState([]);

  const handleSubscribeClick = () => {
    setSubscribed(!subscribed);
    setSpank(true);
    setTimeout(() => {
      setSpank(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content`);
        const filteredData = response.data.filter(content => content.creatorId === state.creatorId);
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [state.creatorId]);



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
    <div className="homecontent h-screen w-full overflow-x-hidden flex flex-col items-center bg-black">
      <div className="w-full h-auto">
        <div className="bg-slate-400 w-full h-[200px] relative">
          <img className="w-full h-full object-cover" src={state.bannerImage} alt="banner" />

          <div className="flex w-full sm:w-[200px] absolute right-5 top-[80%] transform -translate-y-[50%] justify-around items-center flex-row gap-[10px] px-2">
            <FacebookShareButton quote={`Check out ${state.name} on PlayMood`}>
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaFacebook />
              </div>
            </FacebookShareButton>

            <TwitterShareButton title={`Check out ${state.name} on PlayMood`}>
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaTwitter />
              </div>
            </TwitterShareButton>

            <WhatsappShareButton title={`Check out ${state.name} on PlayMood`}>
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaWhatsapp />
              </div>
            </WhatsappShareButton>

            <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
              <FaInstagram />
            </div>

            <LinkedinShareButton title={`Check out ${state.name} on PlayMood`}>
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaLinkedin />
              </div>
            </LinkedinShareButton>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between py-6 px-10">
        <div className="flex gap-5">
          <div className="w-20 h-20 rounded-full bg-slate-400">
            <img src={state.profileImage} alt="profile" className='w-20 h-20 rounded-full' />
          </div>

          <div className="gap-2">
            <h2 className="font-semibold text-white">{state.name}</h2>
            <h6 className="text-sm text-white">{state.subscribers} subscribers</h6>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            className={`bg-[#541011] w-[70%] h-[40%] gap-2 text-[#f3f3f3] p-[10px] border-none rounded-[5px] cursor-pointer text-[10px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px] ${spank ? 'spank' : ''}`}
            onClick={handleSubscribeClick}
          >
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </button>
          <FaBell className="text-white" />
        </div>
      </div>

      <div className="w-full flex justify-between py-6 px-10">
        <div className="flex justify-between w-1/3">
          <a className="text-white text-sm font-medium" href="/" target="_blank" rel="noopener noreferrer">HOME</a>
          <a className="text-white text-sm font-medium" href="/" target="_blank" rel="noopener noreferrer">VIDEOS</a>
          <a className="text-white text-sm font-medium" href="/" target="_blank" rel="noopener noreferrer">PLAYLIST</a>
          <a className="text-white text-sm font-medium" href="/" target="_blank" rel="noopener noreferrer">COMMUNITY</a>
          <a className="text-white text-sm font-medium" href="/" target="_blank" rel="noopener noreferrer">ABOUT</a>
        </div>
      </div>

      <div className="w-[100%] h-auto bg-[#541012]-400 px-10">
        <h2 className="text-white font-semibold my-8">Contents</h2>
             
        <Content>
          {data.map((content) => (
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

      </div>

            
                              
                  {/* FOOTER  */}

       <div className="h-auto w-full bg-black flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 px-4 md:px-10 py-4 md:py-5 ">
  
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


    </div>
  );
}
               
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

               


  