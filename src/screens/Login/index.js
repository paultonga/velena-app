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

export default class LoginScreen extends Component {
  state = {
    shouldRemember: false,
  };

  toggle = () => {
    const {shouldRemember} = this.state;
    this.setState({shouldRemember: !shouldRemember});
  };

  gotoMain = () => {
    this.props.navigation.replace('Main');
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  gotoRegister = () => {
    this.props.navigation.navigate('Register');
  };

  gotoForgotPassword = () => {
    this.props.navigation.navigate('Forgot');
  };

  render() {
    const {shouldRemember} = this.state;

    return (
      <Screen>
        <NavHeader hasBackIcon leftAction={this.goBack} />
        <View style={styles.container}>
          <Text style={styles.header}>Log in</Text>
          <View style={styles.formContainer}>
            <Input placeholder="Your Email" autoCapitalize="none" />
            <Input placeholder="Password" isSecure autoCapitalize="none" />
            <View style={styles.subContainer}>
              <View style={styles.rememberContainer}>
                <Switch
                  value={shouldRemember}
                  onChange={this.toggle}
                  style={styles.switch}
                  ios_backgroundColor={Colors.buttonGrey}
                />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={this.gotoForgotPassword}>
                <Text style={styles.forgotButtonText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.gotoMain}>
              <Text style={styles.submitButtonText}>Log in</Text>
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
    height: hp(30),
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
    //alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    color: Colors.white,
  },
});
