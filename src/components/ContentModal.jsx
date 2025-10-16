import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaPaperPlane, FaHeart, FaPlus, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { likeContent, unlikeContent, addToWatchlist, removeFromWatchlist } from '../features/authSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';

const ContentModal = ({ isOpen, content, onClose, handleNavigateToMovie }) => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');
  const [actionError, setActionError] = useState('');
  const dispatch = useDispatch();
  const { user, userToken } = useSelector((state) => state.auth);
  const videoRef = useRef(null);
  const [copyModal, setCopyModal] = useState({ show: false, message: '', isError: false });
  const modalRef = useRef(null); // Ref for modal container

  // Log content prop for debugging
  useEffect(() => {
    console.log('Content prop:', content);
  }, [content]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fetch comments when modal opens
  useEffect(() => {
    const fetchComments = async () => {
      if (isOpen && content?._id) {
        try {
          const response = await axios.get(
            `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${content._id}/comments`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          );
          setComments(response.data.comments || []);
        } catch (error) {
          console.error('Failed to fetch comments:', error);
          setCommentError('Failed to load comments.');
        }
      }
    };
    fetchComments();
  }, [isOpen, content?._id, userToken]);

  // Derive userId from user or token
  const getUserId = () => {
    if (user?.userId) return user.userId;
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        return decoded.id || user?._id;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  };


  // Handle comment submission
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!userToken) {
      setShowWelcomePopup(true);
      return;
    }
    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }
    if (!content?._id || typeof content._id !== 'string' || content._id.trim() === '') {
      setCommentError('Invalid content ID. Please try again.');
      console.error('Invalid content._id:', content?._id);
      return;
    }

    try {
      const commentUrl = `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${content._id}/comment`;
      const payload = { 
        contentId: content._id, 
        text: commentText 
      };
      console.log('Submitting comment:', {
        url: commentUrl,
        payload,
        contentId: content._id,
        token: userToken.substring(0, 10) + '...',
      });
      const response = await axios.post(
        commentUrl,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Comment response:', response.data);
      setCommentText('');
      setCommentError('');
      // Re-fetch comments to show the new one
      const commentsResponse = await axios.get(
        `https://playmoodserver-stg-0fb54b955e6b.herokuapp.com/api/content/${content._id}/comments`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setComments(commentsResponse.data.comments || []);
    } catch (error) {
      console.error('Error adding comment:', {
        response: error.response?.data,
        status: error.response?.status,
        message: error.message,
      });
      const errorMessage = error.response?.data?.error || 'Failed to add comment. Please try again.';
      setCommentError(errorMessage);
    }
  };

  // Early return after hooks
  if (!isOpen || !content || !content._id || typeof content._id !== 'string' || content._id.trim() === '') {
    console.warn('ContentModal: Invalid or missing content', { isOpen, content });
    return null;
  }

  const isLiked = user?.like?.includes(content._id);
  const isInWatchlist = user?.watchlist?.includes(content._id);

  const handleLike = async () => {
    try {
      const userId = getUserId();
      if (userId && userToken) {
        const contentId = content._id;
        console.log('handleLike:', { isLiked, contentId, userId });
        if (isLiked) {
          await dispatch(unlikeContent({ contentId, token: userToken })).unwrap();
        } else {
          await dispatch(likeContent({ contentId, token: userToken })).unwrap();
        }
        setActionError('');
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error liking/unliking content:', error);
      const errorMessage = error.message || 'Failed to like/unlike content. Please try again.';
      setActionError(errorMessage);
      setTimeout(() => setActionError(''), 3000);
    }
  };

  const handleWatchlist = async () => {
    try {
      const userId = getUserId();
      if (userId && userToken) {
        const contentId = content._id;
        if (isInWatchlist) {
          await dispatch(removeFromWatchlist({ userId, contentId, token: userToken })).unwrap();
        } else {
          await dispatch(addToWatchlist({ userId, contentId, token: userToken })).unwrap();
        }
        setActionError('');
      } else {
        setShowWelcomePopup(true);
      }
    } catch (error) {
      console.error('Error adding/removing from watchlist:', error);
      const errorMessage = error.message || 'Failed to update watchlist. Please try again.';
      setActionError(errorMessage);
      setTimeout(() => setActionError(''), 3000);
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

  const handleCloseCopyModal = () => {
    setCopyModal({ show: false, message: '', isError: false });
  };

  const modalContent = (
    <ModalOverlay>
      <CloseButtonWrapper>
        <CloseButton onClick={onClose} aria-label="Close modal">
          ×
        </CloseButton>
      </CloseButtonWrapper>
      <ModalContainer ref={modalRef}>
        <VideoContainer>
          <video
            ref={videoRef}
            src={`${content.video}#t=0,20`}
            autoPlay
            controls
            preload="metadata"
            className="w-full h-full object-cover rounded-t-lg"
          ></video>
        </VideoContainer>
        <ModalContent>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">{content.title}</h2>
          <p className="text-xs sm:text-sm md:text-base text-black mt-2 line-clamp-2">{content.description}</p>
          {actionError && <ErrorMessage>{actionError}</ErrorMessage>}
          <ActionRow>
            <WatchButton onClick={() => handleNavigateToMovie(content)}>
              Watch
            </WatchButton>
            <ActionIcons>
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
              {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <CommentItem key={comment._id || index}>
                    <CommentUser>
                      <CommentProfileImage
                        src={comment.user?.profileImage || 'https://via.placeholder.com/32'}
                        alt={comment.user?.name || 'Anonymous'}
                      />
                      <div>
                        <CommentUserName>{comment.user?.name || 'Anonymous'}</CommentUserName>
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
        </ModalContent>
      </ModalContainer>
      {showWelcomePopup && (
        <PopupOverlay onClick={() => setShowWelcomePopup(false)}>
          <PopupContainer onClick={(e) => e.stopPropagation()}>
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
        <CopyModal isError={copyModal.isError} onClick={handleCloseCopyModal}>
          <p>{copyModal.message}</p>
          <button onClick={handleCloseCopyModal}>Close</button>
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

const CloseButtonWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10013;
`;

const CloseButton = styled.button`
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
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 95vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    max-width: 600px;
  }

  @media (min-width: 768px) {
    max-width: 800px;
  }
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

const ModalContent = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 640px) {
    padding: 1.25rem;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #541011;
    border-radius: 3px;
  }
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
  }
`;

const WatchButton = styled.button`
  background: #541011;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  width: 100%;
  font-size: 0.875rem;
  cursor: pointer;

  @media (min-width: 640px) {
    width: auto;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
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

  @media (min-width: 640px) {
    font-size: 0.875rem;
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

  &:hover:not(:disabled) {
    background: #6b1516;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
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

  @media (min-width: 640px) {
    width: 32px;
    height: 32px;
  }
`;

const CommentUserName = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const CommentTimestamp = styled.span`
  font-size: 0.625rem;
  color: #666;

  @media (min-width: 640px) {
    font-size: 0.75rem;
  }
`;

const CommentText = styled.p`
  font-size: 0.75rem;
  color: #333;
  margin: 0;
  line-height: 1.3;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const NoComments = styled.p`
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  margin: 0.5rem 0;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
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
  animation: fade-in 0.3s ease-in;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 90vw;
  text-align: center;

  @media (min-width: 640px) {
    max-width: 300px;
    padding: 1.25rem;
  }
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

  @media (min-width: 640px) {
    max-width: 280px;
    padding: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    text-align: center;

    @media (min-width: 640px) {
      font-size: 0.875rem;
    }
  }

  button {
    background: #fff;
    color: ${({ isError }) => (isError ? '#ff4d4f' : '#28a745')};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;

    @media (min-width: 640px) {
      font-size: 0.875rem;
    }
  }
`;

export default ContentModal;