import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import {GET_USERS_QUERY} from './graphql';
import {useFocusEffect} from '@react-navigation/core';
import styles from './styles';
import Images from '../../ui/Images';
import UserManagementModal from '../../component/UserManagementModal';

const UserManagementScreen = ({navigation}) => {
  const [user, setUser] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const {loading, error, data, refetch} = useQuery(GET_USERS_QUERY);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  const onClose = () => setModalVisible(false);

  const onComplete = () => {
    refetch();
    onClose();
  };

  const onUserPressed = selectedUser => {
    setUser(selectedUser);
    setModalVisible(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}) => {
    const userAvatar = item?.avatar ? {uri: item.avatar} : Images.icons.avatar;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onUserPressed(item)}>
        <Image
          source={userAvatar}
          style={[styles.itemAvatar, styles.shadowStyle]}
        />
        <View style={styles.itemDetails}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itemTitle}>
            {`${item.firstName} ${item.lastName}`}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itemType}>
            {`${item.phone} - ${item.role}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item, index) => `keyExtractor-${index}-${item.id}`;

  if (loading || error) {
    return null;
  }

  const users = data?.getUsers ?? [];
  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon leftAction={goBack} />

      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={users}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Users</Text>
          </View>
        )}
      />
      <UserManagementModal
        user={user}
        isModalVisible={modalVisible}
        onCloseModal={onClose}
        onComplete={onComplete}
      />
    </Screen>
  );
};

export default UserManagementScreen;
