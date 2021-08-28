import {gql} from '@apollo/client';
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
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import {client, Client} from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

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

class BookingssScreen extends Component {
  state = {
    bookings: [],
  };

  componentDidMount() {
    this.fetchBookings();
  }

  onServicePressed = service => {
    this.props.navigation.navigate('Service', {service});
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  fetchBookings = async () => {
    const {
      data: {getBookings},
    } = await client.query({
      query: GET_BOOKINGS_QUERY,
    });
    this.setState({bookings: getBookings});
  };

  renderItem = ({item}) => {
    const {service} = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.onServicePressed(service)}>
        <Image
          source={{uri: service.thumbnail}}
          style={[styles.itemThumbnail, styles.shadowStyle]}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{service.title}</Text>
          <Text style={styles.itemDescription}>{service.description}</Text>
          <View style={styles.timeContainer}>
            <Icon name="time" size={wp(5)} color={Colors.buttonGrey}/>
            <Text style={styles.time}>{moment(item.startDate).format('MMM Do YY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {bookings} = this.state;
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Bookings</Text>
          </View>

          <FlatList data={bookings} renderItem={this.renderItem} />
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: wp(8),
    paddingTop: hp(10),
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
});

export default BookingssScreen;
