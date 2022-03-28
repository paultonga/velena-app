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
import {
  CREATE_SERVICE_MUTATION,
  EDIT_SERVICE_MUTATION,
  GET_SERVICE_CATEGORIES_QUERY,
} from './graphql';
import DropDownPicker from 'react-native-dropdown-picker';

const PLACEHOLDER_IMAGE =
  'https://unsplash.com/photos/xwM61TPMlYk/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8fDB8fHx8MTY0MDI2MjEwMQ&force=true&w=640';

class ServiceFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      id: null,
      titleEN: '',
      titleTR: '',
      descriptionEN: '',
      descriptionTR: '',
      price: '',
      categoryId: '',
      discountPrice: '',
      errors: {},
      source: null,
      items: [],
      value: null,
      open: false,
    };
  }

  async componentDidMount() {
    await this.getServiceCategories();
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
    const {titleEN, titleTR, descriptionEN, descriptionTR, price} = this.state;
    const errors = {};

    if (!titleEN) {
      errors.titleEN = 'Service title is required.';
    }

    if (!titleTR) {
      errors.titleTR = 'Turkish service title is required.';
    }

    if (!descriptionEN) {
      errors.descriptionEN = 'Service description is required.';
    }

    if (!descriptionTR) {
      errors.descriptionTR = 'Turkish service description is required.';
    }

    if (!parseFloat(price) || parseFloat(price) <= 0) {
      errors.price = 'Please enter a valid price';
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
        .finally(() => (isEditing ? this.editService() : this.createService()));
    } else {
      isEditing ? this.editService() : this.createService();
    }
  };

  editService = async () => {
    const {
      id,
      titleEN,
      titleTR,
      descriptionEN,
      descriptionTR,
      thumbnail,
      price,
      discountPrice,
      value,
    } = this.state;
    const hasDiscount = parseFloat(discountPrice) > 0;
    const categoryId = value;

    const variables = {
      id,
      titleEN,
      titleTR,
      descriptionEN,
      descriptionTR,
      thumbnail,
      price: parseFloat(price),
      hasDiscount,
      categoryId,
      discountPrice: parseFloat(discountPrice),
    };

    try {
      const {
        data: {
          editService: {success},
        },
      } = await client.mutate({
        mutation: EDIT_SERVICE_MUTATION,
        variables,
      });

      if (success) {
        this.setState({loading: false});
        this.props.serviceCallback();
        this.props.onCloseModal();
      }
    } catch (error) {
      this.setState({loading: false});
      console.log('[editService Error::]', error);
      this.showAlert({title: 'EditService Error', message: error.message});
    }
  };

  createService = async () => {
    const {
      titleEN,
      titleTR,
      descriptionEN,
      descriptionTR,
      thumbnail,
      price,
      discountPrice,
      value,
    } = this.state;
    const hasDiscount = parseFloat(discountPrice) > 0;
    const categoryId = value;

    const variables = {
      titleEN,
      titleTR,
      descriptionEN,
      descriptionTR,
      thumbnail,
      price: parseFloat(price),
      hasDiscount,
      categoryId,
      discountPrice: parseFloat(discountPrice),
    };

    try {
      const {
        data: {
          createService: {success},
        },
      } = await client.mutate({
        mutation: CREATE_SERVICE_MUTATION,
        variables,
      });

      if (success) {
        this.setState({loading: false});
        this.props.serviceCallback();
        this.props.onCloseModal();
      }
    } catch (error) {
      this.setState({loading: false});
      console.log('[createService Error::]', error);
      this.showAlert({title: 'CreateService Error', message: error.message});
    }
  };

  setOpen = open => {
    this.setState({
      open,
    });
  };

  setValue = callback => {
    // this.setState({
    //   value,
    // });
    this.setState(state => ({
      value: callback(state.value),
    }));
  };

  setItems = items => {
    // this.setState(state => ({
    //   items: callback(state.items),
    // }));
    this.setState({items});
  };

  getServiceCategories = async () => {
    try {
      const {
        data: {getCategories = []},
      } = await client.query({
        query: GET_SERVICE_CATEGORIES_QUERY,
      });

      this.setState({items: getCategories});
    } catch (error) {
      console.error('[Error getting categories]', error);
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
    const {isEditing, service} = this.props;
    if (isEditing) {
      this.setState({
        id: service?.id,
        titleEN: service?.title?.en,
        titleTR: service?.title?.tr,
        descriptionEN: service?.description?.en,
        descriptionTR: service?.description?.tr,
        price: service.price.toString(),
        discountPrice: service.discountPrice.toString(),
        thumbnail: service?.thumbnail,
        value: service.categoryId.toString(),
      });
    }
  };

  resetForm = () => {
    this.setState({
      titleEN: '',
      titleTR: '',
      descriptionEN: '',
      descriptionTR: '',
      price: '',
      discountPrice: '',
      thumbnail: '',
      value: null,
      id: null,
    });
  };

  render() {
    const {isModalVisible, onCloseModal} = this.props;
    const {
      titleEN,
      titleTR,
      descriptionEN,
      descriptionTR,
      price,
      discountPrice,
      loading,
      thumbnail,
      errors,
      source,
      items,
      value,
      open,
    } = this.state;

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
            <View style={styles.dropDownContainer}>
              <Text style={styles.ddLabel}>Service category</Text>
              <DropDownPicker
                items={items}
                open={open}
                value={value}
                schema={{
                  label: 'title',
                  value: 'id',
                }}
                setOpen={this.setOpen}
                setItems={this.setItems}
                setValue={this.setValue}
              />
            </View>
            <Input
              onTextChange={text => this.handleInput('titleEN', text)}
              onFocus={() => this.handleFocus('titleEN')}
              value={titleEN}
              placeholder="Title (English)"
              autoCapitalize="words"
              error={errors?.titleEN}
            />
            <Input
              onTextChange={text => this.handleInput('titleTR', text)}
              onFocus={() => this.handleFocus('titleTR')}
              value={titleTR}
              placeholder="Title (Turkish)"
              autoCapitalize="words"
              error={errors?.titleTR}
            />
            <Input
              onTextChange={text => this.handleInput('descriptionEN', text)}
              onFocus={() => this.handleFocus('descriptionEN')}
              value={descriptionEN}
              placeholder="Description (English)"
              error={errors?.descriptionEN}
            />

            <Input
              onTextChange={text => this.handleInput('descriptionTR', text)}
              onFocus={() => this.handleFocus('descriptionTR')}
              value={descriptionTR}
              placeholder="Description (Turkish)"
              error={errors?.descriptionTR}
            />

            <Input
              onTextChange={text => this.handleInput('price', text)}
              onFocus={() => this.handleFocus('price')}
              value={price}
              placeholder="Price"
              autoCapitalize="none"
              keyboardType="number-pad"
              error={errors?.price}
            />

            <Input
              onTextChange={text => this.handleInput('discountPrice', text)}
              onFocus={() => this.handleFocus('discountPrice')}
              value={discountPrice}
              placeholder="Discount price"
              autoCapitalize="none"
              keyboardType="number-pad"
              error={errors?.discountPrice}
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

export default ServiceFormModal;
