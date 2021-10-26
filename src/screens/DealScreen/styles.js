import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';

export default StyleSheet.create({
  imageHeader: {
    width: wp(100),
    height: hp(30),
  },
  backButton: {
    position: 'absolute',
    top: hp(7),
    left: wp(8),
    height: wp(11),
    width: wp(11),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
  },
  mainContainer: {
    flex: 1,
    paddingTop: hp(2),
  },
  flatListContent: {
    paddingHorizontal: wp(6),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(6),
    width: wp(65),
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  details: {
    flex: 1,
    marginBottom: hp(3),
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    lineHeight: wp(6),
  },
  bookNowButton: {
    backgroundColor: Colors.buttonGrey,
    marginVertical: hp(5),
    width: wp(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(2),
  },
  bookNowButtonText: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    letterSpacing: 1,
    fontSize: wp(3),
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
    flex: 1,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: Fonts.bold,
    fontSize: wp(6),
  },
  addButton: {
    marginBottom: hp(3),
  },
  addButtonText: {
    fontFamily: Fonts.bold,
    fontSize: wp(4.5),
  },
  adminRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
