import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import {useFocusEffect} from '@react-navigation/core';
import styles from './styles';
import {GET_DEALS_QUERY} from './graphql';

const DealsScreen = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery(GET_DEALS_QUERY);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const onDealPressed = deal => {
    //navigation.navigate('Service', {service});
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, styles.shadowStyle]}
        onPress={() => {}}>
        <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
        <View style={styles.detailsContainer}>
          <View style={styles.itemTextContainer}>
            <Text
              style={styles.itemTitle}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.itemDescription}>
              {item.description}
            </Text>
          </View>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentage}>{item?.percentage}</Text>
            <Text style={styles.percentageSymbol}>%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item, index) => `keyExtractor-${index}-${item.id}`;

  if (loading) {
    return null;
  }
  const deals = data?.getDeals ?? [];
  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasNotificationIcon />
      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={deals}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Deals</Text>
          </View>
        )}
      />
    </Screen>
  );
};

export default DealsScreen;
