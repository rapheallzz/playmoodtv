import React from 'react';
import styled from 'styled-components/native';
import { Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MobileHeader = ({ toggleDrawer }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeHeader>
      <Container>
        <TopRow>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Logo
              source={require('../../assets/PLAYMOOD_DEF.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <RightActions>
            <PostButton>
              <PostText>Post</PostText>
              <Ionicons name="add" size={16} color="white" />
            </PostButton>

            <ProfileCircle
              onPress={() => user ? navigation.navigate('Dashboard') : navigation.navigate('Login')}
            >
               <Ionicons name="person" size={20} color="white" />
            </ProfileCircle>
          </RightActions>
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

        <Hamburger onPress={toggleDrawer}>
           <Ionicons name="menu" size={30} color="white" />
        </Hamburger>
      </Container>
    </SafeHeader>
  );
};

const SafeHeader = styled(SafeAreaView)`
  background-color: rgba(0,0,0,0.6);
`;

const Container = styled.View`
  height: 100px;
  width: 100%;
  padding-horizontal: 20px;
  justify-content: center;
  position: relative;
`;

const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Logo = styled(Image)`
  width: 120px;
  height: 30px;
`;

const RightActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: white;
  padding-horizontal: 10px;
  padding-vertical: 4px;
  border-radius: 2px;
  margin-right: 15px;
`;

const PostText = styled.Text`
  color: white;
  font-size: 12px;
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

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const NavTouchable = styled(TouchableOpacity)``;

const NavLink = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: 500;
`;

const Hamburger = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 1002;
`;

export default MobileHeader;
