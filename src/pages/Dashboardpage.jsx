import React, { useState, useEffect } from 'react';
import MobileBurger from "../components/headers/MobileBurger";
import DesktopHeader from '../components/headers/DesktopHeader'
import styled from "styled-components";
import logo from "/PLAYMOOD_DEF.png";
import editicon from "/edit.png";
import Modal from '../components/Modal';
import Slidertopsidebar from '../components/Slidertopsidebar';
import Sliderfriends from '../components/Sliderfriends';
import TermsModal  from '../components/Terms';
import { useNavigate } from 'react-router-dom';
import instagram from "/instagram.png";
import { useSelector, useDispatch } from 'react-redux';
import channelsimg from "../assets/channels.png";
import { AiOutlineClose } from 'react-icons/ai';
import SliderRecommended from '../components/sliders/SliderRecommend';
import SliderLiked from '../components/sliders/SlideLiked';
import UserWatchlist from '../components/sliders/UserSliderWatchlist';
import { AiOutlineHeart, AiOutlineStar, AiOutlineUser, AiOutlineEye } from 'react-icons/ai';
import useMediaQuery from '../hooks/useMediaQuery'
import { VideoModal } from '../components/ModalVU';
import axios from 'axios';
import MessageModal from '../components/MessageModal';
import {updateAuthUser} from '../features/authSlice'
import {
  FaEdit
} from 'react-icons/fa';

import DonationModal from '../components/DonationModal'
import UserFavourite from '../components/sliders/UserSliderFavourite';
import UserRecommended from '../components/sliders/UserSliderRecommended';


function Dashboardpage() {
    const [edit, show_edit] = useState(false);
    const handle_edit = () => {
        show_edit(!edit)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [billing, set_billing] = useState(false)
    const handle_billing_clicked = () => {
        set_billing(!billing)
    } 
    const [channels, set_channels] = useState(false)

    const [user, setUser] = useState(null);
    const { user: authUser } = useSelector((state) => state.auth);
    const isAdmin = authUser && authUser.role === 'admin';
    const isCreator = authUser && authUser.role === 'creator';
    const userId = authUser && authUser._id;
    const [showDonationModal, setShowDonationModal] = useState(false);
    
    
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        description: '',
        productionCredits: '',
        category: '',
        file: null,
    });

   const [message, setMessage] = useState('');
   const [showMessageModal, setShowMessageModal] = useState(false);






    const handleClose = () => {
        // Add your close logic here
        console.log("Close button clicked");
      };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVideoDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const fetchUserData = async () => {
      if (authUser && authUser.token) {
          console.log('authUser before fetch:', authUser);

          try {
              const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/profile/', {
                  headers: {
                      Authorization: `Bearer ${authUser.token}`,
                  },
              });
              const fetchedUser = response.data.user;

              if (fetchedUser) {
                  setUser(fetchedUser);
                  dispatch(updateAuthUser(fetchedUser));
                  console.log('Updated authUser:', fetchedUser);
              } else {
                  console.log('No user data found');
              }
          } catch (error) {
              console.error('Failed to fetch user data:', error);
          }
      }
  };

  useEffect(() => {
    fetchUserData();
}, [authUser, dispatch]);


const updateProfileImage = async (userId, file, token) => {
  try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.put(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/profile-image/${userId}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
          },
      });

      console.log('Profile image updated:', response.data);

      // Update the user state with the new profile image
      const updatedUser = {
          ...authUser,
          profile: response.data.profileImage,
      };

      // Update the Redux state
      dispatch(updateAuthUser(updatedUser));

      // Store the updated user data in localStorage
      localStorage.setItem('authUser', JSON.stringify(updatedUser));

      // Update the local user state
      setUser(updatedUser);

  } catch (error) {
      console.error('Error updating profile image:', error);
  }
};

  

const handleFileChange = async (e) => {
  const file = e.target.files[0];

  if (!authUser || !authUser._id) {
      console.error('User ID is undefined.');
      return;
  }

  if (file) {
      try {
          await updateProfileImage(authUser._id, file, authUser.token);
          await fetchUserData();  // Re-fetch the user data to ensure everything is up-to-date
      } catch (error) {
          console.error('Error updating profile image:', error);
      }
  }
};
    

    const handleSubmit = () => {
        // Add your logic to handle video submission
        console.log('Video details:', videoDetails);
        // Close the modal after submission
        setShowModal(false);
    };

    const [showTermsModal, setShowTermsModal] = useState(false);

    const handleApplyAsCreator = async () => {
      try {
          const response = await axios.post('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/rolechange', {
              userId,
              requestedRole: 'creator'
          });

          if (response.status === 201) {
              setMessage('Your request to become a creator has been submitted.');
          } else {
              setMessage('There was an issue submitting your request. Please try again.');
          }
      } catch (error) {
          console.error('Error applying as creator:', error);
          setMessage('There was an issue submitting your request. Please try again.');
      }

      // setShowTermsModal(true);
      setShowMessageModal(true);
  };

  const handleAcceptTerms = () => {
      setShowTermsModal(false);
  };

  

 const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [activeAction, setActiveAction] = useState('LIKES');

    const handleActionClick = (action) => {
        setActiveAction(action);
    };

// console.log(user.watch)


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
  // Add logic to handle email subscription here
  console.log('Email submitted');
  setShowDonationModal(false); // Close the modal after submission
};




  return (
    <Dashboard>
        <Mainsection>
       {isMobile ? (
        // <MobileHeader channels={channels} set_channels={set_channels} />
             
        <Hamburger onClick={() => handle_sidebar_hover()}>
        <MobileBurger channels={channels} set_channels={set_channels} />
       </Hamburger>

      ) : (
        <DesktopHeader channels={channels} set_channels={set_channels} />
      )}
       
        {channels && (
       <div className="h-[500px] w-[1000px] absolute top-[100px] left-[250px] z-[1001] overflow-hidden flex justify-center items-center rounded-2xl md:w-4/5 md:h-4/5 md:left-20 md:top-[100px]">
       <button
         className="absolute w-5 h-5 top-2.5 right-2.5 bg-red-500 border-none rounded-full text-white text-lg cursor-pointer"
         onClick={() => set_channels(false)}
       >
         <AiOutlineClose />
       </button>
       <img
         src={channelsimg}
         alt=""
         className="w-full h-full absolute object-cover top-0 left-0 z-[-1]"
       />
       <div className="h-fit w-4/5 flex justify-center items-center flex-col gap-2.5">
         <h2 className="text-white text-2xl md:text-xl" style={{ textShadow: "2px 2px red" }}>
           This feature is Coming Soon
         </h2>
         <p className="text-white text-xl md:text-sm" style={{ textShadow: "1px 1px red" }}>
           Our content creators are doing great, and we are building a special platform for them!
         </p>
         <form className="flex justify-center items-center gap-5 w-1/2 mx-auto md:flex-col">
           <input
             name="name"
             placeholder="Name"
             type="text"
             className="px-5 py-2.5 rounded-full"
           />
           <input
             name="email"
             placeholder="Email"
             type="email"
             className="px-5 py-2.5 rounded-full"
           />
           <button className="bg-red-500 px-5 py-2.5 text-white border-none rounded-full cursor-pointer">
             Subscribe
           </button>
         </form>
       </div>
     </div>
        )}


               
  <User className="w-4/5 mx-auto my-20 flex justify-between items-center">
  {!edit ? (
    <>
  <div
    className="w-36 h-36 rounded-full bg-white flex items-center justify-center font-semibold"
    onClick={() => document.getElementById('profileImage').click()}
  >

    {authUser && <img src={`${authUser.profile}?${new Date().getTime()}`} alt="Profile" className="w-32 h-32 rounded-full" />}


  </div>
  <input
    type="file"
    id="profileImage"
    className="hidden"
    onChange={(e) => handleFileChange(e)}
  />
  <h1 className='text-white'>{authUser && authUser.name}</h1>
</>

  ) : (
    
    <div className="flex  items-center text-white gap-12">
      <div className="bg-[#541011] rounded-full p-5">
      < FaEdit/>
      </div>
      <h1>{authUser && authUser.name}</h1>
    </div>
  )}

  <div className="flex flex-row justify-center align-middle gap-2">
    <h3 className=" text-white text-base">EDIT PROFILE</h3>
    <div
      className="h-15 w-12 flex items-center justify-center cursor-pointer text-white text-[20px]"
      onClick={handle_edit}
    >
       < FaEdit/>

    </div>
  </div>



       <div className="dash-btn flex">
            {isAdmin && (
                <button
                    className="bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]"
                    onClick={() => {
                        navigate('/admin');
                    }}
                >
                    Admin Page
                </button>
            )}
            {!isCreator && (
             
                    <button
                        className="bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]"
                        onClick={handleApplyAsCreator}
                    >
                        Apply as a Creator
                    </button>
                

            )}
            {isCreator && (
                  
                  <>

                 <button
                 className="bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]"
                 onClick={() => {
                  navigate('/creatorpage');
              }}
                >
                View Channel
             </button>



                <button
                    className="bg-[#541011] text-[#f3f3f3] py-2 px-8 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:bg-white hover:text-[#541011]"
                    onClick={handleAddVideo}
                >
                   Upload a Video for Review
                </button>
                </>
            )}
        </div>

  {showTermsModal && (
    <TermsModal onClose={() => setShowTermsModal(false)}>
      <h2>Terms and Agreements</h2>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia 
        voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
        qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam
      </p>
      {/* Accept button */}
    </TermsModal>
  )}
  {showVideoModal && <VideoModal onClose={handleVideoModalClose} />}
              <MessageModal 
                show={showMessageModal} 
                onClose={() => setShowMessageModal(false)} 
                message={message} 
              />
      </User>



            {
                !edit ?
            <>
                {/* <Useractions>
                    <p >LIKES </p>
                    <p>FAVORITES </p>
                    <p>RECOMMENDED </p>
                    <p>WATCHLIST</p>
                </Useractions> */}

                       <Useractions className="h-fit w-1/3 ml-36 flex justify-between gap-5 md:relative md:left-36 md:w-full md:my-1 md:ml-0 md:gap-0 md:justify-center md:text-xs ">
  <button
    className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
    onClick={() => handleActionClick('LIKES')}
  >
    <AiOutlineHeart />
    <span className="ml-1 text-xs">LIKES</span>
  </button>
  <button
    className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
    onClick={() => handleActionClick('FAVORITES')}
  >
    <AiOutlineStar />
    <span className="ml-1 text-xs">FAVORITES</span>
  </button>
  <button
    className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
    onClick={() => handleActionClick('FOR YOU')}
  >
    <AiOutlineUser />
    <span className="ml-1 text-xs">FOR_YOU</span>
  </button>
  <button
    className="flex items-center justify-center mr-2 text-[#541011] bg-[#f3f3f3] py-2 px-4 border-none rounded cursor-pointer text-base font-normal transition-colors duration-300 ease-in-out m-2 hover:text-white hover:bg-[#541011]"
    onClick={() => handleActionClick('WATCHLIST')}
  >
    <AiOutlineEye />
          <span className="ml-1 text-xs">WATCHLIST</span>
                   </button>

                   
                     </Useractions>





     <UserSlider className="w-4/5 mx-auto my-2 h-72 md:w-[90%] md:mx-auto">
  {activeAction === 'LIKES' && <SliderLiked />}
  {activeAction === 'FAVORITES' && <UserFavourite />}
  {activeAction === 'FOR YOU' && <UserRecommended />}
  {activeAction === 'WATCHLIST' && <UserWatchlist />}

                </UserSlider>

                  <UseractionsInteraction>
                  <button onClick={handleDonationClick}  className='text-white text-sm font-medium'>
                                 DONATIONS
                                 </button>
                                 <button onClick={handleDonationClick}  className='text-white text-sm font-medium'>
                                 SUBSCRIPTION
                                 </button>
                                 <button onClick={handleDonationClick}  className='text-white text-sm font-medium'>
                                 FRIENDS
                                 </button>
                                 <button onClick={handleDonationClick}  className='text-white text-sm font-medium'>
                                 FRIENDS REQUEST
                                 </button>
                                 <button onClick={handleDonationClick}  className='text-white text-sm font-medium'>
                                 BLOCK USERS
                                 </button>
                </UseractionsInteraction>

                <DonationModal 
        isOpen={showDonationModal} 
        onClose={handleDonationClose} 
        onSubmit={handleSubscriptionSubmit} 
      />


             
                <Friendsslider>
                <Sliderfriends/>
                </Friendsslider>

                <div className="w-4/5 mx-auto my-12 h-72 flex justify-between sm:w-9/10 sm:flex-col sm:ml-32 sm:items-center">
          <div className="w-1/5 h-full flex flex-col gap-2.5">
        <button className="py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500">
          Activity history
        </button>
        <button className="py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500">
          Manage cookies
        </button>
        <button className="py-1 bg-none text-white rounded-sm border border-white cursor-pointer hover:text-red-500">
          Remove cache
        </button>
      </div>
      <div className="w-3/4 h-full border border-white p-4 rounded-md">
        <div className="flex gap-5 text-white">
          <h4>History</h4>
          <button className="bg-none border border-white py-1 px-1.5 text-white rounded-sm">
            Remove history
          </button>
          
        </div>
      </div>
               </div>


            </>

            :

            <div className="w-11/20 h-fit bg-black mx-auto my-2.5 rounded-md flex flex-col p-14 relative">
             <button className="absolute top-2 left-2 text-white text-xl" onClick={handleClose}>
             &times;
            </button>
            <h2 className="text-white text-2xl font-normal">USER DATA</h2>
            <div className="w-full h-fit mt-2.5 flex justify-between">
              <div className="flex flex-col w-1/2 pr-5 gap-2.5">
                <input
                  type="text"
                  placeholder="Date of birth"
                  className="w-full py-3.5 bg-none text-white border border-white placeholder-white"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full py-3.5 bg-none text-white border border-white placeholder-white"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full py-3.5 bg-none text-white border border-white placeholder-white"
                />
              </div>
              <div className="flex flex-col w-1/2 pl-5 gap-2.5">
                <input
                  type="text"
                  placeholder="Age"
                  className="w-full py-3.5 bg-none text-white border border-white placeholder-white"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full py-3.5 bg-none text-white border border-white placeholder-white"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full py-3.5 bg-none text-white border border-white placeholder-white"
                />
              </div>
            </div>
            <button
              className="w-52 mt-5 h-12 bg-none text-white border border-white hover:text-[#541011] cursor-pointer"
              onClick={handle_billing_clicked}
            >
              BILLING INFO
            </button>
            {billing && (
              <div className="flex h-fit w-full">
                <div className="flex flex-col gap-2 mt-5 w-full">
                  <h2 className="text-white text-base">Enter your bank information</h2>
                  <p className="text-xs text-white">Why do we ask for your bank information?</p>
                  <p className="text-sm text-white">Bank: Location</p>
                  <select className="w-1/4 py-1">
                    <option value="">United States</option>
                    <option value="">United Kingdom</option>
                    <option value="">Others</option>
                  </select>
                  <div className="flex w-full h-fit justify-between items-center gap-5">
                    <div>
                      <p className="text-sm text-white">Account Holder's Name</p>
                      <input
                        type="text"
                        placeholder="Name as on bank documents"
                        className="w-1/2 py-1"
                      />
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Beneficiary Name"
                        className="w-1/2 py-1"
                      />
                      <p className="text-sm text-white">Bank: Location</p>
                      <input
                        type="text"
                        placeholder=""
                        className="w-1/2 py-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-5">
                      <h2 className="text-sm text-white">9-Digit Routing Number</h2>
                      <input
                        type="text"
                        placeholder="9 digits"
                        className="w-1/2 py-1"
                      />
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Routing (ABA)"
                        className="w-1/2 py-1"
                      />
                      <p className="text-sm text-white">Account Holder's Name</p>
                      <input
                        type="text"
                        placeholder="Name as on bank documents"
                        className="w-1/2 py-1"
                      />
                    </div>
                  </div>
                  <button className="bg-none text-white border border-white w-52 py-3.5 mt-5 hover:bg-[#541011] hover:text-white">
                    SAVE
                  </button>
                </div>
               
               
              </div>

            )}
          </div>
          
          

            }

        <Footer>
          <div>
            <img src={logo}/>            
          </div>
          <div className='instagrams'>
            <div className='instagram-official'>
              <a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==">
                <img src={instagram} />
              </a>
              <p className='instagram-links'><a href="https://instagram.com/playmoodtv?igshid=MzRlODBiNWFlZA==" target='_blank'>Official</a></p>
            </div>
            <div className='instagram-official'>
              <a href="https://www.instagram.com/playmoodlat/">
                <img src={instagram} />
              </a>
              <p className='instagram-links'><a href="https://www.instagram.com/playmoodlat/" target='_blank'>Latam</a></p>
            </div>
            <div className='instagram-official'>
              <a href="https://www.instagram.com/playmoodmx/">
                <img src={instagram} />
              </a>
              <p className='instagram-links'><a href="https://www.instagram.com/playmoodmx/" target='_blank'>MX</a></p>
            </div>
          </div>
          <div></div>
          <div className='contact-footer'>
            <h2>Contact us:</h2>
            <h3>Creators@playmoodtv.com</h3>
            <div>
              <p onClick={() =>navigate('/privacy-policy')}>Privacy Policy</p>
              <p onClick={()=>navigate('/cookies')}>Cookies Policy</p>
            </div>
            <div>
              <p>All rights reserved to PlaymoodTV 2023</p>
            </div>
          </div>
        </Footer>  

        </Mainsection>
           
           

    </Dashboard>
  )
}

export default Dashboardpage

const Dashboard = styled.div`
height: fit-content;
    width: 100%;
    display: flex;
`
const Mainsection = styled.div`
    width: 100%;
    height: 100%;
    background-color: #191818;
    display: flex;
    flex-direction: column;
    .edit-profile{
        width: 55vw;
        height: fit-content;
        background-color: grey;
        margin: 10px auto 10px auto;
        border-radius: 10px;
        display: flex;
        padding: 60px 20px 20px 40px;
        flex-direction: column;
        .billing_information_section{
            display: flex;
            height: fit-content;
            width: 100%;
            .billing_section{
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-top: 20px;
                widt: 100%;
                .billing_infos{
                    display: flex;
                    width: 100%;
                    height: fit-content;
                    justify-content: space-between;
                    align-items: center;
                    gap: 20px;
                    .billing_infos_section_one{
                        .billing_info_enter{
                            color: white;
                            font-size: 1rem;
                        }
                        .billing_info_why{
                            font-size: 0.6rem;
                            color: white;
                        }
                        .billing_info_location{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_country{
                            width: 15vw;
                            padding: 4px;
                        }
                        .billing_info_name{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_inputs{
                            width: 20vw;
                            padding: 4px;
                        }
                    }
                    .billing_section_secondsection{
                        .billing_info_enter{
                            color: white;
                            font-size: 1rem;
                        }
                        .billing_info_why{
                            font-size: 0.6rem;
                            color: white;
                        }
                        .billing_info_location{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_country{
                            width: 15vw;
                            padding: 4px;
                        }
                        .billing_info_name{
                            font-size: 0.8rem;
                            color: white;
                        }
                        .billing_info_inputs{
                            width: 20vw;
                            padding: 4px;
                        }

                    }
                }
                .billing_info_enter{
                    color: white;
                    font-size: 1rem;
                }
                .billing_info_why{
                    font-size: 0.6rem;
                    color: white;
                }
                .billing_info_location{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_country{
                    width: 15vw;
                    padding: 4px;
                }
                .billing_info_name{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_inputs{
                    width: 20vw;
                    padding: 4px;
                }
            }
            .billing_section_secondsection{
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-top: 20px;
                .billing_info_enter{
                    color: white;
                    font-size: 1rem;
                }
                .billing_info_why{
                    font-size: 0.6rem;
                    color: white;
                }
                .billing_info_location{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_country{
                    width: 15vw;
                    padding: 4px;
                }
                .billing_info_name{
                    font-size: 0.8rem;
                    color: white;
                }
                .billing_info_inputs{
                    width: 20vw;
                    padding: 4px;
                }
            }
        }
        .billing-btn{
            width: 200px;
            margin-top: 20px;
            height: 50px;
            background: none;
            color: white;
            border: 1px solid white;
            &:hover{
                color: #541011;
                cursor: pointer;
            }

        }
        .user-data{
            color: white;
            font-size: 2rem;
            font-weight: 400;
        }
        .user-info{
            width: 100%;
            height: fit-content;
            margin-top: 10px;
            display: flex; 
            justify-content: space-between;
            .user-info-first{
                display: flex;
                flex-direction: column;
                width: 50%;
                padding: 0px 20px 0px 0px;
                gap: 10px;
                input{
                    width: 100%;
                    padding: 15px;
                    background: none;
                    color: white;
                    border: 1px solid white;
                    &::placeholder{
                        color: white;
                    }
                }
            }
            .user-info-second{
                display: flex;
                flex-direction: column;
                width: 50%;
                padding: 0px 0px 0px 20px;
                gap: 10px;
                input{
                    width: 100%;
                    padding: 15px;
                    background: none;
                    color: #fff;
                    border: 1px solid white;
                    &::placeholder{
                        color: white;
                    }
                }
            }
        }
    }
`
const Hamburger = styled.div`
  display: none; /* Hide by default */
  @media (max-width: 768px) {
    display: block; /* Show only on screens with width <= 425px */
    position: relative;
    font-size: 30px;
    top:60px;
    left:8px;
    cursor: pointer;
    color: white;
    &:hover{
      color: #541011;
    }
    z-index: 1000;

    svg {
      font-size: 40px;
    }
  }

  
`;



const User = styled.div`
  width: 80%;
  margin: 100px auto 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items horizontally */
  
  .user-edits {
    display: flex;
    align-items: center;
    color: white;
    gap: 50px;
    
    .user-edits-container {
      background-color: #541011;
      border-radius: 100%;
      padding: 20px;
    }
  }

  .picture-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }

  .edit-user-dashboard {
    display: flex;
    flex-direction: row;
    gap: 10px;
    h3 {
        padding-top:20px;
      color: white;
      font-size: 1.0rem;
    }
    .edit-button-dashboard {
      height: 60px;
      width: 50px;
      background-color:;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
   
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    .user-edits {
      margin-top: 20px;
      text-align: center;
      gap: 20px;
    }

    .picture-placeholder {
      width: 100px;
      height: 100px;
      font-size: 1.2rem;
    }

    .edit-user-dashboard {
      margin-top: 20px;
      flex-direction: column;
      align-items: center;

      h3 {
        margin-bottom: 10px;
      }

      .edit-button-dashboard {
        width: 30px;
        height: 30px;
        img {
          height: 15px;
        }
      }
    }
  }



`;

const Useractions = styled.div`
  height: fit-content;
  width: 30%;
  margin-left: 150px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  p {
    color: white;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    position:relative;
    left:150px;
    // width: 60%;
    margin: 2px 0;
    margin-left: 0px;
    gap: 0px;
    justify-content: center;
    flex-direction: column;
    font-size:8px;

  }
`;

const UserSlider = styled.div`
  width: 80%;
  margin: 10px auto;
  height: 300px;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 10px auto;
  }
`;

const UseractionsInteraction = styled.div`
  height: fit-content;
  width: 50%;
  margin-left: 150px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  p {
    color: white;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 85%;
    margin: 20px auto;
    flex-direction: column;
    align-items: center;
    font-size:15px;

    p {
      margin-bottom: 10px;
    }
  }
`;

const Friendsslider = styled.div`
  width: 80%;
  margin: 50px auto 20px auto;
  height: 200px;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 50px auto;
  }
`;


const Footer = styled.div`
    height: fit-content;
    width: 100%;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 20px 60px 20px 60px;

    .contact-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;

        div {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    }

    .instagrams {
        display: flex;
        gap: 5px;

        .instagram-official {
            display: flex;
            height: fit-content;
            align-items: center;
            color: white;

            .instagram-links {
                a {
                    text-decoration: none;
                    color: white;
                }
            }

            img {
                height: 20px;
                width: 20px;
            }
        }
    }

    div {
        height: fit-content;
        display: flex;
        gap: 10px;
        color: white;

        p {
            font-size: 0.7rem;
            cursor: pointer;
        }

        img {
            height: 80px;
            width: 100%;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 600px) {
        flex-direction: column;
        padding: 10px;
    }
`;

const Popup = styled.div`
    height: 500px;
    width: 1000px;
    position: absolute;
    top: 100px;
    left: 250px;
    z-index: 1001;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

    @media screen and (max-width: 1000px) {
        width: 70%;
        height: 70%;
        left: 80px;
        top: 100px;
    }

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        z-index: -1;
    }

    div {
        height: fit-content;
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 10px;

        h2 {
            color: white;
            font-size: 2rem;
            text-shadow: 2px 2px red;

            @media screen and (max-width: 1000px) {
                font-size: 1.2rem;
            }
        }

        p {
            color: white;
            font-size: 1.2rem;
            text-shadow: 1px 1px red;

            @media screen and (max-width: 1000px) {
                font-size: 0.9rem;
            }
        }

        .form {
            display: flex;
            justify-content: center;
            align-item: center;
            gap: 20px;
            width: 50%;
            margin: 0px auto 0px auto;

            @media screen and (max-width: 1000px) {
                flex-direction: column;
            }

            .inputfield {
                padding: 10px 20px;
                border-radius: 20px;
            }

            .subscribe-button {
                background-color: red;
                padding: 10px 20px;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
            }
        }
    }
`

const CloseButton = styled.button`
  position: absolute;
  width:20px;
  height:20px;
  top: 10px;
  right: 10px;
  background: red;
  border: none;
  border-radius: 100%;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;