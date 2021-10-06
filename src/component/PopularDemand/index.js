import React from 'react';
import {FlatList, Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';
import LinearGradient from 'react-native-linear-gradient';

const PopularData = [
  {
    title: 'Summer Hair Make Up',
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
    <TouchableOpacity style={[styles.itemContainer, styles.shadowStyle]}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <LinearGradient
        style={styles.linearGradient}
        locations={[0, 1.0]}
        colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itemTitle}>
          {item.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function PopularItemsList({ data }) {
  const _keyExtractor = (item, index) => `favorites-${item.id}-${index}`;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={data}
        keyExtractor={_keyExtractor}
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
  container: {
    marginTop: hp(1),
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
    width: wp(50),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  thumbnail: {
    height: hp(20),
    width: wp(50),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  itemTitle: {
    position: 'absolute',
    marginLeft: wp(4.5),
    marginRight: wp(3),
    bottom: hp(2),
    fontFamily: Fonts.extraBold,
    fontSize: wp(5),
    lineHeight: wp(5.8),
    color: Colors.white,
  },
  linearGradient: {
    height: hp(10),
    width: wp(50),
    position: 'absolute',
    bottom: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
