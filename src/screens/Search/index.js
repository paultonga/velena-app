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
import Images from '../../ui/Images';
import Color from 'color';
import FavoritesList from '../../component/Favorites';
import PopularItemsList from '../../component/PopularDemand';

const IMAGE_SOURCE =
  'https://unsplash.com/photos/sYIqGW3hufI/download?force=true&w=1920';

class SearchScreen extends Component {
  render() {
    return (
      <Screen hasStatusBar>
        <ScrollView>
          <ImageBackground
            source={{uri: IMAGE_SOURCE}}
            resizeMode="cover"
            style={styles.imageBackground}>
            <View style={styles.overlay} />
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Find stores and deals"
                placeholderTextColor={Colors.lightGreyText}
              />
              <Image
                source={Images.icons.search}
                style={styles.searchIcon}
                resizeMode="center"
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Explore styles.</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <FavoritesList />
          <PopularItemsList />
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
