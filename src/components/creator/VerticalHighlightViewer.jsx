import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import contentService from '../../features/contentService';
import CommentSection from './CommentSection';
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
  const { user } = useSelector((state) => state.auth);
  const storyRefs = useRef([]);
  const videoRefs = useRef([]);
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [playerStates, setPlayerStates] = useState({});
  const [likedHighlights, setLikedHighlights] = useState(new Set(user?.like || []));
  const [isCommentSectionOpen, setCommentSectionOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [totalComments, setTotalComments] = useState(0);

  // Effect to sync liked highlights with user state
  useEffect(() => {
    setLikedHighlights(new Set(user?.like || []));
  }, [user?.like]);

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

  const handleLikeClick = async (highlightId) => {
    if (!user || !user.token) {
      console.error('User not authenticated');
      return;
    }

    const isLiked = likedHighlights.has(highlightId);
    const action = isLiked ? 'unlike' : 'like';

    try {
      if (isLiked) {
        await contentService.unlikeContent({ contentId: highlightId, token: user.token });
      } else {
        await contentService.likeContent({ contentId: highlightId, token: user.token });
      }
      setLikedHighlights(prev => {
        const newLiked = new Set(prev);
        if (isLiked) {
          newLiked.delete(highlightId);
        } else {
          newLiked.add(highlightId);
        }
        return newLiked;
      });
    } catch (error) {
      console.error(`Failed to ${action} highlight:`, error);
    }
  };

  const handleCommentIconClick = async (highlight) => {
    if (isCommentSectionOpen && selectedHighlight?.content._id === highlight.content._id) {
      setCommentSectionOpen(false);
      setSelectedHighlight(null);
      setComments([]);
      setTotalComments(0);
    } else {
      setCommentSectionOpen(true);
      setSelectedHighlight(highlight);
      if (user && user.token) {
        setIsLoadingComments(true);
        try {
          setComments([]); // Clear old comments while fetching new ones
          const response = await contentService.getComments({
            contentId: highlight.content._id,
            token: user.token,
          });
          setComments(response.comments || []);
          setTotalComments(response.totalComments || 0);
        } catch (error) {
          console.error('Failed to fetch comments:', error);
          setComments([]);
          setTotalComments(0);
        } finally {
          setIsLoadingComments(false);
        }
      }
    }
  };

  const handleCommentSubmit = async (comment) => {
    if (!user || !user.token || !selectedHighlight) {
      console.error('Cannot submit comment, user or highlight data is missing');
      return;
    }
    try {
      await contentService.commentOnContent({
        contentId: selectedHighlight.content._id,
        comment,
        token: user.token,
      });
      // Refresh comments after posting
      const response = await contentService.getComments({
        contentId: selectedHighlight.content._id,
        token: user.token,
      });
      setComments(response.comments || []);
      setTotalComments(response.totalComments || 0);
    } catch (error) {
      console.error('Failed to submit or refresh comments:', error);
    }
  };

  const currentVideoState = playerStates[currentIndex] || { isPlaying: false, volume: 1, isMuted: true };

  return (
    <VerticalScrollViewer ref={viewerRef} data-testid="vertical-highlight-viewer">
      <CloseButton
        onClick={isCommentSectionOpen ? () => setCommentSectionOpen(false) : onClose}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10004 }}
      >
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
          <VideoContainer
            data-testid={`video-container-${index}`}
          >
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
              <ViewerActionButton
                onClick={() => handleLikeClick(highlight.content._id)}
                className={likedHighlights.has(highlight.content._id) ? 'liked' : ''}
              >
                <FaHeart />
                <span>Like</span>
              </ViewerActionButton>
              <ViewerActionButton onClick={() => handleCommentIconClick(highlight)}>
                <FaComment />
                <span>Comment</span>
              </ViewerActionButton>
              <ViewerActionButton onClick={() => console.log('Share clicked for highlight ' + highlight._id)}>
                <FaPaperPlane />
                <span>Share</span>
              </ViewerActionButton>
            </ActionsContainer>
          </VideoContainer>
          {isCommentSectionOpen && selectedHighlight?.content._id === highlight.content._id && (
            <CommentSection
              comments={comments}
              user={user}
              onSubmit={handleCommentSubmit}
              onClose={() => setCommentSectionOpen(false)}
              isLoading={isLoadingComments}
              totalComments={totalComments}
            />
          )}
        </HighlightStory>
      ))}
    </VerticalScrollViewer>
  );
};

export default VerticalHighlightViewer;