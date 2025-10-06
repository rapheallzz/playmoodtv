import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';

const CommentsWrapper = styled.div`
  width: 350px;
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

const CommentsHeader = styled.h3`
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
`;

const CommentsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const CommentAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CommentUser = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const CommentForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #555;
  background-color: #333;
  color: white;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
`;

const CommentSection = ({ comments, user, onSubmit }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment('');
    }
  };

  return (
    <CommentsWrapper>
      <CommentsHeader>{comments.length} Comments</CommentsHeader>
      <CommentsList>
        {comments.map((comment) => (
          <CommentItem key={comment._id}>
            <CommentAvatar src={comment.user?.profileImage || 'https://via.placeholder.com/32'} alt={comment.user?.name} />
            <CommentBody>
              <CommentUser>{comment.user?.name || 'Anonymous'}</CommentUser>
              <CommentText>{comment.comment}</CommentText>
            </CommentBody>
          </CommentItem>
        ))}
      </CommentsList>
      <CommentForm>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <SubmitButton onClick={handleSubmit}>
          <FaPaperPlane />
        </SubmitButton>
      </CommentForm>
    </CommentsWrapper>
  );
};

export default CommentSection;