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
  const [highlights, setHighlights] = useState([]);
  const [recentHighlights, setRecentHighlights] = useState(new Set());
  const [creators, setCreators] = useState({}); // To store creator details by ID
  const [isLoading, setIsLoading] = useState(true);
  const [viewedHighlights, setViewedHighlights] = useState(new Set());
  const [showVerticalHighlightViewer, setShowVerticalHighlightViewer] = useState(false);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);
  const [enrichedHighlights, setEnrichedHighlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all highlights, recent highlights, and creators concurrently
        const [allHighlightsResponse, recentHighlightsResponse, creatorsResponse] = await Promise.all([
          axios.get(`${BASE_API_URL}/api/highlights/all`),
          axios.get(`${BASE_API_URL}/api/highlights/recent`),
          axios.get(`${BASE_API_URL}/api/users/creators`)
        ]);

        // Set all highlights to be displayed
        setHighlights(allHighlightsResponse.data);

        // Create a set of recent highlight IDs for quick lookup
        const recentIds = new Set(recentHighlightsResponse.data.map(h => h._id));
        setRecentHighlights(recentIds);

        // Map creators by their ID for easy access
        const creatorsMap = creatorsResponse.data.reduce((acc, creator) => {
          acc[creator._id] = creator;
          return acc;
        }, {});
        setCreators(creatorsMap);

      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectHighlight = async (highlight, index) => {
    setHighlightStartIndex(index);
    if (!recentHighlights.has(highlight._id)) {
      setViewedHighlights((prev) => new Set(prev).add(highlight._id));
    }

    const enrichedData = await Promise.all(
      highlights.map(async (h) => {
        try {
          // Fetch full content details to get the creator's information
          const res = await axios.get(
            `${BASE_API_URL}/api/content/${h.content._id}`
          );
          const contentDetails = res.data;

          // The user object from content might not have profileImage, so we look it up in the creators map
          const creatorFromMap = creators[contentDetails.user._id];

          const creatorInfo = {
            name: contentDetails.user.name,
            profileImage: creatorFromMap ? creatorFromMap.profileImage : '', // Use image from map if available
          };

          // Return the highlight enriched with full content and creator details
          return {
            ...h,
            content: contentDetails, // Use the full content details
            creator: creatorInfo
          };
        } catch (e) {
          // Return a default structure on error to avoid crashing the viewer
          return {
            ...h,
            creator: { name: 'Error loading data', profileImage: '' }
          };
        }
      })
    );

    setEnrichedHighlights(enrichedData);
    setShowVerticalHighlightViewer(true);
  };

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
          highlights={highlights}
          handleSelectHighlight={handleSelectHighlight}
          recentHighlights={recentHighlights}
          viewedHighlights={viewedHighlights}
        />
      </HighlightsSectionContainer>
      {showVerticalHighlightViewer && enrichedHighlights.length > 0 && ReactDOM.createPortal(
        <VerticalHighlightViewer
          highlights={enrichedHighlights}
          startIndex={highlightStartIndex}
          onClose={() => {
            setShowVerticalHighlightViewer(false);
            setEnrichedHighlights([]);
          }}
        />,
        document.body
      )}
    </>
  );
};

export default HighlightsHome;