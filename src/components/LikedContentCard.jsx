// LikedContentCard.js

import React from 'react';
import styled from 'styled-components';
import cardImage from '/16_models.png';

const LikedContentCard = ({ likedContent, isVisibleOnMobile }) => {
  if (!isVisibleOnMobile) {
    return null;
  }

  return (
    <CardContainer backgroundImage={cardImage}>

      <CardContain>
        <p>Category.teens.10 Model..</p>
        <LikecardButton>
         <LikeButton>Play</LikeButton>
         <LikeButton>My List</LikeButton>
        </LikecardButton>

      </CardContain>
      {/* <h2>Liked Content</h2>
      {likedContent.map((content) => (
        <ContentItem key={content.id}>
          <ContentImage src={content.thumbnail} alt={content.title} />
          <ContentTitle>{content.title}</ContentTitle>
        </ContentItem>
      ))} */}
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

const ContentItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ContentImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
`;

const ContentTitle = styled.p`
  margin: 0;
`;

const CardContain = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  p{
    font-size:13px;
    align-self:center;
    font-weight:bold;
    color:white;
    &:hover{
      color: #541011;
    }
   
  }
`;

const LikecardButton = styled.div`
  display: flex;
  align-self:center;
`;

const LikeButton = styled.button`
  width: 85px;
  height: 35px;
  margin: 7px;
  padding: 10px;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #541011;
  }
`;

export default LikedContentCard;
