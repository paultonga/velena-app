import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES, STORAGE} from '../../utils/constants';
import styles from './styles';

class Splash extends Component {
  navigate = async () => {
    const {isLoggedIn} = this.props;
    const hasViewedIntro = await AsyncStorage.getItem(STORAGE.INTRO_VIEWED_KEY);
    setTimeout(async () => {
      if (isLoggedIn) {
        this.props.navigation.replace('Main');
      } else {
        if (hasViewedIntro) {
          this.props.navigation.navigate('Welcome');
        } else {
          this.props.navigation.navigate('Intro');
        }
      }
    }, 3500);
  };

  render() {
    this.navigate();
    return (
      <Screen
        statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
        barBackgroundColor={'white'}>
        <View style={styles.container}>
          <Text style={styles.header}>Velena</Text>
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.account.isLoggedIn,
  hasViewedIntro: state.account.hasViewedIntro,
});

export default connect(mapStateToProps, null)(Splash);
