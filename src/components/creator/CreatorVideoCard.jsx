import React from 'react';
import styled from 'styled-components';
import { FaEye, FaCheckCircle, FaClock } from 'react-icons/fa';

const CardContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    border-color: #541011;
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${props => props.approved ? 'rgba(22, 163, 74, 0.9)' : 'rgba(234, 179, 8, 0.9)'};
  color: white;
  backdrop-filter: blur(4px);
`;

const CardContent = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
`;

const Title = styled.h4`
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`;

const Category = styled.span`
  color: #9ca3af;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #333;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #9ca3af;
  font-size: 0.85rem;

  svg {
    font-size: 0.9rem;
  }
`;

const ActionButton = styled.div`
  color: #541011;
  font-weight: 600;
  font-size: 0.85rem;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const CreatorVideoCard = ({ movie, onClick }) => {
  const { thumbnail, title, category, views, isApproved } = movie;

  return (
    <CardContainer onClick={onClick}>
      <ThumbnailWrapper>
        <Thumbnail src={thumbnail} alt={title} />
        <StatusBadge approved={isApproved}>
          {isApproved ? (
            <><FaCheckCircle /> Approved</>
          ) : (
            <><FaClock /> Pending</>
          )}
        </StatusBadge>
      </ThumbnailWrapper>
      <CardContent>
        <Category>{category || 'Video'}</Category>
        <Title title={title}>{title}</Title>
        <StatsRow>
          <Stat>
            <FaEye />
            <span>{views || 0} views</span>
          </Stat>
          <ActionButton>Details →</ActionButton>
        </StatsRow>
      </CardContent>
    </CardContainer>
  );
};

export default CreatorVideoCard;
