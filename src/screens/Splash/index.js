import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import { STATUS_BAR_STYLES } from '../../utils/constants';

class Splash extends Component {
  navigate = async () => {
    const {isLoggedIn, hasViewedIntro} = this.props;
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
          <Text style={styles.header}>Velena Beauty</Text>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: 32,
  },
});

const mapStateToProps = state => ({
  isLoggedIn: state.account.isLoggedIn,
  hasViewedIntro: state.account.hasViewedIntro,
});

export default connect(mapStateToProps, null)(Splash);
