import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: wp(8),
  },
  pageHeader: {
    width: wp(100),
    marginBottom: hp(2),
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
    width: '100%',
    flexDirection: 'row',
    marginBottom: hp(3),
    paddingRight: wp(2),
  },
  itemDetails: {
    justifyContent: 'flex-start',
  },
  itemThumbnail: {
    height: wp(25),
    width: wp(35),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  itemTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
    flexWrap: 'wrap',
    width: wp(50),
  },
  itemDescription: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    color: Colors.boldGreyText,
    width: wp(60),
    flexWrap: 'wrap',
    marginLeft: wp(0.5),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.2),
  },
  time: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    marginLeft: wp(2),
  },
  yellowPill: {
    backgroundColor: '#FF6666',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(1.8),
    paddingVertical: hp(0.3),
    borderRadius: 5,
  },
  bluePill: {
    backgroundColor: '#4267B2',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(1.8),
    paddingVertical: hp(0.3),
    borderRadius: 5,
  },
  itemStatus: {
    fontFamily: Fonts.bold,
    fontSize: wp(2.5),
    color: Colors.white,
    flexWrap: 'wrap',
    marginLeft: wp(0.5),
    textTransform: 'capitalize',
  },
});
