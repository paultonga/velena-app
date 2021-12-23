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
import LocalizedString from "react-native-localization";

class ChangeLanguageModal extends Component {
  state = {
    selectedLanguage: '',
    languages: [
      {
        title: 'English',
        code: 'en',
        icon: 'https://cdn.pixabay.com/photo/2012/04/10/16/14/union-jack-26119__340.png',
      },
      {
        title: 'Turkish',
        code: 'tr',
        icon: 'https://cdn.countryflags.com/thumbs/turkey/flag-400.png',
      },
      // {
      //   title: 'Russian',
      //   code: 'ru',
      //   icon: 'https://cdn.countryflags.com/thumbs/russia/flag-400.png',
      // },
    ],
  };

  selectLanguage = selectedLanguage => {
    this.setState({selectedLanguage});
  };

  saveLanguage = () => {
    const {selectedLanguage} = this.state;
    strings.setLanguage(selectedLanguage.code);

    this.props.onCloseModal();
  };

  render() {
    const {isModalVisible, onCloseModal} = this.props;
    const {languages, selectedLanguage} = this.state;

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
            <Text style={styles.title}>{'Change language'}</Text>
          </View>
          <>
            <View style={styles.calendarContainer}>
              <FlatList
                data={languages}
                contentContainerStyle={styles.flatListContent}
                renderItem={({item}) => {
                  const isSelected = item.code === selectedLanguage?.code;
                  return (
                    <TouchableOpacity
                      style={[styles.item, isSelected && styles.selectedItem]}
                      onPress={() => this.selectLanguage(item)}>
                      <Image
                        source={{uri: item.icon}}
                        style={styles.itemThumnnail}
                      />
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.saveLanguage}>
              <Text style={styles.submitButtonText}>{'Save'}</Text>
            </TouchableOpacity>
          </View>
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
    height: hp(45),
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

export default ChangeLanguageModal;
