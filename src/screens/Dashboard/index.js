import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES, USER_ROLES} from '../../utils/constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './styles';

const ADMIN_MENU = {
  USER_MANAGEMENT: 'User Management',
  BOOKING_MANAGEMENT: 'Booking Management',
  DEALS_MANAGEMENT: 'Deals Management',
  ACCOUNTING: 'Accounting',
};

const DashboardScreen = ({navigation, route}) => {
  const {user} = route.params;
  const goBack = () => {
    navigation.goBack();
  };

  const handleMenuPress = menu => {};

  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon leftAction={goBack} />
      <View style={styles.pageHeader}>
        <Text style={styles.header}>Dashboard</Text>
      </View>

      <View style={styles.menuContainer}>
        {user.role === USER_ROLES.ADMIN && (
          <>
            <View style={styles.menuRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UserManagement');
                }}
                style={styles.menuItem}>
                <Icon name="addusergroup" size={wp(18)} />
                <Text style={styles.menuText}>User Management</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('BookingManagement', {user});
                }}
                style={styles.menuItem}>
                <Icon name="calendar" size={wp(18)} />
                <Text style={styles.menuText}>Booking Management</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DealsManagement');
                }}
                style={styles.menuItem}>
                <Icon name="tags" size={wp(18)} />
                <Text style={styles.menuText}>Deals Management</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ServicesManagement');
                }}
                style={styles.menuItem}>
                <Icon name="book" size={wp(18)} />
                <Text style={styles.menuText}>Services Management</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {user.role === USER_ROLES.STAFF && (
          <View style={styles.menuRow}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BookingManagement', {user});
              }}
              style={styles.menuItem}>
              <Icon name="tags" size={wp(18)} />
              <Text style={styles.menuText}>Tasks Management</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleMenuPress} style={styles.menuItem}>
              <Icon name="book" size={wp(18)} />
              <Text style={styles.menuText}>Services Management</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  );
};

export default DashboardScreen;
