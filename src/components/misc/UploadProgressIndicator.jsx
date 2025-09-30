import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { clearCompletedUploads } from '../../features/uploadSlice';

const UploadProgressIndicator = () => {
  const dispatch = useDispatch();
  const { uploads } = useSelector((state) => state.upload);

  if (uploads.length === 0) {
    return null;
  }

  const handleClearCompleted = () => {
    dispatch(clearCompletedUploads());
  };

  return (
    <IndicatorContainer>
      <Header>
        <h3>Uploads</h3>
        <ClearButton onClick={handleClearCompleted}>Clear Completed</ClearButton>
      </Header>
      {uploads.map((upload) => (
        <UploadItem key={upload.id}>
          <FileName>{upload.title || upload.fileName}</FileName>
          <Status status={upload.status}>
            {upload.status === 'uploading' && `Uploading: ${upload.progress}%`}
            {upload.status === 'completed' && 'Completed'}
            {upload.status === 'failed' && `Failed: ${upload.error}`}
            {upload.status === 'pending' && 'Waiting...'}
          </Status>
          {upload.status === 'uploading' && (
            <ProgressBar>
              <Filler style={{ width: `${upload.progress}%` }} />
            </ProgressBar>
          )}
        </UploadItem>
      ))}
    </IndicatorContainer>
  );
};

const IndicatorContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;

  h3 {
    margin: 0;
    font-size: 16px;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #541011;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const UploadItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Status = styled.div`
  font-size: 12px;
  color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'failed':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  }};
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 4px;
  height: 8px;
`;

const Filler = styled.div`
  background-color: #541011;
  height: 100%;
  border-radius: 4px;
  transition: width 0.2s ease-in-out;
`;

export default UploadProgressIndicator;