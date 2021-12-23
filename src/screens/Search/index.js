import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Screen from '../../component/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import PopularServices from '../../component/PopularServices';
import PopularItemsList from '../../component/PopularDemand';
import HorizontalSlider from '../../component/HorizontalSlider';
import {client} from '../../../App';
import _ from 'lodash';
import messaging from '@react-native-firebase/messaging';
import {GET_EXPLORE_SCREEN_DATA, REGISTER_PUSH_TOKEN} from './graphql';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ContentWrapper from '../../component/ContentWrapper';
import strings from '../../localization';

class SearchScreen extends Component {
  state = {
    popular: [],
    categories: [],
    favorites: [],
    deal: null,
    loading: false,
  };

  componentDidMount() {
    //this.getScreenData();
    this.requestUserPermission();
    this.props.navigation.addListener('focus', () => {
      this.getScreenData();
    });
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    //const permissionIOS = await PushNotificationIOS.requestPermissions();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const pushToken = await this.getFcmToken();
      this.updatePushToken(pushToken);
    }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      return fcmToken.toString();
    } else {
      return null;
    }
  };

  updatePushToken = async pushToken => {
    try {
      const response = await client.mutate({
        mutation: REGISTER_PUSH_TOKEN,
        variables: {pushToken},
      });
    } catch (error) {
      console.error('[Error]: ', error);
    }
  };

  viewAllServices = () => {
    this.props.navigation.navigate('Services');
  };

  onServicePressed = service => {
    this.props.navigation.navigate('Service', {service});
  };

  onCategoryPressed = category => {
    this.props.navigation.navigate('ServiceCategory', {category});
  };

  onDealPressed = deal => {
    this.props.navigation.navigate('DealScreen', {deal});
  };

  getScreenData = async () => {
    this.setState({loading: true});
    const {
      data: {
        getExploreScreen: {categories, popular, deal, favorites},
      },
    } = await client.query({
      query: GET_EXPLORE_SCREEN_DATA,
    });

    this.setState({
      loading: false,
      categories,
      popular,
      favorites,
      deal,
    });
  };

  render() {
    const {loading, popular, categories, deal, favorites} = this.state;
    return (
      <Screen translucent barBackgroundColor={'transparent'}>
        <ScrollView>
          {!_.isEmpty(categories) && (
            <HorizontalSlider
              data={categories}
              onCategoryPressed={this.onCategoryPressed}
            />
          )}
          {!_.isNull(deal) && (
            <ContentWrapper
              title={strings.headerTodaysDeal}
              subTitle={strings.subHeaderDeals}>
              <TouchableOpacity
                style={[styles.itemContainer, styles.shadowStyle]}
                onPress={() => this.onDealPressed(deal)}>
                <Image
                  source={{uri: deal.thumbnail}}
                  style={styles.thumbnail}
                />
                <View style={styles.detailsContainer}>
                  <View style={styles.itemTextContainer}>
                    <Text
                      style={styles.itemTitle}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {deal.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.itemDescription}>
                      {deal.description}
                    </Text>
                  </View>
                  <View style={styles.percentageContainer}>
                    <Text style={styles.percentage}>{deal?.percentage}</Text>
                    <Text style={styles.percentageSymbol}>%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ContentWrapper>
          )}
          {!_.isEmpty(popular) && (
            <PopularServices
              data={popular}
              onViewAllPressed={this.viewAllServices}
              onServicePressed={this.onServicePressed}
            />
          )}
          {!_.isEmpty(favorites) && <PopularItemsList data={favorites} />}
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    flexDirection: 'column',
    height: hp(45),
    width: wp(100),
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: wp(5),
    //backgroundColor: Color(Colors.black).fade(0.5).string(),
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginTop: hp(8),
    paddingHorizontal: wp(5),
    width: wp(80),
    height: hp(5.3),
    borderRadius: hp(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchIcon: {
    width: wp(5),
  },
  textInput: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    ...Platform.select({
      android: {
        flex: 1,
        height: hp(5),
      },
    }),
  },
  titleContainer: {
    flexDirection: 'column',
    marginTop: hp(19),
    paddingHorizontal: wp(10),
  },
  title: {
    fontSize: wp(9),
    fontFamily: Fonts.header,
    color: Colors.white,
    lineHeight: wp(11),
    textAlign: 'left',
    zIndex: 5,
  },
  bookButton: {
    width: wp(33),
    backgroundColor: Colors.buttonGrey,
    height: hp(4),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  bookButtonText: {
    fontFamily: Fonts.regular,
    fontSize: wp(3.5),
    color: Colors.white,
  },
  bottom: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    marginTop: hp(4),
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: wp(3.5),
    marginRight: wp(1.5),
  },
  loginText: {
    fontFamily: Fonts.bold,
    fontSize: wp(3.5),
    color: Colors.white,
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
    height: hp(24),
    width: wp(90),
    borderRadius: 15,
    marginBottom: hp(2),
    marginTop: hp(2),
  },
  thumbnail: {
    height: hp(15),
    width: wp(90),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  itemTextContainer: {
    marginTop: hp(2),
    marginLeft: wp(3),
  },
  itemDetails: {
    //justifyContent: 'space-evenly',
    //flex: 1,
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
  },
  itemDescription: {
    fontFamily: Fonts.bold,
    color: Colors.boldGreyText,
    flexWrap: 'wrap',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  percentageContainer: {
    flexDirection: 'row',
    marginRight: wp(6),
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

export default SearchScreen;
