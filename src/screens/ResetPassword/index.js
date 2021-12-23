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
import {changePassword} from '../../redux/user/actions';
import {connect} from 'react-redux';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import styles from './styles';
import strings from '../../localization';

class ResetPasswordScreen extends Component {
  state = {
    confirmPassword: '',
    password: '',
    errors: {},
  };

  validate = () => {
    const {password, confirmPassword} = this.state;
    const errors = {};

    if (!password || password.length < 7) {
      errors.password = 'Password length should be atleast 7';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }


    _.isEmpty(errors) ? this.changePassword() : this.setState({errors});
  };

  changePassword = async () => {
    const {email} = this.props.route.params;
    const {password} = this.state;
    this.props.changePassword({password, email});
  };

  goBack = () => {
    this.props.navigation.goBack();
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
    const {confirmPassword, errors, password} = this.state;
    const {loading} = this.props;

    return (
      <Screen
        statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
        barBackgroundColor={'white'}>
        <NavHeader hasBackIcon leftAction={this.goBack} hideScan />
        <View style={styles.container}>
          <Text style={styles.header}>{'Reset Password'}</Text>
          <View style={styles.formContainer}>
            <Input
              onTextChange={text => this.handleInput('password', text)}
              onFocus={() => this.handleFocus('password')}
              value={password}
              placeholder={strings.password}
              isSecure
              autoCapitalize="none"
              error={errors?.password}
            />
            <Input
              onTextChange={text => this.handleInput('confirmPassword', text)}
              onFocus={() => this.handleFocus('confirmPassword')}
              value={confirmPassword}
              placeholder={strings.confirmPassword}
              isSecure
              autoCapitalize="none"
              error={errors?.confirmPassword}
            />
            <View style={styles.subContainer}>
              <View style={styles.rememberContainer}>
                {/* <Switch
                  value={shouldRemember}
                  onChange={this.toggle}
                  style={styles.switch}
                  ios_backgroundColor={Colors.buttonGrey}
                />
                <Text style={styles.rememberText}>{strings.rememberMe}</Text> */}
              </View>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              disabled={loading}
              onPress={this.validate}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>{'Reset Password'}</Text>
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
  changePassword: payload => dispatch(changePassword(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen);
