import React, { useEffect, useRef } from 'react';
import {
  HighlightViewerOverlay,
  HighlightViewerContent,
  CloseButton,
} from '../../styles/CreatorPageStyles';
import { FaTimes } from 'react-icons/fa';

const HighlightViewer = ({ highlight, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (highlight && videoRef.current) {
      const video = videoRef.current;
      const { startTime, endTime } = highlight;

      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.pause();
          onClose();
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
          <video ref={videoRef} src={videoUrl} controls autoPlay />
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