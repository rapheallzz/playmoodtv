import React from 'react';
import {
  HighlightsSectionContainer,
  HighlightsList,
  HighlightItem,
  HighlightCircle,
  HighlightTitle,
  SectionTitle,
} from '../../styles/CreatorPageStyles';

const HighlightsSection = ({ highlights, onSelectHighlight, viewedHighlights }) => {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <HighlightsSectionContainer>
      <SectionTitle>Highlights</SectionTitle>
      <HighlightsList>
        {highlights.map((highlight, index) => (
          <HighlightItem data-testid={`highlight-item-${index}`} key={highlight._id} onClick={() => onSelectHighlight(highlight, index)}>
            <HighlightCircle viewed={viewedHighlights.has(highlight._id)}>
              {highlight.content.thumbnail && <img src={highlight.content.thumbnail} alt="Highlight thumbnail" />}
            </HighlightCircle>
            <HighlightTitle>{highlight.content.title}</HighlightTitle>
          </HighlightItem>
        ))}
      </HighlightsList>
    </HighlightsSectionContainer>
  );
};

export default HighlightsSection;