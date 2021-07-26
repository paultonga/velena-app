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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import SearchScreen from '../screens/Search';
import DealsScreen from '../screens/Deals';
import BookingsScreen from '../screens/Bookings';
import FavoritesScreen from '../screens/Favorites';
import ProfileScreen from '../screens/Profile';
import Fonts from '../ui/Fonts';
import Images from '../ui/Images';

const AuthStack = () => (
  <Stack.Navigator>
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
        height: hp(9),
      },
      keyboardHidesTabBar: true,
      activeTintColor: 'black',
      tabStyle: {paddingVertical: hp(2), alignSelf: 'center'},
      labelStyle: {fontFamily: Fonts.bold, fontSize: 12},
    }}>
    <Tab.Screen
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({color, size, focused}) => (
          <Image
            source={Images.icons.search}
            style={[sharedStyles.tabIcon, {tintColor: color}]}
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
          <Image
            source={Images.icons.deals}
            style={[sharedStyles.tabIcon, {tintColor: color}]}
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
          <Image
            source={Images.icons.star}
            style={[sharedStyles.tabIcon, {tintColor: color}]}
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
          <Image
            source={Images.icons.heart}
            style={[sharedStyles.tabIcon, {tintColor: color}]}
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
          <Image
            source={Images.icons.profile}
            style={[sharedStyles.tabIcon, {tintColor: color}]}
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
