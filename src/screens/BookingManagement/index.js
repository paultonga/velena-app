import {gql, useQuery} from '@apollo/client';
import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import styles from './styles';
import NavHeader from '../../component/NavHeader';
import {
  ADMIN_BOOKING_DATE_FORMAT,
  STATUS_BAR_STYLES,
  USER_ROLES,
} from '../../utils/constants';
import {useFocusEffect} from '@react-navigation/native';
import {GET_ALL_BOOKINGS_QUERY, GET_ASSIGNED_BOOKINGS_QUERY} from './graphql';
import ConfirmBookingModal from '../../component/ConfirmBookingModal';
import strings from '../../localization';

const BookingManagementScreen = ({navigation, route}) => {
  const {user} = route.params;

  const QUERY_TO_RUN =
    user.role === USER_ROLES.STAFF
      ? GET_ASSIGNED_BOOKINGS_QUERY
      : GET_ALL_BOOKINGS_QUERY;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [booking, setBooking] = React.useState(null);

  const {loading, error, data, refetch} = useQuery(QUERY_TO_RUN);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const openModal = selectedBooking => {
    if (user.role === USER_ROLES.ADMIN) {
      setBooking(selectedBooking);
      setModalVisible(true);
    }
  };

  const onConpleteMutation = () => {
    setModalVisible(false);
    refetch();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    const {service} = item;
    const isConfirmed = item?.isConfirmed;
    const loc = strings.getLanguage() || 'en';
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => openModal(item)}>
        <Image
          source={{uri: service.thumbnail}}
          style={[styles.itemThumbnail, styles.shadowStyle]}
        />
        <View style={styles.itemDetails}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {service.title[loc]}
          </Text>
          <View style={styles.timeContainer}>
            <Icon
              name="person-circle"
              size={wp(4.5)}
              color={Colors.buttonGrey}
            />
            <Text style={styles.itemDescription}>
              {`${item?.user?.firstName} ${item?.user?.lastName}`}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Icon name="time" size={wp(4.5)} color={Colors.buttonGrey} />
            <Text style={styles.itemDescription}>
              {moment(item.startDate).format(ADMIN_BOOKING_DATE_FORMAT)}
            </Text>
          </View>
          <View
            style={[
              styles.timeContainer,
              isConfirmed ? styles.bluePill : styles.yellowPill,
            ]}>
            <Icon
              name={isConfirmed ? 'checkmark-done' : 'alert-circle-outline'}
              size={wp(4)}
              color={Colors.white}
            />
            <Text style={styles.itemStatus}>
              {isConfirmed ? 'CONFIRMED' : 'PENDING CONFIRMING'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item, index) => `keyExtractor-${index}-${item.id}`;

  if (loading || error) {
    return null;
  }

  const bookings = data?.bookings ?? [];
  const staff = data?.staff ?? [];


  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon leftAction={goBack} />

      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        keyExtractor={_keyExtractor}
        data={bookings}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>
              {user.role === USER_ROLES.ADMIN ? 'Bookings' : 'Tasks'}
            </Text>
          </View>
        )}
      />
      <ConfirmBookingModal
        isModalVisible={modalVisible}
        booking={booking}
        onCloseModal={closeModal}
        staff={staff}
        onComplete={onConpleteMutation}
      />
    </Screen>
  );
};

export default BookingManagementScreen;
