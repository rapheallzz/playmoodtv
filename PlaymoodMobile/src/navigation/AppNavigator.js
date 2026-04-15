import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MoviePlayer from '../pages/MoviePlayer';
import Schedule from '../pages/Schedule';
import CategoryList from '../pages/CategoryList';
import Watchlist from '../pages/Watchlist';
import Dashboard from '../pages/Dashboard';
import CreatorChannel from '../pages/CreatorChannel';
import StaticPage from '../pages/StaticPage';
import MobileHeader from '../components/MobileHeader';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        header: () => <MobileHeader toggleDrawer={() => navigation.toggleDrawer()} />,
        headerStyle: { height: 120 },
      })}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MoviePlayer" component={MoviePlayer} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="Watchlist" component={Watchlist} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="CreatorChannel" component={CreatorChannel} />
      <Stack.Screen name="StaticPage" component={StaticPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
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
