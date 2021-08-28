import {gql} from '@apollo/client';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NavHeader from '../../component/NavHeader';
import Screen from '../../component/Screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import {client, Client} from '../../../App';
import { STATUS_BAR_STYLES } from '../../utils/constants';

const GET_SERVICES_QUERY = gql`
  query GetServices {
    getServices {
      id
      title
      description
      hasDiscount
      discountPrice
      price
      thumbnail
    }
  }
`;

class ServicesScreen extends Component {
  state = {
    services: [],
  };

  componentDidMount() {
    this.fetchServices();
  }

  onServicePressed = service => {
    this.props.navigation.navigate('Service', {service});
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  fetchServices = async () => {
    const {
      data: {getServices},
    } = await client.query({
      query: GET_SERVICES_QUERY,
    });
    this.setState({services: getServices});
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.onServicePressed(item)}>
        <Image
          source={{uri: item.thumbnail}}
          style={[styles.itemThumbnail, styles.shadowStyle]}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {item.hasDiscount ? item.discountPrice : item.price}
            </Text>
            <Text style={styles.currency}>tl</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {services} = this.state;
    return (
      <Screen
        statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
        barBackgroundColor={'white'}>
        <NavHeader hasBackIcon leftAction={this.goBack} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.pageHeader}>
            <Text style={styles.header}>Services</Text>
          </View>

          <FlatList data={services} renderItem={this.renderItem} />
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: wp(8),
  },
  pageHeader: {
    width: wp(100),
  },
  header: {
    fontFamily: Fonts.header,
    color: Colors.headerGreyText,
    fontSize: wp(10),
    marginBottom: hp(2),
  },
  shadowStyle: {
    backgroundColor: Colors.white,
    elevation: 2,
    shadowOpacity: 0.3,
    shadowColor: Colors.black,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: hp(3),
    paddingRight: wp(2),
  },
  itemDetails: {
    justifyContent: 'space-evenly',
  },
  itemThumbnail: {
    height: wp(25),
    width: wp(35),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  itemTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(4),
    flexWrap: 'wrap',
    width: '95%',
  },
  itemDescription: {
    fontFamily: Fonts.regular,
    color: Colors.boldGreyText,
    width: '85%',
    flexWrap: 'wrap',
  },
  priceContainer: {
    flexDirection: 'row',
    width: wp(20),
  },
  price: {
    fontFamily: Fonts.light,
    fontSize: wp(5),
  },
  currency: {
    fontFamily: Fonts.regular,
    textTransform: 'uppercase',
  },
});

export default ServicesScreen;
