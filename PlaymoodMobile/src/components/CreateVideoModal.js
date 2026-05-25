import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, Switch, Image } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreateVideoModal = ({ visible, onClose, onUpload, isLoading }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [credits, setCredits] = useState('');
  const [category, setCategory] = useState('Fashion Show');
  const [isOnlyOnPlaymood, setIsOnlyOnPlaymood] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      quality: 1,
    });
    if (!result.canceled) {
      setVideoFile(result.assets[0]);
    }
  };

  const pickThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setThumbnailFile(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile || !title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields and select a video.');
      return;
    }

    // Convert local uri to Blob for uploadService (which uses XMLHttpRequest/XHR)
    const videoBlob = await fetch(videoFile.uri).then(r => r.blob());
    let thumbBlob = null;
    if (thumbnailFile) {
      thumbBlob = await fetch(thumbnailFile.uri).then(r => r.blob());
    }

    const videoMetadata = {
      title,
      description,
      credit: credits,
      category,
      isOnlyOnPlaymood,
      scheduledDate,
      scheduledStartTime: scheduledTime,
    };

    onUpload({
      videoFile: videoBlob,
      thumbnailFile: thumbBlob,
      videoMetadata,
      previewStart: 0,
      previewEnd: 10, // Default preview range for mobile simplified flow
    });
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
            <HeaderText>Submit Video</HeaderText>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </CloseButton>
          </Header>

          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <FormGroup>
              <Label>Video File *</Label>
              <MediaPicker onPress={pickVideo} hasFile={!!videoFile}>
                <Ionicons name={videoFile ? "checkmark-circle" : "videocam-outline"} size={24} color="white" />
                <MediaPickerText>{videoFile ? videoFile.fileName || 'Video Selected' : 'Pick Video'}</MediaPickerText>
              </MediaPicker>
            </FormGroup>

            <FormGroup>
              <Label>Thumbnail (Optional)</Label>
              <MediaPicker onPress={pickThumbnail} hasFile={!!thumbnailFile}>
                {thumbnailFile ? (
                  <ThumbnailPreview source={{ uri: thumbnailFile.uri }} />
                ) : (
                  <>
                    <Ionicons name="image-outline" size={24} color="white" />
                    <MediaPickerText>Pick Thumbnail</MediaPickerText>
                  </>
                )}
              </MediaPicker>
            </FormGroup>

            <FormGroup>
              <Label>Title *</Label>
              <StyledInput value={title} onChangeText={setTitle} placeholder="Video Title" placeholderTextColor="#666" />
            </FormGroup>

            <FormGroup>
              <Label>Description *</Label>
              <StyledTextArea
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
                placeholder="What's this video about?"
                placeholderTextColor="#666"
                textAlignVertical="top"
              />
            </FormGroup>

            <FormGroup>
              <Label>Production Credits</Label>
              <StyledInput value={credits} onChangeText={setCredits} placeholder="Credits..." placeholderTextColor="#666" />
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <PickerWrapper>
                {['Fashion Show', 'Teen', 'Documentaries', 'Interview', 'Social', 'Diaries'].map((cat) => (
                  <CategoryOption key={cat} selected={category === cat} onPress={() => setCategory(cat)}>
                    <CategoryText selected={category === cat}>{cat}</CategoryText>
                  </CategoryOption>
                ))}
              </PickerWrapper>
            </FormGroup>

            <ToggleRow>
              <Label>Only on Playmood</Label>
              <Switch
                value={isOnlyOnPlaymood}
                onValueChange={setIsOnlyOnPlaymood}
                trackColor={{ false: '#333', true: '#541011' }}
              />
            </ToggleRow>

            <ToggleRow>
              <Label>Schedule Release</Label>
              <Switch
                value={isScheduled}
                onValueChange={setIsScheduled}
                trackColor={{ false: '#333', true: '#541011' }}
              />
            </ToggleRow>

            {isScheduled && (
              <DateTimeRow>
                <View style={{ flex: 1 }}>
                  <Label style={{ fontSize: 11 }}>Date (YYYY-MM-DD)</Label>
                  <StyledInput value={scheduledDate} onChangeText={setScheduledDate} placeholder="2024-12-31" placeholderTextColor="#444" />
                </View>
                <View style={{ flex: 1 }}>
                  <Label style={{ fontSize: 11 }}>Time (HH:MM)</Label>
                  <StyledInput value={scheduledTime} onChangeText={setScheduledTime} placeholder="14:00" placeholderTextColor="#444" />
                </View>
              </DateTimeRow>
            )}
          </ScrollView>

          <Footer>
            <CancelButton onPress={onClose}><ButtonText>Cancel</ButtonText></CancelButton>
            <SubmitButton onPress={handleSubmit} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="white" /> : <SubmitButtonText>Start Upload</SubmitButtonText>}
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

const FormGroup = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  color: #888;
  font-size: 13px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const MediaPicker = styled.TouchableOpacity`
  background-color: #1a1a1a;
  height: ${props => props.hasFile ? '60px' : '100px'};
  border-radius: 12px;
  border-width: 1px;
  border-color: #333;
  border-style: dashed;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  overflow: hidden;
`;

const MediaPickerText = styled.Text`
  color: #ccc;
  font-weight: 500;
`;

const ThumbnailPreview = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const StyledInput = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #333;
`;

const StyledTextArea = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #333;
  min-height: 80px;
`;

const PickerWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryOption = styled.TouchableOpacity`
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-radius: 15px;
  background-color: ${props => props.selected ? '#541011' : '#222'};
  border-width: 1px;
  border-color: ${props => props.selected ? '#541011' : '#333'};
`;

const CategoryText = styled.Text`
  color: ${props => props.selected ? 'white' : '#888'};
  font-size: 12px;
`;

const ToggleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DateTimeRow = styled.View`
  flex-direction: row;
  gap: 15px;
  margin-bottom: 20px;
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

export default CreateVideoModal;
