import React, {Component} from 'react';
import {Text, View, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Input from '../../component/Input';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default class RegisterScreen extends Component {
  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  gotoMain = () => {
    this.props.navigation.replace('Main');
  };

  render() {
    return (
      <Screen>
        <NavHeader
          hasBackIcon
          leftAction={this.goBack}
          rightActionText="Log in"
          rightAction={this.gotoLogin}
        />
        <View style={styles.container}>
          <Text style={styles.header}>Sign up</Text>
          <View style={styles.formContainer}>
            <Input placeholder="First name" autoCapitalize="words" />
            <Input placeholder="Last name" autoCapitalize="words" />
            <Input placeholder="Your email" autoCapitalize="none" />
            <Input placeholder="Password" isSecure autoCapitalize="none" />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.gotoMain}>
              <Text style={styles.submitButtonText}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: wp(8),
    paddingRight: wp(5),
    paddingTop: hp(4),
  },
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(9),
    color: Colors.headerGreyText,
  },
  formContainer: {
    marginTop: hp(1.5),
    height: hp(40),
    justifyContent: 'space-between',
  },
  subContainer: {
    width: wp(80),
    height: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotButtonText: {
    fontSize: wp(3),
    fontFamily: Fonts.regular,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: wp(2),
    fontFamily: Fonts.regular,
    fontSize: wp(3),
  },
  submitButton: {
    width: wp(80),
    backgroundColor: Colors.buttonGrey,
    height: hp(6),
    borderRadius: 10,
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    color: Colors.white,
  },
});
