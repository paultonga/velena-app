import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Images from '../../ui/Images';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default function NavHeader({
  hasBackIcon,
  rightActionText,
  rightAction,
  leftAction,
}) {
  return (
    <View style={styles.container}>
      {hasBackIcon && (
        <TouchableOpacity style={styles.backButton} onPress={leftAction}>
          <Image source={Images.icons.leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
      )}

      {!!rightActionText && (
        <TouchableOpacity style={styles.rightActionButton} onPress={rightAction}>
          <Text style={styles.rightActionButtonText}>{rightActionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? hp(10) : hp(6),
    width: wp(100),
    flexDirection: 'row',
    elevation: 1,
    shadowOpacity: 0.2,
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  backButton: {
    position: 'absolute',
    left: wp(8),
    bottom: hp(1.5),
  },
  rightActionButton: {
    position: 'absolute',
    right: wp(5),
    bottom: hp(1.5),
  },
  backIcon: {
    width: wp(5),
  },
  rightActionButtonText: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
  },
});
