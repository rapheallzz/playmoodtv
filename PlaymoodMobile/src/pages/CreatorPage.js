import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import useChannelDetails from '../hooks/useChannelDetails';
import BASE_API_URL from '../apiConfig';

const CreatorPage = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    bannerImage, profileImage, creatorName, about, subscribers,
    isLoading: isLoadingChannel, refreshChannel
  } = useChannelDetails(user);

  if (!user || user.role !== 'creator') {
    return (
      <Centered>
        <Text style={{ color: '#fff' }}>Access denied. You must be a creator.</Text>
      </Centered>
    );
  }

  if (isLoadingChannel) {
    return (
      <Centered>
        <ActivityIndicator size="large" color="#541011" />
      </Centered>
    );
  }

  const StatBox = ({ label, value }) => (
    <StatItem>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatItem>
  );

  const navigateToPublicChannel = () => {
    navigation.navigate('CreatorChannel', { creatorId: user._id });
  };

  return (
    <Container>
      <ScrollView>
        <Banner source={{ uri: bannerImage || 'https://via.placeholder.com/800x200' }} />

        <Header>
           <ProfileContainer>
              <ProfileImage source={{ uri: profileImage }} />
           </ProfileContainer>
           <HeaderInfo>
              <CreatorName>{creatorName}</CreatorName>
              <TouchableOpacity onPress={navigateToPublicChannel}>
                <ManageBadge><ManageText>VIEW PUBLIC CHANNEL</ManageText></ManageBadge>
              </TouchableOpacity>
           </HeaderInfo>
        </Header>

        <StatsRow>
           <StatBox label="Subscribers" value={subscribers || 0} />
           <StatBox label="Total Views" value="1.2K" />
           <StatBox label="Uploads" value="24" />
        </StatsRow>

        <ActionGrid>
           <ActionButton onPress={() => Alert.alert('Upload', 'Video upload coming soon to mobile.')}>
              <Ionicons name="cloud-upload-outline" size={32} color="#fff" />
              <ActionLabel>Upload Video</ActionLabel>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Post', 'Community posts coming soon to mobile.')}>
              <Ionicons name="create-outline" size={32} color="#fff" />
              <ActionLabel>Create Post</ActionLabel>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Playlist', 'Playlist management coming soon to mobile.')}>
              <Ionicons name="list-outline" size={32} color="#fff" />
              <ActionLabel>Playlists</ActionLabel>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Analytics', 'Analytics dashboard coming soon to mobile.')}>
              <Ionicons name="bar-chart-outline" size={32} color="#fff" />
              <ActionLabel>Analytics</ActionLabel>
           </ActionButton>
        </ActionGrid>

        <Section>
           <SectionTitle>About Your Channel</SectionTitle>
           <AboutText>{about || 'No description provided.'}</AboutText>
        </Section>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const Centered = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.Image`
  width: 100%;
  height: 120px;
  background-color: #111;
`;

const Header = styled.View`
  flex-direction: row;
  padding: 20px;
  align-items: center;
`;

const ProfileContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 2px;
  border-color: #541011;
  overflow: hidden;
  background-color: #fff;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const HeaderInfo = styled.View`
  margin-left: 15px;
`;

const CreatorName = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

const ManageBadge = styled.View`
  background-color: #541011;
  padding-horizontal: 10px;
  padding-vertical: 6px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

const ManageText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #0a0a0a;
  padding-vertical: 20px;
  margin-vertical: 10px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const StatLabel = styled.Text`
  color: #666;
  font-size: 11px;
  text-transform: uppercase;
  margin-top: 4px;
`;

const ActionGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
`;

const ActionButton = styled.TouchableOpacity`
  width: 48%;
  background-color: #111;
  padding: 25px;
  border-radius: 15px;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
`;

const ActionLabel = styled.Text`
  color: #ccc;
  font-size: 13px;
  font-weight: 500;
`;

const Section = styled.View`
  padding: 20px;
`;

const SectionTitle = styled.Text`
  color: #541011;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const AboutText = styled.Text`
  color: #888;
  font-size: 14px;
  line-height: 22px;
`;

export default CreatorPage;
