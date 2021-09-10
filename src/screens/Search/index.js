import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import Screen from '../../component/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import FavoritesList from '../../component/Favorites';
import PopularItemsList from '../../component/PopularDemand';
import HorizontalSlider from '../../component/HorizontalSlider';
import {client} from '../../../App';
import _ from 'lodash';
import messaging from '@react-native-firebase/messaging';
import {GET_EXPLORE_SCREEN_DATA, REGISTER_PUSH_TOKEN} from './graphql';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class SearchScreen extends Component {
  state = {
    popular: [],
    categories: [],
    loading: false,
  };

  componentDidMount() {
    this.getScreenData();
    this.requestUserPermission();
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const permissionIOS = await PushNotificationIOS.requestPermissions();
    console.log('IOS PERMISSION', permissionIOS);
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

  getScreenData = async () => {
    this.setState({loading: true});
    const {
      data: {
        getExploreScreen: {categories, popular},
      },
    } = await client.query({
      query: GET_EXPLORE_SCREEN_DATA,
    });

    this.setState({
      loading: false,
      categories,
      popular,
    });
  };

  render() {
    const {loading, popular, categories} = this.state;
    return (
      <Screen translucent barBackgroundColor={'transparent'}>
        <ScrollView>
          <HorizontalSlider />
          {!_.isEmpty(popular) && (
            <FavoritesList
              data={popular}
              onViewAllPressed={this.viewAllServices}
              onServicePressed={this.onServicePressed}
            />
          )}
          {!_.isEmpty(categories) && <PopularItemsList data={categories} />}
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
});

export default SearchScreen;
