import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10005; /* Ensure it's on top */
`;

const ModalContent = styled.div`
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ModalHeader = styled.h2`
  color: #fff;
  margin: 0;
  font-size: 1.2rem;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  resize: vertical;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;

  &.post {
    background-color: #541011;
    color: #fff;
    &:disabled {
      background-color: #555;
      cursor: not-allowed;
    }
  }

  &.cancel {
    background-color: #444;
    color: #fff;
  }
`;

const CommentModal = ({ isOpen, onClose, onSubmit, contentTitle }) => {
  const [comment, setComment] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose} data-testid="comment-modal">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Comment on "{contentTitle}"</ModalHeader>
        <CommentTextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
        />
        <ModalActions>
          <ActionButton className="cancel" onClick={onClose}>
            Cancel
          </ActionButton>
          <ActionButton
            className="post"
            onClick={handleSubmit}
            disabled={!comment.trim()}
          >
            Post
          </ActionButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CommentModal;