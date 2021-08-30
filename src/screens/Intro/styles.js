import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: wp(2.5),
    width: wp(2.5),
    borderRadius: 10,
    marginHorizontal: wp(1),
  },
  activeIndicator: {
    backgroundColor: Colors.black,
  },
  inactiveIndicator: {
    backgroundColor: Colors.lightGreyText,
  },
  image: {
    width: wp(100),
    height: hp(55),
  },
  itemContainer: {
    width: wp(100),
  },
  textContainer: {
    paddingHorizontal: wp(5),
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(9),
    marginTop: hp(5),
    textAlign: 'center',
    color: Colors.headerGreyText,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    textAlign: 'center',
    color: Colors.lightGreyText,
    marginVertical: hp(2),
  },
  flatlist: {
    width: wp(100),
  },
  submitButton: {
    width: wp(60),
    backgroundColor: Colors.buttonGrey,
    height: hp(6),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp(4),
  },
  submitButtonText: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    color: Colors.white,
  },
});
