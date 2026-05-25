import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, Image, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreateFeedPostModal = ({ visible, onClose, onCreate, isLoading }) => {
  const [caption, setCaption] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedMedia([...selectedMedia, ...result.assets]);
    }
  };

  const removeMedia = (index) => {
    const updated = [...selectedMedia];
    updated.splice(index, 1);
    setSelectedMedia(updated);
  };

  const handleSubmit = () => {
    if (!caption.trim() && selectedMedia.length === 0) {
      Alert.alert('Error', 'Please add some content or media to your post.');
      return;
    }

    // In mobile version, we send the media assets along with the caption
    onCreate(caption, selectedMedia);
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
            <HeaderText>Create Feed Post</HeaderText>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </CloseButton>
          </Header>

          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <FormGroup>
              <Label>Caption</Label>
              <StyledTextArea
                multiline
                numberOfLines={4}
                value={caption}
                onChangeText={setCaption}
                placeholder="Write something..."
                placeholderTextColor="#666"
                textAlignVertical="top"
              />
            </FormGroup>

            <FormGroup>
              <Label>Media ({selectedMedia.length})</Label>
              <MediaRow>
                <AddMediaButton onPress={pickMedia}>
                  <Ionicons name="add" size={32} color="white" />
                  <AddMediaText>Add</AddMediaText>
                </AddMediaButton>

                {selectedMedia.map((item, index) => (
                  <MediaPreviewContainer key={index}>
                    <PreviewImage source={{ uri: item.uri }} />
                    {item.type === 'video' && (
                      <VideoIconOverlay>
                        <Ionicons name="play-circle" size={20} color="white" />
                      </VideoIconOverlay>
                    )}
                    <RemoveButton onPress={() => removeMedia(index)}>
                      <Ionicons name="close-circle" size={20} color="#541011" />
                    </RemoveButton>
                  </MediaPreviewContainer>
                ))}
              </MediaRow>
            </FormGroup>
          </ScrollView>

          <Footer>
            <CancelButton onPress={onClose}><ButtonText>Cancel</ButtonText></CancelButton>
            <SubmitButton onPress={handleSubmit} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="white" /> : <SubmitButtonText>Post</SubmitButtonText>}
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
  height: 80%;
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
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const StyledTextArea = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  padding: 12px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #333;
  min-height: 100px;
  font-size: 16px;
`;

const MediaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const AddMediaButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: #1a1a1a;
  border-radius: 12px;
  border-width: 1px;
  border-color: #333;
  border-style: dashed;
  justify-content: center;
  align-items: center;
`;

const AddMediaText = styled.Text`
  color: #666;
  font-size: 10px;
  margin-top: 2px;
`;

const MediaPreviewContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const PreviewImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const VideoIconOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.2);
`;

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: white;
  border-radius: 10px;
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

export default CreateFeedPostModal;
