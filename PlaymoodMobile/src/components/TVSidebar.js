import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const navLinks = [
  { to: "Home", label: "New on Playmood" },
  { to: "CategoryList", params: { category: 'Channel', title: 'Channels' }, label: "Channels" },
  { to: "CategoryList", params: { category: 'Diary', title: 'Diaries' }, label: "Diaries" },
  { to: "CategoryList", params: { category: 'Space', title: 'Spaces' }, label: "Spaces" },
  { to: "CategoryList", params: { category: 'Story', title: 'Stories' }, label: "Stories" },
  { to: "Watchlist", label: "Watchlist" },
  { to: "Schedule", label: "Schedule" },
];

const TVSidebar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((state) => state.auth);

  const activeRoute = route.name;

  return (
    <SidebarContainer>
      <LogoContainer onPress={() => navigation.navigate('Home')}>
        <Logo
          source={require('../../assets/PLAYMOOD_DEF.png')}
          resizeMode="contain"
        />
      </LogoContainer>

      <NavItems>
        {navLinks.map((link, index) => (
          <NavItem
            key={index}
            hasTVPreferredFocus={index === 0}
            onPress={() => navigation.navigate(link.to, link.params)}
            active={activeRoute === link.to}
          >
            <NavLinkText active={activeRoute === link.to}>
              {link.label}
            </NavLinkText>
          </NavItem>
        ))}
      </NavItems>

      <BottomSection>
        <ProfileButton
          onPress={() => user ? navigation.navigate('Dashboard') : navigation.navigate('Login')}
        >
          <Ionicons name="person-circle" size={40} color={user ? "#8c0734" : "white"} />
          <ProfileText>{user ? user.username : 'Login'}</ProfileText>
        </ProfileButton>
      </BottomSection>
    </SidebarContainer>
  );
};

const SidebarContainer = styled(View)`
  width: 260px;
  height: 100%;
  background-color: #000;
  border-right-width: 1px;
  border-right-color: #333;
  padding-vertical: 40px;
  padding-horizontal: 20px;
`;

const LogoContainer = styled(TouchableOpacity)`
  margin-bottom: 40px;
  align-items: center;
`;

const Logo = styled(Image)`
  width: 180px;
  height: 60px;
`;

const NavItems = styled(ScrollView)`
  flex: 1;
`;

const NavItem = styled(TouchableOpacity)`
  padding-vertical: 12px;
  padding-horizontal: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${props => props.active ? 'rgba(140, 7, 52, 0.2)' : 'transparent'};
  border-left-width: 3px;
  border-left-color: ${props => props.active ? '#8c0734' : 'transparent'};
`;

const NavLinkText = styled(Text)`
  color: ${props => props.active ? '#8c0734' : 'white'};
  font-size: 16px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const BottomSection = styled(View)`
  margin-top: 20px;
`;

const ProfileButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: #111;
`;

const ProfileText = styled(Text)`
  color: white;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
`;

export default TVSidebar;
