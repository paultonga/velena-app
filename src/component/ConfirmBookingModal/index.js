import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import Colors from '../../ui/Colors';
import {CONFIRM_BOOKING_MUTATION, DELETE_BOOKING_MUTATION} from './graphql';
import {useMutation} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import {ADMIN_BOOKING_DATE_FORMAT} from '../../utils/constants';
import strings from '../../localization';

const ConfirmBookingModal = ({
  isModalVisible,
  onCloseModal,
  booking,
  staff,
  onComplete,
}) => {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(staff);

  const [conirmBooking, {data, loading}] = useMutation(
    CONFIRM_BOOKING_MUTATION,
    {onCompleted: onComplete},
  );

  const [
    deleteBooking,
    {data: deleteBookingData, loading: deleteBookingLoading},
  ] = useMutation(DELETE_BOOKING_MUTATION, {onCompleted: onComplete});

  const handleBooking = ({isConfirmed, id}) => {
    conirmBooking({variables: {isConfirmed, id, staffId: value}});
  };

  const onDeleteBooking = React.useCallback(() => {
    deleteBooking({variables: {id: booking.id}});
  }, [booking, deleteBooking]);

  const isConfirmed = booking?.isConfirmed;
  const service = booking?.service;
  const loc = strings.getLanguage() || 'en';
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

        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>{service?.title[loc]}</Text>
            <Text style={styles.date}>
              {moment(booking?.startDate).format(ADMIN_BOOKING_DATE_FORMAT)}
            </Text>
            <View style={styles.detail}>
              <Text style={styles.detailLabel}>Customer</Text>
              <Text
                style={
                  styles.detailContent
                }>{`${booking?.user?.firstName} ${booking?.user?.lastName}`}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {service?.hasDiscount ? service?.discountPrice : service?.price}
            </Text>
            <Text style={styles.currency}>tl</Text>
          </View>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.label}>Assign this booking to staff</Text>
          <DropDownPicker
            value={value}
            items={items}
            open={open}
            setOpen={setOpen}
            setItems={setItems}
            setValue={setValue}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            handleBooking({isConfirmed: !isConfirmed, id: booking.id})
          }>
          {loading || deleteBookingLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>
              {isConfirmed ? 'CANCEL BOOKING' : 'CONFIRM BOOKING'}
            </Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={onDeleteBooking}>
          <Text style={styles.deleteText}>Delete Booking</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ConfirmBookingModal;
