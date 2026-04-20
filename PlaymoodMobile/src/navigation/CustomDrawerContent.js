import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const CustomDrawerContent = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
        <SectionHeader>Categories</SectionHeader>

        <MenuAction
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Fashion Show', title: 'Fashion Shows' })}
        >
           <Ionicons name="shirt-outline" size={22} color="white" />
           <MenuLabel>Fashion Shows</MenuLabel>
        </MenuAction>

        <MenuAction
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Interview', title: 'Interviews' })}
        >
           <Ionicons name="mic-outline" size={22} color="white" />
           <MenuLabel>Interviews</MenuLabel>
        </MenuAction>

        <MenuAction
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Documentary', title: 'Documentaries' })}
        >
           <Ionicons name="videocam-outline" size={22} color="white" />
           <MenuLabel>Documentaries</MenuLabel>
        </MenuAction>

        <MenuAction
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Teen', title: 'Teens' })}
        >
           <Ionicons name="people-outline" size={22} color="white" />
           <MenuLabel>Teens</MenuLabel>
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

const Divider = styled.View`
  height: 1px;
  background-color: #111;
  margin-vertical: 15px;
  margin-horizontal: 15px;
`;

const SectionHeader = styled.Text`
  color: #541011;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 15px;
  margin-bottom: 10px;
`;

export default CustomDrawerContent;
