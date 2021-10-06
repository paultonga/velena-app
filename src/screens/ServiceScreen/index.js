import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Screen from '../../component/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import BookingModal from '../../component/BookingModal';
import styles from './styles';
import {GET_SERVICE_QUERY, TOGGLE_FAVORITE_SERVICE} from './graphql';
import {useMutation, useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/core';
import _ from 'lodash';
import {GET_EXPLORE_SCREEN_DATA} from '../Search/graphql';

const ServiceScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(null);
  const {
    params: {
      isBooking,
      service: {id},
    },
  } = route;

  const {loading, error, data, refetch} = useQuery(GET_SERVICE_QUERY, {
    variables: {id: id},
  });

  const [toggleFavoriteService, {}] = useMutation(TOGGLE_FAVORITE_SERVICE, {
    onError: err => console.log('[ERROR]', err),
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const goBack = () => {
    navigation.goBack();
  };

  const toggleBookingModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleFavorite = () => {
    toggleFavoriteService({
      variables: {id: id, isFavorite: !favorite},
      awaitRefetchQueries: true,
      refetchQueries: () => {
        return [
          {query: GET_EXPLORE_SCREEN_DATA},
          {query: GET_SERVICE_QUERY, variables: {id}},
        ];
      },
    });
    setFavorite(!favorite);
  };

  if (loading || error || _.isNull(data)) {
    return null;
  } else {
    const {service} = data;
    favorite === null && setFavorite(service?.isFavorite);
    return (
      <Screen>
        <View style={styles.imageHeaderContainer}>
          <Image
            style={styles.imageHeader}
            source={{uri: service?.thumbnail}}
          />
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Icon name="arrowleft" color={Colors.buttonGrey} size={wp(4.5)} />
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
            <TouchableOpacity onPress={toggleFavorite}>
              <Icon
                name={favorite ? 'heart' : 'hearto'}
                size={wp(5)}
                color="red"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.details}>
            <Text style={styles.description}>{service.description}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={isBooking ? () => {} : toggleBookingModal}>
          <Text style={styles.bookNowButtonText}>
            {isBooking ? 'CANCEL BOOKING' : 'BOOK NOW'}
          </Text>
        </TouchableOpacity>

        <BookingModal
          isModalVisible={modalVisible}
          onCloseModal={toggleBookingModal}
          service={service}
        />
      </Screen>
    );
  }
};

export default ServiceScreen;
