import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './src/features/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import Sidebar from './src/components/Sidebar';

const Stack = createStackNavigator();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        dispatch(setUser(JSON.parse(user)));
      }
    };
    loadUser();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegistrationScreen} />
        </Stack.Navigator>
        <Sidebar />
      </View>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
