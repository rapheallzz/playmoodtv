import React from 'react';
import styled from 'styled-components';
import { FaEye, FaCheckCircle, FaClock, FaPlay, FaEdit, FaTrash } from 'react-icons/fa';

const CardContainer = styled.div`
  background: #111111;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  position: relative;

  @media (max-width: 768px) {
    height: 260px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
    border-color: #541011;

    .play-overlay {
      opacity: 1;
    }

  .details-link {
    opacity: 1;
    color: #541011;
  }

    img {
      transform: scale(1.05);
    }
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
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

const IconButton = styled.button`
  position: absolute;
  top: 12px;
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
  padding: 12px;
  display: flex;
  flex-direction: column;
  height: 30%;
  background: #111;
`;

const Category = styled.span`
  color: #541011;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 4px;

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Title = styled.h4`
  color: #efefef;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
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
`;

const CreatorVideoCard = ({ movie, onClick, onEdit, onDelete }) => {
  const { thumbnail, title, category, views, isApproved } = movie;

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(movie);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(movie);
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
          <IconButton onClick={handleEditClick} title="Edit Video" style={{ left: '12px' }}>
            <FaEdit size={16} />
          </IconButton>
        )}
        {onDelete && (
          <IconButton onClick={handleDeleteClick} title="Delete Video" style={{ left: '50px' }}>
            <FaTrash size={14} />
          </IconButton>
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
          <DetailsLink className="details-link">View Details</DetailsLink>
        </FooterRow>
      </CardContent>
    </CardContainer>
  );
};

export default CreatorVideoCard;
