import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './src/features/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';
import VideoPlayerScreen from './src/pages/VideoPlayerScreen';
import HighlightsScreen from './src/pages/HighlightsScreen';
import MoviePage from './src/pages/MoviePage';
import { restoreUser } from './src/features/authSlice';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
            <Stack.Screen name="Highlights" component={HighlightsScreen} />
            <Stack.Screen name="MoviePage" component={MoviePage} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppContent />
    </Provider>
  );
}

export default App;
