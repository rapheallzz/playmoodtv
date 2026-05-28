import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Video } from 'expo-av';
import Carousel from 'react-native-reanimated-carousel';

const { height, width } = Dimensions.get('window');

const HighlightItem = ({ item, index, activeIndex, visible, onNext, onClose, onProfilePress }) => {
  const videoRef = useRef(null);
  const isPlaying = visible && index === activeIndex;

  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.setPositionAsync(0);
    }
  }, [isPlaying]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish && isPlaying) {
      onNext();
    }
  };

  return (
    <Container>
      <Video
        ref={videoRef}
        source={{ uri: item.highlightUrl || item.content?.video }}
        style={styles.fullVideo}
        resizeMode="cover"
        shouldPlay={isPlaying}
        isLooping={false}
        useNativeControls={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />

      <Overlay>
        <Header>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
        </Header>

        <Footer>
          <TouchableOpacity onPress={() => onProfilePress(item.user)}>
            <CreatorRow>
               <ProfileImage source={{ uri: item.user?.profileImage }} />
               <CreatorName>{item.user?.name}</CreatorName>
               <SubscribeButtonSmall>
                  <SubscribeTextSmall>SUBSCRIBE</SubscribeTextSmall>
               </SubscribeButtonSmall>
            </CreatorRow>
          </TouchableOpacity>

          <CaptionText>{item.content?.title || item.caption}</CaptionText>
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
  );
};

const HighlightViewerModal = ({ visible, highlights, initialIndex = 0, onClose, onProfilePress }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setActiveIndex(initialIndex);
    }
  }, [visible, initialIndex]);

  if (!highlights || highlights.length === 0) return null;

  const handleNext = () => {
    if (activeIndex < highlights.length - 1) {
      carouselRef.current?.next();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <Carousel
        ref={carouselRef}
        vertical
        width={width}
        height={height}
        data={highlights}
        defaultIndex={initialIndex}
        scrollAnimationDuration={500}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item, index }) => (
          <HighlightItem
            item={item}
            index={index}
            activeIndex={activeIndex}
            visible={visible}
            onNext={handleNext}
            onClose={onClose}
            onProfilePress={onProfilePress}
          />
        )}
      />
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

const SubscribeButtonSmall = styled.View`
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
