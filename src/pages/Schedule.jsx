import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MobileBurger from '../components/headers/MobileBurger';
import DesktopHeader from '../components/headers/DesktopHeader';
import BASE_API_URL from '../apiConfig';
import styled from "styled-components";

export default function Schedule() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
   const [channels, set_channels] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  


    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);
        setData(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTitleClick = (content) => {
    if (content._id) {
      navigate(`/movie/${content._id}`, {
        state: {
          movie: content.video,
          title: content.title || '',
          desc: content.description || '',
          credits: content.credit || '',
        },
      });
    } else {
      console.error('Content _id is missing:', content);
    }
  };

  return (
    <div className="h-full w-full bg-black">

           
{isMobile ? (
                   
                   // <MobileHeader channels={channels} set_channels={set_channels} />
                   
                   <Hamburger>
                   <MobileBurger channels={channels} set_channels={set_channels} />
                  </Hamburger>
           
           
           
                 ) : (
                   <DesktopHeader channels={channels} set_channels={set_channels} />
                 )}

      <div className="flex mt-16">
        <div className="w-1/5 bg-gray-500 h-full flex flex-col gap-8">
          <div className="mt-32 flex justify-center">
            <h1 className=" md:text-3xl  text-red-600">Playmood</h1>
            <p className="text-white md:text-2xl">TV</p>
          </div>
          <div className="flex flex-col items-center">
            <Link to="/" className=" text-white text-sm font-medium w-full">
              <div className="py-5 cursor-pointer flex justify-center hover:bg-white hover:text-red-600">
                HOME
              </div>
            </Link>
                
            <Link to="#" className="text-white text-sm font-medium w-full">
              <div className="py-5 cursor-pointer flex justify-center hover:bg-white hover:text-red-600">
                TV Guide
              </div>
            </Link>
          </div>
        </div>
        <div className="w-4/5 h-full bg-black pt-2 flex flex-col items-center my-10">
          <div className="w-auto flex align-middle justify-center my-4">
            <h1 className="text-red-800 font-bold text-2xl">SCHEDULES</h1>
          </div>
          <table className="w-full border-2 border-white text-white">
            <thead className="border-2 border-white h-36">
              <tr>
                <th className="border-2 border-white">Early</th>
                <th className="border-2 border-white">Late</th>
                <th className="border-2 border-white">Medium</th>
                <th className="border-2 border-white">Hard</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 6).map((content, index) => (
                <tr key={index} className="border-2 border-white h-20 cursor-pointer text-center">
                  <td onClick={() => handleTitleClick(content)} className="border-2 border-white">{content.title}</td>
                  <td className="border-2 border-white"></td>
                  <td className="border-2 border-white"></td>
                  <td className="border-2 border-white"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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
