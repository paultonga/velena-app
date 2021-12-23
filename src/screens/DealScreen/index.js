import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import Screen from '../../component/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {
  ADD_SERVICE_TO_DEAL,
  GET_DEAL_QUERY,
  UPDATE_TODAYS_DEAL,
} from './graphql';
import {useMutation, useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/core';
import _ from 'lodash';
import {GET_EXPLORE_SCREEN_DATA} from '../Search/graphql';
import ServiceListModal from '../../component/ServiceListModal';
import strings from '../../localization';

const DealScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const {
    params: {deal, isAdmin},
  } = route;

  const {loading, error, data, refetch} = useQuery(GET_DEAL_QUERY, {
    variables: {id: deal.id},
  });

  const [updateTodaysDeal, {}] = useMutation(UPDATE_TODAYS_DEAL, {
    onError: err => console.log('[ERROR]', err),
  });

  const [addServiceToDeal, {}] = useMutation(ADD_SERVICE_TO_DEAL, {
    onError: err => console.log('[ERROR]', err),
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const setAsTodaysDeal = () => {
    updateTodaysDeal({
      variables: {id: deal.id},
      awaitRefetchQueries: true,
      refetchQueries: () => {
        return [{query: GET_EXPLORE_SCREEN_DATA}];
      },
    });
  };

  const onServicePressed = service => {
    !isAdmin && navigation.navigate('Service', {service});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    const loc = strings.getLanguage() || 'en';
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onServicePressed(item)}>
        <Image
          source={{uri: item.thumbnail}}
          style={[styles.itemThumbnail, styles.shadowStyle]}
        />
        <View style={styles.itemDetails}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.title[loc]}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.itemDescription}>
            {item.description[loc]}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {item.hasDiscount ? item.discountPrice : item.price}
            </Text>
            <Text style={styles.currency}>tl</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleCloseModal = ({item = null}) => {
    if (item) {
      addServiceToDeal({
        variables: {serviceId: item.id, dealId: deal.id},
        awaitRefetchQueries: true,
        refetchQueries: () => {
          return [{query: GET_DEAL_QUERY, variables: {id: deal.id}}];
        },
      });
    }
    setModalVisible(false);
  };

  const _keyExtractor = (item, index) => `servicesItem-${index}-${item.id}`;

  if (loading || error || _.isNull(data)) {
    return null;
  } else {
    const {
      deal: {services},
    } = data;
    return (
      <Screen>
        <View style={styles.imageHeaderContainer}>
          <Image style={styles.imageHeader} source={{uri: deal?.thumbnail}} />
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Icon name="arrowleft" color={Colors.buttonGrey} size={wp(4.5)} />
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={services}
          renderItem={renderItem}
          keyExtractor={_keyExtractor}
          ListHeaderComponent={() => (
            <View style={styles.mainContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{deal?.title}</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.description}>{deal?.description}</Text>
              </View>
              {isAdmin && (
                <View style={styles.adminRow}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>Add Service</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={setAsTodaysDeal}>
                    <Text style={styles.addButtonText}>Set Today's Deal</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Services Yet</Text>
              {isAdmin && (
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Service</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />

        <ServiceListModal
          isModalVisible={modalVisible}
          onCloseModal={handleCloseModal}
        />
      </Screen>
    );
  }
};

export default DealScreen;
