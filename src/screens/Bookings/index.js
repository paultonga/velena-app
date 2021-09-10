import {gql, useQuery} from '@apollo/client';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import {client} from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import NavHeader from '../../component/NavHeader';

export const GET_BOOKINGS_QUERY = gql`
  query GetBookingss {
    getBookings {
      id
      startDate
      isFlexible
      service {
        id
        title
        description
        hasDiscount
        discountPrice
        price
        thumbnail
      }
    }
  }
`;

const BookingssScreen = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery(GET_BOOKINGS_QUERY);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const onServicePressed = service => {
    navigation.navigate('Service', {service, isBooking: true});
  };

  const onBookNow = () => {
    navigation.navigate('Services');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    const {service} = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onServicePressed(service)}>
        <Image
          source={{uri: service.thumbnail}}
          style={[styles.itemThumbnail, styles.shadowStyle]}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{service.title}</Text>
          <Text style={styles.itemDescription}>{service.description}</Text>
          <View style={styles.timeContainer}>
            <Icon name="time" size={wp(5)} color={Colors.buttonGrey} />
            <Text style={styles.time}>
              {moment(item.startDate).format('MMM Do YY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return null;
  }
  const bookings = data?.getBookings ?? [];
  return (
    <Screen>
      <NavHeader hasNotificationIcon />
      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={bookings}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Bookings</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You've not booked yet!</Text>
            <TouchableOpacity style={styles.bookNowButton} onPress={onBookNow}>
              <Text style={styles.bookNowButtonText}>BOOK NOW</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: wp(8),
  },
  pageHeader: {
    width: wp(100),
    marginBottom: hp(2),
  },
  header: {
    fontFamily: Fonts.header,
    color: Colors.headerGreyText,
    fontSize: wp(10),
    marginBottom: hp(2),
  },
  shadowStyle: {
    backgroundColor: Colors.white,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowColor: Colors.black,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: hp(3),
    paddingRight: wp(2),
  },
  itemDetails: {
    justifyContent: 'space-evenly',
  },
  itemThumbnail: {
    height: wp(25),
    width: wp(35),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  itemTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
    flexWrap: 'wrap',
    width: '95%',
  },
  itemDescription: {
    fontFamily: Fonts.regular,
    color: Colors.boldGreyText,
    width: '85%',
    flexWrap: 'wrap',
  },
  timeContainer: {
    flexDirection: 'row',
    width: wp(70),
  },
  time: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    marginLeft: wp(2),
  },
  currency: {
    fontFamily: Fonts.regular,
    textTransform: 'uppercase',
  },
  emptyContainer: {
    height: hp(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(5),
    marginBottom: hp(1),
  },
  bookNowButton: {
    width: wp(30),
    backgroundColor: Colors.buttonGrey,
    height: hp(5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bookNowButtonText: {
    fontFamily: Fonts.bold,
    fontSize: wp(2.5),
    color: Colors.white,
  },
});

export default BookingssScreen;
