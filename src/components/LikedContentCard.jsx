// // // LikedContentCard.js

// // import React from 'react';
// // import styled from 'styled-components';
// // import cardImage from '/16_models.png';

// // const LikedContentCard = ({ likedContent, isVisibleOnMobile }) => {
// //   if (!isVisibleOnMobile) {
// //     return null;
// //   }

// //   return (
// //     <CardContainer backgroundImage={cardImage}>

// //       <CardContain>
// //         <p>Category.teens.10 Model..</p>
// //         <LikecardButton>
// //          <LikeButton>Play</LikeButton>
// //          <LikeButton>My List</LikeButton>
// //         </LikecardButton>

// //       </CardContain>
// //       {/* <h2>Liked Content</h2>
// //       {likedContent.map((content) => (
// //         <ContentItem key={content.id}>
// //           <ContentImage src={content.thumbnail} alt={content.title} />
// //           <ContentTitle>{content.title}</ContentTitle>
// //         </ContentItem>
// //       ))} */}
// //     </CardContainer>
// //   );
// // };

// // const CardContainer = styled.div`
// //   position: relative;
// //   width: 250px;
// //   height: 400px;
// //   background-color: #fff;
// //   border-radius: 12px;
// //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// //   margin: 70px;
// //   background-image: url(${(props) => props.backgroundImage});
// //   background-size: cover;
// //   background-position: center;

// // `;

// // const ContentItem = styled.div`
// //   display: flex;
// //   align-items: center;
// //   margin: 10px 0;
// // `;

// // const ContentImage = styled.img`
// //   width: 80px;
// //   height: 120px;
// //   object-fit: cover;
// //   border-radius: 8px;
// //   margin-right: 10px;
// // `;

// // const ContentTitle = styled.p`
// //   margin: 0;
// // `;

// // const CardContain = styled.div`
// //   position: absolute;
// //   bottom: 0;
// //   width: 100%;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: flex-end;
// //   p{
// //     font-size:13px;
// //     align-self:center;
// //     font-weight:bold;
// //     color:white;
// //     &:hover{
// //       color: #541011;
// //     }
   
// //   }
// // `;

// // const LikecardButton = styled.div`
// //   display: flex;
// //   align-self:center;
// // `;

// // const LikeButton = styled.button`
// //   width: 85px;
// //   height: 35px;
// //   margin: 7px;
// //   padding: 10px;
// //   background-color: #808080;
// //   color: white;
// //   border: none;
// //   border-radius: 4px;
// //   cursor: pointer;
  
// //   &:hover {
// //     background-color: #541011;
// //   }
// // `;

// // export default LikedContentCard;



import React, {useState} from 'react';
import styled from 'styled-components';
import cardImage from '/16_models.png';
import { FaPlay, FaHeart, FaShare, FaPlus } from 'react-icons/fa';
import LinkCopied from './sliders/linkCopied';
import WelcomePopup from './Welcomepop';

const LikedContentCard = ({ likedContent, isVisibleOnMobile }) => {
  if (!isVisibleOnMobile) {
    return null;
  }
  const [showPopup, setShowPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  

  const handleShareClick = () => {
    // Show the popup when the Share button is clicked
    setShowPopup(true);
    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleLikeClick = () => {
    // Show the welcome popup when the Like button is clicked
    setShowWelcomePopup(true);
  };

  return (
    <CardContainer backgroundImage={cardImage}>
      <CardContain>
       <Loveshare>   <FaHeart onClick={handleLikeClick} />
     <FaShare  onClick={handleShareClick}/></Loveshare>
   
        <TitleText>
          Teen Interview Test
        </TitleText>
        <CategoryContainer>
          <CategoryText>
            Category
            <DotSeparator>•</DotSeparator>
            Teens
            <DotSeparator>•</DotSeparator>
            10 Model
          </CategoryText>
        </CategoryContainer>
        <ButtonContainer>
          <LikecardButton>
            <LikeButton><FaPlay /> Play Now</LikeButton>
            <LikeButton><FaPlus /> Add to Watchlist</LikeButton>
          </LikecardButton>
        </ButtonContainer>
      </CardContain>
      <LinkCopied showPopup={showPopup} onClose={() => setShowPopup(false)} /> {/* Render the LinkCopied component */}
      <WelcomePopup showPopup={showWelcomePopup} onClose={() => setShowWelcomePopup(false)} /> {/* Render the WelcomePopup component */}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: relative;
  width: 250px;
  height: 400px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 70px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
`;

const CardContain = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
`;

const TitleText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #541011;
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
  align-items: center; /* Center horizontally */
`;

const LikecardButton = styled.div`
  display: flex;
  align-self: center;
`;

const Loveshare = styled.div`
  width: 40px; 
 display: flex;
  align-self: center;
  justify-content:space-between;
 position: relative;
     top: -240px;
    right: -90px;
    z-index: 1000;
    color: #541011;
    margin: 7px;
    cursor: pointer;
    
      &:hover {
        color: white;
      }
    
  
    
`;

const LikeButton = styled.button`
  max-width: 150px; /* Set max-width for the button */
  width: 80px;
  height: auto;
  margin: 7px;
  padding: 10px;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center; /* Center text */
  word-wrap: break-word; /* Allow text to break into multiple lines */
  font-size: 12px;

  &:hover {
    background-color: #541011;
  }
`;

export default LikedContentCard;
