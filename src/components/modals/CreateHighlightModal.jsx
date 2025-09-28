import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalButtons,
  ModalButtonCancel,
  ModalButtonSubmit,
  ErrorMessage,
} from '../../styles/CreatorPageStyles';

const CreateHighlightModal = ({
  isOpen,
  onClose,
  onCreate,
  creatorId,
  availableVideos,
}) => {
  const [contentId, setContentId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contentId || startTime === '' || endTime === '') {
      setError('All fields are required.');
      return;
    }
    if (parseFloat(startTime) >= parseFloat(endTime)) {
      setError('Start time must be less than end time.');
      return;
    }
    setError('');
    setIsLoading(true);

    const result = await onCreate({
      contentId,
      startTime: parseFloat(startTime),
      endTime: parseFloat(endTime),
    });

    setIsLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Failed to create highlight.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal>
      <ModalContent>
        <ModalTitle>Create Highlight</ModalTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="video-select" style={{ display: 'block', marginBottom: '8px' }}>Select Video</label>
            <select
              id="video-select"
              value={contentId}
              onChange={(e) => setContentId(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="" disabled>Choose a video</option>
              {availableVideos.map((video) => (
                <option key={video._id} value={video._id}>
                  {video.title}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="start-time" style={{ display: 'block', marginBottom: '8px' }}>Start Time (seconds)</label>
            <input
              id="start-time"
              type="number"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
              min="0"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="end-time" style={{ display: 'block', marginBottom: '8px' }}>End Time (seconds)</label>
            <input
              id="end-time"
              type="number"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
              min="0"
            />
          </div>
          <ModalButtons>
            <ModalButtonCancel type="button" onClick={onClose}>Cancel</ModalButtonCancel>
            <ModalButtonSubmit type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </ModalButtonSubmit>
          </ModalButtons>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateHighlightModal;