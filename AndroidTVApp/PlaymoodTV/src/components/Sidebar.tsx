import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { setSearchQuery } from '../features/contentSlice';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { searchQuery } = useSelector((state) => state.content);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const menuItems = [
    { icon: 'home-outline', text: 'Home', screen: 'Home' },
    { icon: 'search-outline', text: 'Search', action: () => setIsExpanded(true) },
    { icon: 'tv-outline', text: 'Channels', screen: 'Home' },
    { icon: 'calendar-outline', text: 'Schedule', screen: 'Home' },
    { icon: 'compass-outline', text: 'Spaces', screen: 'Home' },
    { icon: 'book-outline', text: 'Stories', screen: 'Home' },
    { icon: 'journal-outline', text: 'Diaries', screen: 'Home' },
  ];

  const categories = [
    'TOP 10',
    'New on Playmood',
    'Channels',
    'Diaries',
    'Spaces',
    'Recommendations for you',
    'Interviews',
    'Fashion Shows Stories',
    'Documentaries and Reports',
    'Behind the cameras',
    'Soon in Playmood',
    'Teen',
    'Best in Fashion',
    'Only in Playmood',
    'Watchlist',
  ];

  return (
    <Container isExpanded={isExpanded}>
      <FocusableTouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={{ padding: 10, alignItems: 'center' }}
      >
        <Ionicons name={isExpanded ? 'close' : 'menu'} size={30} color="white" />
      </FocusableTouchableOpacity>

      <ScrollView>
        {user && isExpanded && (
          <ProfileContainer>
            <ProfileImage source={{ uri: user.profileImage }} />
            <Username>{user.name}</Username>
          </ProfileContainer>
        )}

        {isExpanded && (
          <SearchContainer>
            <Ionicons name="search" size={20} color="#fff" style={{ marginRight: 10 }} />
            <SearchInput
              placeholder="Search..."
              placeholderTextColor="#8e8e8e"
              value={searchQuery}
              onChangeText={(text) => dispatch(setSearchQuery(text))}
            />
          </SearchContainer>
        )}

        <MenuContainer>
          {menuItems.map((item) => (
            <FocusableTouchableOpacity
              key={item.text}
              onPress={() => (item.action ? item.action() : navigation.navigate(item.screen))}
            >
              <MenuItem>
                <Ionicons name={item.icon} size={24} color="white" />
                {isExpanded && <MenuText>{item.text}</MenuText>}
              </MenuItem>
            </FocusableTouchableOpacity>
          ))}
          <FocusableTouchableOpacity onPress={() => setShowCategories(!showCategories)}>
            <MenuItem>
              <Ionicons name="grid-outline" size={24} color="white" />
              {isExpanded && <MenuText>Categories</MenuText>}
            </MenuItem>
          </FocusableTouchableOpacity>
          {isExpanded && showCategories && (
            <CategoriesContainer>
              {categories.map((category) => (
                <FocusableTouchableOpacity key={category}>
                  <CategoryText>{category}</CategoryText>
                </FocusableTouchableOpacity>
              ))}
            </CategoriesContainer>
          )}
        </MenuContainer>
      </ScrollView>

      <AuthContainer>
        {user ? (
          <FocusableTouchableOpacity onPress={handleLogout}>
            <MenuItem>
              <Ionicons name="log-out-outline" size={24} color="white" />
              {isExpanded && <MenuText>Logout</MenuText>}
            </MenuItem>
          </FocusableTouchableOpacity>
        ) : (
          <FocusableTouchableOpacity
            onPress={() => navigation.navigate('Login')}
          >
            <MenuItem>
              <Ionicons name="log-in-outline" size={24} color="white" />
              {isExpanded && <MenuText>Login</MenuText>}
            </MenuItem>
          </FocusableTouchableOpacity>
        )}
      </AuthContainer>
    </Container>
  );
};

const Container = styled.View`
  width: ${(props) => (props.isExpanded ? '250px' : '60px')};
  height: 100%;
  background-color: #101010;
  padding-top: 40px;
  justify-content: space-between;
`;

const ProfileContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const Username = styled.Text`
  color: white;
  font-size: 16px;
  margin-top: 10px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #1c1c1e;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 0 10px 20px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;

const MenuContainer = styled.View`
  flex: 1;
`;

const MenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

const MenuText = styled.Text`
  color: white;
  font-size: 16px;
  margin-left: 15px;
`;

const CategoriesContainer = styled.View`
  margin-left: 30px;
`;

const CategoryText = styled.Text`
  color: white;
  font-size: 14px;
  padding: 10px;
`;

const AuthContainer = styled.View`
  padding-bottom: 20px;
`;

export default Sidebar;
