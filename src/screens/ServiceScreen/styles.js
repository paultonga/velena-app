import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';

export default StyleSheet.create({
  imageHeader: {
    width: wp(100),
    height: hp(30),
  },
  backButton: {
    position: 'absolute',
    top: hp(7),
    left: wp(8),
    height: wp(11),
    width: wp(11),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(6),
    width: wp(65),
  },
  priceContainer: {
    flexDirection: 'row',
    width: wp(20),
  },
  price: {
    fontFamily: Fonts.light,
    fontSize: wp(7),
  },
  currency: {
    fontFamily: Fonts.regular,
    textTransform: 'uppercase',
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  details: {},
  description: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    lineHeight: wp(6),
  },
  bookNowButton: {
    backgroundColor: Colors.buttonGrey,
    marginVertical: hp(5),
    width: wp(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(2),
  },
  bookNowButtonText: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    letterSpacing: 1,
    fontSize: wp(3),
  },
});
