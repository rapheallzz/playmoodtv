import React, { useState, useMemo, useEffect } from 'react';
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
  availableVideos,
}) => {
  const [contentId, setContentId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedVideo = useMemo(() => {
    return availableVideos.find((video) => video._id === contentId);
  }, [contentId, availableVideos]);

  const handleVideoChange = (e) => {
    setContentId(e.target.value);
    setStartTime('');
    setEndTime('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contentId || startTime === '' || endTime === '' || !title) {
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
      title,
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
              onChange={handleVideoChange}
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
            <label htmlFor="title" style={{ display: 'block', marginBottom: '8px' }}>Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          {selectedVideo && (
            <div style={{ marginBottom: '16px' }}>
              <video
                key={selectedVideo._id}
                src={selectedVideo.video}
                controls
                width="100%"
                style={{ borderRadius: '8px' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ marginBottom: '16px', flex: 1 }}>
              <label htmlFor="start-time" style={{ display: 'block', marginBottom: '8px' }}>Start Time (s)</label>
              <input
                id="start-time"
                type="number"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                min="0"
              />
            </div>
            <div style={{ marginBottom: '16px', flex: 1 }}>
              <label htmlFor="end-time" style={{ display: 'block', marginBottom: '8px' }}>End Time (s)</label>
              <input
                id="end-time"
                type="number"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
                min="0"
              />
            </div>
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