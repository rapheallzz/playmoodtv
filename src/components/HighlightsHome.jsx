import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  HighlightsSectionContainer,
  HighlightsList,
  HighlightItem,
  LargeHighlightCircle,
  LargeHighlightTitle,
} from '../styles/CreatorPageStyles';
import VerticalHighlightViewer from './creator/VerticalHighlightViewer';
import { SkeletonHighlightsWrapper, SkeletonHighlightItem, SkeletonHighlightCircle, SkeletonText } from '../styles/SkeletonStyles';

const HighlightsHome = () => {
  const [highlights, setHighlights] = useState([]);
  const [creators, setCreators] = useState({}); // To store creator details by ID
  const [isLoading, setIsLoading] = useState(true);
  const [showVerticalHighlightViewer, setShowVerticalHighlightViewer] = useState(false);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);
  const [enrichedHighlights, setEnrichedHighlights] = useState([]);
  const [selectedCreatorInfo, setSelectedCreatorInfo] = useState({ name: '', profileImage: '' });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [highlightsResponse, creatorsResponse] = await Promise.all([
          axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/highlights/recent'),
          axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/users/creators')
        ]);

        setHighlights(highlightsResponse.data);

        const creatorsMap = creatorsResponse.data.reduce((acc, creator) => {
          acc[creator._id] = creator;
          return acc;
        }, {});
        setCreators(creatorsMap);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectHighlight = async (highlight, index) => {
    setHighlightStartIndex(index);

    const creator = creators[highlight.user];
    if (creator) {
      setSelectedCreatorInfo({
        name: creator.name,
        profileImage: creator.profileImage,
      });
    }

    const enrichedData = await Promise.all(
      highlights.map(async (h) => {
        if (h.content.video) return h;
        try {
          const res = await axios.get(
            `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${h.content._id}`
          );
          return { ...h, content: { ...h.content, video: res.data.video } };
        } catch (e) {
          console.error(`Failed to fetch content for ${h.content._id}:`, e);
          return h;
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
            <SkeletonText width="50px" />
          </SkeletonHighlightItem>
        ))}
      </SkeletonHighlightsWrapper>
    );
  }

  return (
    <>
      <HighlightsSectionContainer>
        <HighlightsList>
          {highlights.map((highlight, index) => (
            <HighlightItem data-testid={`highlight-item-home-${index}`} key={highlight._id} onClick={() => handleSelectHighlight(highlight, index)}>
              <LargeHighlightCircle>
                {highlight.content.thumbnail && <img src={highlight.content.thumbnail} alt="Highlight thumbnail" />}
              </LargeHighlightCircle>
              <LargeHighlightTitle>{highlight.content.title}</LargeHighlightTitle>
            </HighlightItem>
          ))}
        </HighlightsList>
      </HighlightsSectionContainer>
      {showVerticalHighlightViewer && enrichedHighlights.length > 0 && ReactDOM.createPortal(
        <VerticalHighlightViewer
          highlights={enrichedHighlights}
          startIndex={highlightStartIndex}
          onClose={() => {
            setShowVerticalHighlightViewer(false);
            setEnrichedHighlights([]);
          }}
          creatorName={selectedCreatorInfo.name}
          profileImage={selectedCreatorInfo.profileImage}
        />,
        document.body
      )}
    </>
  );
};

export default HighlightsHome;