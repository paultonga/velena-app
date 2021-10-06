import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import styles from './styles';
import {useSelector} from 'react-redux';

const NotificationsScreen = ({navigation}) => {
  const notifications = useSelector(state => state.account.notifications);


  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, styles.shadowStyle]}
        onPress={() => {}}>
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
              {item.message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item, index) => `keyExtractor-${index}-${item.id}`;

  const goBack = () => navigation.goBack();

  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon leftAction={goBack}/>
      <FlatList
        contentContainerStyle={styles.scrollViewContent}
        data={notifications}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        ListHeaderComponent={() => (
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Notifications</Text>
          </View>
        )}
      />
    </Screen>
  );
};

export default NotificationsScreen;
