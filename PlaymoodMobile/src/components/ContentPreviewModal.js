import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Video } from 'expo-av';

const ContentPreviewModal = ({ visible, content, onClose, onWatchNow }) => {
  if (!content) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <CenteredView>
        <ModalView>
          <HeaderRow>
            <TitleText numberOfLines={1}>{content.title}</TitleText>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </CloseButton>
          </HeaderRow>

          <VideoContainer>
             <Video
               source={{ uri: content.video }}
               style={styles.previewVideo}
               resizeMode="cover"
               shouldPlay
               isMuted={true}
               isLooping
             />
          </VideoContainer>

          <DetailsContainer>
             <DescriptionText>{content.description}</DescriptionText>

             <ActionRow>
                <WatchButton onPress={() => { onClose(); onWatchNow(content); }}>
                   <Ionicons name="play" size={20} color="white" />
                   <WatchText>Watch Now</WatchText>
                </WatchButton>

                <SecondaryActions>
                   <ActionIcon>
                      <Ionicons name="heart-outline" size={24} color="white" />
                   </ActionIcon>
                   <ActionIcon>
                      <Ionicons name="add" size={24} color="white" />
                   </ActionIcon>
                   <ActionIcon>
                      <Ionicons name="share-social-outline" size={24} color="white" />
                   </ActionIcon>
                </SecondaryActions>
             </ActionRow>
          </DetailsContainer>
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

const CenteredView = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalView = styled.View`
  background-color: #111;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  padding-bottom: 40px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const TitleText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  flex: 1;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 5px;
`;

const VideoContainer = styled.View`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #000;
`;

const DetailsContainer = styled.View`
  padding: 20px;
`;

const DescriptionText = styled.Text`
  color: #ccc;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WatchButton = styled.TouchableOpacity`
  background-color: #541011;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  gap: 10px;
`;

const WatchText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const SecondaryActions = styled.View`
  flex-direction: row;
  gap: 20px;
`;

const ActionIcon = styled.TouchableOpacity``;

const styles = StyleSheet.create({
  previewVideo: {
    width: '100%',
    height: '100%',
  }
});

export default ContentPreviewModal;
