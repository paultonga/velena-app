import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: wp(8),
  },
  pageHeader: {
    width: wp(100),
    marginHorizontal: wp(8),
    marginBottom: hp(2),
  },
  header: {
    fontFamily: Fonts.header,
    color: Colors.headerGreyText,
    fontSize: wp(10),
    marginBottom: hp(2),
  },
  container: {
    marginHorizontal: wp(8),
  },
  link: {
    flexDirection: 'row',
    marginVertical: hp(1),
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderRadius: 3,
  },
  linkText: {
    fontFamily: Fonts.heavy,
    fontSize: wp(5),
  },
  linkSubText: {
    fontFamily: Fonts.regular,
  },
  shadowStyle: {
    backgroundColor: Colors.white,
    elevation: 1,
    shadowOpacity: 0.2,
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
});
