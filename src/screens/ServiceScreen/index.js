import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Screen from '../../component/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import BookingModal from '../../component/BookingModal';

const DEMO_IMAGE =
  'https://unsplash.com/photos/k47viB7Dt8I/download?force=true&w=640';

class ServiceScreen extends Component {
  state = {
    isModalVisible: false,
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  toggleBookingModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    const {isModalVisible} = this.state;
    const {
      params: {service, isBooking},
    } = this.props.route;

    return (
      <Screen>
        <View style={styles.imageHeaderContainer}>
          <Image
            style={styles.imageHeader}
            source={{uri: service?.thumbnail}}
          />
          <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
            <Icon name="arrowleft" color={Colors.buttonGrey} size={wp(6)} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{service?.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {service.hasDiscount ? service.discountPrice : service.price}
              </Text>
              <Text style={styles.currency}>tl</Text>
            </View>
          </View>

          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Icon name="heart" size={wp(5)} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.details}>
            <Text style={styles.description}>{service.description}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={isBooking ? () => {} : this.toggleBookingModal}>
          <Text style={styles.bookNowButtonText}>
            {isBooking ? 'CANCEL BOOKING' : 'BOOK NOW'}
          </Text>
        </TouchableOpacity>

        <BookingModal
          isModalVisible={isModalVisible}
          onCloseModal={this.toggleBookingModal}
          service={service}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  imageHeader: {
    width: wp(100),
    height: hp(30),
  },
  backButton: {
    position: 'absolute',
    top: hp(7),
    left: wp(8),
    height: wp(14),
    width: wp(14),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(6),
    width: wp(65),
  },
  priceContainer: {
    flexDirection: 'row',
    width: wp(20),
  },
  price: {
    fontFamily: Fonts.light,
    fontSize: wp(7),
  },
  currency: {
    fontFamily: Fonts.regular,
    textTransform: 'uppercase',
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  details: {},
  description: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    lineHeight: wp(6),
  },
  bookNowButton: {
    backgroundColor: Colors.buttonGrey,
    marginVertical: hp(5),
    width: wp(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(2),
  },
  bookNowButtonText: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    letterSpacing: 1,
    fontSize: wp(3),
  },
});

export default ServiceScreen;
