import {gql} from '@apollo/client';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '../../../App';
import Input from '../../component/Input';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import _ from 'lodash';
import {signUpUser} from '../../redux/user/actions';
import { connect } from 'react-redux';


class RegisterScreen extends Component {
  state = {
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    loading: false,
    errors: {},
  };

  validate = () => {
    const {firstName, password, confirmPassword, phone} = this.state;
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    }

    if (!password || password.length < 7) {
      errors.password = 'Password length should be atleast 7';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    _.isEmpty(errors) ? this.createAccount() : this.setState({errors});
  };

  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  gotoMain = () => {
    this.props.navigation.replace('Main');
  };

  handleInput = (source, text) => {
    this.setState({
      [source]: text,
    });
  };

  handleFocus = name => {
    const {errors} = this.state;
    errors[name] = null;

    this.setState({errors});
  };

  createAccount = async () => {
    const {firstName, lastName, phone, password} = this.state;
    this.props.signUpUser({firstName, lastName, password, phone});
  };

  render() {
    const {
      errors,
      firstName,
      lastName,
      phone,
      password,
      confirmPassword,
    } = this.state;
    const {loading} = this.props;
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
            <Input
              onTextChange={text => this.handleInput('firstName', text)}
              onFocus={() => this.handleFocus('firstName')}
              value={firstName}
              placeholder="First name"
              autoCapitalize="words"
              error={errors?.firstName}
            />
            <Input
              onTextChange={text => this.handleInput('lastName', text)}
              value={lastName}
              placeholder="Last name"
              autoCapitalize="words"
            />
            <Input
              onTextChange={text => this.handleInput('phone', text)}
              onFocus={() => this.handleFocus('phone')}
              value={phone}
              placeholder="Phone number"
              autoCapitalize="none"
              error={errors?.phone}
              keyboardType={'phone-pad'}
              maxLength={11}
            />
            <Input
              onTextChange={text => this.handleInput('password', text)}
              onFocus={() => this.handleFocus('password')}
              value={password}
              placeholder="Password"
              isSecure
              autoCapitalize="none"
              error={errors?.password}
            />
            <Input
              onTextChange={text => this.handleInput('confirmPassword', text)}
              onFocus={() => this.handleFocus('confirmPassword')}
              value={confirmPassword}
              placeholder="Confirm password"
              isSecure
              autoCapitalize="none"
              error={errors?.confirmPassword}
            />
            <TouchableOpacity
              style={styles.submitButton}
              disabled={loading}
              onPress={this.validate}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Create account</Text>
              )}
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
    marginTop: hp(1),
    height: hp(42),
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

const mapStateToProps = state => ({
  loading: state.account.loading,
});
const mapDispatchToProps = dispatch => ({
  signUpUser: payload => dispatch(signUpUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
