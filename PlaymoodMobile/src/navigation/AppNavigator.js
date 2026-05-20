import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import EmailVerification from '../pages/EmailVerification';
import ResetPassword from '../pages/ResetPassword';
import MoviePlayer from '../pages/MoviePlayer';
import Schedule from '../pages/Schedule';
import CategoryList from '../pages/CategoryList';
import Watchlist from '../pages/Watchlist';
import Dashboard from '../pages/Dashboard';
import CreatorChannel from '../pages/CreatorChannel';
import CreatorPage from '../pages/CreatorPage';
import StaticPage from '../pages/StaticPage';
import Onboarding from '../pages/Onboarding';
import MobileHeader from '../components/MobileHeader';
import CustomDrawerContent from './CustomDrawerContent';
import TVSidebar from '../components/TVSidebar';
import { isTV } from '../utils/platform';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        header: isTV ? () => null : () => <MobileHeader toggleDrawer={() => navigation.toggleDrawer()} />,
        headerStyle: isTV ? { height: 0 } : { height: 120 },
      })}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MoviePlayer" component={MoviePlayer} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="Watchlist" component={Watchlist} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="CreatorChannel" component={CreatorChannel} />
      <Stack.Screen name="CreatorPage" component={CreatorPage} />
      <Stack.Screen name="StaticPage" component={StaticPage} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  if (isTV) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#000' }}>
        <TVSidebar />
        <View style={{ flex: 1 }}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#000' }
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MoviePlayer" component={MoviePlayer} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="CategoryList" component={CategoryList} />
            <Stack.Screen name="Watchlist" component={Watchlist} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="CreatorChannel" component={CreatorChannel} />
            <Stack.Screen name="CreatorPage" component={CreatorPage} />
            <Stack.Screen name="StaticPage" component={StaticPage} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
          </Stack.Navigator>
        </View>
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#000000',
          width: 280,
        },
        drawerActiveTintColor: '#8c0734',
        drawerInactiveTintColor: '#ffffff',
      }}
    >
      <Drawer.Screen name="Main" component={MainStack} options={{ drawerLabel: 'Home' }} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
