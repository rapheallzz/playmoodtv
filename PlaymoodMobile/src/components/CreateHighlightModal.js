import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import axios from 'axios';
import uploadService from '../features/uploadService';
import BASE_API_URL from '../apiConfig';

const { width: windowWidth } = Dimensions.get('window');

const CreateHighlightModal = ({ visible, onClose, onCreate, availableVideos = [] }) => {
  const [activeTab, setActiveTab] = useState('existing');
  const [title, setTitle] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [uploadVideo, setUploadVideo] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadVideo(result.assets[0]);
    }
  };

  const handleVideoLoad = (status) => {
    if (status.isLoaded) {
      const duration = status.durationMillis / 1000;
      setVideoDuration(duration);
      setEndTime(Math.min(30, duration));
    }
  };

  const selectedVideo = availableVideos.find(v => v._id === selectedVideoId);
  const videoSource = activeTab === 'existing'
    ? (selectedVideo?.video ? { uri: selectedVideo.video } : null)
    : (uploadVideo ? { uri: uploadVideo.uri } : null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a highlight title.');
      return;
    }
    if (activeTab === 'existing' && !selectedVideoId) {
      Alert.alert('Error', 'Please select a video.');
      return;
    }
    if (activeTab === 'upload' && !uploadVideo) {
      Alert.alert('Error', 'Please upload a video.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title,
        startTime,
        endTime,
      };

      if (activeTab === 'existing') {
        payload.contentId = selectedVideoId;
      } else {
        // Handle R2 upload for standalone highlight
        const videoFile = uploadVideo;
        const contentType = 'video/mp4'; // Default for picker

        // 1. Get signatures
        const sigFormData = new FormData();
        sigFormData.append('provider', 'r2');
        sigFormData.append('fileName', videoFile.fileName || `highlight-${Date.now()}.mp4`);
        sigFormData.append('contentType', contentType);

        const sigRes = await axios.post(`${BASE_API_URL}/api/content/signature`, sigFormData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        // 2. Upload video
        const videoBlob = await fetch(videoFile.uri).then(r => r.blob());
        await uploadService.uploadToR2(videoBlob, sigRes.data.uploadUrl, contentType);

        // 3. Generate and upload thumbnail
        const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(videoFile.uri, { time: startTime * 1000 });
        const thumbSigFormData = new FormData();
        thumbSigFormData.append('provider', 'r2');
        thumbSigFormData.append('fileName', `thumb-${Date.now()}.jpg`);
        thumbSigFormData.append('contentType', 'image/jpeg');

        const thumbSigRes = await axios.post(`${BASE_API_URL}/api/content/signature`, thumbSigFormData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        const thumbBlob = await fetch(thumbUri).then(r => r.blob());
        await uploadService.uploadToR2(thumbBlob, thumbSigRes.data.uploadUrl, 'image/jpeg');

        payload.videoKey = sigRes.data.key;
        payload.thumbnailKey = thumbSigRes.data.key;
      }

      const result = await onCreate(payload);
      if (result.success) {
        Alert.alert('Success', 'Highlight created successfully!');
        resetForm();
        onClose();
      } else {
        Alert.alert('Error', result.error || 'Failed to create highlight.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSelectedVideoId('');
    setUploadVideo(null);
    setStartTime(0);
    setEndTime(10);
    setVideoDuration(0);
    setActiveTab('existing');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Overlay>
        <ModalContainer>
          <Header>
            <HeaderText>Create Highlight</HeaderText>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </CloseButton>
          </Header>

          <ScrollView>
            <TabContainer>
              <Tab active={activeTab === 'existing'} onPress={() => setActiveTab('existing')}>
                <TabText active={activeTab === 'existing'}>EXISTING</TabText>
              </Tab>
              <Tab active={activeTab === 'upload'} onPress={() => setActiveTab('upload')}>
                <TabText active={activeTab === 'upload'}>UPLOAD</TabText>
              </Tab>
            </TabContainer>

            <FormBody>
              <Label>Highlight Title</Label>
              <StyledInput
                value={title}
                onChangeText={setTitle}
                placeholder="Awesome moment..."
                placeholderTextColor="#666"
              />

              {activeTab === 'existing' ? (
                <>
                  <Label>Select Video</Label>
                  <PickerWrapper>
                    <ScrollView style={{ maxHeight: 150 }}>
                      {availableVideos.map((video) => (
                        <VideoOption
                          key={video._id}
                          selected={selectedVideoId === video._id}
                          onPress={() => setSelectedVideoId(video._id)}
                        >
                          <VideoOptionText selected={selectedVideoId === video._id}>
                            {video.title}
                          </VideoOptionText>
                        </VideoOption>
                      ))}
                    </ScrollView>
                  </PickerWrapper>
                </>
              ) : (
                <>
                  <Label>Upload Video</Label>
                  <UploadButton onPress={pickVideo}>
                    <Ionicons name="cloud-upload-outline" size={24} color="white" />
                    <UploadButtonText>{uploadVideo ? 'Change Video' : 'Pick a Video'}</UploadButtonText>
                  </UploadButton>
                  {uploadVideo && <FileNameText>{uploadVideo.fileName || 'Video selected'}</FileNameText>}
                </>
              )}

              {videoSource && (
                <VideoPreviewContainer>
                  <Video
                    ref={videoRef}
                    source={videoSource}
                    style={{ width: '100%', height: 180 }}
                    useNativeControls
                    resizeMode="contain"
                    onLoad={handleVideoLoad}
                  />
                  <Label style={{ marginTop: 15 }}>Trim Selection (Seconds)</Label>
                  <TrimRow>
                    <View style={{ flex: 1 }}>
                      <Label style={{ fontSize: 11 }}>Start</Label>
                      <NumberInput
                        keyboardType="numeric"
                        value={startTime.toString()}
                        onChangeText={(val) => setStartTime(parseFloat(val) || 0)}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Label style={{ fontSize: 11 }}>End</Label>
                      <NumberInput
                        keyboardType="numeric"
                        value={endTime.toString()}
                        onChangeText={(val) => setEndTime(parseFloat(val) || 0)}
                      />
                    </View>
                  </TrimRow>
                  <DurationText>Duration: {(endTime - startTime).toFixed(1)}s (Max 30s)</DurationText>
                </VideoPreviewContainer>
              )}
            </FormBody>
          </ScrollView>

          <Footer>
            <CancelButton onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </CancelButton>
            <SubmitButton onPress={handleSubmit} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="white" /> : <SubmitButtonText>Create</SubmitButtonText>}
            </SubmitButton>
          </Footer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.8);
  justify-content: flex-end;
`;

const ModalContainer = styled.View`
  background-color: #111;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  height: 90%;
  border-width: 1px;
  border-color: #222;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #222;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.TouchableOpacity``;

const TabContainer = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  gap: 20px;
`;

const Tab = styled.TouchableOpacity`
  padding-vertical: 10px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.active ? '#541011' : 'transparent'};
`;

const TabText = styled.Text`
  color: ${props => props.active ? '#541011' : '#666'};
  font-weight: bold;
  font-size: 13px;
`;

const FormBody = styled.View`
  padding: 20px;
`;

const Label = styled.Text`
  color: #888;
  font-size: 13px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const StyledInput = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #333;
  margin-bottom: 20px;
`;

const PickerWrapper = styled.View`
  background-color: #1a1a1a;
  border-radius: 8px;
  border-width: 1px;
  border-color: #333;
  margin-bottom: 20px;
  overflow: hidden;
`;

const VideoOption = styled.TouchableOpacity`
  padding: 12px 15px;
  background-color: ${props => props.selected ? '#541011' : 'transparent'};
  border-bottom-width: 1px;
  border-bottom-color: #222;
`;

const VideoOptionText = styled.Text`
  color: ${props => props.selected ? 'white' : '#ccc'};
  font-size: 14px;
`;

const UploadButton = styled.TouchableOpacity`
  background-color: #222;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 8px;
  border-style: dashed;
  border-width: 1px;
  border-color: #555;
  gap: 10px;
`;

const UploadButtonText = styled.Text`
  color: white;
  font-weight: 600;
`;

const FileNameText = styled.Text`
  color: #541011;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const VideoPreviewContainer = styled.View`
  margin-top: 10px;
  background-color: #000;
  padding: 10px;
  border-radius: 8px;
`;

const TrimRow = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const NumberInput = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  padding: 8px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #333;
  text-align: center;
`;

const DurationText = styled.Text`
  color: #666;
  font-size: 11px;
  margin-top: 10px;
  text-align: right;
`;

const Footer = styled.View`
  flex-direction: row;
  padding: 20px;
  justify-content: flex-end;
  gap: 15px;
  border-top-width: 1px;
  border-top-color: #222;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 12px 20px;
`;

const ButtonText = styled.Text`
  color: #888;
  font-weight: 600;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #541011;
  padding: 12px 30px;
  border-radius: 8px;
  min-width: 100px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export default CreateHighlightModal;
