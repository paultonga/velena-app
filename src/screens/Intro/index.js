import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Screen from '../../component/Screen';

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

export default class IntroScreen extends Component {
  state = {
    index: 0,
  };

  gotoIntro = () => {
    this.props.navigation.navigate('Welcome');
  };

  _onViewableItemsChanged = ({viewableItems, changed}) => {
    const {index} = viewableItems[0];
    this.setState({index});
  };

  _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.header}>{item.header}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  render() {
    const {index} = this.state;
    return (
      <Screen>
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
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.gotoIntro}>
            <Text style={styles.submitButtonText}>Get started</Text>
          </TouchableOpacity>
          <View style={styles.indicatorContainer}>
            {data.map((_, itemIndex) => (
              <Indicator active={index === itemIndex} />
            ))}
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    height: wp(2.5),
    width: wp(2.5),
    borderRadius: 10,
    marginHorizontal: wp(1),
  },
  activeIndicator: {
    backgroundColor: Colors.black,
  },
  inactiveIndicator: {
    backgroundColor: Colors.lightGreyText,
  },
  image: {
    width: wp(100),
    height: hp(55),
  },
  itemContainer: {
    width: wp(100),
  },
  textContainer: {
    paddingHorizontal: wp(5),
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(9),
    marginTop: hp(5),
    textAlign: 'center',
    color: Colors.headerGreyText,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    textAlign: 'center',
    color: Colors.lightGreyText,
    marginVertical: hp(2),
  },
  flatlist: {
    width: wp(100),
  },
  submitButton: {
    width: wp(60),
    backgroundColor: Colors.buttonGrey,
    height: hp(6),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp(4),
  },
  submitButtonText: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    color: Colors.white,
  },
});
