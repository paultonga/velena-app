import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Images from '../../ui/Images';
import {logoutUser as logoutUserAction} from '../../redux/user/actions';
import {connect} from 'react-redux';
import styles from './styles';

import {
  PROFILE_LINKS,
  PROFILE_LINKS_MAP,
  USER_ROLES,
} from '../../utils/constants';

const ProfileScreen = ({navigation, logoutUser, user}) => {
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
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{user?.firstName}</Text>
          <Text style={styles.header}>{user?.lastName}</Text>
          <Text style={styles.email}>{user?.phone}</Text>
        </View>
        <Image style={styles.avatar} source={Images.icons.avatar} />
      </View>

      <View style={styles.linksContainer}>
        {PROFILE_LINKS.map(link => (
          <TouchableOpacity
            style={[styles.link, styles.shadowStyle]}
            onPress={() => onLinkPressed(link)}>
            <Text style={styles.linkText}>{link}</Text>
          </TouchableOpacity>
        ))}
        {user?.role === USER_ROLES.ADMIN && (
          <TouchableOpacity
            style={[styles.link, styles.shadowStyle]}
            onPress={() => onLinkPressed(PROFILE_LINKS_MAP.ADMIN)}>
            <Text style={styles.linkText}>{PROFILE_LINKS_MAP.ADMIN}</Text>
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
          <Text style={styles.linkText}>{PROFILE_LINKS_MAP.LOG_OUT}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.account.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
