import React, { useRef, useEffect, useState } from 'react';
import {
  VerticalScrollViewer,
  HighlightStory,
  VideoContainer,
  Video,
  CloseButton,
  HighlightOverlay,
  CreatorInfo,
  CreatorAvatar,
  CreatorName,
  ActionsContainer,
  ViewerActionButton,
  NavigationArrow,
} from '../../styles/CreatorPageStyles';
import { FaTimes, FaHeart, FaComment, FaPaperPlane, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const VerticalHighlightViewer = ({
  highlights,
  startIndex,
  onClose,
  creatorName,
  profileImage,
}) => {
  const storyRefs = useRef([]);
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Effect to handle scrolling when currentIndex changes
  useEffect(() => {
    if (storyRefs.current[currentIndex]) {
      storyRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  // Effect to manage IntersectionObserver for video playback and syncing index
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video');
          if (entry.isIntersecting) {
            video?.play().catch(e => console.log("Autoplay was prevented"));
            const intersectingIndex = storyRefs.current.findIndex(ref => ref === entry.target);
            if (intersectingIndex !== -1) {
              setCurrentIndex(prevIndex =>
                intersectingIndex === prevIndex ? prevIndex : intersectingIndex
              );
            }
          } else {
            video?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRefs = storyRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [highlights]);

  const handleScroll = (direction) => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      if (newIndex >= 0 && newIndex < highlights.length) {
        return newIndex;
      }
      return prevIndex;
    });
  };

  return (
    <VerticalScrollViewer ref={viewerRef}>
      <CloseButton onClick={onClose} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1001 }}>
        <FaTimes />
      </CloseButton>
      <NavigationArrow className="up-arrow" onClick={() => handleScroll(-1)} disabled={currentIndex === 0}>
        <FaChevronUp />
      </NavigationArrow>
      <NavigationArrow className="down-arrow" onClick={() => handleScroll(1)} disabled={currentIndex === highlights.length - 1}>
        <FaChevronDown />
      </NavigationArrow>
      {highlights.map((highlight, index) => (
        <HighlightStory
          key={highlight._id}
          ref={(el) => (storyRefs.current[index] = el)}
        >
          <VideoContainer>
            {highlight.content?.video ? (
              <Video
                src={highlight.content.video}
                loop
                playsInline
                muted
              />
            ) : (
              <p>Video not available.</p>
            )}
            <HighlightOverlay />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', zIndex: 10 }}>
                <CreatorInfo>
                  <CreatorAvatar src={profileImage} alt={creatorName} />
                  <CreatorName>@{creatorName}</CreatorName>
                </CreatorInfo>
                <h4 style={{ margin: '10px 0 0 0', fontWeight: 'normal' }}>{highlight.content.title}</h4>
            </div>
            <ActionsContainer>
              <ViewerActionButton onClick={() => console.log('Like clicked for highlight ' + highlight._id)}>
                <FaHeart />
                <span>Like</span>
              </ViewerActionButton>
              <ViewerActionButton onClick={() => console.log('Comment clicked for highlight ' + highlight._id)}>
                <FaComment />
                <span>Comment</span>
              </ViewerActionButton>
              <ViewerActionButton onClick={() => console.log('Share clicked for highlight ' + highlight._id)}>
                <FaPaperPlane />
                <span>Share</span>
              </ViewerActionButton>
            </ActionsContainer>
          </VideoContainer>
        </HighlightStory>
      ))}
    </VerticalScrollViewer>
  );
};

export default VerticalHighlightViewer;