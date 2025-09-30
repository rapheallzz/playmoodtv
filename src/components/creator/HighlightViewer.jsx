import React, { useEffect, useRef, useState } from 'react';
import {
  HighlightViewerOverlay,
  HighlightViewerContent,
  CloseButton,
  ProgressBarContainer,
  ProgressBar,
  HighlightNavButton,
  HighlightTitleInViewer,
} from '../../styles/CreatorPageStyles';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HighlightViewer = ({ highlight, onClose, onNext, onPrevious, isFirst, isLast }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0); // Reset progress when highlight changes
    if (highlight && videoRef.current) {
      const video = videoRef.current;
      const { startTime, endTime } = highlight;

      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.pause();
          if (!isLast) {
            onNext();
          } else {
            onClose();
          }
        } else {
          const currentProgress = ((video.currentTime - startTime) / (endTime - startTime)) * 100;
          setProgress(currentProgress);
        }
      };

      video.currentTime = startTime;
      video.play().catch((error) => console.error("Video play failed:", error));
      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [highlight, onClose, onNext, isLast]);

  if (!highlight) {
    return null;
  }

  const videoUrl = highlight.content?.videoUrl;

  return (
    <HighlightViewerOverlay onClick={onClose}>
      <HighlightViewerContent onClick={(e) => e.stopPropagation()}>
        <HighlightTitleInViewer>{highlight.content.title}</HighlightTitleInViewer>
        {!isFirst && (
          <HighlightNavButton side="left" onClick={onPrevious}>
            <FaChevronLeft />
          </HighlightNavButton>
        )}
        {videoUrl ? (
          <>
            <video ref={videoRef} src={videoUrl} autoPlay />
            <ProgressBarContainer>
              <ProgressBar style={{ width: `${progress}%` }} />
            </ProgressBarContainer>
          </>
        ) : (
          <p>Video not available.</p>
        )}
        {!isLast && (
          <HighlightNavButton side="right" onClick={onNext}>
            <FaChevronRight />
          </HighlightNavButton>
        )}
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
      </HighlightViewerContent>
    </HighlightViewerOverlay>
  );
};

export default HighlightViewer;