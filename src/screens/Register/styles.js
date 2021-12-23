import {StyleSheet} from 'react-native';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: wp(5),
    paddingBottom: 50,
    paddingRight: wp(5),
    alignSelf: 'center',
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(9),
    color: Colors.headerGreyText,
  },
  formContainer: {
    flex: 1,
    marginTop: hp(1),
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
  tosContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(2.5),
    alignSelf: 'center',
  },
  tosText: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
  tosBoldUnderline: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  genderContainer: {
    height: hp(10),
    marginTop: hp(1.4),
  },
  genderHeader: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
  },
  gender: {
    fontSize: wp(4),
    marginLeft: wp(2),
    marginRight: wp(5),
    fontFamily: Fonts.regular,
  },
  genderRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
