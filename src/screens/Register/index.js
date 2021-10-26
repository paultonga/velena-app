import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Input from '../../component/Input';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import _ from 'lodash';
import {signUpUser} from '../../redux/user/actions';
import {connect} from 'react-redux';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import styles from './styles';

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
    const {errors, firstName, lastName, phone, password, confirmPassword} =
      this.state;
    const {loading} = this.props;
    return (
      <Screen
        hasBottomBorder
        statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
        barBackgroundColor={'white'}>
        <NavHeader
          hasBackIcon
          leftAction={this.goBack}
          rightActionText="Log in"
          rightAction={this.gotoLogin}
          hideScan
        />
        <View style={styles.container}>
          <Text style={styles.header}>Sign up</Text>
          <View style={styles.formContainer}>
            <Input
              onTextChange={text => this.handleInput('firstName', text)}
              onFocus={() => this.handleFocus('firstName')}
              value={firstName}
              placeholder="first name"
              autoCapitalize="words"
              error={errors?.firstName}
            />
            <Input
              onTextChange={text => this.handleInput('lastName', text)}
              value={lastName}
              placeholder="last name"
              autoCapitalize="words"
            />
            <Input
              onTextChange={text => this.handleInput('phone', text)}
              onFocus={() => this.handleFocus('phone')}
              value={phone}
              placeholder="phone number"
              autoCapitalize="none"
              error={errors?.phone}
              keyboardType={'phone-pad'}
              maxLength={11}
            />
            <Input
              onTextChange={text => this.handleInput('password', text)}
              onFocus={() => this.handleFocus('password')}
              value={password}
              placeholder="password"
              isSecure
              autoCapitalize="none"
              error={errors?.password}
            />
            <Input
              onTextChange={text => this.handleInput('confirmPassword', text)}
              onFocus={() => this.handleFocus('confirmPassword')}
              value={confirmPassword}
              placeholder="confirm password"
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

const mapStateToProps = state => ({
  loading: state.account.loading,
});
const mapDispatchToProps = dispatch => ({
  signUpUser: payload => dispatch(signUpUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
