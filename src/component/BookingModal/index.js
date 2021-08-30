import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {client} from '../../../App';
import {gql} from '@apollo/client';
import {GET_BOOKINGS_QUERY} from '../../screens/Bookings';

const NEW_BOOKING_MUTATION = gql`
  mutation CreateNewBooking(
    $startDate: DateTime!
    $serviceId: ID!
    $isFlexible: Boolean!
  ) {
    newBooking(
      input: {
        serviceId: $serviceId
        startDate: $startDate
        isFlexible: $isFlexible
      }
    ) {
      success
      message
    }
  }
`;

class BookingModal extends Component {
  state = {
    selectedDate: null,
    isFlexible: false,
    loading: false,
  };

  bookService = async () => {
    const {service} = this.props;
    const {selectedDate, loading, isFlexible} = this.state;

    this.setState({loading: true});
    const response = await client.mutate({
      mutation: NEW_BOOKING_MUTATION,
      variables: {
        serviceId: service.id,
        startDate: selectedDate.format(),
        isFlexible,
      },
      refetchQueries: () => {
        return [
          {
            query: GET_BOOKINGS_QUERY,
          },
        ];
      },
    });
    this.setState({loading: false});
    const {
      data: {
        newBooking: {success},
      },
    } = response;
    if (success) {
      this.props.onCloseModal();
    }
  };

  onDateChange = selectedDate => {
    this.setState({selectedDate});
  };

  setFlexibleDates = isFlexible => {
    this.setState({isFlexible});
  };

  render() {
    const {isModalVisible, onCloseModal, service} = this.props;
    const {isFlexible, loading} = this.state;

    return (
      <Modal
        animationIn={'slideInDown'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.5}
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={onCloseModal}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onCloseModal} style={styles.closeButton}>
            <Icon size={wp(5)} color={Colors.black} name="close" />
          </TouchableOpacity>

          <Image source={{uri: service.thumbnail}} style={styles.image} />
          <View style={styles.titleRow}>
            <Text style={styles.title}>{service.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {service.hasDiscount ? service.discountPrice : service.price}
              </Text>
              <Text style={styles.currency}>tl</Text>
            </View>
          </View>
          <View style={styles.calendarContainer}>
            <CalendarPicker
              width={wp(90)}
              maxRangeDuration={7}
              onDateChange={this.onDateChange}
              allowRangeSelection={isFlexible}
              defaultTextStyles={styles.calendarDefault}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isFlexible}
              onValueChange={this.setFlexibleDates}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Make dates flexible?</Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.bookService}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.submitButtonText}>SAVE BOOKING</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    paddingTop: hp(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: wp(30),
    width: wp(30),
    borderRadius: 1000,
    alignSelf: 'center',
    position: 'absolute',
    top: hp(-8),
    borderWidth: 1,
    borderColor: 'white',
  },
  container: {
    paddingTop: hp(8),
    height: hp(75),
    width: wp(90),
    backgroundColor: 'white',
    borderRadius: wp(4),
  },
  calendarContainer: {
    backgroundColor: 'white',
    marginHorizontal: wp(8),
  },
  submitButton: {
    backgroundColor: Colors.buttonGrey,
    alignSelf: 'center',
    width: wp(70),
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(2),
  },
  submitButtonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
    fontSize: wp(3),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2.5),
    marginBottom: hp(2),
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
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
  calendarDefault: {
    fontFamily: Fonts.regular,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: hp(2),
    alignContent: 'center',
  },
  checkbox: {
    marginLeft: wp(4.5),
    height: wp(6),
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
  },
  closeButton: {
    position: 'absolute',
    right: wp(5),
    top: hp(2),
  },
});

export default BookingModal;
