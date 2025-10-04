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
  VideoControlsContainer,
  PlayerControl,
  VolumeContainer,
  VolumeSlider,
} from '../../styles/CreatorPageStyles';
import {
  FaTimes, FaHeart, FaComment, FaPaperPlane, FaChevronUp, FaChevronDown,
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand
} from 'react-icons/fa';

const VerticalHighlightViewer = ({
  highlights,
  startIndex,
  onClose,
  creatorName,
  profileImage,
}) => {
  const storyRefs = useRef([]);
  const videoRefs = useRef([]);
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [playerStates, setPlayerStates] = useState({});

  // Initialize player states
  useEffect(() => {
    const initialStates = {};
    highlights.forEach((_, index) => {
      initialStates[index] = {
        isPlaying: false,
        volume: 1,
        isMuted: true,
      };
    });
    setPlayerStates(initialStates);
  }, [highlights]);

  // Effect to scroll to the current video and manage its play state
  useEffect(() => {
    if (storyRefs.current[currentIndex]) {
      storyRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    setPlayerStates(prev => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach(key => {
        newStates[parseInt(key)].isPlaying = parseInt(key) === currentIndex;
      });
      return newStates;
    });
  }, [currentIndex]);

  // Effect to sync player state with video DOM elements
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && playerStates[index]) {
        video.volume = playerStates[index].volume;
        video.muted = playerStates[index].isMuted;
        if (playerStates[index].isPlaying) {
          video.play().catch(e => console.error("Video play failed:", e));
        } else {
          video.pause();
        }
      }
    });
  }, [playerStates]);

  // Effect to manage IntersectionObserver for updating currentIndex
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const intersectingIndex = storyRefs.current.findIndex(ref => ref === entry.target);
            if (intersectingIndex !== -1 && intersectingIndex !== currentIndex) {
              setCurrentIndex(intersectingIndex);
            }
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
  }, [highlights, currentIndex]);

  const updatePlayerState = (index, newState) => {
    setPlayerStates(prev => ({
      ...prev,
      [index]: { ...(prev[index] || {}), ...newState },
    }));
  };

  const handleScroll = (direction) => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      if (newIndex >= 0 && newIndex < highlights.length) {
        return newIndex;
      }
      return prevIndex;
    });
  };

  const togglePlay = () => {
    if (playerStates[currentIndex]) {
      updatePlayerState(currentIndex, { isPlaying: !playerStates[currentIndex].isPlaying });
    }
  };

  const toggleMute = () => {
    if (playerStates[currentIndex]) {
      updatePlayerState(currentIndex, { isMuted: !playerStates[currentIndex].isMuted });
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (playerStates[currentIndex]) {
      updatePlayerState(currentIndex, { volume: newVolume, isMuted: newVolume === 0 });
    }
  };

  const toggleFullScreen = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const currentVideoState = playerStates[currentIndex] || { isPlaying: false, volume: 1, isMuted: true };

  return (
    <VerticalScrollViewer ref={viewerRef}>
      <CloseButton onClick={onClose} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10004 }}>
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
          <VideoContainer data-testid={`video-container-${index}`}>
            <VideoControlsContainer>
              <PlayerControl onClick={togglePlay}>
                {currentVideoState.isPlaying ? <FaPause /> : <FaPlay />}
              </PlayerControl>
              <VolumeContainer>
                <PlayerControl onClick={toggleMute}>
                  {currentVideoState.isMuted || currentVideoState.volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </PlayerControl>
                <VolumeSlider
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={currentVideoState.isMuted ? 0 : currentVideoState.volume}
                  onChange={handleVolumeChange}
                />
              </VolumeContainer>
              <PlayerControl onClick={toggleFullScreen}>
                <FaExpand />
              </PlayerControl>
            </VideoControlsContainer>

            {highlight.content?.video ? (
              <Video
                ref={el => videoRefs.current[index] = el}
                src={highlight.content.video}
                loop
                playsInline
                onClick={togglePlay}
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