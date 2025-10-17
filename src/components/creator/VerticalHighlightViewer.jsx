import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import contentService from '../../features/contentService';
import { useWebSocket } from '../../context/WebSocketContext';
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
  HighlightViewerTitle
} from '../../styles/CreatorPageStyles';
import {
  FaTimes, FaHeart, FaComment, FaPaperPlane, FaChevronUp, FaChevronDown,
  FaPlay, FaPause, FaExpand
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import HighlightShareModal from '../modals/HighlightShareModal';

const VerticalHighlightViewer = ({
  highlights: initialHighlights,
  startIndex,
  onClose,
}) => {
  const navigate = useNavigate();
  const socket = useWebSocket();
  const { user } = useSelector((state) => state.auth);
  const [highlights, setHighlights] = useState(initialHighlights);
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
  const selectedHighlightRef = useRef(null);

  useEffect(() => {
    selectedHighlightRef.current = selectedHighlight;
  }, [selectedHighlight]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const handleContentLiked = ({ contentId, likes }) => {
        if (highlights.some(h => h.content._id === contentId)) {
          setLikedHighlights(prev => new Set(prev).add(contentId));
          setHighlights(prev =>
            prev.map(h =>
              h.content._id === contentId ? { ...h, content: { ...h.content, likesCount: likes } } : h
            )
          );
        }
      };

      const handleContentUnliked = ({ contentId, likes }) => {
        if (highlights.some(h => h.content._id === contentId)) {
          setLikedHighlights(prev => {
            const newLiked = new Set(prev);
            newLiked.delete(contentId);
            return newLiked;
          });
          setHighlights(prev =>
            prev.map(h =>
              h.content._id === contentId ? { ...h, content: { ...h.content, likesCount: likes } } : h
            )
          );
        }
      };

      const handleCommentAdded = ({ contentId, comment }) => {
        if (selectedHighlightRef.current?.content._id === contentId) {
          setComments(prev => [...prev, comment]);
          setTotalComments(prev => prev + 1);
        }
      };

      socket.on('content_liked', handleContentLiked);
      socket.on('content_unliked', handleContentUnliked);
      socket.on('comment_added', handleCommentAdded);

      return () => {
        socket.off('content_liked', handleContentLiked);
        socket.off('content_unliked', handleContentUnliked);
        socket.off('comment_added', handleCommentAdded);
      };
    }
  }, [socket, highlights]);

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

  // Effect to scroll to the current highlight
  useEffect(() => {
    if (storyRefs.current[currentIndex]) {
      isProgrammaticScroll.current = true;
      storyRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);
    }
  }, [currentIndex]);

  // Effect to autoplay when the highlight changes
  useEffect(() => {
    setPlayerStates(prev => {
      const newStates = {};
      Object.keys(prev).forEach(key => {
        const index = parseInt(key, 10);
        newStates[index] = { ...prev[index], isPlaying: index === currentIndex };
      });
      // Ensure the current one is set to play if it's a new highlight
      if (!newStates[currentIndex]) {
        newStates[currentIndex] = { isPlaying: true, isMuted: false, volume: 1 };
      } else {
        newStates[currentIndex].isPlaying = true;
      }
      return newStates;
    });
  }, [currentIndex]);

  // Effect for video playback, snippet enforcement, and looping
  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;

    const playerState = playerStates[currentIndex];
    if (!playerState) return;

    // Snippet logic
    const highlight = highlights[currentIndex];
    let startTime = highlight?.content?.shortPreview?.start ?? 0;
    let endTime = highlight?.content?.shortPreview?.end ?? video.duration;
    if (endTime - startTime > 30) {
      endTime = startTime + 30;
    }

    // Time update handler for looping
    const handleTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play().catch(e => console.error("Loop failed", e));
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Apply state to video element
    video.muted = playerState.isMuted;
    video.volume = playerState.volume;

    const playVideo = () => {
        if (video.currentTime < startTime || video.currentTime >= endTime) {
            video.currentTime = startTime;
        }
        const promise = video.play();
        if (promise !== undefined) {
            promise.catch(e => {
                if (e.name === 'NotAllowedError' && !playerState.isMuted) {
                    updatePlayerState(currentIndex, { isMuted: true });
                } else if (e.name !== 'AbortError') {
                    console.error('Video play failed:', e);
                }
            });
        }
    };

    if (playerState.isPlaying) {
      playVideo();
    } else {
      video.pause();
    }

    // Pause all other videos
    videoRefs.current.forEach((otherVideo, index) => {
      if (otherVideo && index !== currentIndex) {
        otherVideo.pause();
      }
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [playerStates, currentIndex, highlights]);

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
                playsInline
                onClick={togglePlay}
                onLoadedMetadata={(e) => {
                  const video = e.target;
                  const highlight = highlights[index];
                  const startTime = highlight?.content?.shortPreview?.start;
                  if (startTime !== undefined) {
                    video.currentTime = startTime;
                  }
                }}
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
                <HighlightViewerTitle>{highlight.content.title}</HighlightViewerTitle>
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