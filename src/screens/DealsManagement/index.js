import {gql, useMutation, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import {useFocusEffect} from '@react-navigation/core';
import styles from './styles';
import {DELETE_DEAL_MUTATION, GET_DEALS_QUERY} from './graphql';
import strings from '../../localization';
import ActionSheet from 'react-native-actionsheet';
import Icon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import DealFormModal from '../DealForm';

const DealsManagement = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery(GET_DEALS_QUERY);
  const [deleteDeal, {data: deleteDealData, loading: deleteLoading}] =
    useMutation(DELETE_DEAL_MUTATION, {onCompleted: refetch});

  const [selectedDeal, setSelectedDeal] = React.useState();
  const actionSheetRef = React.useRef();
  const [modalVisible, setModalVisble] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const onDealPressed = deal => {
    setSelectedDeal(deal);
    setIsEditing(true);
    if (actionSheetRef?.current) {
      actionSheetRef?.current.show();
    }
  };

  const createDeal = React.useCallback(() => {
    setIsEditing(false);
    setSelectedDeal(null);
    toggleModal(true);
  }, [toggleModal]);

  const handleActionSheet = async option => {
    if (option === 0) {
      toggleModal(true);
      return;
    }

    if (option === 1) {
      navigation.navigate('DealScreen', {
        deal: selectedDeal,
        isAdmin: true,
      });
      return;
    }

    if (option === 2) {
      try {
        await deleteDeal({variables: {dealId: selectedDeal?.id}});
        // eslint-disable-next-line no-catch-shadow
      } catch (e) {
        console.log('[deleteDeal error]:::', e);
        Alert.alert('DeleteDeal Error', e.message);
      }
      return;
    }
  };

  const toggleModal = React.useCallback(visible => {
    setModalVisble(visible);
  }, []);

  const goBack = () => navigation.goBack();

  const renderItem = ({item}) => {
    const loc = strings.getLanguage() || 'en';
    return (
      <TouchableOpacity
        style={[styles.itemContainer, styles.shadowStyle]}
        onPress={() => onDealPressed(item)}>
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
              {`${item?.services.length} SERVICES`}
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

  const _keyExtractor = (item, index) =>
    `dealsKeyExtractor-${index}-${item.id}`;

  if (loading) {
    return null;
  }
  const deals = data?.getDeals ?? [];
  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon navigation={navigation} leftAction={goBack} />
      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={deals}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Deals Admin</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fabContainer} onPress={createDeal}>
        <Icon name="plus" size={wp(7)} color="white" />
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        options={['Edit Deal', 'Add Service to Deal', 'Delete Deal', 'Cancel']}
        cancelButtonIndex={3}
        onPress={handleActionSheet}
      />
      <DealFormModal
        deal={selectedDeal}
        dealCallback={refetch}
        isEditing={isEditing}
        isModalVisible={modalVisible}
        onCloseModal={() => toggleModal(false)}
      />
    </Screen>
  );
};

export default DealsManagement;
