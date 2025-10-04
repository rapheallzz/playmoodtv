import React, { useRef, useEffect } from 'react';
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
} from '../../styles/CreatorPageStyles';
import { FaTimes, FaHeart, FaComment, FaPaperPlane } from 'react-icons/fa';

const VerticalHighlightViewer = ({
  highlights,
  startIndex,
  onClose,
  creatorName,
  profileImage,
}) => {
  const storyRefs = useRef([]);
  const observer = useRef(null);

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

  return (
    <VerticalScrollViewer>
      <CloseButton onClick={onClose} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1001 }}>
        <FaTimes />
      </CloseButton>
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