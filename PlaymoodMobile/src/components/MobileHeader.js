import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { GiHamburgerMenu } from 'react-icons/gi'; // We will use Expo icons instead
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MobileHeader = ({ toggleDrawer }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/PLAYMOOD_DEF.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postText}>Post</Text>
              <Ionicons name="add" size={16} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileCircle}
              onPress={() => user ? navigation.navigate('Dashboard') : navigation.navigate('Login')}
            >
               <Ionicons name="person" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.navLink}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navLink}>CHANNELS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
            <Text style={styles.navLink}>SCHEDULE</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.navLink}>SPACES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Stories')}>
            <Text style={styles.navLink}>STORIES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Diaries')}>
            <Text style={styles.navLink}>DIARIES</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.hamburger} onPress={toggleDrawer}>
           <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    height: 100,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 30,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
  },
  postText: {
    color: 'white',
    fontSize: 12,
    marginRight: 4,
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8c0734',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  navLink: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  hamburger: {
    position: 'absolute',
    left: 10,
    bottom: -40, // Adjust based on layout
    zIndex: 1002,
  }
});

export default MobileHeader;
