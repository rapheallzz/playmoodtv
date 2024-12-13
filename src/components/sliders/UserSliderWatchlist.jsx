import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Slidercontent from '../Slidercont';
import { useNavigate, useParams } from 'react-router-dom';


export default function UserWatchlist() {
  const navigate = useNavigate();
  const { params } = useParams();
  const [data, setData] = useState([]);
  const user = useSelector(state => state.auth.user);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userId = '65a1b29e81e997cff7fa0bca';
        const userId = user._id;
        const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/user/watchlist/${userId}`);
        setData(response.data.watchList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // const filteredData = data.filter((content) => content.category === 'Top 10');
  
  const settings ={
    dots: false ,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  const handleSlideClick = (event, content) => {
    const clickedElement = event.target;
  
    // Check if the clicked element is a video
    if (clickedElement.tagName.toLowerCase() === 'video') {
      const cardElement = clickedElement.closest('.dashslide');
  
      if (cardElement) {
        navigate(`/movie/{_id}`, {
          state: {
            movie: content.video,
            title: content.title || '',
            desc: content.description || '',
            credits: content.credit || '',
          },
        });
      }
    }
  };

  return (
    <Slider {...settings}>
      {data.map((content, index) => (
        <div
          key={content.id}
          className="dashslide"
          onClick={(e) => handleSlideClick(e, content)}
        >
  
          <Slidercontent
            img={content.thumbnail}
            title={content.title}
             movie={content.video} 
             id={content.id} 
             desc={content.description}
            customStyle={{ }}
          />
        </div>
      ))}
    </Slider>
  );
}