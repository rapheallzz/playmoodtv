import React from 'react';
import styled from 'styled-components';
import { FaEye, FaCheckCircle, FaClock, FaPlay, FaEdit } from 'react-icons/fa';

const CardContainer = styled.div`
  background: #111111;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
    border-color: #541011;

    .play-overlay {
      opacity: 1;
    }

    img {
      transform: scale(1.05);
    }
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(84, 16, 17, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;

  svg {
    color: white;
    font-size: 2.5rem;
    filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.$approved ? 'rgba(22, 163, 74, 0.95)' : 'rgba(234, 179, 8, 0.95)'};
  color: white;
  z-index: 3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const EditButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: #541011;
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: linear-gradient(180deg, #111 0%, #0a0a0a 100%);
`;

const Category = styled.span`
  color: #541011;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 8px;
`;

const Title = styled.h4`
  color: #efefef;
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  line-height: 1.4;
  height: 2.8em; /* Force 2 lines height */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #222;
`;

const ViewCount = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #888;
  font-size: 0.8rem;

  svg {
    font-size: 0.9rem;
  }
`;

const DetailsLink = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  opacity: 0.6;
  transition: opacity 0.2s;

  ${CardContainer}:hover & {
    opacity: 1;
    color: #541011;
  }
`;

const CreatorVideoCard = ({ movie, onClick, onEdit }) => {
  const { thumbnail, title, category, views, isApproved } = movie;

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(movie);
  };

  return (
    <CardContainer onClick={onClick}>
      <ThumbnailWrapper>
        <Thumbnail src={thumbnail} alt={title} />
        <PlayOverlay className="play-overlay">
          <FaPlay />
        </PlayOverlay>
        <StatusBadge $approved={isApproved}>
          {isApproved ? (
            <><FaCheckCircle size={12} /> Approved</>
          ) : (
            <><FaClock size={12} /> Pending</>
          )}
        </StatusBadge>
        {onEdit && (
          <EditButton onClick={handleEditClick} title="Edit Video">
            <FaEdit size={16} />
          </EditButton>
        )}
      </ThumbnailWrapper>
      <CardContent>
        <Category>{category || 'Video'}</Category>
        <Title title={title}>{title}</Title>
        <FooterRow>
          <ViewCount>
            <FaEye />
            <span>{views?.toLocaleString() || 0} views</span>
          </ViewCount>
          <DetailsLink>View Details</DetailsLink>
        </FooterRow>
      </CardContent>
    </CardContainer>
  );
};

export default CreatorVideoCard;
