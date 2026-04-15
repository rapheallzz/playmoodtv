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
          <TouchableOpacity
            style={styles.userInfo}
            onPress={() => props.navigation.navigate('Dashboard')}
          >
            <Text style={styles.userName}>{user.name}</Text>
            <TouchableOpacity onPress={onLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => props.navigation.navigate('Dashboard')}
          >
             {user.profileImage ? (
               <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
             ) : (
               <Ionicons name="person-circle" size={60} color="#541011" />
             )}
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.customMenuItem} onPress={() => props.navigation.navigate('Home')}>
           <Ionicons name="home-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customMenuItem} onPress={() => props.navigation.navigate('Schedule')}>
           <Ionicons name="calendar-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.customMenuItem} onPress={() => props.navigation.navigate('Watchlist')}>
           <Ionicons name="bookmark-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Watchlist</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>Categories</Text>

        <TouchableOpacity
          style={styles.customMenuItem}
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Fashion Show', title: 'Fashion Shows' })}
        >
           <Ionicons name="shirt-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Fashion Shows</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customMenuItem}
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Interview', title: 'Interviews' })}
        >
           <Ionicons name="mic-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Interviews</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customMenuItem}
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Documentary', title: 'Documentaries' })}
        >
           <Ionicons name="videocam-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Documentaries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customMenuItem}
          onPress={() => props.navigation.navigate('CategoryList', { category: 'Teen', title: 'Teens' })}
        >
           <Ionicons name="people-outline" size={22} color="white" />
           <Text style={styles.menuLabel}>Teens</Text>
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
    borderBottomColor: '#111',
    marginBottom: 10,
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
    borderBottomColor: '#111',
    marginBottom: 10,
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
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 20,
  },
  menuLabel: {
    color: 'white',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#111',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  sectionHeader: {
    color: '#541011',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 15,
    marginBottom: 10,
  }
});

export default CustomDrawerContent;
