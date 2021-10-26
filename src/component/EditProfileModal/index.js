import React from 'react';
import _, {overEvery} from 'lodash';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {updateUser as updateUserAction, reset as resetAction} from '../../redux/user/actions';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Input from '../../component/Input';
import Modal from 'react-native-modal';
import Images from '../../ui/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import Colors from '../../ui/Colors';
import ImagePicker from 'react-native-image-crop-picker';

class EditProfileModal extends React.Component {
  constructor(props) {
    super(props);
    const {userProfile} = this.props;

    this.state = {
      loading: false,
      firstName: userProfile?.firstName ?? '',
      lastName: userProfile?.lastName ?? '',
      address: userProfile?.address ?? '',
      emailAddress: userProfile?.emailAddress ?? '',
      errors: {},
      avatar: userProfile.avatar ?? '',
      source: null,
    };
  }

  componentDidMount() {
    this.props.reset();
  }

  validate = () => {
    const {firstName, lastName, address} = this.state;
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    _.isEmpty(errors) ? this.updateAccount() : this.setState({errors});
  };

  updateAccount = () => {
    this.setState({loading: true});
    const {userProfile} = this.props;
    const {source} = this.state;

    if (source) {
      const photo = {
        uri: source?.path,
        type: source?.mime,
        name: `${userProfile.phone}.jpg`,
      };

      const data = new FormData();
      data.append('file', photo);
      data.append('upload_preset', 'velena');
      data.append('cloud_name', 'dzmxvbxof');

      fetch('https://api.cloudinary.com/v1_1/dzmxvbxof/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(image => {
          const avatar = image.secure_url;
          this.setState({avatar});
        })
        .catch(err => {
          console.error('Error Uploading', err);
          this.setState({loading: false});
        })
        .finally(() => this.updateUserMutation());
    } else {
      this.updateUserMutation()
    }
  };

  updateUserMutation = async () => {
    const {firstName, lastName, address, avatar} = this.state;
    const payload = {firstName, lastName, avatar, address};

    await this.props.updateUser(payload);
    this.setState({loading: false});
    this.props.onCloseModal();
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

  onImagePressed = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(source => {
      this.setState({source});
    });
  };

  render() {
    const {
      isModalVisible,
      onCloseModal,
      userProfile,
      loading: stateLoading,
    } = this.props;
    const {
      lastName,
      firstName,
      address,
      emailAddress,
      loading,
      errors,
      source,
    } = this.state;

    const imageUrl = userProfile?.avatar
      ? {uri: userProfile.avatar}
      : Images.icons.avatar;

    const avatar = source === null ? imageUrl : {uri: source?.path};

    return (
      <Modal style={styles.modal} isVisible={isModalVisible}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
            <Icon name="close" color={Colors.buttonGrey} size={wp(8)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={this.onImagePressed}>
            <Image source={avatar} style={styles.avatarImage} />
            <Icon
              name="image-edit-outline"
              style={styles.editIcon}
              size={wp(6)}
              color={Colors.lightGreyText}
            />
          </TouchableOpacity>

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
              onTextChange={text => this.handleInput('address', text)}
              value={address}
              placeholder="your address"
              autoCapitalize="words"
            />

            <Input
              onTextChange={text => this.handleInput('emailAddress', text)}
              value={emailAddress}
              placeholder="email address"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              disabled={loading}
              onPress={this.validate}>
              {loading || stateLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Update Profile</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
  loading: state.account.loading,
});

const mapDispatchToProps = dispatch => ({
  updateUser: payload => dispatch(updateUserAction(payload)),
  reset: payload => dispatch(resetAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
