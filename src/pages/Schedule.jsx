import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Schedule() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
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
      <div className="flex">
        <div className="w-1/5 bg-gray-500 h-full flex flex-col gap-8">
          <div className="mt-32 flex justify-center">
            <h1 className="text-3xl text-red-600">Playmood</h1>
            <p className="text-white text-2xl">TV</p>
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
        <div className="w-4/5 h-full bg-black pt-2 flex flex-col items-center">
          <div className="w-auto flex align-middle justify-center mb-10">
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
                <tr key={index} className="border-2 border-white h-20 cursor-pointer">
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
