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
  const observer = useRef(null);
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    // Scroll to the initial highlight
    if (storyRefs.current[startIndex]) {
      storyRefs.current[startIndex].scrollIntoView();
    }

    // Set up the Intersection Observer
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video');
          if (entry.isIntersecting) {
            video?.play().catch(e => console.log("Autoplay was prevented"));
            const intersectingIndex = storyRefs.current.findIndex(ref => ref === entry.target);
            if (intersectingIndex !== -1) {
              setCurrentIndex(intersectingIndex);
            }
          } else {
            video?.pause();
          }
        });
      },
      {
        threshold: 0.5, // 50% of the item must be visible
      }
    );

    // Observe all the stories
    storyRefs.current.forEach((ref) => {
      if (ref) observer.current.observe(ref);
    });

    // Cleanup
    return () => {
      storyRefs.current.forEach((ref) => {
        if (ref) observer.current.unobserve(ref);
      });
    };
  }, [highlights, startIndex]);

  const handleScroll = (direction) => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      if (newIndex >= 0 && newIndex < highlights.length) {
        storyRefs.current[newIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
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