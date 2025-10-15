// CreatorContentModal.js
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck } from 'react-icons/fa';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import styled from 'styled-components';

const CreatorContentModal = ({ isOpen, creator, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [copyModal, setCopyModal] = useState({ show: false, message: '', isError: false });
  const videoRef = useRef(null);

  // Fetch recent content for the creator
  useEffect(() => {
    if (!isOpen || !creator?._id) return;

    const fetchRecentContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${creator._id}/recent`
        );
        if (response.data.content) {
          setContent(response.data.content);
        } else if (response.data.message === 'No approved content found for this creator') {
          // Navigate to creator's channel if no content is found
          handleNavigateToCreator();
        } else {
          setError('Unexpected data format.');
        }
      } catch (err) {
        console.error('Error fetching recent content:', err);
        setError('Failed to load recent content.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentContent();
  }, [isOpen, creator]);


  // Handle comment submission
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || !user.token) {
      setShowWelcomePopup(true);
      return;
    }
    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }
    if (!content?._id || typeof content._id !== 'string' || content._id.trim() === '') {
      setCommentError('Invalid content ID. Please try again.');
      return;
    }

    try {
      const response = await axios.post(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${content._id}/comment`,
        { contentId: content._id, text: commentText },
        { headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' } }
      );
      setContent({
        ...content,
        comments: [...(content.comments || []), response.data.comment],
      });
      setCommentText('');
      setCommentError('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add comment. Please try again.';
      setCommentError(errorMessage);
    }
  };

  const handleNavigateToCreator = () => {
    onClose();
    const creatorSlug = `${creator.name.replace(/\s+/g, '-')}-${creator._id}`;
    navigate(`/creator/${creatorSlug}`);
  };

  const handleNavigateToMovie = () => {
    const slug = createSlug(content.title, content._id);
    onClose();
    navigate(`/movie/${slug}`);
  };

  const createSlug = (title, _id) => {
    if (!title) {
      console.error('Missing title for content:', _id);
      return _id;
    }
    return `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${_id}`;
  };

  const isLiked = user?.like?.includes(content?._id);
  const isInWatchlist = user?.watchlist?.includes(content?._id);

  const handleLike = async () => {
    try {
      if (user && user._id) {
        const contentId = content._id;
        if (isLiked) {
          await dispatch(unlikeContent({ userId: user._id, contentId })).unwrap();
        } else {
          await dispatch(likeContent({ userId: user._id, contentId })).unwrap();
        }
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
    }
  };

  const handleWatchlist = async () => {
    try {
      if (user && user._id) {
        const contentId = content._id;
        if (isInWatchlist) {
          await dispatch(removeFromWatchlist({ userId: user._id, contentId })).unwrap();
        } else {
          await dispatch(addToWatchlist({ userId: user._id, contentId })).unwrap();
        }
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error adding/removing from watchlist:', error);
    }
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        setCopyModal({ show: true, message: 'Link copied to clipboard!', isError: false });
        setTimeout(() => setCopyModal({ show: false, message: '', isError: false }), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        setCopyModal({ show: true, message: 'Failed to copy link. Please try again.', isError: true });
        setTimeout(() => setCopyModal({ show: false, message: '', isError: false }), 3000);
      });
  };

  if (!isOpen || !creator) return null;

  const modalContent = (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose} aria-label="Close modal">×</CloseButton>
        <VideoContainer>
          {content && (
            <video
              ref={videoRef}
              src={`${content.video}#t=0,20`}
              autoPlay
              controls
              preload="metadata"
              className="w-full h-full object-cover rounded-t-lg"
            ></video>
          )}
        </VideoContainer>
        <ModalContent>
          <CreatorHeader
            onClick={handleNavigateToCreator}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigateToCreator();
              }
            }}
          >
            <CreatorImage src={creator.profileImage || 'https://via.placeholder.com/50'} alt={creator.name} />
            <div>
              <h2 className="text-lg font-semibold">{creator.name}</h2>
              <p className="text-sm text-gray-600">{creator.description || 'Creator'}</p>
            </div>
          </CreatorHeader>
          <h3 className="text-base font-semibold mb-2">Recent Content</h3>
          {loading ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            content && (
              <>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold">{content.title}</h2>
                <ContentDescription className="text-xs sm:text-sm md:text-base text-black mt-2">{content.description}</ContentDescription>
                <ActionRow>
                  <ButtonGroup>
                    <WatchButton onClick={handleNavigateToMovie}>Watch</WatchButton>
                    <ActionButton onClick={handleNavigateToCreator}>Visit Channel</ActionButton>
                  </ButtonGroup>
                  <ActionIcons>
                   And
                    <FaHeart
                      className={`cursor-pointer text-lg sm:text-xl ${isLiked ? 'text-red-600 fill-current' : 'text-gray-400'}`}
                      onClick={handleLike}
                      aria-label={isLiked ? 'Unlike content' : 'Like content'}
                    />
                    <span
                      className={`cursor-pointer text-lg sm:text-xl ${isInWatchlist ? 'text-green-600' : 'text-gray-400'}`}
                      onClick={handleWatchlist}
                      aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      {isInWatchlist ? <FaCheck /> : <FaPlus />}
                    </span>
                    <FaPaperPlane
                      className="text-[#541011] cursor-pointer text-lg sm:text-xl"
                      onClick={handleCopyLink}
                      aria-label="Copy link"
                    />
                  </ActionIcons>
                </ActionRow>
                <CommentSection>
                  <h3 className="text-sm sm:text-base font-semibold mt-4 mb-2">Comments</h3>
                  {commentError && <ErrorMessage>{commentError}</ErrorMessage>}
                  <CommentForm onSubmit={handleAddComment}>
                    <CommentInput
                      type="text"
                      value={commentText}
                      onChange={(e) => {
                        setCommentText(e.target.value);
                        setCommentError('');
                      }}
                      placeholder="Add a comment..."
                      aria-label="Comment input"
                    />
                    <CommentSubmit type="submit" disabled={!commentText.trim()}>
                      Post
                    </CommentSubmit>
                  </CommentForm>
                  <CommentList>
                    {content.comments && content.comments.length > 0 ? (
                      content.comments.map((comment, index) => (
                        <CommentItem key={comment._id || index}>
                          <CommentUser>
                            <CommentProfileImage
                              src={comment.user.profileImage || 'https://via.placeholder.com/32'}
                              alt={comment.user.name}
                            />
                            <div>
                              <CommentUserName>{comment.user.name}</CommentUserName>
                              <CommentTimestamp>
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </CommentTimestamp>
                            </div>
                          </CommentUser>
                          <CommentText>{comment.text}</CommentText>
                        </CommentItem>
                      ))
                    ) : (
                      <NoComments>No comments yet. Be the first to comment!</NoComments>
                    )}
                  </CommentList>
                </CommentSection>
              </>
            )
          )}
        </ModalContent>
      </ModalContainer>
      {showWelcomePopup && (
        <PopupOverlay>
          <PopupContainer>
            <p className="text-sm sm:text-base">Please log in to like, add to playlist, or comment.</p>
            <button
              className="mt-4 bg-[#541011] text-white py-2 px-4 rounded text-sm sm:text-base"
              onClick={() => setShowWelcomePopup(false)}
            >
              Close
            </button>
          </PopupContainer>
        </PopupOverlay>
      )}
      {copyModal.show && (
        <CopyModal isError={copyModal.isError}>
          <p>{copyModal.message}</p>
          <button onClick={() => setCopyModal({ show: false, message: '', isError: false })}>
            Close
          </button>
        </CopyModal>
      )}
    </ModalOverlay>
  );

  return isOpen ? createPortal(modalContent, document.body) : null;
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10010;
  padding: 1rem;
  animation: fade-in 0.3s ease-in;
`;

const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 95vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) { max-width: 600px; }
  @media (min-width: 768px) { max-width: 800px; }
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 40vh;
  min-height: 200px;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #dc2626;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  z-index: 10013;
`;

const ModalContent = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) { padding: 1.25rem; }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #541011;
    border-radius: 3px;
  }
`;

const CreatorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  
   &:hover {
    color: #541011; /* Subtle hover effect *
  }
`;

const CreatorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ContentDescription = styled.p`
  font-size: 0.75rem;
  color: #333;
  margin: 0.5rem 0;
  line-height: 1.5;

  @media (min-width: 640px) { font-size: 0.875rem; }
  @media (min-width: 768px) { font-size: 1rem; }
`;

const ActionRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
    width: auto;
  }
`;

const WatchButton = styled.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;

  @media (min-width: 640px) {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
`;

const ActionButton = styled.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;

  @media (min-width: 640px) {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
  &:hover {
    background: #6b1516;
  }
`;

const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CommentSection = styled.div`
  margin-top: 0.75rem;
  width: 100%;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #541011;
  }
`;

const CommentSubmit = styled.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover:not(:disabled) { background: #6b1516; }
  &:disabled { background: #ccc; cursor: not-allowed; }
`;

const CommentList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #541011;
    border-radius: 2px;
  }
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background: #f1f1f1;
  border-radius: 4px;
`;

const CommentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 640px) { width: 32px; height: 32px; }
`;

const CommentUserName = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;

  @media (min-width: 640px) { font-size: 0.875rem; }
`;

const CommentTimestamp = styled.span`
  font-size: 0.625rem;
  color: #666;

  @media (min-width: 640px) { font-size: 0.75rem; }
`;

const CommentText = styled.p`
  font-size: 0.75rem;
  color: #333;
  margin: 0;
  line-height: 1.3;

  @media (min-width: 640px) { font-size: 0.875rem; }
`;

const NoComments = styled.p`
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  margin: 0.5rem 0;

  @media (min-width: 640px) { font-size: 0.875rem; }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-align: center;

  @media (min-width: 640px) { font-size: 0.875rem; }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #333;
  font-size: 0.875rem;
`;

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10011;
  padding: 1rem;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 90vw;
  text-align: center;

  @media (min-width: 640px) { max-width: 300px; padding: 1.25rem; }
`;

const CopyModal = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${({ isError }) => (isError ? '#ff4d4f' : '#541011')};
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10012;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 90%;
  max-width: 260px;

  @media (min-width: 640px) { max-width: 280px; padding: 1rem; }

  p {
    margin: 0;
    font-size: 0.75rem;
    text-align: center;
    @media (min-width: 640px) { font-size: 0.875rem; }
  }

  button {
    background: #fff;
    color: ${({ isError }) => (isError ? '#ff4d4f' : '#28a745')};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;
    @media (min-width: 640px) { font-size: 0.875rem; }
  }
`;

export default CreatorContentModal;