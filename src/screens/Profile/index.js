import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {client} from '../../../App';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';
import Images from '../../ui/Images';
import {logoutUser } from '../../redux/user/actions';
import { connect } from 'react-redux';

const GET_ME_QUERY = gql`
  query GetMe {
    me {
      firstName
      lastName
      phone
    }
  }
`;

const LINKS = [
  'Edit Profile',
  'Change Password',
  'Credits & Coupons',
  'Invite Friends',
  'Help & Support',
  'Payments',
  'Settings',
  'Log Out',
];

class ProfileScreen extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const {
      data: {
        me: {firstName, lastName, phone},
      },
    } = await client.query({query: GET_ME_QUERY});
    const user = {firstName, lastName, phone};
    this.setState({user});
  };

  onLinkPressed = link => {
    if (link === 'Log Out') {
      this.props.logoutUser();
    }
  };
  render() {
    const {user} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>{user?.firstName}</Text>
            <Text style={styles.header}>{user?.lastName}</Text>
            <Text style={styles.email}>{user?.phone}</Text>
          </View>
          <Image style={styles.avatar} source={Images.icons.avatar} />
        </View>

        <View style={styles.linksContainer}>
          {LINKS.map(link => (
            <TouchableOpacity
              style={[styles.link, styles.shadowStyle]}
              onPress={() => this.onLinkPressed(link)}>
              <Text style={styles.linkText}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: hp(12),
    paddingHorizontal: wp(7),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(13),
  },
  header: {
    fontSize: wp(10),
    lineHeight: wp(10),
    fontFamily: Fonts.header,
    color: Colors.headerGreyText,
    margin: 0,
    padding: 0,
  },
  email: {
    fontFamily: Fonts.regular,
    color: Colors.headerGreyText,
    marginLeft: wp(2),
    marginTop: hp(-0.5),
  },
  textContainer: {
    alignContent: 'flex-end',
    justifyContent: 'flex-start',
  },
  avatar: {
    height: wp(16),
    width: wp(16),
    borderRadius: wp(15),
  },
  linksContainer: {
    flex: 1,
    marginTop: hp(5),
  },
  link: {
    height: hp(5),
    marginVertical: hp(1),
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    borderRadius: 3,
  },
  linkText: {
    fontFamily: Fonts.regular,
  },
  shadowStyle: {
    backgroundColor: Colors.white,
    elevation: 1,
    shadowOpacity: 0.2,
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(ProfileScreen);

