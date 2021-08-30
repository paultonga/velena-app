import React, {Component} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';

class Screen extends Component {
  render() {
    const {
      hideStatusBar,
      statusBarStyle,
      barBackgroundColor,
      children,
      translucent,
    } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
        {!hideStatusBar && (
          <StatusBar
            barStyle={statusBarStyle}
            translucent={translucent}
            backgroundColor={barBackgroundColor}
          />
        )}
        {children}
      </View>
    );
  }
}

export default Screen;
