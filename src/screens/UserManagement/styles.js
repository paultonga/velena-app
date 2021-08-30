import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: wp(8),
  },
  pageHeader: {
    width: wp(100),
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
  itemContainer: {
    flexDirection: 'row',
    marginBottom: hp(3),
    paddingRight: wp(2),
  },
  itemDetails: {
    flex: 1,
  },
  itemType: {
    fontSize: wp(3.5),
    fontFamily: Fonts.regular,
    textTransform: 'capitalize',
    color: Colors.black,
  },
  itemAvatar: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(20),
    marginRight: wp(3),
  },
  itemTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
    flexWrap: 'wrap',
  },
  itemPhone: {
    fontFamily: Fonts.regular,
    color: Colors.boldGreyText,
    flexWrap: 'wrap',
  },
});
