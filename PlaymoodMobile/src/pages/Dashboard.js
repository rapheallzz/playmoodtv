import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Dashboard = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigation.replace('Home');
  };

  if (!user) {
    return (
      <Centered>
        <MessageText>Please login to view your dashboard.</MessageText>
        <LoginButton onPress={() => navigation.navigate('Login')}>
          <ButtonText>Login</ButtonText>
        </LoginButton>
      </Centered>
    );
  }

  const MenuOption = ({ icon, title, onPress, color = "white" }) => (
    <OptionContainer onPress={onPress}>
      <MenuLeft>
        <Ionicons name={icon} size={22} color={color} />
        <MenuText style={{ color }}>{title}</MenuText>
      </MenuLeft>
      <Ionicons name="chevron-forward" size={20} color="#333" />
    </OptionContainer>
  );

  return (
    <Container>
      <ScrollView>
        <ProfileHeader>
          <ImageContainer>
            {user.profileImage ? (
              <ProfileImage source={{ uri: user.profileImage }} />
            ) : (
              <Ionicons name="person" size={50} color="#541011" />
            )}
          </ImageContainer>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
          <Badge>
            <BadgeText>{user.role?.toUpperCase() || 'USER'}</BadgeText>
          </Badge>
        </ProfileHeader>

        {user.role === 'creator' && (
          <Section>
             <SectionTitle>Creator Studio</SectionTitle>
             <MenuOption
               icon="videocam-outline"
               title="Manage My Channel"
               onPress={() => navigation.navigate('CreatorPage')}
               color="#541011"
             />
          </Section>
        )}

        <Section>
          <SectionTitle>Account Settings</SectionTitle>
          <MenuOption icon="person-outline" title="Edit Profile" />
          <MenuOption icon="lock-closed-outline" title="Change Password" />
          <MenuOption icon="notifications-outline" title="Notifications" />
        </Section>

        <Section>
          <SectionTitle>Content</SectionTitle>
          <MenuOption icon="bookmark-outline" title="Watchlist" onPress={() => navigation.navigate('Watchlist')} />
          <MenuOption icon="time-outline" title="History" />
          <MenuOption icon="heart-outline" title="Liked Videos" />
        </Section>

        <Section>
          <SectionTitle>Support</SectionTitle>
          <MenuOption icon="help-circle-outline" title="Help Center" />
          <MenuOption icon="document-text-outline" title="Terms & Conditions" />
          <MenuOption icon="shield-checkmark-outline" title="Privacy Policy" />
        </Section>

        <LogoutButton onPress={onLogout}>
          <Ionicons name="log-out-outline" size={22} color="#541011" />
          <LogoutText>Log Out</LogoutText>
        </LogoutButton>

        <VersionText>Playmood v1.0.0 (Expo)</VersionText>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const ProfileHeader = styled.View`
  align-items: center;
  padding-vertical: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #111;
`;

const ImageContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  overflow: hidden;
  border-width: 3px;
  border-color: #541011;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const UserName = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

const UserEmail = styled.Text`
  color: #666;
  font-size: 14px;
  margin-top: 4px;
`;

const Badge = styled.View`
  background-color: #541011;
  padding-horizontal: 12px;
  padding-vertical: 4px;
  border-radius: 4px;
  marginTop: 10px;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

const Section = styled.View`
  marginTop: 25px;
  padding-horizontal: 20px;
`;

const SectionTitle = styled.Text`
  color: #541011;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #0a0a0a;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 8px;
`;

const MenuLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MenuText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-left: 15px;
`;

const LogoutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 30px;
  padding: 15px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #541011;
`;

const LogoutText = styled.Text`
  color: #541011;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

const VersionText = styled.Text`
  color: #333;
  text-align: center;
  font-size: 12px;
  margin-bottom: 40px;
`;

const Centered = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const MessageText = styled.Text`
  color: #666;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #541011;
  padding-horizontal: 40px;
  padding-vertical: 12px;
  border-radius: 25px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export default Dashboard;
