import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Video } from 'expo-av';

const { height, width } = Dimensions.get('window');

const HighlightViewerModal = ({ visible, highlight, onClose }) => {
  if (!highlight) return null;

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <Container>
        <Video
          source={{ uri: highlight.highlightUrl || highlight.content?.video }}
          style={styles.fullVideo}
          resizeMode="cover"
          shouldPlay
          isLooping
          useNativeControls={false}
        />

        <Overlay>
          <Header>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
          </Header>

          <Footer>
            <CreatorRow>
               <ProfileImage source={{ uri: highlight.user?.profileImage }} />
               <CreatorName>{highlight.user?.name}</CreatorName>
               <SubscribeButtonSmall>
                  <SubscribeTextSmall>FOLLOW</SubscribeTextSmall>
               </SubscribeButtonSmall>
            </CreatorRow>

            <CaptionText>{highlight.content?.title || highlight.caption}</CaptionText>
          </Footer>

          <SideActions>
             <ActionButton>
                <Ionicons name="heart" size={35} color="white" />
                <ActionCount>1.2K</ActionCount>
             </ActionButton>
             <ActionButton>
                <Ionicons name="chatbubble" size={30} color="white" />
                <ActionCount>84</ActionCount>
             </ActionButton>
             <ActionButton>
                <Ionicons name="share-social" size={30} color="white" />
                <ActionCount>Share</ActionCount>
             </ActionButton>
          </SideActions>
        </Overlay>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-between;
  padding-vertical: 50px;
  padding-horizontal: 20px;
  background-color: rgba(0,0,0,0.2);
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Footer = styled.View`
  gap: 15px;
  max-width: 80%;
`;

const CreatorRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #fff;
`;

const CreatorName = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const SubscribeButtonSmall = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #fff;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 4px;
`;

const SubscribeTextSmall = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

const CaptionText = styled.Text`
  color: #fff;
  font-size: 14px;
  line-height: 20px;
`;

const SideActions = styled.View`
  position: absolute;
  right: 15px;
  bottom: 100px;
  gap: 25px;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  align-items: center;
  gap: 5px;
`;

const ActionCount = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`;

const styles = StyleSheet.create({
  fullVideo: {
    width: width,
    height: height,
  }
});

export default HighlightViewerModal;
