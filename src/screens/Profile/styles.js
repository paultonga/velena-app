import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: hp(12),
    paddingHorizontal: wp(7),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(13),
  },
  header: {
    fontSize: wp(10),
    lineHeight: wp(10),
    fontFamily: Fonts.header,
    color: Colors.headerGreyText,
    margin: 0,
    padding: 0,
  },
  email: {
    fontFamily: Fonts.regular,
    color: Colors.headerGreyText,
    marginLeft: wp(2),
    marginTop: hp(-0.5),
  },
  textContainer: {
    alignContent: 'flex-end',
    justifyContent: 'flex-start',
  },
  avatar: {
    height: wp(16),
    width: wp(16),
    borderRadius: wp(15),
  },
  linksContainer: {
    flex: 1,
    marginTop: hp(2),
  },
  link: {
    height: hp(5),
    marginVertical: hp(1),
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    borderRadius: 3,
  },
  linkText: {
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
