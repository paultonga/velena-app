import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/Welcome';
import IntroScreen from '../screens/Intro';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ForgotPasswordScreen from '../screens/Forgot';
import sharedStyles from '../shared/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import SearchScreen from '../screens/Search';
import DealsScreen from '../screens/Deals';
import BookingsScreen from '../screens/Bookings';
import FavoritesScreen from '../screens/Favorites';
import ProfileScreen from '../screens/Profile';
import Fonts from '../ui/Fonts';
import Splash from '../screens/Splash';
import ServiceScreen from '../screens/ServiceScreen';
import ServicesScreen from '../screens/ServicesScreen';
import {isAndroid} from '../utils/platform';
import DashboardScreen from '../screens/Dashboard';
import UserManagementScreen from '../screens/UserManagement';
import BookingManagementScreen from '../screens/BookingManagement';
import ServicesTabScreen from '../screens/ServicesTabScreen';

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Intro"
      component={IntroScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Forgot"
      component={ForgotPasswordScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const MainTabNavigation = () => (
  <Tab.Navigator
    initialRouteName="Search"
    tabBarOptions={{
      style: {
        height: isAndroid ? hp(10) : hp(12),
        paddingBottom: hp(1),
      },
      keyboardHidesTabBar: true,
      activeTintColor: 'black',
      tabStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      labelStyle: {
        fontFamily: Fonts.bold,
        fontSize: wp(3.2),
        lineHeight: wp(3.2),
      },
      iconStyle: {
        margin: 0,
      },
    }}>
    <Tab.Screen
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({color, size, focused}) => (
          <Icon size={size} color={color} name="search" />
        ),
      }}
      component={SearchScreen}
      name="Search"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Services',
        tabBarIcon: ({color, size, focused}) => (
          <Icon size={size} color={color} name="heart" />
        ),
      }}
      component={ServicesTabScreen}
      name="ServicesTab"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Deals',
        tabBarIcon: ({color, size, focused}) => (
          <Icon size={size} color={color} name="tag" />
        ),
      }}
      component={DealsScreen}
      name="Deals"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Bookings',
        tabBarIcon: ({color, size, focused}) => (
          <Icon size={size} color={color} name="star" />
        ),
      }}
      component={BookingsScreen}
      name="Bookings"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size, focused}) => (
          <Icon size={size} color={color} name="user" />
        ),
      }}
      component={ProfileScreen}
      name="Profile"
    />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Auth"
      component={AuthStack}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Main"
      component={MainTabNavigation}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Services"
      component={ServicesScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Service"
      component={ServiceScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="UserManagement"
      component={UserManagementScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="BookingManagement"
      component={BookingManagementScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
