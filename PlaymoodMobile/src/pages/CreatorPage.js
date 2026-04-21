import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import useChannelDetails from '../hooks/useChannelDetails';
import BASE_API_URL from '../apiConfig';
import PostActionsModal from '../components/PostActionsModal';

const CreatorPage = ({ route, navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    bannerImage, profileImage, creatorName, about, subscribers,
    isLoading: isLoadingChannel, refreshChannel
  } = useChannelDetails(user);

  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    if (route.params?.openModal) {
      // Logic to handle opening specific action if needed
      console.log('Open modal:', route.params.openModal);
    }
  }, [route.params]);

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

  const handleActionSelect = (id) => {
    Alert.alert('Action Selected', `The ${id} creation flow is coming soon to mobile.`);
  };

  return (
    <Container>
      <ScrollView>
        <BannerImage source={{ uri: bannerImage || 'https://via.placeholder.com/800x200' }} resizeMode="cover" />

        <Header>
           <ProfileContainer>
              <ProfileImage source={{ uri: profileImage }} />
           </ProfileContainer>
           <HeaderInfo>
              <CreatorNameText>{creatorName}</CreatorNameText>
              <TouchableOpacity onPress={navigateToPublicChannel}>
                <ManageBadge><ManageTextText>VIEW PUBLIC CHANNEL</ManageTextText></ManageBadge>
              </TouchableOpacity>
           </HeaderInfo>
        </Header>

        <StatsRow>
           <StatBox label="Subscribers" value={subscribers || 0} />
           <StatBox label="Total Views" value="1.2K" />
           <StatBox label="Uploads" value="24" />
        </StatsRow>

        <ActionGrid>
           <ActionButton onPress={() => setActionsVisible(true)}>
              <Ionicons name="add-circle-outline" size={32} color="#fff" />
              <ActionLabelText>Create New</ActionLabelText>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Analytics', 'Analytics dashboard coming soon to mobile.')}>
              <Ionicons name="bar-chart-outline" size={32} color="#fff" />
              <ActionLabelText>Analytics</ActionLabelText>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Comments', 'Comment management coming soon to mobile.')}>
              <Ionicons name="chatbubbles-outline" size={32} color="#fff" />
              <ActionLabelText>Comments</ActionLabelText>
           </ActionButton>
           <ActionButton onPress={() => Alert.alert('Settings', 'Channel settings coming soon to mobile.')}>
              <Ionicons name="settings-outline" size={32} color="#fff" />
              <ActionLabelText>Settings</ActionLabelText>
           </ActionButton>
        </ActionGrid>

        <Section>
           <SectionTitleText>About Your Channel</SectionTitleText>
           <AboutText>{about || 'No description provided.'}</AboutText>
        </Section>
      </ScrollView>

      <PostActionsModal
        visible={actionsVisible}
        onClose={() => setActionsVisible(false)}
        onSelect={handleActionSelect}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #000;
`;

const Centered = styled(View)`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 120px;
  background-color: #111;
`;

const Header = styled(View)`
  flex-direction: row;
  padding: 20px;
  align-items: center;
`;

const ProfileContainer = styled(View)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 2px;
  border-color: #541011;
  overflow: hidden;
  background-color: #fff;
`;

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const HeaderInfo = styled(View)`
  margin-left: 15px;
`;

const CreatorNameText = styled(Text)`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

const ManageBadge = styled(View)`
  background-color: #541011;
  padding-horizontal: 10px;
  padding-vertical: 6px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

const ManageTextText = styled(Text)`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

const StatsRow = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  background-color: #0a0a0a;
  padding-vertical: 20px;
  margin-vertical: 10px;
`;

const StatItem = styled(View)`
  align-items: center;
`;

const StatValue = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const StatLabel = styled(Text)`
  color: #666;
  font-size: 11px;
  text-transform: uppercase;
  margin-top: 4px;
`;

const ActionGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
`;

const ActionButton = styled(TouchableOpacity)`
  width: 48%;
  background-color: #111;
  padding: 25px;
  border-radius: 15px;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
`;

const ActionLabelText = styled(Text)`
  color: #ccc;
  font-size: 13px;
  font-weight: 500;
`;

const Section = styled(View)`
  padding: 20px;
`;

const SectionTitleText = styled(Text)`
  color: #541011;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const AboutText = styled(Text)`
  color: #888;
  font-size: 14px;
  line-height: 22px;
`;

export default CreatorPage;
