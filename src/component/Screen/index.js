import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';

class Screen extends Component {
  render() {
    const {hasStatusBar, statusBarStyle, children} = this.props;
    return (
      <>
        {hasStatusBar && <StatusBar />}
        {children}
      </>
    );
  }
}

export default Screen;
