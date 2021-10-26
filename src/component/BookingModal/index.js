import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Images from '../../ui/Images';

const NEW_BOOKING_MUTATION = gql`
  mutation CreateNewBooking(
    $startDate: DateTime!
    $serviceId: ID!
    $isFlexible: Boolean!
    $staffId: ID
    $productId: ID
  ) {
    newBooking(
      input: {
        serviceId: $serviceId
        startDate: $startDate
        isFlexible: $isFlexible
        staffId: $staffId
        productId: $productId
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
    date: new Date(),
    currentIndex: 0,
    selectStaff: null,
    selectedProduct: null,
    config: [
      {
        title: 'Choose Date & Time',
        instructions: 'Select a date and time that is best for you.',
        button: 'Continue',
      },
      {
        title: 'Choose Brand & Product',
        instructions: 'Select your preferred brand and product.',
        button: 'Continue',
      },
      {
        title: 'Choose Beautician',
        instructions: 'Who would you prefer to be your beautician?',
        button: 'Complete Booking',
      },
    ],
  };

  setDate = date => {
    this.setState({date});
  };

  requestCloseModal = () => {
    this.setState({
      currentIndex: 0,
      selectedStaff: null,
      selectedProduct: null,
      date: new Date(),
    });
    this.props.onCloseModal();
  };

  selectStaff = selectedStaff => {
    this.setState({selectedStaff});
  };

  selectedProduct = selectedProduct => {
    this.setState({selectedProduct});
  };

  bookService = async () => {
    const {service} = this.props;
    const {isFlexible, selectedProduct, selectedStaff, date} = this.state;

    this.setState({loading: true});
    const response = await client.mutate({
      mutation: NEW_BOOKING_MUTATION,
      variables: {
        serviceId: service.id,
        staffId: selectedStaff?.id,
        productId: selectedProduct?.id,
        startDate: date,
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
      this.requestCloseModal();
    }
  };

  onDateChange = selectedDate => {
    this.setState({selectedDate});
  };

  setFlexibleDates = isFlexible => {
    this.setState({isFlexible});
  };

  scrollToIndex = () => {
    const {currentIndex} = this.state;
    if (currentIndex < 2) {
      const newIndex = currentIndex + 1;
      this.setState({currentIndex: newIndex});
      this.scrollView.scrollTo({x: wp(100) * newIndex});
    } else {
      this.bookService();
    }
  };

  render() {
    const {isModalVisible, onCloseModal, service} = this.props;
    const {
      isFlexible,
      loading,
      date,
      config,
      currentIndex,
      selectedStaff,
      selectedProduct,
    } = this.state;
    const curremtConfig = config[currentIndex];

    return (
      <Modal
        animationIn={'slideInDown'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.5}
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={this.requestCloseModal}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.requestCloseModal}
            style={styles.closeButton}>
            <Icon size={wp(5)} color={Colors.black} name="close" />
          </TouchableOpacity>

          <View style={styles.titleRow}>
            <Text style={styles.title}>{curremtConfig.title}</Text>
            <Text style={styles.instructions}>
              {curremtConfig.instructions}
            </Text>
          </View>
          <ScrollView
            horizontal
            snapToInterval={wp(100)}
            disableIntervalMomentum={true}
            scrollEnabled={false}
            ref={ref => (this.scrollView = ref)}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.calendarContainer}>
              <DatePicker
                date={date}
                onDateChange={this.setDate}
                androidVariant="iosClone"
              />
            </View>
            <View style={styles.calendarContainer}>
              <FlatList
                data={service?.products}
                contentContainerStyle={styles.flatListContent}
                renderItem={({item}) => {
                  const isSelected = item.id === selectedProduct?.id;
                  return (
                    <TouchableOpacity
                      style={[styles.item, isSelected && styles.selectedItem]}
                      onPress={() => this.selectedProduct(item)}>
                      <Image
                        source={{uri: item.thumbnail}}
                        style={styles.itemThumnnail}
                      />
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDesc}>{item.description}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No Products on this Service
                    </Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.calendarContainer}>
              <FlatList
                data={service?.staff}
                contentContainerStyle={styles.flatListContent}
                renderItem={({item}) => {
                  const avatar = item?.avatar
                    ? {uri: item.avatar}
                    : Images.icons.avatar;
                  const isSelected = item.id === selectedStaff?.id;
                  return (
                    <TouchableOpacity
                      style={[styles.item, isSelected && styles.selectedItem]}
                      onPress={() => this.selectStaff(item)}>
                      <Image source={avatar} style={styles.itemThumnnail} />
                      <View style={styles.itemDetails}>
                        <Text
                          style={
                            styles.itemTitle
                          }>{`${item.firstName} ${item.lastName}`}</Text>
                        <Text
                          style={
                            styles.itemDesc
                          }>{`${item.offer.price}TL  -  ${item.offer.duration}min`}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No Staff on this Service
                    </Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.scrollToIndex}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.submitButtonText}>
                  {curremtConfig.button}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  flatListContent: {
    paddingTop: hp(2),
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
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '100%',
  },
  container: {
    paddingTop: hp(2.5),
    paddingBottom: hp(6),
    height: hp(55),
    width: wp(100),
    backgroundColor: 'white',
    borderRadius: wp(4),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(8),
    width: wp(100),
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
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(6.5),
    marginBottom: hp(2),
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(5),
    width: wp(65),
  },
  instructions: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
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
    zIndex: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderColor: Colors.buttonGrey,
    borderRadius: 10,
    marginBottom: hp(1.5),
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: Colors.buttonGrey,
    backgroundColor: Colors.veryLightGrey,
  },
  itemThumnnail: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(7),
  },
  itemDetails: {
    marginLeft: wp(2.5),
    flexDirection: 'column',
  },
  itemTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
  },
  itemDesc: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(5),
  },
});

export default BookingModal;
