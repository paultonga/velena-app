import {StyleSheet} from 'react-native';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    paddingLeft: wp(5),
    paddingRight: wp(5),
    paddingTop: hp(4),
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(9),
    color: Colors.headerGreyText,
  },
  formContainer: {
    marginTop: hp(1),
    //height: hp(42),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  subContainer: {
    width: wp(80),
    height: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotButtonText: {
    fontSize: wp(3),
    fontFamily: Fonts.regular,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: wp(2),
    fontFamily: Fonts.regular,
    fontSize: wp(3),
  },
  submitButton: {
    width: wp(80),
    backgroundColor: Colors.buttonGrey,
    height: hp(6),
    borderRadius: 10,
    marginTop: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: Fonts.bold,
    fontSize: wp(3.2),
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.white,
  },
});
