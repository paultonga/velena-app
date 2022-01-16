import {useQuery, useMutation} from '@apollo/client';
import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import {DELETE_SERVICE_MUTATION, GET_SERVICES_QUERY} from './graphql';
import {useFocusEffect} from '@react-navigation/core';
import styles from './styles';
import strings from '../../localization';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import ServiceFormModal from '../ServiceForm';
import ActionSheet from 'react-native-actionsheet';

const ServicesManagement = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery(GET_SERVICES_QUERY);
  const [modalVisible, setModalVisble] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);
  const [deleteService, {data: deleteServiceData, loading: deleteLoading}] =
    useMutation(DELETE_SERVICE_MUTATION, {onCompleted: refetch});

  const toggleModal = React.useCallback((service, isEditing, visible) => {
    setEditing(isEditing);
    //setSelectedService(service);
    setModalVisble(visible);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const onServicePressed = service => {
    setSelectedService(service);

    if (this.ActionSheet) {
      this.ActionSheet.show();
    }
  };

  const handleOpen = async option => {
    if (option === 0) {
      toggleModal(selectedService, true, true);
      return;
    }

    if (option === 1) {
      try {
        await deleteService({variables: {serviceId: selectedService?.id}});
        // eslint-disable-next-line no-catch-shadow
      } catch (e) {
        console.log('[deleteService error]:::', e);
        Alert.alert('DeleteService Error', e.message);
      }
    }
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

  const _keyExtractor = (item, index) => `keyExtractor-${index}-${item.id}`;

  if (loading) {
    return null;
  }
  const services = data?.getServices ?? [];
  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon leftAction={goBack} />

      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={services}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>{strings.tabServices}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fabContainer}
        onPress={() => toggleModal(null, false, true)}>
        <Icon name="plus" size={wp(7)} color="white" />
      </TouchableOpacity>

      <ServiceFormModal
        isEditing={editing}
        isModalVisible={modalVisible}
        service={selectedService}
        onCloseModal={() => toggleModal(null, false, false)}
        serviceCallback={() => refetch()}
      />

      <ActionSheet
        ref={o => (this.ActionSheet = o)}
        options={['Edit Service', 'Delete Service', 'Cancel']}
        cancelButtonIndex={2}
        onPress={handleOpen}
      />
    </Screen>
  );
};

export default ServicesManagement;
