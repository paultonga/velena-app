import React, {Component} from 'react';
import {
  Text,
  View,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Input from '../../component/Input';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import _ from 'lodash';
import {loginUser} from '../../redux/user/actions';
import {connect} from 'react-redux';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import styles from './styles';

class LoginScreen extends Component {
  state = {
    shouldRemember: false,
    phone: '',
    password: '',
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
      <Screen
        statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
        barBackgroundColor={'white'}>
        <NavHeader hasBackIcon leftAction={this.goBack} />
        <View style={styles.container}>
          <Text style={styles.header}>Log in</Text>
          <View style={styles.formContainer}>
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
                <Text style={styles.submitButtonText}>LOG IN</Text>
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
  loginUser: payload => dispatch(loginUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
