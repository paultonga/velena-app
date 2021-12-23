import React from 'react';
import {Text, View, Image, TouchableOpacity, Share} from 'react-native';
import Images from '../../ui/Images';
import {
  logoutUser as logoutUserAction,
  reset as resetAction,
} from '../../redux/user/actions';
import {connect} from 'react-redux';
import styles from './styles';

import {
  PROFILE_LINKS,
  PROFILE_LINKS_MAP,
  USER_ROLES,
} from '../../utils/constants';
import EditProfileModal from '../../component/EditProfileModal';
import {useFocusEffect} from '@react-navigation/core';
import {useQuery} from '@apollo/client';
import {GET_ME_QUERY} from './graphql';
import strings from '../../localization';
import ChangeLanguageModal from '../../component/ChangeLanguageModal';

const ProfileScreen = ({navigation, logoutUser, user, reset}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [languageModalVisible, setLanguageModalVisible] = React.useState(false);

  const {loading, error, data, refetch} = useQuery(GET_ME_QUERY);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      reset();
      return () => {};
    }, [refetch, reset]),
  );

  const toggleLanguageModal = React.useCallback(
    () => setLanguageModalVisible(state => !state),
    [],
  );

  const toggleModalVisible = React.useCallback(
    () => setModalVisible(state => !state),
    [],
  );
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Download Velena',
        message:
          'Download Velena and enjoy discounts on hair, nail and other products and services',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error('[Share Error::]', error.message);
    }
  };
  const onLinkPressed = link => {
    switch (link) {
      case PROFILE_LINKS_MAP.LOG_OUT: {
        logoutUser();
        break;
      }
      case PROFILE_LINKS_MAP.ADMIN: {
        navigation.navigate('Dashboard', {user});
        break;
      }
      case PROFILE_LINKS_MAP.STAFF: {
        navigation.navigate('Dashboard', {user});
        break;
      }
      case PROFILE_LINKS_MAP.EDIT_PROFILE: {
        toggleModalVisible();
        break;
      }
      case PROFILE_LINKS_MAP.CHANGE_LANGUAGE: {
        toggleLanguageModal();
        break;
      }
      case PROFILE_LINKS_MAP.INVITE_FRIENDS: {
        onShare();
        break;
      }
      case PROFILE_LINKS_MAP.SETTINGS: {
        navigation.navigate('Settings', {user});
        break;
      }
      case PROFILE_LINKS_MAP.CREDIT_COUPONS: {
        navigation.navigate('Credits', {user});
        break;
      }
    }
  };

  if (loading) {
    return null;
  }
  const userObject = data?.me ?? user;

  const imageUrl = userObject?.avatar
    ? {uri: userObject.avatar}
    : Images.icons.avatar;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{userObject?.firstName}</Text>
          <Text style={styles.header}>{userObject?.lastName}</Text>
          <Text style={styles.email}>{userObject?.phone}</Text>
        </View>
        <Image style={styles.avatar} source={imageUrl} />
      </View>

      <View style={styles.linksContainer}>
        {PROFILE_LINKS.map((link, index) => (
          <TouchableOpacity
            key={`ProfileMenuItem${index}`}
            style={[styles.link, styles.shadowStyle]}
            onPress={() => onLinkPressed(link)}>
            <Text style={styles.linkText}>{strings[link]}</Text>
          </TouchableOpacity>
        ))}
        {user?.role === USER_ROLES.ADMIN && (
          <TouchableOpacity
            style={[styles.link, styles.shadowStyle]}
            onPress={() => onLinkPressed(PROFILE_LINKS_MAP.ADMIN)}>
            <Text style={styles.linkText}>{strings.administrator}</Text>
          </TouchableOpacity>
        )}
        {user?.role === USER_ROLES.STAFF && (
          <TouchableOpacity
            style={[styles.link, styles.shadowStyle]}
            onPress={() => onLinkPressed(PROFILE_LINKS_MAP.STAFF)}>
            <Text style={styles.linkText}>{PROFILE_LINKS_MAP.STAFF}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.link, styles.shadowStyle]}
          onPress={() => onLinkPressed(PROFILE_LINKS_MAP.LOG_OUT)}>
          <Text style={styles.linkText}>{strings.logOut}</Text>
        </TouchableOpacity>
      </View>
      <EditProfileModal
        userProfile={userObject}
        isModalVisible={modalVisible}
        onCloseModal={toggleModalVisible}
      />
      <ChangeLanguageModal
        isModalVisible={languageModalVisible}
        onCloseModal={toggleLanguageModal}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.account.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUserAction()),
  reset: () => dispatch(resetAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
