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
import {FaBell} from 'react-icons/fa';
import Slidertop10 from '../components/sliders/SliderTop10'
import SliderFashion from '../components/sliders/SliderFashion'
import { VideoModal } from '../components/ModalVU';
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
  FaEdit
} from 'react-icons/fa';

import DonationModal from '../components/DonationModal'
import { useSelector, useDispatch } from 'react-redux'
import EditChannelModal from '../components/EditChannelModal'



export default function CreatorPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [bannerImage, setBannerImage] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [about, setAbout] = useState('');
  const [editing, setEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const { user } = useSelector((state) => state.auth);




  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  const handleSubscribeClick = () => {
    // Toggle subscription status
    setSubscribed(!subscribed);

    // Trigger spanking effect
    setSpank(true);
    setTimeout(() => {
      setSpank(false);
    }, 1000); // Set the duration of the spanking effect
  };

  const handleLikeClick = () => {
    setShowWelcomePopup(true);
  };

  // add video modal 

const handleAddVideo = () => {
    setShowVideoModal(true);
  };
  
  const handleVideoModalClose = () => {
    setShowVideoModal(false);
  };


  const handleDonationClick = () => {
    setShowDonationModal(true);
  };

  const handleDonationClose = () => {
    setShowDonationModal(false);
  };

  const handleSubscriptionSubmit = (event) => {
    event.preventDefault();
    console.log('Email submitted');
    setShowDonationModal(false); 
  };



  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const { data } = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}`, {
         
          headers: {
            Authorization: `Bearer ${user.token}`,
        }
        }
        );
         
        setBannerImage(data.bannerImage);
        setCreatorName(data.name);
        setAbout(data.about);
      } catch (error) {
        console.error('Error fetching channel details:', error);
      }
    };

    if (user && user._id) {
      fetchChannelDetails();
    }
  }, [user]);



  const handleBannerImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}/banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });

      setBannerImage(data.bannerImage);
    } catch (error) {
      console.error('Error uploading banner image:', error);
    } 
  };



  const handleUpdateChannelInfo = async () => {
    try {
      const updates = {
        name: creatorName,
        about,
      };

      await axios.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/channel/${user._id}`, updates,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setEditing(false);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating channel info:', error);
    } 
  };




  return (
    <Homecontent>

              
<div className="w-full h-auto">
        <div className="bg-slate-400 w-full h-[200px] relative">

          <img className="w-full h-full object-cover" src={bannerImage} alt="banner" />

          {/* {user && <img src={`${user.bannerImage}?${new Date().getTime()}`} alt="banner" className="w-full h-full" />} */}

          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerImageChange}
              className="absolute top-2 right-2 bg-white p-2 rounded cursor-pointer"
            />

          )}

          <div className="flex w-full sm:w-[200px] absolute right-5 top-[80%] transform -translate-y-[50%] justify-around items-center flex-row gap-[10px] px-2">
            <FacebookShareButton quote="Check out this video on PlayMood">
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaFacebook />
              </div>
            </FacebookShareButton>

            <TwitterShareButton title="Check out this video on PlayMood">
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaTwitter />
              </div>
            </TwitterShareButton>

            <WhatsappShareButton title="Check out this video on PlayMood">
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaWhatsapp />
              </div>
            </WhatsappShareButton>

            <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
              <FaInstagram />
            </div>

            <LinkedinShareButton title="Check out this video on PlayMood">
              <div className="text-[24px] text-white cursor-pointer transition-colors duration-300 ease-in-out m-[5px] hover:text-[#541011]">
                <FaLinkedin />
              </div>
            </LinkedinShareButton>
          </div>
        </div>
      </div>


                  {/* user header and subscribe button */}

                  <div className=' w-full flex justify-between  py-6 px-10'>
                                {/* image and title */}

                                 <div className='flex gap-5'>
                                  
                                  {/* creator profile image */}

                                  <div className=' w-20 h-20 rounded-full bg-slate-400 '>
                                       
                                  {user && <img src={`${user.profile}?${new Date().getTime()}`} alt="Profile" className="w-20 h-20 rounded-full" onClick={() => { navigate('/dashboard') }}  />}

                                  </div>

                                  {/* creator title */}

                                  <div className='gap-2'> 

                                    <h2 className=' font-semibold text-white'>{user.name}</h2>
                                    <h6 className=' text-sm text-white'>53.2 subscribe</h6>

                                  </div>
                               
                              
                           </div>
                               
                               {/* subscribe  */}


                             <div className='flex  w-[20%] justify-center items-center '>

                            
                            <button className={`bg-[#541011] w-[80%] h-[40%] gap-2 text-[#f3f3f3] p-[10px]  border-none rounded-[5px] cursor-pointer text-[13px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px] `} onClick={handleAddVideo}>
                              
                              Upload a Video
                           
                            </button> 



                            <button className='bg-[#541011] w-[80%] h-[40%] gap-2 text-[#f3f3f3] p-[10px]  border-none rounded-[5px] cursor-pointer text-[13px] font-normal transition-colors duration-300 ease-in-out hover:bg-white hover:text-[#541011] flex items-center justify-center m-[5px]' onClick={() => setShowEditModal(true)} >
                              Edit Channel < FaEdit/> 
                               </button>



                            </div>

                            {showVideoModal && <VideoModal onClose={handleVideoModalClose} />}
                            {showEditModal && (
        <EditChannelModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
          creatorName={creatorName}
          setCreatorName={setCreatorName}
          about={about}
          setAbout={setAbout}
          handleBannerImageChange={handleBannerImageChange}
          handleUpdateChannelInfo={handleUpdateChannelInfo}
        />
      )}


                  </div>
                 
                     {/* Navigations links */}

                     <div className=' w-full flex justify-between  py-6 px-10'>
                                {/* image and title */}
                                 <div className='flex justify-between w-1/3'>
                                 <a className='text-white text-sm font-medium' href="" target="_blank" rel="noopener noreferrer">HOME</a>

                                 <button onClick={handleDonationClick}  className='text-white text-sm font-medium'>
                                 DONATIONS
                                 </button>

                                 <button  onClick={handleDonationClick} className='text-white text-sm font-medium'>
                                 COMMUNITY
                                 </button>

                                 <button  onClick={handleDonationClick} className='text-white text-sm font-medium'>
                                 ANALYTICS
                                 </button>
                                
                      
                                 
                                 </div>

                      </div>


                            {/* Donation Modal */}
      <DonationModal 
        isOpen={showDonationModal} 
        onClose={handleDonationClose} 
        onSubmit={handleSubscriptionSubmit} 
      />


                      {/* Creator Content*/} 

                          
                        <div className=' w-[100%] h-auto bg-[#541012]-400 px-10'>
                            
                           <h2 className='text-white font-semibold my-8'>Your Uploads</h2>
                           <SliderFashion/>



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

const ShareModalContainer = styled.div`
  display: flex;
  width: 100px;
  position:relative;
  right:-1350px;
  top:130px;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
`;

const SocialIcon = styled.div`
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
  margin: 5px;

  &:hover {
    color: #541011;
  }

  @media screen and (max-width: 768px) {
    margin: 10px;
    font-size: 14px; /* Adjust the margin for better spacing on mobile */
  }
`;


export {
  Homecontent,
  Content,
  ContentHolder,
};
