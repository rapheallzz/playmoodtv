import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import {
  HighlightsSectionContainer,
} from '../styles/CreatorPageStyles';
import VerticalHighlightViewer from './creator/VerticalHighlightViewer';
import { SkeletonHighlightsWrapper, SkeletonHighlightItem, SkeletonHighlightCircle, SkeletonText } from '../styles/SkeletonStyles';
import SliderHighlights from './sliders/SliderHighlights';
import styled from 'styled-components';

const VideoCategory = styled.div`
  width: 100%;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  height: auto;
  box-sizing: border-box;
  z-index: 210;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 5px 0 10px 0;
    padding-bottom: 10px;
    z-index: 210;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: auto;
    margin: 5px 0 15px 0;
    padding-bottom: 10px;
    z-index: 210;
  }
`;

const VideoCategoryHighlights = styled(VideoCategory)`
  height: auto;
  padding-top: 0;
  padding-bottom: 0;
  margin: 5px 0;
  width: 100%;

  @media screen and (max-width: 495px) {
    height: auto;
    padding-top: 10px;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-bottom: 15px;
  }
`;

const Videocategorytitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
  padding: 5px 5px 5px 15px;

  @media only screen and (min-width: 769px) {
    font-size: 1.8rem;
    padding: 5px 5px 5px 25px;
  }
`;

const HighlightsHome = ({ title }) => {
  const [recentHighlights, setRecentHighlights] = useState([]);
  const [allHighlights, setAllHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewedHighlights, setViewedHighlights] = useState(new Set());
  const [showVerticalHighlightViewer, setShowVerticalHighlightViewer] = useState(false);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [recentResponse, allResponse] = await Promise.all([
          axios.get(`${BASE_API_URL}/api/highlights/recent`),
          axios.get(`${BASE_API_URL}/api/highlights/all`)
        ]);

        setRecentHighlights(recentResponse.data);
        setAllHighlights(allResponse.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectHighlight = (highlight, index) => {
    // When clicking a highlight in the 'Recent' slider, we need to find its index in the 'All' list
    const indexInAll = allHighlights.findIndex(h => h._id === highlight._id);
    setHighlightStartIndex(indexInAll !== -1 ? indexInAll : 0);

    // We treat all highlights in the recent slider as "recent" for the UI badge
    const recentIds = new Set(recentHighlights.map(h => h._id));
    if (!recentIds.has(highlight._id)) {
      setViewedHighlights((prev) => new Set(prev).add(highlight._id));
    }

    setShowVerticalHighlightViewer(true);
  };

  // Enriched highlights are no longer needed because the API now returns full content and user info
  const enrichedHighlights = allHighlights.map(h => ({
    ...h,
    creator: {
      name: h.user?.name || h.user?.username || 'Anonymous',
      profileImage: h.user?.profileImage || ''
    }
  }));

  if (isLoading) {
    return (
      <SkeletonHighlightsWrapper>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonHighlightItem key={i}>
            <SkeletonHighlightCircle className="circle" />
          </SkeletonHighlightItem>
        ))}
      </SkeletonHighlightsWrapper>
    );
  }

  if (recentHighlights.length === 0) {
    return null;
  }

  return (
    <VideoCategoryHighlights>
      {title && <Videocategorytitle>{title}</Videocategorytitle>}
      <HighlightsSectionContainer>
        <SliderHighlights
          highlights={recentHighlights}
          handleSelectHighlight={handleSelectHighlight}
          recentHighlights={new Set(recentHighlights.map(h => h._id))}
          viewedHighlights={viewedHighlights}
        />
      </HighlightsSectionContainer>
      {showVerticalHighlightViewer && enrichedHighlights.length > 0 && ReactDOM.createPortal(
        <VerticalHighlightViewer
          highlights={enrichedHighlights}
          startIndex={highlightStartIndex}
          onClose={() => {
            setShowVerticalHighlightViewer(false);
          }}
        />,
        document.body
      )}
    </VideoCategoryHighlights>
  );
};

export default HighlightsHome;