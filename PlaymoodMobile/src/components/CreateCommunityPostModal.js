import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const CreateCommunityPostModal = ({ visible, onClose, onCreate, isLoading }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Post content cannot be empty.');
      return;
    }
    onCreate(content);
    setContent('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Overlay>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <ModalContent>
            <Header>
              <HeaderText>Create Community Post</HeaderText>
              <CloseButton onPress={onClose}>
                <Ionicons name="close" size={24} color="white" />
              </CloseButton>
            </Header>

            <Body>
              <Label>What's on your mind?</Label>
              <StyledTextArea
                multiline
                numberOfLines={6}
                value={content}
                onChangeText={setContent}
                placeholder="Share an update with your community..."
                placeholderTextColor="#666"
                textAlignVertical="top"
              />
            </Body>

            <Footer>
              <CancelButton onPress={onClose}>
                <ButtonText>Cancel</ButtonText>
              </CancelButton>
              <SubmitButton onPress={handleSubmit} disabled={isLoading || !content.trim()}>
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <SubmitButtonText>Post</SubmitButtonText>
                )}
              </SubmitButton>
            </Footer>
          </ModalContent>
        </KeyboardAvoidingView>
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

const Label = styled.Text`
  color: #888;
  font-size: 14px;
  margin-bottom: 10px;
`;

const StyledTextArea = styled(TextInput)`
  background-color: #1a1a1a;
  color: white;
  border-radius: 8px;
  padding: 12px;
  min-height: 120px;
  font-size: 16px;
  border-width: 1px;
  border-color: #333;
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

export default CreateCommunityPostModal;
