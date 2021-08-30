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
    paddingTop: hp(10),
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
    marginRight: wp(4),
    height: hp(27),
    width: wp(85),
    borderRadius: 15,
    marginBottom: hp(2),
  },
  thumbnail: {
    height: hp(15),
    width: wp(85),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  itemTextContainer: {
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  itemDetails: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  itemThumbnail: {
    height: wp(25),
    width: wp(35),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  itemTitle: {
    //flex: 1,
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
    flexWrap: 'wrap',
  },
  itemDescription: {
    fontFamily: Fonts.regular,
    color: Colors.boldGreyText,
    flexWrap: 'wrap',
  },
  priceContainer: {
    flexDirection: 'row',
    width: wp(20),
  },
  price: {
    fontFamily: Fonts.light,
    fontSize: wp(5),
  },
  currency: {
    fontFamily: Fonts.regular,
    textTransform: 'uppercase',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  percentageContainer: {
    flexDirection: 'row',
    marginRight: wp(4),
    alignSelf: 'center',
  },
  percentage: {
    fontFamily: Fonts.light,
    fontSize: wp(8),
  },
  percentageSymbol: {
    fontFamily: Fonts.light,
    fontSize: wp(4),
  },
});
