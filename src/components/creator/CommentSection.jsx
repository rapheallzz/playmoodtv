import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const CommentPanel = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 350px;
  height: 85%;
  background-color: rgba(28, 28, 28, 0.95);
  backdrop-filter: blur(10px);
  border-left: 1px solid #333;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  animation: ${slideIn} 0.4s ease-in-out;
  z-index: 10;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const CommentList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #2a2a2a;
  }
`;

const Comment = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #ddd;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  border-top: 1px solid #333;
  padding-top: 20px;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid #444;
  background-color: #2a2a2a;
  color: white;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #541011;
  }
`;

const SubmitButton = styled.button`
  background-color: #541011;
  border: none;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7a1a1a;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #541011;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 40px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NoCommentsMessage = styled.p`
  text-align: center;
  color: #888;
  margin-top: 40px;
`;

const CommentSection = ({ comments = [], user, onSubmit, onClose, isLoading, totalComments }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment('');
    }
  };

  return (
    <CommentPanel>
      <Header>
        <h3>{totalComments} Comments</h3>
        <button onClick={onClose}><FaTimes /></button>
      </Header>
      <CommentList>
        {isLoading ? (
          <LoadingSpinner />
        ) : comments.length === 0 ? (
          <NoCommentsMessage>No comments yet. Be the first to comment!</NoCommentsMessage>
        ) : (
          comments.map((comment) => (
            <Comment key={comment._id}>
              <Avatar src={comment.user?.profileImage || 'https://via.placeholder.com/36'} alt={comment.user?.name} />
              <CommentBody>
                <Username>{comment.user?.name || 'Anonymous'}</Username>
                <CommentText>{comment.text}</CommentText>
              </CommentBody>
            </Comment>
          ))
        )}
      </CommentList>
      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <SubmitButton type="submit">
          <FaPaperPlane size={16} />
        </SubmitButton>
      </CommentForm>
    </CommentPanel>
  );
};

export default CommentSection;