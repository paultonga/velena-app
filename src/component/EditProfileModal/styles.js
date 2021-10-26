import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(8),
  },
  formContainer: {
    marginTop: hp(5),
  },
  imageWrapper: {
    alignSelf: 'center',
    marginTop: hp(10),
    height: wp(30),
    width: wp(30),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.lightGreyText,
    borderRadius: wp(15),
  },
  avatarImage: {
    height: wp(27),
    width: wp(27),
    borderRadius: wp(15),
  },
  editIcon: {
    position: 'absolute',
    right: 3,
    bottom: 0,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: hp(15),
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
  closeButton: {
    position: 'absolute',
    top: hp(5),
    right: wp(5),
  },
});
