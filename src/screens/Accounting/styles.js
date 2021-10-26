import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default StyleSheet.create({
  pageHeader: {
    width: wp(100),
    paddingHorizontal: wp(8),
  },
  header: {
    fontFamily: Fonts.header,
    color: Colors.headerGreyText,
    fontSize: wp(10),
    marginBottom: hp(2),
  },
  shadowStyle: {
    backgroundColor: Colors.white,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowColor: Colors.black,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(8),
  },
  statRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp(2),
    marginBottom: hp(5),
  },
  statHeader: {
    fontFamily: Fonts.heavy,
    fontSize: wp(5.5),
  },
  statContainer: {
    width: wp(40),
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding: 13,
  },
  statValue: {
    fontFamily: Fonts.light,
    fontSize: wp(10),
  },
  statTitle: {
    fontFamily: Fonts.bold,
    fontSize: wp(3),
  }
});
