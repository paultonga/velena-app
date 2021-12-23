import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Screen from '../../component/Screen';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import styles from './styles';
import strings from '../../localization';

const IMAGE_SOURCE =
  'https://unsplash.com/photos/sYIqGW3hufI/download?force=true&w=720';

class WelcomeScreen extends Component {
  login = () => {
    this.props.navigation.navigate('Login');
  };

  register = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <Screen
        hasStatusBar
        translucent
        barBackgroundColor={'transparent'}
        statusBarStyle={STATUS_BAR_STYLES.LIGHT_CONTENT}>
        <ImageBackground
          source={{uri: IMAGE_SOURCE}}
          style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Text style={styles.header}>{strings.welcomeScreenText}</Text>
            <TouchableOpacity style={styles.button} onPress={this.register}>
              <Text style={styles.buttonText}>{strings.createAccount}</Text>
            </TouchableOpacity>
            <View style={styles.bottom}>
              <Text style={styles.text}>{strings.alreadyAccount}</Text>
              <TouchableOpacity onPress={this.login}>
                <Text style={styles.loginText}>{strings.login}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Screen>
    );
  }
}

export default WelcomeScreen;
