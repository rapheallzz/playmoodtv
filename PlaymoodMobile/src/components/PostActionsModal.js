import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const PostActionsModal = ({ visible, onClose, onSelect }) => {
  const actions = [
    { id: 'highlight', label: 'Highlight', icon: 'flash-outline' },
    { id: 'playlist', label: 'Playlist', icon: 'list-outline' },
    { id: 'community', label: 'Post', icon: 'create-outline' },
    { id: 'feed', label: 'Feed', icon: 'images-outline' },
    { id: 'video', label: 'Video', icon: 'cloud-upload-outline' },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Overlay onPress={onClose}>
        <ModalContent>
          <Header>
            <HeaderText>Create</HeaderText>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </CloseButton>
          </Header>

          <ActionsList>
            {actions.map((action) => (
              <ActionItem key={action.id} onPress={() => { onClose(); onSelect(action.id); }}>
                <IconContainer>
                  <Ionicons name={action.icon} size={24} color="white" />
                </IconContainer>
                <ActionLabel>{action.label}</ActionLabel>
              </ActionItem>
            ))}
          </ActionsList>
        </ModalContent>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: #111;
  border-radius: 20px;
  overflow: hidden;
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

const ActionsList = styled.View`
  padding: 10px;
`;

const ActionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  gap: 15px;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: #222;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const ActionLabel = styled.Text`
  color: #ccc;
  font-size: 16px;
  font-weight: 500;
`;

export default PostActionsModal;
