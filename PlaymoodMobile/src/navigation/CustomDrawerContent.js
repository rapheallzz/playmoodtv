import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const CustomDrawerContent = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  const onLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            dispatch(logout());
            dispatch(reset());
            props.navigation.navigate('Home');
          }
        }
      ]
    );
  };

  const navToCategory = (category, title) => {
    props.navigation.navigate('CategoryList', { category, title });
  };

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }}>
      {user ? (
        <UserSection>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => props.navigation.navigate('Dashboard')}
          >
            <UserName>{user.name}</UserName>
            <TouchableOpacity onPress={onLogout}>
              <LogoutText>Logout</LogoutText>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Dashboard')}
          >
             <ProfileImageContainer>
                {user.profileImage ? (
                  <ProfileImage source={{ uri: user.profileImage }} />
                ) : (
                  <Ionicons name="person-circle" size={60} color="#541011" />
                )}
             </ProfileImageContainer>
          </TouchableOpacity>
        </UserSection>
      ) : (
        <LoginPrompt>
           <LoginPromptText>Join Playmood</LoginPromptText>
           <LoginButton
             onPress={() => props.navigation.navigate('Login')}
           >
             <LoginButtonText>Login / Register</LoginButtonText>
           </LoginButton>
        </LoginPrompt>
      )}

      <MenuItems>
        <MenuAction onPress={() => props.navigation.navigate('Home')}>
           <Ionicons name="home-outline" size={22} color="white" />
           <MenuLabel>Home</MenuLabel>
        </MenuAction>

        {user?.role === 'creator' && (
          <MenuAction onPress={() => props.navigation.navigate('CreatorPage')}>
             <Ionicons name="videocam-outline" size={22} color="white" />
             <MenuLabel>Creator Studio</MenuLabel>
          </MenuAction>
        )}

        <MenuAction onPress={() => props.navigation.navigate('Schedule')}>
           <Ionicons name="calendar-outline" size={22} color="white" />
           <MenuLabel>Schedule</MenuLabel>
        </MenuAction>

        <MenuAction onPress={() => props.navigation.navigate('Watchlist')}>
           <Ionicons name="bookmark-outline" size={22} color="white" />
           <MenuLabel>Watchlist</MenuLabel>
        </MenuAction>

        <Divider />

        <MenuAction onPress={() => setCategoriesOpen(!categoriesOpen)}>
           <Ionicons name="apps-outline" size={22} color="white" />
           <MenuLabel>Categories</MenuLabel>
           <Ionicons
             name={categoriesOpen ? "chevron-up" : "chevron-down"}
             size={18}
             color="#541011"
             style={{ marginLeft: 'auto' }}
           />
        </MenuAction>

        {categoriesOpen && (
          <SubMenu>
            <SubMenuAction onPress={() => navToCategory('Channel', 'Channels')}>
               <MenuLabelSmall>Channels</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Diary', 'Diaries')}>
               <MenuLabelSmall>Diaries</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Space', 'Spaces')}>
               <MenuLabelSmall>Spaces</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Interview', 'Interviews')}>
               <MenuLabelSmall>Interviews</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Fashion Show', 'Fashion Shows')}>
               <MenuLabelSmall>Fashion Shows</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Documentary', 'Documentaries')}>
               <MenuLabelSmall>Documentaries</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Behind the Cameras', 'Behind the Cameras')}>
               <MenuLabelSmall>Behind the Cameras</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Teen', 'Teens')}>
               <MenuLabelSmall>Teens</MenuLabelSmall>
            </SubMenuAction>
            <SubMenuAction onPress={() => navToCategory('Social', 'Social')}>
               <MenuLabelSmall>Social</MenuLabelSmall>
            </SubMenuAction>
          </SubMenu>
        )}

        <Divider />

        <MenuAction onPress={() => props.navigation.navigate('StaticPage', { title: 'Privacy Policy', content: 'Playmood respects your privacy...' })}>
           <Ionicons name="shield-checkmark-outline" size={22} color="#666" />
           <MenuLabel style={{ color: '#666' }}>Privacy Policy</MenuLabel>
        </MenuAction>

        <MenuAction onPress={() => props.navigation.navigate('StaticPage', { title: 'Cookies Policy', content: 'We use cookies to improve experience...' })}>
           <Ionicons name="information-circle-outline" size={22} color="#666" />
           <MenuLabel style={{ color: '#666' }}>Cookies Policy</MenuLabel>
        </MenuAction>
      </MenuItems>
    </Container>
  );
};

const Container = styled(DrawerContentScrollView)`
  background-color: #000;
`;

const UserSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #111;
  margin-bottom: 10px;
`;

const UserName = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const LogoutText = styled.Text`
  color: #999;
  font-size: 12px;
  margin-top: 5px;
`;

const ProfileImageContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const LoginPrompt = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #111;
  margin-bottom: 10px;
`;

const LoginPromptText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #541011;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
`;

const LoginButtonText = styled.Text`
  color: white;
  font-weight: 600;
`;

const MenuItems = styled.View`
  padding-horizontal: 10px;
`;

const MenuAction = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 12px;
  padding-horizontal: 15px;
`;

const MenuLabel = styled.Text`
  color: white;
  font-size: 15px;
  margin-left: 20px;
`;

const SubMenu = styled.View`
  padding-left: 55px;
  padding-bottom: 10px;
`;

const SubMenuAction = styled.TouchableOpacity`
  padding-vertical: 8px;
`;

const MenuLabelSmall = styled.Text`
  color: #ccc;
  font-size: 14px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #111;
  margin-vertical: 10px;
  margin-horizontal: 15px;
`;

export default CustomDrawerContent;
