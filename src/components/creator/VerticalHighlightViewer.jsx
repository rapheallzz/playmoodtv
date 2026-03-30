import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likeContent, unlikeContent } from '../../features/authSlice';
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
  FaPlay, FaPause, FaExpand, FaFilm
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import UniversalShareModal from '../modals/UniversalShareModal';

const VerticalHighlightViewer = ({
  highlights: initialHighlights,
  startIndex,
  onClose,
  creatorName,
  profileImage,
  creatorId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useWebSocket();
  const { user } = useSelector((state) => state.auth);
  const [highlights, setHighlights] = useState(initialHighlights);
  const [isLiked, setIsLiked] = useState(false);
  const storyRefs = useRef([]);
  const videoRefs = useRef([]);
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [playerStates, setPlayerStates] = useState({});
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (user && highlights[currentIndex]) {
      const targetId = highlights[currentIndex].content?._id || highlights[currentIndex]._id;
      setIsLiked(user.like?.includes(targetId) || false);
    }
  }, [user, currentIndex, highlights]);

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
        if (highlights.some(h => (h.content?._id || h._id) === contentId)) {
          setHighlights(prev =>
            prev.map(h => {
              if ((h.content?._id || h._id) === contentId) {
                if (h.content) {
                  return { ...h, content: { ...h.content, likesCount: likes } };
                } else {
                  return { ...h, likesCount: likes };
                }
              }
              return h;
            })
          );
        }
      };

      const handleContentUnliked = ({ contentId, likes }) => {
        if (highlights.some(h => (h.content?._id || h._id) === contentId)) {
          setHighlights(prev =>
            prev.map(h => {
              if ((h.content?._id || h._id) === contentId) {
                if (h.content) {
                  return { ...h, content: { ...h.content, likesCount: likes } };
                } else {
                  return { ...h, likesCount: likes };
                }
              }
              return h;
            })
          );
        }
      };

      const handleCommentAdded = ({ contentId, comment }) => {
        const selectedId = selectedHighlightRef.current?.content?._id || selectedHighlightRef.current?._id;
        if (selectedId === contentId) {
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
        behavior: isInitialLoad ? 'auto' : 'smooth',
        block: 'center',
      });
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
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
    const isFragment = !!highlight.highlightUrl;
    const isStandalone = !highlight.content;
    let startTime = (isFragment || isStandalone) ? 0 : (highlight?.content?.shortPreview?.start ?? 0);
    let endTime = (isFragment || isStandalone) ? video.duration : (highlight?.content?.shortPreview?.end ?? video.duration);

    if (!isFragment && endTime - startTime > 60) {
      endTime = startTime + 60;
    }

    // Time update handler for looping
    const handleTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play().catch(e => {});
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
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = highlights.length - 1;
    } else if (newIndex >= highlights.length) {
      newIndex = 0;
    }

    isProgrammaticScroll.current = true;
    setCurrentIndex(newIndex);
    // Reset the flag after the scroll animation is likely to have finished.
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000); // 1 second delay
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
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleLikeClick = async (highlightId) => {
    if (!user) {
      toast.error('You must be logged in to like content.');
      return;
    }

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    const action = newIsLiked ? likeContent : unlikeContent;

    // Optimistic UI update
    setHighlights((prevHighlights) =>
      prevHighlights.map((h) => {
        if ((h.content?._id || h._id) === highlightId) {
          if (h.content) {
            return {
              ...h,
              content: {
                ...h.content,
                likesCount: newIsLiked
                  ? (h.content.likesCount || 0) + 1
                  : (h.content.likesCount || 1) - 1,
              },
            };
          } else {
            return {
              ...h,
              likesCount: newIsLiked
                ? (h.likesCount || 0) + 1
                : (h.likesCount || 1) - 1,
            };
          }
        }
        return h;
      })
    );

    try {
      await dispatch(action({ contentId: highlightId })).unwrap();
    } catch (error) {
      toast.error(`Failed to ${newIsLiked ? 'like' : 'unlike'} content. Please try again.`);
      // Revert the UI change on error
      setIsLiked(!newIsLiked);
      setHighlights((prevHighlights) =>
        prevHighlights.map((h) => {
          if ((h.content?._id || h._id) === highlightId) {
            if (h.content) {
              return {
                ...h,
                content: {
                  ...h.content,
                  likesCount: newIsLiked
                    ? (h.content.likesCount || 1) - 1
                    : (h.content.likesCount || 0) + 1,
                },
              };
            } else {
              return {
                ...h,
                likesCount: newIsLiked
                  ? (h.likesCount || 1) - 1
                  : (h.likesCount || 0) + 1,
              };
            }
          }
          return h;
        })
      );
    }
  };

  const handleCommentIconClick = async (highlight) => {
    const highlightId = highlight.content?._id || highlight._id;
    const selectedId = selectedHighlight?.content?._id || selectedHighlight?._id;

    if (isCommentSectionOpen && selectedId === highlightId) {
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
            contentId: highlightId,
            token: user.token,
          });
          setComments(response.comments || []);
          setTotalComments(response.totalComments || 0);
        } catch (error) {
          setComments([]);
          setTotalComments(0);
        } finally {
          setIsLoadingComments(false);
        }
      }
    }
  };

  const handleCommentSubmit = async (comment) => {
    const highlightId = selectedHighlight?.content?._id || selectedHighlight?._id;
    if (!user || !user.token || !highlightId) {
      toast.error('You must be logged in to comment.');
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const newComment = {
      _id: tempId,
      text: comment,
      user: {
        _id: user.userId || user._id,
        name: user.name,
        profileImage: user.profileImage,
      },
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setComments((prevComments) => [newComment, ...prevComments]);
    setTotalComments((prev) => prev + 1);

    try {
      const response = await contentService.commentOnContent({
        contentId: highlightId,
        comment,
        token: user.token,
      });

      // Replace temporary comment with the one from the server
      setComments((prevComments) =>
        prevComments.map((c) => (c._id === tempId ? response.comment : c))
      );
    } catch (error) {
      toast.error('Failed to post comment. Please try again.');
      // Revert the UI change on error
      setComments((prevComments) => prevComments.filter((c) => c._id !== tempId));
      setTotalComments((prev) => prev - 1);
    }
  };

  const handleNavigateToCreator = (cId, cName) => {
    if (!cId) return;
    const name = cName || 'creator';
    try {
      const encodedId = btoa(cId);
      const creatorSlug = `${name.replace(/\s+/g, '-')}-${encodedId}`;
      onClose();
      navigate(`/creator/${creatorSlug}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const currentVideoState = playerStates[currentIndex] || { isPlaying: false, volume: 1, isMuted: true };

  const viewerContent = (
    <VerticalScrollViewer
      ref={viewerRef}
      data-testid="vertical-highlight-viewer"
      onScroll={onScroll}
      style={{ zIndex: 10010 }} // Ensure it's above DesktopHeader (1001)
    >
      <CloseButton
        onClick={onClose}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10011 }}
      >
        <FaTimes />
      </CloseButton>
      {highlights.map((highlight, index) => (
        <HighlightStory
          key={highlight._id}
          ref={(el) => (storyRefs.current[index] = el)}
          onClick={onClose}
        >
          <VideoContainer
            data-testid={`video-container-${index}`}
            className={isCommentSectionOpen && (selectedHighlight?.content?._id || selectedHighlight?._id) === (highlight.content?._id || highlight._id) ? 'shifted' : ''}
            onClick={(e) => e.stopPropagation()}
          >
            {index === currentIndex && highlights.length > 1 && (
              <>
                <NavigationArrow className="up-arrow" onClick={(e) => { e.stopPropagation(); handleScroll(-1); }}>
                  <FaChevronUp />
                </NavigationArrow>
                <NavigationArrow className="down-arrow" onClick={(e) => { e.stopPropagation(); handleScroll(1); }}>
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

            {highlight.highlightUrl || highlight.content?.video ? (
              <Video
                ref={el => videoRefs.current[index] = el}
                src={highlight.highlightUrl || highlight.content.video}
                playsInline
                onClick={togglePlay}
                onLoadedMetadata={(e) => {
                  const video = e.target;
                  const highlight = highlights[index];
                  // Only apply startTime if we are using the full content video
                  if (!highlight.highlightUrl) {
                    const startTime = highlight?.content?.shortPreview?.start;
                    if (startTime !== undefined) {
                      video.currentTime = startTime;
                    }
                  }
                }}
              />
            ) : (
              <p>Video not available.</p>
            )}
            <HighlightOverlay />
            <BottomInfoContainer>
              <TextInfoContainer>
                {(highlight.creator || (creatorName && profileImage)) && (
                  <CreatorInfo onClick={() => {
                    const cId = highlight.content?.user?._id || highlight.content?.user || highlight.user?._id || highlight.user || creatorId;
                    const cName = highlight.creator?.name || creatorName;
                    handleNavigateToCreator(cId, cName);
                  }}>
                    <CreatorAvatar src={highlight.creator?.profileImage || profileImage} alt={highlight.creator?.name || creatorName} />
                    <CreatorName>@{highlight.creator?.name || creatorName}</CreatorName>
                  </CreatorInfo>
                )}
                <HighlightViewerTitle
                  onClick={() => handleCommentIconClick(highlight)}
                  style={{ cursor: 'pointer' }}
                >
                  {highlight.title || highlight.content?.title || ""}
                </HighlightViewerTitle>
              </TextInfoContainer>
              <ActionsContainer>
                <ViewerActionButton
                  onClick={() => handleLikeClick(highlight.content?._id || highlight._id)}
                  className={isLiked ? 'liked' : ''}
                >
                  <FaHeart />
                  <span>{highlight.content?.likesCount || highlight.likesCount || 0}</span>
                </ViewerActionButton>
                <ViewerActionButton onClick={() => handleCommentIconClick(highlight)}>
                  <FaComment />
                  <span>{highlight.content?.commentsCount || highlight.commentsCount || 0}</span>
                </ViewerActionButton>
                <ViewerActionButton onClick={() => {
                  const highlightId = highlight.content?._id || highlight._id;
                  const encodedId = btoa(highlightId);
                  const params = new URLSearchParams();
                  if (highlight.content?.thumbnail || highlight.thumbnail) params.append('img', highlight.content?.thumbnail || highlight.thumbnail);
                  const highlightVideo = highlight.highlightUrl || highlight.content?.video;
                  if (highlightVideo) params.append('video', highlightVideo);
                  const url = `${window.location.origin}/highlight/${encodedId}${params.toString() ? '?' + params.toString() : ''}`;
                  setShareUrl(url);
                  setIsShareModalOpen(true);
                }}>
                  <FaPaperPlane />
                  <span>Share</span>
                </ViewerActionButton>

                {(highlight.content?._id) && (
                  <ViewerActionButton
                    onClick={() => {
                      const slug = `${highlight.content.title.replace(/\s+/g, '-')}-${highlight.content._id}`;
                      navigate(`/movie/${slug}`);
                      onClose();
                    }}
                  >
                    <FaFilm />
                    <span>Watch Full Video</span>
                  </ViewerActionButton>
                )}
              </ActionsContainer>
            </BottomInfoContainer>
          </VideoContainer>
          {isCommentSectionOpen && (selectedHighlight?.content?._id || selectedHighlight?._id) === (highlight.content?._id || highlight._id) && (
            <div onClick={(e) => e.stopPropagation()}>
              <CommentSection
                comments={comments}
                user={user}
                onSubmit={handleCommentSubmit}
                onClose={() => setCommentSectionOpen(false)}
                isLoading={isLoadingComments}
                totalComments={totalComments}
                highlightTitle={highlight.title || highlight.content?.title}
              />
            </div>
          )}
        </HighlightStory>
      ))}
      {isShareModalOpen && (
        <UniversalShareModal
          shareUrl={shareUrl}
          title={highlights[currentIndex]?.title || highlights[currentIndex]?.content?.title}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </VerticalScrollViewer>
  );

  return createPortal(viewerContent, document.body);
};

export default VerticalHighlightViewer;
