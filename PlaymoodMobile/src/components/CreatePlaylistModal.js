import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const CreatePlaylistModal = ({ visible, onClose, onCreate, isLoading }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Playlist name is required.');
      return;
    }
    onCreate({ name, description, visibility });
    setName('');
    setDescription('');
    setVisibility('public');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Overlay>
        <ModalContent>
          <Header>
            <HeaderText>Create Playlist</HeaderText>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </CloseButton>
          </Header>

          <ScrollView style={{ maxHeight: 400 }}>
            <Body>
              <FormGroup>
                <Label>Playlist Name</Label>
                <StyledInput
                  value={name}
                  onChangeText={setName}
                  placeholder="My Awesome Playlist"
                  placeholderTextColor="#666"
                />
              </FormGroup>

              <FormGroup>
                <Label>Description (Optional)</Label>
                <StyledTextArea
                  multiline
                  numberOfLines={4}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="What's this playlist about?"
                  placeholderTextColor="#666"
                  textAlignVertical="top"
                />
              </FormGroup>

              <FormGroup>
                <Label>Visibility</Label>
                <PickerContainer>
                  <PickerOption
                    selected={visibility === 'public'}
                    onPress={() => setVisibility('public')}
                  >
                    <Ionicons name="globe-outline" size={18} color={visibility === 'public' ? 'white' : '#666'} />
                    <PickerText selected={visibility === 'public'}>Public</PickerText>
                  </PickerOption>
                  <PickerOption
                    selected={visibility === 'private'}
                    onPress={() => setVisibility('private')}
                  >
                    <Ionicons name="lock-closed-outline" size={18} color={visibility === 'private' ? 'white' : '#666'} />
                    <PickerText selected={visibility === 'private'}>Private</PickerText>
                  </PickerOption>
                </PickerContainer>
              </FormGroup>
            </Body>
          </ScrollView>

          <Footer>
            <CancelButton onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </CancelButton>
            <SubmitButton onPress={handleSubmit} disabled={isLoading || !name.trim()}>
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <SubmitButtonText>Create</SubmitButtonText>
              )}
            </SubmitButton>
          </Footer>
        </ModalContent>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.8);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: 90%;
  background-color: #111;
  border-radius: 15px;
  overflow: hidden;
  border-width: 1px;
  border-color: #222;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #222;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.TouchableOpacity``;

const Body = styled.View`
  padding: 20px;
`;

const FormGroup = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
`;

const StyledInput = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  border-width: 1px;
  border-color: #333;
`;

const StyledTextArea = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  border-radius: 8px;
  padding: 12px;
  min-height: 80px;
  font-size: 16px;
  border-width: 1px;
  border-color: #333;
`;

const PickerContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const PickerOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.selected ? '#541011' : '#1a1a1a'};
  padding: 10px 15px;
  border-radius: 8px;
  gap: 8px;
  border-width: 1px;
  border-color: ${props => props.selected ? '#541011' : '#333'};
`;

const PickerText = styled.Text`
  color: ${props => props.selected ? 'white' : '#666'};
  font-weight: 600;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 15px 20px;
  gap: 12px;
  border-top-width: 1px;
  border-top-color: #222;
`;

const CancelButton = styled.TouchableOpacity`
  padding: 10px 20px;
`;

const ButtonText = styled.Text`
  color: #888;
  font-weight: 600;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #541011;
  padding: 10px 25px;
  border-radius: 8px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  min-width: 80px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export default CreatePlaylistModal;
