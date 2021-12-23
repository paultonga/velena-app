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
import {requestCode, verifyCode} from '../../redux/user/actions';
import {connect} from 'react-redux';

class VerifyScreen extends Component {
  state = {
    code: '',
  };

  componentDidMount() {
    const {route} = this.props;
    const {email} = route.params;

    if (email) {
      this.props.requestCode({email});
    }
  }

  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  };

  verifyCode = () => {
    const {code} = this.state;
    const {email} = this.props.route.params;
    const {isResetPassword = false} = this.props.route.params;
    this.props.verifyCode({email, code, isResetPassword, type: 'EMAIL'});
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  handleTextChange = code => {
    this.setState({code});
  };

  render() {
    const {route} = this.props;
    const {email} = route.params;
    const {code} = this.state;
    return (
      <Screen>
        <NavHeader hasBackIcon leftAction={this.goBack} />
        <View style={styles.container}>
          <Text style={styles.header}>Verify</Text>
          <Text style={styles.instructions}>
            {`Enter the code sent to ${email}  to continue.`}
          </Text>
          <View style={styles.formContainer}>
            <Input
              placeholder="Enter code"
              autoCapitalize="none"
              onTextChange={this.handleTextChange}
              value={code}
              maxLength={6}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.verifyCode}>
              <Text style={styles.submitButtonText}>Continue</Text>
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

const mapStateToProps = state => ({
  loading: state.account.loading,
});

const mapDispatchToProps = dispatch => ({
  requestCode: payload => dispatch(requestCode(payload)),
  verifyCode: payload => dispatch(verifyCode(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyScreen);
