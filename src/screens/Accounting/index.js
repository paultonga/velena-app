import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES, USER_ROLES} from '../../utils/constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './styles';

const AccountingScreen = ({navigation, route}) => {
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
        <Text style={styles.header}>Accounting</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.statHeader}>Booking</Text>
        <View style={styles.statRow}>
          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>PENDING</Text>
            <Text style={styles.statValue}>98</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>CANCELLED</Text>
            <Text style={styles.statValue}>12</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.statHeader}>Users</Text>
        <View style={styles.statRow}>
          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>CUSTOMERS</Text>
            <Text style={styles.statValue}>50</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>STAFF</Text>
            <Text style={styles.statValue}>12</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.statHeader}>Products</Text>
        <View style={styles.statRow}>
          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>TOTAL</Text>
            <Text style={styles.statValue}>50</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>OUT OF STOCK</Text>
            <Text style={styles.statValue}>12</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.statHeader}>Services</Text>
        <View style={styles.statRow}>
          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>ACTIVE</Text>
            <Text style={styles.statValue}>50</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.statContainer, styles.shadowStyle]}>
            <Text style={styles.statTitle}>DISCONTINUED</Text>
            <Text style={styles.statValue}>0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default AccountingScreen;
