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
import Ripple from 'react-native-material-ripple';

const FavoritesData = [
  {
    title: 'Pedicure and Manicure',
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

const FavoriteItem = ({item, onPress}) => {
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

export default function FavoritesList({
  data,
  onViewAllPressed,
  onServicePressed,
}) {
  const handledItemPressed = service => {
    onServicePressed(service);
  };
  return (
    <View style={styles.favoritesContainer}>
      <Text style={styles.header}>Popular</Text>
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheader}>Our most viewed services</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={onViewAllPressed}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <FavoriteItem item={item} onPress={() => handledItemPressed(item)} />
        )}
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
    height: hp(27.5),
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
    fontSize: wp(4),
    marginBottom: hp(1),
    color: Colors.black,
  },
  itemDescription: {
    fontFamily: Fonts.regular,
    fontSize: wp(3),
    color: Colors.lightGreyText,
  },
});
