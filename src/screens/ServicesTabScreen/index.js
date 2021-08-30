import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import {GET_SERVICES_QUERY} from './graphql';
import {useFocusEffect} from '@react-navigation/core';
import styles from './styles';

const ServicesTabScreen = ({navigation}) => {
  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery(GET_SERVICES_QUERY);

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

  const _keyExtractor = (item, index) => `keyExtractor-${index}-${item.id}`;

  if (loading) {
    return null;
  }
  const services = data?.getServices ?? [];
  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>

      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={services}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Services</Text>
          </View>
        )}
      />
    </Screen>
  );
};

export default ServicesTabScreen;
