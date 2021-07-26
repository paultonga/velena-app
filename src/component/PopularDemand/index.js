import React from 'react';
import {FlatList, Image, View, Text, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';

const PopularData = [
  {
    title: 'Summer Hair',
    thumbnail:
      'https://unsplash.com/photos/4nulm-JUYFo/download?force=true&w=640',
  },
  {
    title: 'Skin Treatment',
    thumbnail:
      'https://unsplash.com/photos/t7_CN7g5aRA/download?force=true&w=640',
  },
];

const PopularItem = ({item}) => {
  return (
    <View style={[styles.itemContainer, styles.shadowStyle]}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  );
};

export default function PopularItemsList() {
  return (
    <View style={styles.favoritesContainer}>
      <Text style={styles.header}>Popular Styles</Text>
      <FlatList
        data={PopularData}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <PopularItem item={item} />}
        horizontal
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: Fonts.header,
    fontSize: wp(8),
    color: Colors.headerGreyText,
  },
  favoritesContainer: {
    marginTop: hp(3),
    paddingHorizontal: wp(5),
  },
  shadowStyle: {
    backgroundColor: Colors.white,
    elevation: 2,
    shadowOpacity: 0.5,
    shadowColor: Colors.black,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  flatlistContent: {
    paddingVertical: hp(2),
  },
  itemContainer: {
    marginRight: wp(6),
    height: hp(20),
    width: wp(75),
    borderRadius: 20,
  },
  thumbnail: {
    height: hp(20),
    width: wp(75),
    borderRadius: 15,
  },
  itemTitle: {
    position: 'absolute',
    bottom: 3,
    left: wp(6),
    fontFamily: Fonts.header,
    fontSize: wp(8),
    color: Colors.white,
  },
});
