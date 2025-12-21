import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState, AppDispatch } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SignInScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen';
import MoviePage from './src/screens/MoviePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './src/features/authSlice';


const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
    </AuthStack.Navigator>
);

const MainNavigator = () => (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Movie" component={MoviePage} />
    </MainStack.Navigator>
);

const AppNavigator = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkUser = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
        }
    };
    checkUser();
    }, [dispatch]);

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
