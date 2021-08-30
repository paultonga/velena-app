import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Screen from '../../component/Screen';
import {setIntroViewed} from '../../redux/user/actions';

import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

const data = [
  {
    header: 'Stylish hair',
    description: 'Explore interesting and modern hairstyles from experts.',
    image: 'https://unsplash.com/photos/KvvZ6IIB5FM/download?force=true&w=640',
  },
  {
    header: 'Best deals',
    description: 'Experience best hair deals in our different stores.',
    image: 'https://unsplash.com/photos/FkAZqQJTbXM/download?force=true&w=640',
  },
  {
    header: 'Fast booking',
    description:
      'With our new and efficient app, you can make fast bookings online.',
    image: 'https://unsplash.com/photos/FkAZqQJTbXM/download?force=true&w=640',
  },
];

const Indicator = ({active = false}) => {
  return (
    <View
      style={[
        styles.indicator,
        active ? styles.activeIndicator : styles.inactiveIndicator,
      ]}
    />
  );
};

class HorizontalSlider extends Component {
  state = {
    index: 0,
  };

  _onViewableItemsChanged = ({viewableItems, changed}) => {
    const {index} = viewableItems[0];
    this.setState({index});
  };

  _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          style={styles.linearGradient}
          locations={[0, 1.0]}
          colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']}>
          <View style={styles.bottomContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.header}>{item.header}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.indicatorContainer}>
                {data.map((_, itemIndex) => (
                  <Indicator active={index === itemIndex} />
                ))}
              </View>
            </View>
            <TouchableOpacity style={styles.bookNowButton}>
              <Text style={styles.bookNowButtonText}>BOOK NOW</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  };

  render() {
    const {index} = this.state;
    return (
        <View>
          <FlatList
            data={data}
            onViewableItemsChanged={this._onViewableItemsChanged}
            viewabilityConfig={this._viewabilityConfig}
            renderItem={this.renderItem}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={styles.flatlist}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  indicator: {
    height: wp(2),
    width: wp(2),
    borderRadius: 10,
    marginHorizontal: wp(1),
  },
  activeIndicator: {
    backgroundColor: Colors.lightGreyText,
  },
  inactiveIndicator: {
    backgroundColor: Colors.black,
  },
  image: {
    width: wp(100),
    height: hp(40),
  },
  itemContainer: {
    width: wp(100),
    height: hp(40),
  },
  textContainer: {
    width: wp(65),
    alignItems: 'flex-start',
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(6),
  },
  linearGradient: {
    height: hp(15),
    width: wp(100),
    position: 'absolute',
    bottom: 0,
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(9),
    color: Colors.white,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: wp(3.5),
    color: Colors.white,
  },
  flatlist: {
    width: wp(100),
  },
  bookNowButton: {
    width: wp(20),
    backgroundColor: Colors.buttonGrey,
    height: hp(5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bookNowButtonText: {
    fontFamily: Fonts.bold,
    fontSize: wp(2.5),
    color: Colors.white,
  },
});

export default HorizontalSlider;
