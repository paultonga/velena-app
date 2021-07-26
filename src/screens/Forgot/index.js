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

export default class ForgotPasswordScreen extends Component {
  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Screen>
        <NavHeader hasBackIcon leftAction={this.goBack} />
        <View style={styles.container}>
          <Text style={styles.header}>Forgot</Text>
          <Text style={styles.header}>Password?</Text>
          <Text style={styles.instructions}>
            Enter your email to receive the instructions to reset your password.
          </Text>
          <View style={styles.formContainer}>
            <Input placeholder="Your Email" autoCapitalize="none" />

            <TouchableOpacity style={styles.submitButton} onPress={this.goBack}>
              <Text style={styles.submitButtonText}>Reset Password</Text>
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
    lineHeight: wp(10),
  },
  formContainer: {
    marginTop: hp(1.5),
    height: hp(20),
    justifyContent: 'space-between',
  },
  instructions: {
    fontFamily: Fonts.regular,
    color: Colors.lightGreyText,
    fontSize: wp(3.5),
    marginTop: hp(2),
  },
  subContainer: {
    width: wp(80),
    height: hp(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    width: wp(80),
    backgroundColor: Colors.buttonGrey,
    height: hp(6),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    color: Colors.white,
  },
});
