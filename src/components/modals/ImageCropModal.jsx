import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';
import getCroppedImg from '../../utils/cropImage';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background-color: #1a1a1a;
  padding: 24px;
  border-radius: 12px;
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const CropperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: #333;
  border-radius: 8px;
  overflow: hidden;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: white;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    flex: 1;
    accent-color: #541011;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background-color: #541011;
    color: white;
    border: none;
    &:hover {
      background-color: #7a181a;
    }
  }

  &.secondary {
    background-color: transparent;
    color: white;
    border: 1px solid #444;
    &:hover {
      background-color: #222;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
`;

const ImageCropModal = ({ src, onCrop, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      setLoading(true);
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      onCrop(croppedImage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Edit Profile Picture</Title>
        <CropperContainer>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </CropperContainer>
        <Controls>
          <SliderContainer>
            <span>Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(parseFloat(e.target.value))}
            />
          </SliderContainer>
        </Controls>
        <ButtonGroup>
          <Button className="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button className="primary" onClick={handleCrop} disabled={loading}>
            {loading ? 'Processing...' : 'Save Changes'}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageCropModal;
