import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';

export default StyleSheet.create({
  container: {
    marginTop: hp(2.5),
    paddingHorizontal: wp(5),
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(8.3),
    color: Colors.headerGreyText,
  },
  subheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
  },
  subheader: {
    fontFamily: Fonts.regular,
  },
  viewAllText: {
    fontFamily: Fonts.extraBold,
  },
  viewAllButton: {},
});
