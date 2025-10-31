import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  CloseButton,
  FeedPostDetailContainer,
  MediaContainer,
  CommentsContainer,
  Comment,
  CommentContent,
  CommentTimestamp,
  CommentForm,
  CommentInput,
  CommentSubmit,
} from '../../styles/CreatorPageStyles';
import FeedPostCard from '../creator/FeedPostCard';

const FeedPostDetailModal = ({ isOpen, onClose, post, onCommentSubmit, user }) => {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(post._id, commentText);
      setCommentText('');
    }
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FeedPostDetailContainer>
          <MediaContainer>
            <FeedPostCard post={post} user={user} />
          </MediaContainer>
          <CommentsContainer>
            {post.comments.map((comment) => (
              <Comment key={comment._id}>
                <CommentContent>{comment.text}</CommentContent>
                <CommentTimestamp>{new Date(comment.createdAt).toLocaleString()}</CommentTimestamp>
              </Comment>
            ))}
            <CommentForm onSubmit={handleSubmit}>
              <CommentInput
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <CommentSubmit type="submit">Post</CommentSubmit>
            </CommentForm>
          </CommentsContainer>
        </FeedPostDetailContainer>
      </ModalContent>
    </Modal>
  );
};

export default FeedPostDetailModal;
