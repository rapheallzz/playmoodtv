import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { Ionicons } from '@expo/vector-icons';

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
      <View style={styles.centered}>
        <Text style={styles.message}>Please login to view your dashboard.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const MenuOption = ({ icon, title, onPress, color = "white" }) => (
    <TouchableOpacity style={styles.menuOption} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={color} />
        <Text style={[styles.menuText, { color }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#333" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          {user.profileImage ? (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person" size={50} color="#541011" />
          )}
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{user.role?.toUpperCase() || 'USER'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <MenuOption icon="person-outline" title="Edit Profile" />
        <MenuOption icon="lock-closed-outline" title="Change Password" />
        <MenuOption icon="notifications-outline" title="Notifications" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content</Text>
        <MenuOption icon="bookmark-outline" title="Watchlist" onPress={() => navigation.navigate('Watchlist')} />
        <MenuOption icon="time-outline" title="History" />
        <MenuOption icon="heart-outline" title="Liked Videos" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <MenuOption icon="help-circle-outline" title="Help Center" />
        <MenuOption icon="document-text-outline" title="Terms & Conditions" />
        <MenuOption icon="shield-checkmark-outline" title="Privacy Policy" />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={22} color="#541011" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Playmood v1.0.0 (Expo)</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#541011',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#541011',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#541011',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginLeft: 5,
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#541011',
    gap: 10,
  },
  logoutText: {
    color: '#541011',
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    color: '#333',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 40,
  },
  centered: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  message: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#541011',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default Dashboard;
