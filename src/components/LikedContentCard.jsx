import React, { useEffect, useState, useRef  } from 'react';
import styled from 'styled-components';
import cardImage from '/16_models.png';
import { FaPlay, FaHeart, FaShare, FaPlus } from 'react-icons/fa';
import LinkCopied from './sliders/linkCopied';
import WelcomePopup from './Welcomepop';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LikedContentCard = ({ likedContent, isVisibleOnMobile }) => {
  const [data, setData] = useState([]);
  const [cardContent, setCardContent] = useState('');
  const [contentIndex, setContentIndex] = useState(0);
  const navigate = useNavigate();

  

  
  useEffect(() => {
    const fetchData = async () => {
      // console.log(user)
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
        setData(response.data);

        const cardContentData = response.data.find(item => item._id === "65c78b61f7fb61666f4a93b6");
        console.log(cardContentData)

        if (cardContentData) {
          setCardContent(cardContentData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
   

  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/');
  //       setData(response.data);
  //       console.log(response.data);

  //       // Start content rotation
  //       const interval = setInterval(() => {
  //         setContentIndex(prevIndex => (prevIndex + 1) % response.data.length);
  //       }, 30000); // Rotate every 30 seconds

  //       return () => clearInterval(interval); // Cleanup on unmount
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const currentContent = data[contentIndex];
 

  if (!isVisibleOnMobile) {
    return null;
  }
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);


  const handleShareClick = () => {
    // Copy video URL to clipboard
    const videoUrl = cardContent.video; // Assuming cardContent has a property named 'video' containing the URL
    console.log(videoUrl);
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        // Show link copied message
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error copying to clipboard: ', error);
      });
  };

  const handlePlayNow = () => {
    // Navigate to the MoviePage and pass the video URL as a query parameter
    navigate(`/movie/${currentContent._id}`, {
      state: {
        movie: cardContent.video,
        title: cardContent.title || '',
        desc: cardContent.description || '',
        credits: cardContent.credit || '',
      },
    });
  };  

  const handleLikeClick = () => {
    setShowWelcomePopup(true);
  };

  

  return (
    <CenteredContainer>
      <CardContainer backgroundImage={cardContent.thumbnail}>
        <CardContain>
          <Loveshare>
            <FaHeart onClick={handleLikeClick} />
            <FaShare onClick={handleShareClick} />
          </Loveshare>
          <TitleText>{cardContent.title}</TitleText>
          <CategoryContainer>
            <CategoryText>
              Category
              <DotSeparator>•</DotSeparator>
              {cardContent.category}
              <DotSeparator>•</DotSeparator>
              {cardContent.credit}
            </CategoryText>
          </CategoryContainer>
          <ButtonContainer>
            <LikecardButton>
              <LikeButton onClick={handlePlayNow}>
                <FaPlay /> Play Now
              </LikeButton>
              <LikeButton onClick={handleLikeClick}>
                <FaPlus /> Add to Watchlist
              </LikeButton>
            </LikecardButton>
          </ButtonContainer>
        </CardContain>
      </CardContainer>
      <LinkCopied
        showPopup={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <WelcomePopup
        showPopup={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  position: relative;
  top: 10px;
  
  @media screen and (max-width: 414px) {
    height: 80vh
}
    
`;

const CardContainer = styled.div`
  position: relative;
  width: 250px;
  height: 400px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: calc(250px + 15%);
    height: calc(400px + 5%);
  }

  @media (max-width: 320px) {
    width: calc(250px - 15%);
    height: calc(400px - 5%);
  }
`;

const CardContain = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;

  color: #541011;
  background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent white */
  padding: 5px 10px; /* Adjust padding as needed */
  border-radius: 4px; /* Optional: Add border radius */
`;

const CategoryContainer = styled.div`
  margin-bottom: 12px;
`;

const CategoryText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  color: white;
`;

const DotSeparator = styled.span`
  margin: 0 6px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikecardButton = styled.div`
  display: flex;
  align-self: center;
`;

const Loveshare = styled.div`
  width: 40px;
  display: flex;
  align-self: center;
  justify-content: space-between;
  position: relative;

  color: #541011;

  cursor: pointer;

  @media (max-width: 768px) {
    top: -260px;
    right: -140px;
  }

  @media (max-width: 425px) {
    right: -120px;
  }

  @media (max-width: 320px) {
    top: -210px;
    right: -70px;
  }


`;

const LikeButton = styled.button`
  display:flex;
  align-items: center;
  max-width: 200px;
  width: auto;
  height: auto;
  margin: 7px;
  padding: 10px;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  word-wrap: break-word;
  font-size: 12px;
    &:hover {
    color: white;
  }


  &:hover {
    background-color: #541011;
  }
`;

export default LikedContentCard;
