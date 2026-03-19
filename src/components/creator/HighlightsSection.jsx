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
  HighlightDeleteButton,
} from '../../styles/CreatorPageStyles';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const HighlightsSection = ({ highlights, onSelectHighlight, viewedHighlights, onDelete }) => {
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
            <HighlightCard viewed={viewedHighlights.has(highlight._id)}>
              <div onClick={() => onSelectHighlight(highlight, index)} style={{ width: '100%', height: '100%' }}>
                {(highlight.content?.thumbnail || highlight.thumbnail) && (
                  <HighlightImage src={highlight.content?.thumbnail || highlight.thumbnail} alt="Highlight thumbnail" />
                )}
              </div>
              {onDelete && (
                <HighlightDeleteButton
                  className="highlight-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#541011',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        const deleteRes = await onDelete(highlight._id);
                        if (deleteRes.success) {
                          Swal.fire('Deleted!', 'Your highlight has been deleted.', 'success');
                        } else {
                          Swal.fire('Error!', deleteRes.error || 'Failed to delete highlight.', 'error');
                        }
                      }
                    });
                  }}
                >
                  <FaTrash />
                </HighlightDeleteButton>
              )}
            </HighlightCard>
            <HighlightTitle className={expanded[highlight._id] ? 'expanded' : ''}>
              {highlight.title || highlight.content?.title}
            </HighlightTitle>
            {(highlight.title || highlight.content?.title || "").length > 20 && (
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