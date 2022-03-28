import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';

export default StyleSheet.create({
  modal: {
    paddingTop: hp(3),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
    height: hp(50),
    width: wp(90),
    backgroundColor: 'white',
    borderRadius: wp(4),
  },
  submitButton: {
    backgroundColor: Colors.buttonGrey,
    alignSelf: 'center',
    width: wp(70),
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(2),
  },
  submitButtonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
    fontSize: wp(3),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2.5),
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4.5),
    width: wp(60),
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
  closeButton: {
    position: 'absolute',
    right: wp(5),
    top: hp(2),
  },
  label: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(3),
    width: wp(60),
    marginBottom: hp(1),
  },
  dropContainer: {
    marginBottom: hp(2),
  },
  detail: {
    alignItems: 'flex-start',
    marginVertical: hp(1),
  },
  detailLabel: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(3.2),
    width: wp(60),
  },
  detailContent: {
    fontFamily: Fonts.regular,
    fontSize: wp(3.5),
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
  },
  deleteText: {
    color: 'red',
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
  },
});
