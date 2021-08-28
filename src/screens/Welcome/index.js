import React, {Component} from 'react';
import {View, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Screen from '../../component/Screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import Color from 'color';

const IMAGE_SOURCE =
  'https://unsplash.com/photos/sYIqGW3hufI/download?force=true&w=1920';

class WelcomeScreen extends Component {
  login = () => {
    this.props.navigation.navigate('Login');
  };

  register = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <Screen hasStatusBar>
        <ImageBackground
          source={{uri: IMAGE_SOURCE}}
          style={styles.imageBackground}>
          <View style={styles.overlay}>
            <Text style={styles.header}>Beautiful and exclusive styles.</Text>
            <TouchableOpacity style={styles.button} onPress={this.register}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.bottom}>
              <Text style={styles.text}>Already have an account?</Text>
              <TouchableOpacity onPress={this.login}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: wp(5),
    backgroundColor: Color(Colors.black).fade(0.5).string(),
  },
  header: {
    fontSize: wp(11),
    fontFamily: Fonts.header,
    color: Colors.white,
    lineHeight: wp(11),
    marginTop: hp(40),
    textAlign: 'center',
    zIndex: 5,
  },
  button: {
    width: wp(80),
    backgroundColor: Colors.white,
    height: hp(6.5),
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(25),
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: wp(3),
    letterSpacing: 1,
    textTransform: 'uppercase',
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

export default WelcomeScreen;
