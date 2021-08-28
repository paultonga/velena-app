import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';

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
      <>
        {!hideStatusBar && (
          <StatusBar
            barStyle={statusBarStyle}
            translucent={translucent}
            backgroundColor={barBackgroundColor}
          />
        )}
        {children}
      </>
    );
  }
}

export default Screen;
