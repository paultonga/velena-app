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
import {GET_DEAL_QUERY} from './graphql';
import {useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/core';
import _ from 'lodash';

const DealScreen = ({route, navigation}) => {
  const {
    params: {deal},
  } = route;

  const {loading, error, data, refetch} = useQuery(GET_DEAL_QUERY, {
    variables: {id: deal.id},
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const onServicePressed = service => {
    navigation.navigate('Service', {service});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
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
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.itemDescription}>
            {item.description}
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
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Services Yet</Text>
            </View>
          )}
        />
      </Screen>
    );
  }
};

export default DealScreen;
