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
import Input from '../../component/Input';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import _ from 'lodash';
import {loginUser} from '../../redux/user/actions';
import { connect } from 'react-redux';

class LoginScreen extends Component {
  state = {
    shouldRemember: false,
    phone: '',
    password: '',
    loading: false,
    errors: {},
  };

  validate = () => {
    const {password, phone} = this.state;
    const errors = {};

    if (!phone) {
      errors.phone = 'Phone is required';
    }

    if (!password || password.length < 7) {
      errors.password = 'Password length should be atleast 7';
    }

    _.isEmpty(errors) ? this.login() : this.setState({errors});
  };

  login = async () => {
    const {password, phone} = this.state;
    this.props.loginUser({password, phone});
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

  render() {
    const {shouldRemember, errors, phone, password} = this.state;
    const {loading} = this.props;

    return (
      <Screen>
        <NavHeader hasBackIcon leftAction={this.goBack} />
        <View style={styles.container}>
          <Text style={styles.header}>Log in</Text>
          <View style={styles.formContainer}>
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
              disabled={loading}
              onPress={this.validate}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Log in</Text>
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

const mapStateToProps = state => ({
  loading: state.account.loading,
});
const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
