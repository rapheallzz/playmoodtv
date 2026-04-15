import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { Ionicons } from '@expo/vector-icons';

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
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {user ? (
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileImageContainer}>
             {user.profileImage ? (
               <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
             ) : (
               <Ionicons name="person-circle" size={60} color="#541011" />
             )}
          </View>
        </View>
      ) : (
        <View style={styles.loginPrompt}>
           <Text style={styles.loginText}>Join Playmood</Text>
           <TouchableOpacity
             style={styles.loginButton}
             onPress={() => props.navigation.navigate('Login')}
           >
             <Text style={styles.loginButtonText}>Login / Register</Text>
           </TouchableOpacity>
        </View>
      )}

      <View style={styles.menuItems}>
        <DrawerItemList {...props} />

        <TouchableOpacity style={styles.customMenuItem} onPress={() => props.navigation.navigate('Home')}>
           <Ionicons name="search-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customMenuItem} onPress={() => props.navigation.navigate('Home')}>
           <Ionicons name="home-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customMenuItem}>
           <Ionicons name="thumbs-up-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Recommended</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customMenuItem}>
           <Ionicons name="flash-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>New on Playmood</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customMenuItem}>
           <Ionicons name="snow-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Channels</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 20,
  },
  userInfo: {
    gap: 5,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#999',
    fontSize: 12,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  loginPrompt: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 20,
    gap: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#541011',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  menuItems: {
    paddingHorizontal: 10,
  },
  customMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 20,
  },
  menuLabel: {
    color: 'white',
    fontSize: 14,
  }
});

export default CustomDrawerContent;
