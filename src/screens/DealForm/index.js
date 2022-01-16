import React from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

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
import {client} from '../../../App';
import {CREATE_DEAL_MUTATION, EDIT_DEAL_MUTATION} from './graphql';

const PLACEHOLDER_IMAGE =
  'https://unsplash.com/photos/xwM61TPMlYk/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8fDB8fHx8MTY0MDI2MjEwMQ&force=true&w=640';

class DealFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      id: null,
      title: '',
      description: '',
      percentage: '',
      thumbnail: '',
      errors: {},
      source: null,
    };
  }

  showAlert = ({title, message}) => {
    Alert.alert(title, message, [
      {
        text: 'Close',
        onPress: () => {},
      },
    ]);
  };

  validate = () => {
    const {title, description, percentage} = this.state;
    const errors = {};

    if (!title) {
      errors.title = 'Deal title is required.';
    }

    if (!description) {
      errors.description = 'Deal description is required.';
    }

    if (!parseFloat(percentage) || parseFloat(percentage) <= 0) {
      errors.percentage = 'Please enter a valid percentage';
    }

    _.isEmpty(errors) ? this.uploadImage() : this.setState({errors});
  };

  uploadImage = () => {
    this.setState({loading: true});
    const {source} = this.state;
    const {isEditing} = this.props;
    const imageName = Math.random().toString(36).substr(2, 5);

    if (source) {
      const photo = {
        uri: source?.path,
        type: source?.mime,
        name: `${imageName}.jpg`,
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
          const thumbnail = image.secure_url;
          this.setState({thumbnail});
        })
        .catch(err => {
          console.error('Error Uploading', err);
          this.setState({loading: false});
        })
        .finally(() => (isEditing ? this.editDeal() : this.createDeal()));
    } else {
      isEditing ? this.editDeal() : this.createDeal();
    }
  };

  editDeal = async () => {
    const {id, title, description, thumbnail, percentage} = this.state;

    const variables = {
      id,
      title,
      description,
      thumbnail,
      percentage: parseInt(percentage, 10),
    };

    try {
      const {
        data: {
          editDeal: {success},
        },
      } = await client.mutate({
        mutation: EDIT_DEAL_MUTATION,
        variables,
      });

      if (success) {
        this.setState({loading: false});
        this.props.dealCallback();
        this.props.onCloseModal();
      }
    } catch (error) {
      this.setState({loading: false});
      console.log('[editDeal Error::]', error);
      this.showAlert({title: 'EditDeal Error', message: error.message});
    }
  };

  createDeal = async () => {
    const {title, description, thumbnail, percentage} = this.state;

    const variables = {
      title,
      description,
      thumbnail,
      percentage: parseInt(percentage, 10),
    };

    try {
      const {
        data: {
          createDeal: {success},
        },
      } = await client.mutate({
        mutation: CREATE_DEAL_MUTATION,
        variables,
      });

      if (success) {
        this.setState({loading: false});
        this.props.dealCallback();
        this.props.onCloseModal();
      }
    } catch (error) {
      this.setState({loading: false});
      console.log('[createDeal Error::]', error);
      this.showAlert({title: 'CreateDeal Error', message: error.message});
    }
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
      width: 840,
      height: 840,
      cropping: false,
    }).then(source => {
      this.setState({source});
    });
  };

  initializeForm = () => {
    const {isEditing, deal} = this.props;
    if (isEditing) {
      this.setState({
        id: deal?.id,
        title: deal?.title,
        description: deal?.description,
        percentage: deal.percentage.toString(),
        thumbnail: deal?.thumbnail,
      });
    }
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      percentage: '',
      thumbnail: '',
    });
  };

  render() {
    const {isModalVisible, onCloseModal} = this.props;
    const {title, description, percentage, loading, thumbnail, errors, source} =
      this.state;

    const imageUrl = thumbnail ? {uri: thumbnail} : Images.icons.placeholder;

    const avatar = source === null ? imageUrl : {uri: source?.path};

    return (
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        onModalHide={this.resetForm}
        onModalShow={this.initializeForm}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
            <Icon name="close" color={Colors.buttonGrey} size={wp(8)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={this.onImagePressed}>
            <Image
              source={avatar}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <Icon
              name="image-edit-outline"
              style={styles.editIcon}
              size={wp(6)}
              color={Colors.lightGreyText}
            />
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <Input
              onTextChange={text => this.handleInput('title', text)}
              onFocus={() => this.handleFocus('title')}
              value={title}
              placeholder="Title"
              autoCapitalize="words"
              error={errors?.title}
            />
            <Input
              onTextChange={text => this.handleInput('description', text)}
              onFocus={() => this.handleFocus('description')}
              value={description}
              placeholder="Description"
              error={errors?.description}
            />
            <Input
              onTextChange={text => this.handleInput('percentage', text)}
              onFocus={() => this.handleFocus('percentage')}
              value={percentage}
              placeholder="Percentage"
              autoCapitalize="none"
              keyboardType="number-pad"
              error={errors?.percentage}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              disabled={loading}
              onPress={this.validate}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DealFormModal;
