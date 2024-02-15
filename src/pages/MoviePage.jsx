import React, { useState } from 'react'
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "/PLAYMOOD_DEF.png";
import settings from "/settings.png";
import search from "/search.png";
import recommended from "/recommended.png";
import newp from "/newp.png";
import snowflakes from "/snowflakes.png";
import schedule from "/schedule.png";
import favourite from "/favourite.png";
import categories from "/categories.png";
import profile from "/icon-profile.png";
import home from "/home.png";
import Sliderinterviews from '../components/sliders/SliderInterview';
import instagram from "/instagram.png";
import { FaPlay } from 'react-icons/fa';







export default function MoviePage(props) {
  const [info, set_info] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const [tab_hovered, set_tab_hovered] = useState(true);
  const handle_sidebar_hover = () => {
    set_tab_hovered(!tab_hovered)
  }
  const handle_sidebar_hoverout = () => {
    set_tab_hovered(!tab_hovered)
  }
  console.log(location)

  
  return (
    <Movie>
      <Dmovie muted playsInline loop autoPlay controls>
        <source src={location.state.movie}/>
      </Dmovie>
      <div className='movie-title'>
        <h1>{location.state.title}</h1>
      </div>
      <div className='home-page-icon'>
        <img src={logo} alt="" onClick={()=>navigate('/')} />
        <img src={profile}  onClick={()=>navigate('/dashboard')}/>
      </div>

      {/* {
        tab_hovered
        ?
        <div className='sidebar-single-movie-page' onMouseEnter={handle_sidebar_hover}>
          <img src={settings} className='settings-icon'/>
          <img src={home} className='search-icon' />
          <img src={search} className='search-icon'/>
          <img src={recommended} className='search-icon' />
          <img src={newp} className='search-icon'/>
          <img src={snowflakes} className='search-icon' />
          <img src={schedule} className='search-icon' />
          <img src={favourite} className='search-icon' />
          <img src={categories} className='search-icon' />
        </div>
        :
        <div className='sidebar-expanded-movie-page' onMouseLeave={handle_sidebar_hoverout}>
          <div className='profile-sidebar-section'>
            <p>Sign Up/Log In</p>
            <img src={settings} className='settings-icon'/>
          </div>
          <div className='search-container'>
            <img src={search} className='search-icon'/>
            <p>Search</p>
          </div>
          <div className='search-container'>
            <img src={search} className='search-icon'/>
            <p>Home</p>
          </div>
          <div className='search-container'>
            <img src={recommended} className='search-icon' />
            <p>Recommended</p>
          </div>
          <div className='search-container'>
            <img src={newp} className='search-icon' />
            <p>New on Playmood</p>
          </div>
          <div className='search-container'>
            <img src={snowflakes} className='search-icon' />
            <p>Channels</p>
          </div>
          <div className='search-container'>
            <img src={schedule} className='search-icon' />
            <p>Schedule</p>
          </div>
          <div className='search-container'>
            <img src={favourite} className='search-icon' />
            <p>Favorites</p>
          </div>
          <div className='search-container'>
            <img src={categories} className='search-icon' />
            <p>Categories</p>
          </div>
        </div>
      } */}
      <MovieDetail>



        <div><Movietitle>
          <p>Title: {location.state.title}</p>
          <p>Duration: 6min</p>
          <p> <FaPlay /> Watch From begining</p>
        </Movietitle>
        </div>



        <div>   <Menutitle>
          <p onClick={()=> set_info(false)}>Information</p>
          <p onClick={()=> set_info(true)}>Production ~ Credits</p>
          <p>Categories</p>
        </Menutitle>
        <> { info ? 
          <Moviedescription>
         
         
         
         
            <div>
              <p><b>Credits: </b>{location.state.credits}</p>
              <p>{location.state.creditss}</p>
              <p>{location.state.creditsss}</p>
            </div>
            <div>
              <p>{location.state.creditssss}</p>
              <p>{location.state.creditsssss}</p>
            </div>
            <div>
              <p>{location.state.creditssssss}</p>
              <p>{location.state.creditsssssss}</p>
              <p>{location.state.creditssssssss}</p>
            </div>
          </Moviedescription>
          :
          <MovieInformation>
            <p>
            <b>Description: </b>
              {
                location.state.desc.toString()
              }
            </p>
          </MovieInformation>
        }
        </>  </div>
      
      
        <div className='dash-btn'>  <Nextbtn>
       
                    <button className='lgt_btn'  >
                   NEXT
                  </button>
        </Nextbtn>
      </div>
      
      </MovieDetail>

         <VideoCategoryfour id="interviews">
            <Videocategorytitle>Recommended for you</Videocategorytitle>
            <Sliderinterviews/>
          </VideoCategoryfour>

          <VideoCategoryfive id="interviews">
            <Videocategorytitle>Continue Watching</Videocategorytitle>
          </VideoCategoryfive>

          
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

    </Movie>
  )
}

const Movie = styled.div`
  width: auto;
  height: auto;
  display flex;
  flex-direction: column;
  overflow: hidden;
  background: black;
`
const Dmovie = styled.video`
  width: 100%;
  height: 25%;
  object-fit: cover;
`
const MovieDetail = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 40px;
`

const Menutitle = styled.div`
  height: 50px; 
  width: 70%;
  display: flex;
  margin: 0px auto 0px auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  p{
    cursor: pointer;
    color: white;
    &:hover{
      color: red;
    }
  }
`


const Movietitle = styled.div`
  height: 50px; 
  width: 100%;
  margin: 30px;
  align-items: center;
  justify-content: center;
  gap: 50px;
  p{ 
    font-size:15px;
    padding:15px;
    cursor: pointer;
    color: white;
    &:hover{
      color: red;
    }
  }
`

const Nextbtn = styled.div`
  height: 50px; 
  width: 100%;
  margin-right: 170px;
  align-items: center;
  justify-content: center;
  gap: 50px;
  p{ 
    font-size:15px;
    padding:15px;
    cursor: pointer;
    color: white;
    &:hover{
      color: red;
    }
  }
`

const Moviedescription = styled.div`
  width: 70%;
  height: fit-content;
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center; 
  margin: 0px auto 0px auto;
`
const MovieInformation = styled.div`
  height: fit-content;
  color: white;
  width: 70%;
  display: flex;
  align-items: center;
  margin: 0px auto 0px auto;

`
const VideoCategoryfour = styled.div`
    height: 300px;
    width: 90%;
    margin: 140px 50px 50px 50px;
    display: flex;
    gap: 20px;
    flex-direction: column;

    @media screen and (max-width: 1000px) {
        margin: -100px 20px 100px 20px;
    }
`

const VideoCategoryfive = styled.div`
    height: 300px;
    width: 90%;
    margin: 190px 50px 50px 50px;
    display: flex;
    gap: 20px;
    flex-direction: column;

    @media screen and (max-width: 1000px) {
        margin: -100px 20px 100px 20px;
    }
`


const Videocategorytitle = styled.h3`
    font-size: 1.5rem;
    color: white;
    padding-bottom: 20px;
    font-weight: 600;

    @media only screen and (min-width: 300px) {
        font-size: 1.3rem;
    }

    @media only screen and (min-width: 800px) {
        font-size: 1.5rem;
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
