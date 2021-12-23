import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '../../component/Input';
import Checkbox from '@react-native-community/checkbox';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import _ from 'lodash';
import {signUpUser} from '../../redux/user/actions';
import {connect} from 'react-redux';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import styles from './styles';
import strings from '../../localization';
import TermsModal from '../../component/TermsModal';
import DatePickerModal from '../../component/DatePickerModal';
import moment from 'moment';

class RegisterScreen extends Component {
  state = {
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    loading: false,
    errors: {},
    termsModalVisible: false,
    datePickerVisible: false,
    dob: '',
    gender: '',
    selectedDate: null,
  };

  openDatePicker = () => {
    this.setState({datePickerVisible: true});
  };

  closeDatePicker = date => {
    const dob = moment(date).format('LL');
    if (date) {
      this.setState({dob, selectedDate: date});
    }
    this.setState({datePickerVisible: false});
  };

  toggleTermsModal = () => {
    const {termsModalVisible} = this.state;
    this.setState({termsModalVisible: !termsModalVisible});
  };

  validate = () => {
    const {
      firstName,
      password,
      confirmPassword,
      phone,
      selectedDate,
      email,
      gender,
    } = this.state;
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password || password.length < 7) {
      errors.password = 'Password length should be atleast 7';
    }

    if (!selectedDate) {
      errors.dob = 'Birthday is required';
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
    const {firstName, lastName, phone, password, email, dob, gender} =
      this.state;
    this.props.signUpUser({
      firstName,
      lastName,
      password,
      phone,
      email,
      dob,
      gender,
    });
  };

  setGender = gender => this.setState({gender});

  render() {
    const {
      errors,
      firstName,
      lastName,
      phone,
      password,
      confirmPassword,
      termsModalVisible,
      dob,
      datePickerVisible,
      gender,
      email,
    } = this.state;
    const {loading} = this.props;
    return (
      <Screen
        hasBottomBorder
        statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
        barBackgroundColor={'white'}>
        <NavHeader
          hasBackIcon
          leftAction={this.goBack}
          rightActionText={strings.login}
          rightAction={this.gotoLogin}
          hideScan
        />
        <View style={styles.container}>
          <Text style={styles.header}>{strings.signup}</Text>
          <View style={styles.formContainer}>
            <Input
              onTextChange={text => this.handleInput('firstName', text)}
              onFocus={() => this.handleFocus('firstName')}
              value={firstName}
              placeholder={strings.firstName}
              autoCapitalize="words"
              error={errors?.firstName}
            />
            <Input
              onTextChange={text => this.handleInput('lastName', text)}
              value={lastName}
              placeholder={strings.lastName}
              autoCapitalize="words"
            />
            <Input
              onTextChange={text => this.handleInput('phone', text)}
              onFocus={() => this.handleFocus('phone')}
              value={phone}
              placeholder={strings.phone}
              autoCapitalize="none"
              error={errors?.phone}
              keyboardType={'phone-pad'}
              maxLength={11}
            />
            <Input
              onTextChange={text => this.handleInput('email', text)}
              onFocus={() => this.handleFocus('email')}
              value={email}
              placeholder={strings.emailAddress}
              autoCapitalize="none"
              error={errors?.email}
              keyboardType={'email-address'}
            />
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
            <TouchableOpacity
              style={{zIndex: 30, paddingBottom: 10}}
              hitSlop={{top: 0, left: 0, right: 0, bottom: 0}}
              onPress={this.openDatePicker}>
              <Input
                editable={false}
                onFocus={() => this.handleFocus('dob')}
                value={dob}
                placeholder={strings.dob}
                autoCapitalize="none"
                error={errors?.dob}
              />
            </TouchableOpacity>
            <View style={styles.genderContainer}>
              <Text style={styles.genderHeader}>Gender</Text>
              <View style={styles.genderRow}>
                <Checkbox
                  value={gender === 'MALE'}
                  onValueChange={checked =>
                    this.setGender(checked ? 'MALE' : '')
                  }
                />
                <Text style={styles.gender}> Male</Text>
                <Checkbox
                  value={gender === 'FEMALE'}
                  onValueChange={checked =>
                    this.setGender(checked ? 'FEMALE' : '')
                  }
                />
                <Text style={styles.gender}> Female</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              disabled={loading}
              onPress={this.validate}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {strings.createAccount}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.tosContainer}>
            <Text style={styles.tosText}>
              By continuing, you agree to our{' '}
              <Text
                onPress={this.toggleTermsModal}
                style={styles.tosBoldUnderline}>
                Terms of Service{' '}
              </Text>{' '}
            </Text>
          </View>
        </View>
        <TermsModal
          isModalVisible={termsModalVisible}
          onCloseModal={this.toggleTermsModal}
        />
        <DatePickerModal
          onCloseModal={this.closeDatePicker}
          isModalVisible={datePickerVisible}
        />
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
