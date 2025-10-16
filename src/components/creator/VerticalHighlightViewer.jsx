import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  CenterPlayPauseButton,
  BottomInfoContainer,
  TextInfoContainer,
  HighlightTitle
} from '../../styles/CreatorPageStyles';
import {
  FaTimes, FaHeart, FaComment, FaPaperPlane, FaChevronUp, FaChevronDown,
  FaPlay, FaPause, FaExpand
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import HighlightShareModal from '../modals/HighlightShareModal';

const VerticalHighlightViewer = ({
  highlights,
  startIndex,
  onClose,
}) => {
  const navigate = useNavigate();
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
  const [showCenterPlayPause, setShowCenterPlayPause] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Effect to sync liked highlights with user state
  useEffect(() => {
    setLikedHighlights(new Set(user?.like || []));
  }, [user?.like]);

  // Initialize player states
  useEffect(() => {
    const initialStates = {};
    highlights.forEach((_, index) => {
      initialStates[index] = {
        isPlaying: index === startIndex, // Autoplay the first video
        volume: 1,
        isMuted: false,
      };
    });
    setPlayerStates(initialStates);
  }, [highlights, startIndex]);

  // Effect to manage video playback and scrolling
  useEffect(() => {
    // Set a flag to prevent the IntersectionObserver from firing during programmatic scroll
    isProgrammaticScroll.current = true;

    // Scroll to the current highlight
    if (storyRefs.current[currentIndex]) {
      storyRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    // Reset the flag after the scroll animation is likely to have finished.
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000); // 1-second delay

    // Manage video playback
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const playerState = playerStates[index];
        if (index === currentIndex) {
          if (playerState) {
            video.muted = playerState.isMuted;
            video.volume = playerState.volume;

            if (playerState.isPlaying) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch((e) => {
                  if (e.name === 'NotAllowedError' && !playerState.isMuted) {
                    // Autoplay with sound was prevented. Mute and try again.
                    console.warn('Autoplay with sound was blocked. Muting video.');
                    updatePlayerState(index, { isMuted: true });
                  } else if (e.name !== 'AbortError') {
                    console.error('Video play failed:', e);
                  }
                });
              }
            } else {
              video.pause();
            }
          }
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, playerStates]);

  // Effect to manage IntersectionObserver for updating currentIndex
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
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
  }, [highlights]);

  const updatePlayerState = (index, newState) => {
    setPlayerStates(prev => ({
      ...prev,
      [index]: { ...(prev[index] || {}), ...newState },
    }));
  };

  const handleScroll = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < highlights.length) {
      isProgrammaticScroll.current = true;
      setCurrentIndex(newIndex);
      // Reset the flag after the scroll animation is likely to have finished.
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000); // 1 second delay
    }
  };

  const onScroll = () => {
    // This function can be used for scroll-based logic in the future,
    // but for now, the IntersectionObserver handles manual scroll detection.
  };


  const togglePlay = () => {
    if (playerStates[currentIndex]) {
      updatePlayerState(currentIndex, { isPlaying: !playerStates[currentIndex].isPlaying });
      setShowCenterPlayPause(true);
      setTimeout(() => {
        setShowCenterPlayPause(false);
      }, 1000);
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

  const handleNavigateToCreator = (creatorId) => {
    const creator = highlights.find(h => h.content.user._id === creatorId)?.creator;
    if (creator) {
      const encodedId = btoa(creatorId);
      const creatorSlug = `${creator.name.replace(/\s+/g, '-')}-${encodedId}`;
      onClose();
      navigate(`/creator/${creatorSlug}`);
    } else {
      console.error("Could not find creator details for ID:", creatorId);
    }
  };

  const currentVideoState = playerStates[currentIndex] || { isPlaying: false, volume: 1, isMuted: true };

  return (
    <VerticalScrollViewer ref={viewerRef} data-testid="vertical-highlight-viewer" onScroll={onScroll}>
      <CloseButton
        onClick={isCommentSectionOpen ? () => setCommentSectionOpen(false) : onClose}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10004 }}
      >
        <FaTimes />
      </CloseButton>
      {highlights.map((highlight, index) => (
        <HighlightStory
          key={highlight._id}
          ref={(el) => (storyRefs.current[index] = el)}
        >
          <VideoContainer
            data-testid={`video-container-${index}`}
            className={isCommentSectionOpen && selectedHighlight?.content._id === highlight.content._id ? 'shifted' : ''}
          >
            {index === currentIndex && (
              <>
                <NavigationArrow className="up-arrow" onClick={() => handleScroll(-1)} disabled={currentIndex === 0}>
                  <FaChevronUp />
                </NavigationArrow>
                <NavigationArrow className="down-arrow" onClick={() => handleScroll(1)} disabled={currentIndex === highlights.length - 1}>
                  <FaChevronDown />
                </NavigationArrow>
              </>
            )}
            <VideoControlsContainer>
              <PlayerControl onClick={togglePlay}>
                {currentVideoState.isPlaying ? <FaPause /> : <FaPlay />}
              </PlayerControl>
              <PlayerControl onClick={toggleFullScreen}>
                <FaExpand />
              </PlayerControl>
            </VideoControlsContainer>

            {showCenterPlayPause && (
              <CenterPlayPauseButton>
                {currentVideoState.isPlaying ? <FaPause /> : <FaPlay />}
              </CenterPlayPauseButton>
            )}

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
            <BottomInfoContainer>
              <TextInfoContainer>
                {highlight.creator && (
                  <CreatorInfo onClick={() => handleNavigateToCreator(highlight.content.user._id)}>
                    <CreatorAvatar src={highlight.creator.profileImage} alt={highlight.creator.name} />
                    <CreatorName>@{highlight.creator.name}</CreatorName>
                  </CreatorInfo>
                )}
                <HighlightTitle>{highlight.content.title}</HighlightTitle>
              </TextInfoContainer>
              <ActionsContainer>
                <ViewerActionButton
                  onClick={() => handleLikeClick(highlight.content._id)}
                  className={likedHighlights.has(highlight.content._id) ? 'liked' : ''}
                >
                  <FaHeart />
                  <span>{highlight.content.likesCount || 0}</span>
                </ViewerActionButton>
                <ViewerActionButton onClick={() => handleCommentIconClick(highlight)}>
                  <FaComment />
                  <span>{highlight.content.commentsCount || 0}</span>
                </ViewerActionButton>
                <ViewerActionButton onClick={() => {
                  const encodedContentId = btoa(highlight.content._id);
                  const url = `${window.location.origin}/highlight/${encodedContentId}`;
                  setShareUrl(url);
                  setIsShareModalOpen(true);
                }}>
                  <FaPaperPlane />
                  <span>Share</span>
                </ViewerActionButton>
              </ActionsContainer>
            </BottomInfoContainer>
          </VideoContainer>
          {isShareModalOpen && (
            <HighlightShareModal
              shareUrl={shareUrl}
              onClose={() => setIsShareModalOpen(false)}
            />
          )}
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