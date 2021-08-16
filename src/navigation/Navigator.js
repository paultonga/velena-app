import React from 'react';
import {Image} from 'react-native';
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
import Icon from 'react-native-vector-icons/EvilIcons';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import SearchScreen from '../screens/Search';
import DealsScreen from '../screens/Deals';
import BookingsScreen from '../screens/Bookings';
import FavoritesScreen from '../screens/Favorites';
import ProfileScreen from '../screens/Profile';
import Fonts from '../ui/Fonts';
import Images from '../ui/Images';
import Splash from '../screens/Splash';
import { hasNotch } from 'react-native-device-info';

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
        height: hasNotch ? hp(12) : hp(9),
      },
      keyboardHidesTabBar: true,
      activeTintColor: 'black',
      tabStyle: {paddingVertical: hp(2), alignSelf: 'center'},
      labelStyle: {fontFamily: Fonts.regular, fontSize: 12},
    }}>
    <Tab.Screen
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name="search"
            style={sharedStyles.tabIcon}
          />
        ),
      }}
      component={SearchScreen}
      name="Search"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Deals',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name="tag"
            style={sharedStyles.tabIcon}
          />
        ),
      }}
      component={DealsScreen}
      name="Deals"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Bookings',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name="star"
            style={sharedStyles.tabIcon}
          />
        ),
      }}
      component={BookingsScreen}
      name="Bookings"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name="heart"
            style={sharedStyles.tabIcon}
          />
        ),
      }}
      component={FavoritesScreen}
      name="Favorites"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name="user"
            style={sharedStyles.tabIcon}
          />
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
  </Stack.Navigator>
);
