import {gql, useQuery} from '@apollo/client';
import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Screen from '../../component/Screen';
import styles from './styles';
import NavHeader from '../../component/NavHeader';
import {STATUS_BAR_STYLES} from '../../utils/constants';

const CreditsScreen = ({navigation, route}) => {
  const {user} = route.params;
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon leftAction={goBack} />

      <View style={styles.pageHeader}>
        <Text style={styles.header}>Credits</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.notice}>You don't have any credits yet.</Text>
      </View>
    </Screen>
  );
};

export default CreditsScreen;
