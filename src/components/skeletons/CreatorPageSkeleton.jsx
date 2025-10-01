import React from 'react';
import {
  SkeletonBanner,
  SkeletonHeaderWrapper,
  SkeletonProfileImage,
  SkeletonInfo,
  SkeletonText,
  SkeletonHighlightsWrapper,
  SkeletonHighlightItem,
  SkeletonHighlightCircle,
  SkeletonContentGrid,
  SkeletonCard,
  SkeletonElement,
} from '../../styles/SkeletonStyles';
import { Homecontent } from '../../styles/CreatorPageStyles';

const CreatorPageSkeleton = () => {
  return (
    <Homecontent>
      <SkeletonBanner />
      <SkeletonHeaderWrapper>
        <SkeletonProfileImage className="circle" />
        <SkeletonInfo>
          <SkeletonText width="40%" />
          <SkeletonText width="30%" />
        </SkeletonInfo>
      </SkeletonHeaderWrapper>
      <SkeletonHighlightsWrapper>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonHighlightItem key={i}>
            <SkeletonHighlightCircle className="circle" />
            <SkeletonText width="50px" />
          </SkeletonHighlightItem>
        ))}
      </SkeletonHighlightsWrapper>
      <SkeletonContentGrid>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i}>
            <SkeletonElement className="thumbnail" />
            <div style={{ padding: '8px' }}>
              <SkeletonText width="80%" />
              <SkeletonText width="60%" />
            </div>
          </SkeletonCard>
        ))}
      </SkeletonContentGrid>
    </Homecontent>
  );
};

export default CreatorPageSkeleton;