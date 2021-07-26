import React, {Component} from 'react';
import {Text, View} from 'react-native';
import shared from '../../shared/styles';

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={shared.centeredContainer}>
        <Text> Profile Screen </Text>
      </View>
    );
  }
}
