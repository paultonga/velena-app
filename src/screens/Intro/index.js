import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import Screen from '../../component/Screen';
import strings from '../../localization';
import {STORAGE, INTRO_SCREEN_DATA} from '../../utils/constants';
import styles from './styles';

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

class IntroScreen extends Component {
  state = {
    index: 0,
  };

  gotoWelcomeScreen = () => {
    this.props.navigation.navigate('Welcome');
  };

  async componentDidMount() {
    await AsyncStorage.setItem(
      STORAGE.INTRO_VIEWED_KEY,
      STORAGE.INTRO_VIEWED_VALUE,
    );
  }

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
            data={INTRO_SCREEN_DATA}
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
            onPress={this.gotoWelcomeScreen}>
            <Text style={styles.submitButtonText}>{strings.getStarted}</Text>
          </TouchableOpacity>
          <View style={styles.indicatorContainer}>
            {INTRO_SCREEN_DATA.map((_, itemIndex) => (
              <Indicator active={index === itemIndex} />
            ))}
          </View>
        </View>
      </Screen>
    );
  }
}

export default IntroScreen;
