import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {client} from '../../../App';
import {gql} from '@apollo/client';
import {GET_BOOKINGS_QUERY} from '../../screens/Bookings';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Images from '../../ui/Images';

const GET_SERVICES_NAMES = gql`
  query GetServicesNames {
    getServices {
      id
      title
    }
  }
`;

class ServiceListModal extends Component {
  state = {
    services: [],
  };

  componentDidMount() {
    this.fetchServices();
  }

  fetchServices = async () => {
    const {
      data: {getServices: services},
    } = await client.query({
      query: GET_SERVICES_NAMES,
    });

    this.setState({services});
  };
  render() {
    const {isModalVisible, onCloseModal} = this.props;
    const {services} = this.state;

    return (
      <Modal
        animationIn={'slideInDown'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.5}
        isVisible={isModalVisible}
        style={styles.modal}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onCloseModal} style={styles.closeButton}>
            <Icon size={wp(5)} color={Colors.black} name="close" />
          </TouchableOpacity>

          <View style={styles.titleRow}>
            <Text style={styles.title}>Select a Service</Text>
          </View>

          <FlatList
            contentContainerStyle={styles.flatListContent}
            data={services}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => onCloseModal({item})}>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  flatListContent: {
    paddingTop: hp(2),
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },

  container: {
    alignSelf: 'center',
    paddingTop: hp(2.5),
    paddingBottom: hp(6),
    height: hp(55),
    width: wp(95),
    backgroundColor: 'white',
    borderRadius: wp(4),
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
  },

  titleRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(6.5),
    marginBottom: hp(2),
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(5),
    width: wp(65),
  },
  instructions: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
  },
  priceContainer: {
    flexDirection: 'row',
    width: wp(20),
  },
  price: {
    fontFamily: Fonts.light,
    fontSize: wp(7),
  },
  currency: {
    fontFamily: Fonts.regular,
    textTransform: 'uppercase',
  },
  calendarDefault: {
    fontFamily: Fonts.regular,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: hp(2),
    alignContent: 'center',
  },
  checkbox: {
    marginLeft: wp(4.5),
    height: wp(6),
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: wp(4),
  },
  closeButton: {
    position: 'absolute',
    right: wp(5),
    top: hp(2),
    zIndex: 10,
  },
  item: {
    flex: 1,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  itemTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
  },
  itemDesc: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(5),
  },
});

export default ServiceListModal;
