import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default function NavHeader({
  hasBackIcon,
  rightActionText,
  rightAction,
  leftAction,
  hasBottomBorder,
  hasNotificationIcon,
  hideScan,
  navigation,
}) {
  const n = useSelector(state => state.account.notifications);
  const notifications = n ?? [];
  const count = notifications.reduce(
    (acc, cur) => (cur.isRead === false ? ++acc : acc),
    0,
  );
  return (
    <View style={[styles.container, hasBottomBorder && styles.bottomBorder]}>
      {hasBackIcon && (
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          style={styles.backButton}
          onPress={leftAction}>
          <Icon name="arrowleft" color={Colors.black} size={wp(6)} />
        </TouchableOpacity>
      )}

      {!!rightActionText && (
        <Ripple
          rippleContainerBorderRadius={wp(3)}
          rippleCentered={true}
          rippleOpacity={0.7}
          rippleDuration={800}
          style={styles.rightActionButton}
          onPress={rightAction}>
          <Text style={styles.rightActionButtonText}>{rightActionText}</Text>
        </Ripple>
      )}

      {hasNotificationIcon && (
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}>
          {!!count && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badge}>{count}</Text>
            </View>
          )}
          <Icon name="bells" color={Colors.black} size={wp(6)} />
        </TouchableOpacity>
      )}

      {!hideScan && (
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={[
            styles.scanButton,
            {right: hasNotificationIcon ? wp(20) : wp(5)},
          ]}
          onPress={() => {}}>
          <Icon name="scan1" color={Colors.black} size={wp(6)} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? hp(12) : hp(11),
    width: wp(100),
    flexDirection: 'row',
  },
  badgeContainer: {
    position: 'absolute',
    right: wp(2),
    top: wp(1),
    zIndex: 10,
    backgroundColor: 'red',
    height: wp(4),
    width: wp(4),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    color: 'white',
    fontFamily: Fonts.bold,
    fontSize: wp(2.3),
  },
  bottomBorder: {
    elevation: 1,
    shadowOpacity: 0.2,
    shadowColor: Colors.black,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  backButton: {
    height: wp(10),
    width: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    position: 'absolute',
    left: wp(5),
    bottom: hp(1),
    alignSelf: 'flex-start',
  },
  rightActionButton: {
    height: wp(10),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    position: 'absolute',
    right: wp(5),
    bottom: hp(1),
  },
  notificationButton: {
    height: wp(10),
    width: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    position: 'absolute',
    right: wp(5),
    bottom: hp(1),
  },
  scanButton: {
    height: wp(10),
    width: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    position: 'absolute',
    bottom: hp(1),
  },
  rightActionButtonText: {
    fontFamily: Fonts.extraBold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: wp(3.5),
  },
});
