import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  HighlightsSectionContainer,
  HighlightsList,
  HighlightItem,
  LargeHighlightCircle,
  LargeHighlightTitle,
} from '../styles/CreatorPageStyles';
import HighlightViewer from './creator/HighlightViewer';
import { SkeletonHighlightsWrapper, SkeletonHighlightItem, SkeletonHighlightCircle, SkeletonText } from '../styles/SkeletonStyles';

const HighlightsHome = () => {
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [viewedHighlights, setViewedHighlights] = useState(new Set());

  useEffect(() => {
    const fetchHighlights = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/highlights/all');
        setHighlights(response.data);
      } catch (error) {
        console.error('Error fetching highlights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  const handleSelectHighlight = async (highlight) => {
    try {
      const response = await axios.get(`https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${highlight.content._id}`);
      const content = response.data;

      if (content && content.video) {
        setSelectedHighlight({
          ...highlight,
          content: {
            ...highlight.content,
            video: content.video,
          },
        });
        setViewedHighlights((prev) => new Set(prev).add(highlight._id));
      } else {
        console.error('Video content for this highlight is not available.');
      }
    } catch (error) {
      console.error('Error fetching content details for highlight:', error);
    }
  };

  const handleNextHighlight = () => {
    const currentIndex = highlights.findIndex((h) => h._id === selectedHighlight._id);
    if (currentIndex < highlights.length - 1) {
      handleSelectHighlight(highlights[currentIndex + 1]);
    }
  };

  const handlePreviousHighlight = () => {
    const currentIndex = highlights.findIndex((h) => h._id === selectedHighlight._id);
    if (currentIndex > 0) {
      handleSelectHighlight(highlights[currentIndex - 1]);
    }
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
          {highlights.map((highlight) => (
            <HighlightItem key={highlight._id} onClick={() => handleSelectHighlight(highlight)}>
              <LargeHighlightCircle viewed={viewedHighlights.has(highlight._id)}>
                {highlight.content.thumbnail && <img src={highlight.content.thumbnail} alt="Highlight thumbnail" />}
              </LargeHighlightCircle>
              <LargeHighlightTitle>{highlight.content.title}</LargeHighlightTitle>
            </HighlightItem>
          ))}
        </HighlightsList>
      </HighlightsSectionContainer>
      {selectedHighlight && (
        <HighlightViewer
          highlight={selectedHighlight}
          onClose={() => setSelectedHighlight(null)}
          onNext={handleNextHighlight}
          onPrevious={handlePreviousHighlight}
          isFirst={highlights.findIndex((h) => h._id === selectedHighlight._id) === 0}
          isLast={highlights.findIndex((h) => h._id === selectedHighlight._id) === highlights.length - 1}
        />
      )}
    </>
  );
};

export default HighlightsHome;