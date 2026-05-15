import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image, TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import PostActionsModal from './PostActionsModal';

const MobileHeader = ({ toggleDrawer }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [actionsVisible, setActionsVisible] = useState(false);

  const onPostPress = () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    if (user.role === 'creator') {
      setActionsVisible(true);
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const onActionSelect = (id) => {
    navigation.navigate('CreatorPage', { openModal: id });
  };

  return (
    <SafeHeader>
      <Container>
        <TopRow>
          <SideSection>
            <Hamburger onPress={toggleDrawer}>
              <Ionicons name="menu" size={30} color="white" />
            </Hamburger>
          </SideSection>

          <CenterSection>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Logo
                source={require('../../assets/PLAYMOOD_DEF.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </CenterSection>

          <SideSection>
            <RightActions>
              <PostButton onPress={onPostPress}>
                <PostText>Post</PostText>
                <Ionicons name="add" size={16} color="white" />
              </PostButton>

              <ProfileCircle
                onPress={() => user ? navigation.navigate('Dashboard') : navigation.navigate('Login')}
              >
                <Ionicons name="person" size={20} color="white" />
              </ProfileCircle>
            </RightActions>
          </SideSection>
        </TopRow>

        <BottomRow>
          <NavTouchable onPress={() => navigation.navigate('Home')}>
            <NavLink>HOME</NavLink>
          </NavTouchable>
          <NavTouchable onPress={() => navigation.navigate('Schedule')}>
            <NavLink>CHANNELS</NavLink>
          </NavTouchable>
          <NavTouchable onPress={() => navigation.navigate('Schedule')}>
            <NavLink>SCHEDULE</NavLink>
          </NavTouchable>
          <NavTouchable>
            <NavLink>SPACES</NavLink>
          </NavTouchable>
          <NavTouchable onPress={() => navigation.navigate('CategoryList', { category: 'Story', title: 'Stories' })}>
            <NavLink>STORIES</NavLink>
          </NavTouchable>
          <NavTouchable onPress={() => navigation.navigate('CategoryList', { category: 'Diary', title: 'Diaries' })}>
            <NavLink>DIARIES</NavLink>
          </NavTouchable>
        </BottomRow>

        <PostActionsModal
          visible={actionsVisible}
          onClose={() => setActionsVisible(false)}
          onSelect={onActionSelect}
        />
      </Container>
    </SafeHeader>
  );
};

const SafeHeader = styled(SafeAreaView)`
  background-color: rgba(0,0,0,0.8);
`;

const Container = styled(View)`
  height: 120px;
  width: 100%;
  justify-content: center;
`;

const TopRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  height: 50px;
  padding-horizontal: 10px;
`;

const SideSection = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const CenterSection = styled(View)`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(Image)`
  width: 120px;
  height: 40px;
`;

const RightActions = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const PostButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: white;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 2px;
  margin-right: 10px;
`;

const PostText = styled(Text)`
  color: white;
  font-size: 11px;
  margin-right: 4px;
`;

const ProfileCircle = styled(TouchableOpacity)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #8c0734;
  justify-content: center;
  align-items: center;
`;

const BottomRow = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const NavTouchable = styled(TouchableOpacity)``;

const NavLink = styled(Text)`
  color: white;
  font-size: 10px;
  font-weight: 500;
`;

const Hamburger = styled(TouchableOpacity)``;

export default MobileHeader;
