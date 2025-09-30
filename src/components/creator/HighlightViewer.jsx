import React, { useEffect, useRef, useState } from 'react';
import {
  HighlightViewerOverlay,
  HighlightViewerContent,
  CloseButton,
  ProgressBarContainer,
  ProgressBar,
} from '../../styles/CreatorPageStyles';
import { FaTimes } from 'react-icons/fa';

const HighlightViewer = ({ highlight, onClose }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (highlight && videoRef.current) {
      const video = videoRef.current;
      const { startTime, endTime } = highlight;

      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.pause();
          onClose();
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
  }, [highlight, onClose]);

  if (!highlight) {
    return null;
  }

  // Ensure content and videoUrl are available
  const videoUrl = highlight.content?.videoUrl;

  return (
    <HighlightViewerOverlay onClick={onClose}>
      <HighlightViewerContent onClick={(e) => e.stopPropagation()}>
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
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
      </HighlightViewerContent>
    </HighlightViewerOverlay>
  );
};

export default HighlightViewer;