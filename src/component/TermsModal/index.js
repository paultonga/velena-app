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
import Icon from 'react-native-vector-icons/AntDesign';
import strings from '../../localization';

class TermsModal extends Component {
  render() {
    const {isModalVisible, onCloseModal} = this.props;

    return (
      <Modal
        animationIn={'slideInDown'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.5}
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={this.requestCloseModal}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onCloseModal} style={styles.closeButton}>
            <Icon size={wp(5)} color={Colors.black} name="close" />
          </TouchableOpacity>

          <View style={styles.titleRow}>
            <Text style={styles.title}>{'Terms of Use'}</Text>
          </View>
          <>
            <View style={styles.calendarContainer}>
              <Text>{`Please read these terms and conditions ("terms and conditions", "terms") carefully before using Velena app operated by Velena ("us", 'we", "our").
Conditions of use
By using this app, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly. Velena only grants use and access of this app, its products, and its services to those who have accepted its terms.
Privacy policy
Before you continue using our app, we advise you to read our privacy policy [link to privacy policy] regarding our user data collection. It will help you better understand our practices.
Age restriction
You must be at least 18 (eighteen) years of age before you can use this app. By using this app, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. Velena assumes no responsibility for liabilities related to age misrepresentation.
Intellectual property
You agree that all materials, products, and services provided on this app are the property of Velena, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the Velena’s intellectual property in any way, including electronic, digital, or new trademark registrations.
You grant Velena a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.
User accounts
As a user of this app, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
If you think there are any possible issues regarding the security of your account on the app, inform us immediately so we may address them accordingly.
We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.
Applicable law
By visiting this app, you agree that the laws of the [location], without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between Velena and you, or its business partners and associates.
Disputes
Any dispute related in any way to your visit to this app or to products you purchase from us shall be arbitrated by state or federal court [location] and you consent to exclusive jurisdiction and venue of such courts.
Indemnification
You agree to indemnify Velena and its affiliates and hold Velena harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel. 
Limitation on liability
Velena is not liable for any damages that may occur to you as a result of your misuse of our app.
Velena reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between Velena and the user, and this supersedes and replaces all prior agreements regarding the use of this app.



`}</Text>
            </View>
          </>
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
  },
  image: {
    height: wp(30),
    width: wp(30),
    borderRadius: 1000,
    alignSelf: 'center',
    position: 'absolute',
    top: hp(-8),
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '100%',
  },
  container: {
    paddingTop: hp(2.5),
    paddingBottom: hp(6),
    height: hp(90),
    width: wp(100),
    backgroundColor: 'white',
    borderRadius: wp(4),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(8),
    width: wp(100),
  },
  submitButton: {
    backgroundColor: Colors.buttonGrey,
    alignSelf: 'center',
    width: wp(70),
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    borderRadius: wp(2),
  },
  submitButtonText: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
    fontSize: wp(3),
    textTransform: 'uppercase',
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
    flexDirection: 'row',
    borderWidth: 2,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderColor: Colors.buttonGrey,
    borderRadius: 10,
    marginBottom: hp(1.5),
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: Colors.buttonGrey,
    backgroundColor: Colors.veryLightGrey,
  },
  itemThumnnail: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(7),
  },
  itemDetails: {
    marginLeft: wp(2.5),
    flexDirection: 'column',
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

export default TermsModal;
