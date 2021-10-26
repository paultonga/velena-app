import {gql, useQuery} from '@apollo/client';
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Screen from '../../component/Screen';
import styles from './styles';
import NavHeader from '../../component/NavHeader';
import {STATUS_BAR_STYLES} from '../../utils/constants';
import Colors from '../../ui/Colors';

const SettingsScreen = ({navigation, route}) => {
  const {user} = route.params;
  const [push, setPush] = React.useState(user?.settings?.pushNotifications);
  const [email, setEmail] = React.useState(user?.settings?.emailNotifications);
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Screen
      statusBarStyle={STATUS_BAR_STYLES.DARK_CONTENT}
      barBackgroundColor={'white'}>
      <NavHeader hasBackIcon leftAction={goBack} />

      <View style={styles.pageHeader}>
        <Text style={styles.header}>Settings</Text>
      </View>

      <View style={styles.container}>
        <View style={[styles.link, styles.shadowStyle]}>
          <View>
            <Text style={styles.linkText}>Push Notifications</Text>
            <Text style={styles.linkSubText}>
              This will decide if we should send push notifications
            </Text>
          </View>
          <Switch
            value={push}
            onChange={() => setPush(!push)}
            style={styles.switch}
            ios_backgroundColor={Colors.buttonGrey}
          />
        </View>

        <View style={[styles.link, styles.shadowStyle]}>
          <View>
            <Text style={styles.linkText}>Email Notifications</Text>
            <Text style={styles.linkSubText}>
              This will decide if we should send email notifications
            </Text>
          </View>
          <Switch
            value={email}
            onChange={() => setEmail(!email)}
            style={styles.switch}
            ios_backgroundColor={Colors.buttonGrey}
          />
        </View>
      </View>
    </Screen>
  );
};

export default SettingsScreen;
