import React, { useState } from 'react';
import {
  HighlightsSectionContainer,
  HighlightsList,
  HighlightItem,
  HighlightCard,
  HighlightImage,
  HighlightTitle,
  SectionTitle,
  MoreButton,
} from '../../styles/CreatorPageStyles';

const HighlightsSection = ({ highlights, onSelectHighlight, viewedHighlights }) => {
  const [expanded, setExpanded] = useState({});

  if (!highlights || highlights.length === 0) {
    return null;
  }

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <HighlightsSectionContainer>
      <SectionTitle>Highlights</SectionTitle>
      <HighlightsList>
        {highlights.map((highlight, index) => (
          <HighlightItem data-testid={`highlight-item-${index}`} key={highlight._id}>
            <div onClick={() => onSelectHighlight(highlight, index)}>
              <HighlightCard viewed={viewedHighlights.has(highlight._id)}>
                {highlight.content.thumbnail && (
                  <HighlightImage src={highlight.content.thumbnail} alt="Highlight thumbnail" />
                )}
              </HighlightCard>
            </div>
            <HighlightTitle className={expanded[highlight._id] ? 'expanded' : ''}>
              {highlight.content.title}
            </HighlightTitle>
            {highlight.content.title.length > 20 && (
              <MoreButton onClick={() => toggleExpanded(highlight._id)}>
                {expanded[highlight._id] ? 'less' : 'more'}
              </MoreButton>
            )}
          </HighlightItem>
        ))}
      </HighlightsList>
    </HighlightsSectionContainer>
  );
};

export default HighlightsSection;