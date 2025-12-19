import React, { useEffect } from 'react';
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            title: '',
          }}
        />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
      </Stack.Navigator>
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
