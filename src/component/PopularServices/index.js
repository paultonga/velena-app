import React from 'react';
import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import ContentWrapper from '../ContentWrapper';
import { hasNotch } from '../../utils/platform';


const PopularItem = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, styles.shadowStyle]}
      onPress={onPress}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.itemDescription}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function PopularServices({
  data,
  onViewAllPressed,
  onServicePressed,
}) {
  const _keyExtractor = (item, index) => `itemExtractor-${index}-${item?.id}`;

  const handledItemPressed = service => {
    onServicePressed(service);
  };
  return (
    <ContentWrapper
      title={'Popular'}
      subTitle={'Our most viewed services'}
      rightButtonText={'View all'}
      rightButtonPressed={onViewAllPressed}>
      <FlatList
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={({item}) => (
          <PopularItem item={item} onPress={() => handledItemPressed(item)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </ContentWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(8.3),
    color: Colors.headerGreyText,
  },
  subheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(0.5),
  },
  subheader: {
    fontFamily: Fonts.regular,
  },
  viewAllText: {
    fontFamily: Fonts.extraBold,
  },
  flatListContent: {
    paddingVertical: hp(2),
  },
  favoritesContainer: {
    marginTop: hp(2.5),
    paddingHorizontal: wp(5),
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
    marginRight: wp(4),
    height: hasNotch ? hp(27.5) : hp(28.5),
    width: wp(38),
    borderRadius: 15,
  },
  thumbnail: {
    height: hp(15),
    width: wp(38),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  itemTextContainer: {
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  itemTitle: {
    fontFamily: Fonts.extraBold,
    fontSize: wp(3.8),
    marginBottom: hp(1),
    color: Colors.black,
  },
  itemDescription: {
    fontFamily: Fonts.bold,
    fontSize: wp(3),
    color: Colors.boldGreyText,
  },
});
