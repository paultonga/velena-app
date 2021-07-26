import React from 'react';
import {FlatList, Image, View, Text, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Fonts from '../../ui/Fonts';
import Colors from '../../ui/Colors';

const FavoritesData = [
  {
    title: 'Pedicure',
    description: 'A healthy treatment for nails.',
    thumbnail:
      'https://unsplash.com/photos/k47viB7Dt8I/download?force=true&w=640',
  },
  {
    title: 'Laser Hair',
    description: 'Remove unwanted hair using laser',
    thumbnail:
      'https://unsplash.com/photos/Hp-3N5Gl1Ak/download?force=true&w=640',
  },
  {
    title: 'Hair Wash',
    description: 'Treat your hair to deep wash.',
    thumbnail:
      'https://unsplash.com/photos/9RBu0WPfN7w/download?force=true&w=640',
  },
  {
    title: 'Feet Wash',
    description: 'Remove scales and dry feet.',
    thumbnail:
      'https://unsplash.com/photos/qeuJczNo54w/download?force=true&w=640',
  },
];

const FavoriteItem = ({item}) => {
  return (
    <View style={[styles.itemContainer, styles.shadowStyle]}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

export default function FavoritesList() {
  return (
    <View style={styles.favoritesContainer}>
      <Text style={styles.header}>Favorites</Text>
      <FlatList
        data={FavoritesData}
        renderItem={({item}) => <FavoriteItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
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
  flatListContent: {
    paddingVertical: hp(2),
  },
  favoritesContainer: {
    marginTop: hp(2),
    paddingHorizontal: wp(5),
  },
  shadowStyle: {
    backgroundColor: Colors.white,
    elevation: 2,
    shadowOpacity: 0.8,
    shadowColor: Colors.black,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  itemContainer: {
    marginRight: wp(4),
    height: hp(29),
    width: wp(38),
    borderRadius: 15,
  },
  thumbnail: {
    height: hp(17),
    width: wp(38),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  itemTextContainer: {
    marginTop: hp(2),
    marginHorizontal: wp(3),
  },
  itemTitle: {
    fontFamily: Fonts.bold,
    fontSize: wp(4.5),
    marginBottom: hp(1),
    color: Colors.boldGreyText,
  },
  itemDescription: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    color: Colors.lightGreyText,
  },
});
