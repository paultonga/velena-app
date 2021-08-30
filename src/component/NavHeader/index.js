import React from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
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
}) {
  return (
    <View style={[styles.container, hasBottomBorder && styles.bottomBorder]}>
      {hasBackIcon && (
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          // rippleContainerBorderRadius={wp(3)}
          // rippleCentered={true}
          // rippleOpacity={0.7}
          // rippleDuration={100}
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
  rightActionButtonText: {
    fontFamily: Fonts.extraBold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: wp(3.5),
  },
});
