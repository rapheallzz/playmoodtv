import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import {
  HighlightsSectionContainer,
} from '../styles/CreatorPageStyles';
import VerticalHighlightViewer from './creator/VerticalHighlightViewer';
import { SkeletonHighlightsWrapper, SkeletonHighlightItem, SkeletonHighlightCircle, SkeletonText } from '../styles/SkeletonStyles';
import SliderHighlights from './sliders/SliderHighlights';

const HighlightsHome = () => {
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

  return (
    <>
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
    </>
  );
};

export default HighlightsHome;