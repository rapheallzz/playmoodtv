import React, { useState, useEffect } from 'react';
import MobileHeader from '../components/headers/MobileHeader'
import DesktopHeader from '../components/headers/DesktopHeader'
import styled from "styled-components";
import logo from "/PLAYMOOD_DEF.png";
import profile from "/icon-profile.png";
import editicon from "/edit.png";
import Modal from '../components/Modal';
import Slidertopsidebar from '../components/Slidertopsidebar';
import Sliderfriends from '../components/Sliderfriends';
import TermsModal  from '../components/Terms';
import { useNavigate } from 'react-router-dom';
import settings from "/settings.png";
import search from "/search.png";
import recommended from "/recommended.png";
import newp from "/newp.png";
import snowflakes from "/snowflakes.png";
import schedule from "/schedule.png";
import favourite from "/favourite.png";
import categories from "/categories.png";
import home from "/home.png";
import instagram from "/instagram.png";
import { useSelector } from 'react-redux';
import channelsimg from "../assets/channels.png";
import { AiOutlineClose } from 'react-icons/ai';



function Dashboardpage() {
    const [edit, show_edit] = useState(false);
    const handle_edit = () => {
        show_edit(!edit)
    }
    const navigate = useNavigate()
    const [billing, set_billing] = useState(false)
    const handle_billing_clicked = () => {
        set_billing(!billing)
    } 
    const [channels, set_channels] = useState(false)

    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user.role === 'admin';


    const [showModal, setShowModal] = useState(false);
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        description: '',
        productionCredits: '',
        category: '',
        file: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVideoDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        // Check if a file was selected
        if (file) {
            // Create a FormData object to send the file to the server
            const formData = new FormData();
            formData.append('file', file);
    
            // Use the fetch API or any other method to send the file to the server
            fetch(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/${user._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.token}`, // Add your authentication token if required
                },
                body: formData,
                credentials: 'include',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Profile image updated successfully:', data);
                    // You can update the user state or perform any other necessary actions
                })
                .catch((error) => {
                    console.error('Error updating profile image:', error);
                });
        }
    };
    

    const handleSubmit = () => {
        // Add your logic to handle video submission
        console.log('Video details:', videoDetails);
        // Close the modal after submission
        setShowModal(false);
    };

    const [showTermsModal, setShowTermsModal] = useState(false);

    const handleApplyAsCreator = () => {
      setShowTermsModal(true);
    };
  
    const handleAcceptTerms = () => {
      // Add logic for handling the acceptance of terms and agreements
      // You can implement an API call or any other necessary action here
      // For now, just close the modal
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


  return (
    <Dashboard>
        <Mainsection>
       {isMobile ? (
        <MobileHeader channels={channels} set_channels={set_channels} />
      ) : (
        <DesktopHeader channels={channels} set_channels={set_channels} />
      )}
       
        {channels && (
          <Popup>
            <CloseButton onClick={() => set_channels(false)}>
              <AiOutlineClose />
            </CloseButton>
            <img src={channelsimg} alt="" />
            <div>
            <h2>This feature is Coming Soon</h2>
            <p>Our content creators are doing great, and we are building a special platform for them! </p>
            <form className='form'>
                <input name='name' placeholder='name' type='text' className='inputfield' />
                <input name='email' placeholder='Email' type='email' className='inputfield' />
                <button className='subscribe-button'>Subscribe</button>
            </form>
            </div>
          </Popup>
        )}

            <User>
                { !edit ?
                
                <>
                 <div className='picture-placeholder' onClick={() => document.getElementById('profileImage').click()}>
                  {user && <img src={user.profileImage} alt="Profile" />}
                  </div>

                    <input
                  type="file"
                     id="profileImage"
                     style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e)}
                     />
                </>
                 
                 
               
                : 
                <div className='user-edits'>
                    <div className='user-edits-container'>
                        <img src={editicon}/>
                    </div>
                    <h1>{user && user.name}</h1>
                </div>
                }
                <div className='edit-user-dashboard'>
                    <h3>EDIT PROFILE</h3>
                    <div className='edit-button-dashboard' onClick={handle_edit}>
                        <img src={editicon} />
                    </div>
                </div>
                <div className='dash-btn'>
                {isAdmin && (
                     <button className='lgt_btn' onClick={() => { navigate('/admin') }}>
                      Admin Page
                        </button>
                            )}
                  <button className='lgt_btn' onClick={handleApplyAsCreator}>
                    Apply as a Creator
                  </button>
                </div>
                     
                {showTermsModal && (
                 <TermsModal onClose={() => setShowTermsModal(false)}>
                 <h2>Terms and Agreements</h2>
                 <p>Sed ut perspiciatis unde omnis iste natus error sit 
                    voluptatem accusantium doloremque laudantium, totam rem aperiam,
                     eaque ipsa quae ab illo inventore veritatis et quasi architecto
                      beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia 
                      voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni 
                      dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, 
                      qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                       non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                        voluptatem. Ut enim ad minima veniam</p>
                {/* Accept button */}
                </TermsModal>
                 )}
                     
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                   
                    <h2>Submit Video</h2>
                    <form>
                        <label>Title</label>
                        <input
                            type='text'
                            name='title'
                            value={videoDetails.title}
                            onChange={handleInputChange}
                        />

                        <label>Video Description</label>
                        <textarea
                            name='description'
                            value={videoDetails.description}
                            onChange={handleInputChange}
                        />

                        <label>Production Credits</label>
                        <input
                            type='text'
                            name='productionCredits'
                            value={videoDetails.productionCredits}
                            onChange={handleInputChange}
                        />

                        <label>Category</label>
                        <select
                            name='category'
                            value={videoDetails.category}
                            onChange={handleInputChange}
                        >
                            <option value='Top 10'>Category 1</option>
                            <option value='Fashion Show'>Category 1</option>
                            <option value='Teens'>Category 1</option>
                            <option value='Documentaries'>Category 1</option>
                            <option value='Interviews'>Category 1</option>
                            <option value='Social'>Category 1</option>
                            <option value='Behind the camera'>Category 1</option>
                            <option value='Soon in Playmood'>Category 1</option>
                            <option value='Daries'>Category 1</option>
                        </select>

                        <label>Upload Video</label>
                        <input
                            type='file'
                            accept='video/*'
                            onChange={handleFileChange}
                        />

                        <button type='button' onClick={handleSubmit}>
                            Upload
                        </button>
                    </form>
                </Modal>
            )}

            </User>
            {
                !edit ?
            <>
                <Useractions>
                    <p>LIKES </p>
                    <p>FAVORITES </p>
                    <p>RECOMMENDED </p>
                    <p>WATCHLIST</p>
                </Useractions>
                <UserSlider>
                    <Slidertopsidebar/>
                </UserSlider>
                <UseractionsInteraction>
                    <p>DONATIONS</p>
                    <p>SUBSCRIPTION</p>
                    <p>FRIENDS</p>
                    <p>FRIENDS REQUEST</p>
                    <p>BLOCK USERS</p>
                </UseractionsInteraction>
                <Friendsslider>
                <Sliderfriends/>
                </Friendsslider>
                <UserActivities>
                    <ActivityType>
                        <button className='activity'>Activity history</button>
                        <button className='activity'>Manage cookies</button>
                        <button className='activity'>Remove cache</button>
                    </ActivityType>
                    <ActivityShow>
                        <div className='title-history'>
                            <h4>History</h4>
                            <button className='remove-history'>Remove history</button>
                        </div>
                    </ActivityShow>
                </UserActivities>
            </>
            :
            <div className='edit-profile'>
                <h2 className='user-data'>USER DATA</h2>
                <div className='user-info'>
                    <div className='user-info-first'>
                        <input type='text' placeholder='Date of birth' />
                        <input type="text" placeholder='City' />
                        <input type="text" placeholder='Email' />
                    </div>
                    <div className='user-info-second'>
                        <input type='text' placeholder='Age' />
                        <input type="text" placeholder='Address' />
                        <input type="text" placeholder='Phone' />
                    </div>
                </div>
                <button className='billing-btn' onClick={handle_billing_clicked}>
                    BILLING INFO
                </button>
                {
                    billing && 
                    <div className='billing_information_section'>
                        <div className='billing_section'>
                            <h2 className='billing_info_enter'>Enter your bank information</h2>
                            <p className='billing_info_why'>Why do we ask for your bank information? </p>
                            <p className='billing_info_location'>Bank: Location</p>
                            <select className='billing_info_country'>
                                <option value="">United States</option>
                                <option value="">United Kingdom</option>
                                <option value="">Others</option>
                            </select>
                            <div className='billing_infos'>
                                <div className='billing_infos_section_one'>
                                    <p className='billing_info_name'>Account Holder's Name</p>
                                    <input type="text" placeholder='Name as on bank documents' className='billing_info_inputs' />
                                    <input type="text" name="" id="" placeholder='Beneficiary Name' className='billing_info_inputs' />
                                    <p className='billing_info_location'>Bank:Location</p>
                                    <input type="text" placeholder='' className='billing_info_inputs'/>
                                </div>
                                <div className='billing_section_secondsection'>
                                    <h2 className='billing_info_name'>9-Digit Routing Number</h2>
                                    <input type="text" placeholder='9 digits' className='billing_info_inputs' />
                                    <input type="text" name="" id="" placeholder='Routing (ABA)' className='billing_info_inputs' />
                                    <p className='billing_info_name'>Account Holder's Name</p>
                                    <input type="text" placeholder='Name as on bank documents' className='billing_info_inputs' />
                                </div>
                                <div></div>
                            </div>                            
                        </div>                        
                    </div>
                }
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
              <p className='instagram-links'><a href="https://www.instagram.com/playmoodlat/" target='_blank'>Latem</a></p>
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
    width: 80%;
    margin: 20px auto;
    flex-direction: column;
    align-items: center;
    font-size:15px;


    p {
      margin-bottom: 10px;
    }
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

const UserActivities = styled.div`
  width: 80%;
  margin: 50px auto 20px auto;
  height: 300px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 50px auto;
    flex-direction: column;
    align-items: center;
  }
`;

const ActivityType = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .activity{
        padding: 5px 5px 5px 5px;
        background: none;
        color: white;
        border-radius: 2px;
        border: 1px solid white;
        cursor: pointer;
        &:hover{
            color:  red;
        }
    }
`
const ActivityShow = styled.div`
    width: 75%;
    height: 100%;
    border: 1px solid white;
    padding: 15px;
    border-radius: 5px;
    .title-history{
        display: flex;
        gap: 20px;
        color: white;
        button{
            background: none;
            border: 1px solid white;
            padding: 4px 6px 4px 6px;
            color: white;
            border-radius: 2px;
        }
    }

`

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
        gap: 10px;

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
                height: 40px;
                width: 40px;
            }
        }
    }

    div {
        height: fit-content;
        display: flex;
        gap: 20px;
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
    }
`
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