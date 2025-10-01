import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const SkeletonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #2a2a2a;
  border-radius: 4px;
`;

export const SkeletonElement = styled.div`
  background-color: #2a2a2a;
  background-image: linear-gradient(to right, #2a2a2a 0%, #3a3a3a 20%, #2a2a2a 40%, #2a2a2a 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;
  animation: ${shimmer} 1.2s ease-in-out infinite;

  &.circle {
    border-radius: 50%;
  }

  &.text {
    height: 12px;
    width: 100%;
    margin-bottom: 8px;
  }

  &.title {
    height: 20px;
    width: 60%;
    margin-bottom: 12px;
  }

  &.thumbnail {
    height: 180px;
    width: 100%;
    border-radius: 8px;
  }
`;

export const SkeletonBanner = styled.div`
  width: 100%;
  height: 200px;
  background-color: #3a3a3a;
  margin-bottom: 20px;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  background-image: linear-gradient(to right, #2a2a2a 0%, #3a3a3a 20%, #2a2a2a 40%, #2a2a2a 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px;
`;

export const SkeletonHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 60px;
  gap: 20px;
`;

export const SkeletonProfileImage = styled(SkeletonElement)`
  width: 80px;
  height: 80px;
`;

export const SkeletonInfo = styled.div`
  flex-grow: 1;
`;

export const SkeletonHighlightsWrapper = styled.div`
  display: flex;
  padding: 24px 60px;
  gap: 20px;
`;

export const SkeletonHighlightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const SkeletonHighlightCircle = styled(SkeletonElement)`
  width: 64px;
  height: 64px;
`;

export const SkeletonContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 60px;
`;

export const SkeletonCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
`;

export const SkeletonText = styled(SkeletonElement)`
  height: 12px;
  width: ${(props) => props.width || '100%'};
  margin-top: 4px;
`;