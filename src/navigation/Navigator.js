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
import Icon from 'react-native-vector-icons/Ionicons';

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
import ServiceCategoryScreen from '../screens/ServiceCategoryScreen';
import DealScreen from '../screens/DealScreen';
import NotificationsScreen from '../screens/Notifications';
import CreditsScreen from '../screens/CreditsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DealsManagement from '../screens/DealsManagement';
import AccountingScreen from '../screens/Accounting';

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
        height: isAndroid ? hp(9) : hp(9.5),
        backgroundColor: 'white',
        marginBottom: hp(0.5),
      },
      keyboardHidesTabBar: true,
      activeTintColor: 'black',
      tabStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
      },
      labelStyle: {
        fontFamily: Fonts.extraBold,
        fontSize: wp(3.4),
        lineHeight: wp(3.4),
      },
      iconStyle: {
        marginBottom: 0,
      },
    }}>
    <Tab.Screen
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name={focused ? 'ios-compass-sharp' : 'ios-compass-outline'}
          />
        ),
      }}
      component={SearchScreen}
      name="Search"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Services',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name={focused ? 'heart-circle-sharp' : 'heart-circle-outline'}
          />
        ),
      }}
      component={ServicesTabScreen}
      name="ServicesTab"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Deals',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name={focused ? 'pricetags-sharp' : 'pricetags-outline'}
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
            name={focused ? 'ios-star-sharp' : 'ios-star-outline'}
          />
        ),
      }}
      component={BookingsScreen}
      name="Bookings"
    />

    <Tab.Screen
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size, focused}) => (
          <Icon
            size={size}
            color={color}
            name={focused ? 'ios-person-sharp' : 'ios-person-outline'}
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
    <Stack.Screen
      name="ServiceCategory"
      component={ServiceCategoryScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DealScreen"
      component={DealScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Credits"
      component={CreditsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="DealsManagement"
      component={DealsManagement}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Accounting"
      component={AccountingScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
