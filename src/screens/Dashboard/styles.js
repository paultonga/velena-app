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
  menuRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(5),
    backgroundColor: 'white',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(40),
  },
  menuText: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
    textAlign: 'center',
  },
});
