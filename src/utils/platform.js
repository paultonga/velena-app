import {Platform, PixelRatio} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isAndroid = Platform.OS === 'Android' || Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const isTablet = DeviceInfo.isTablet();
export const hasNotch = DeviceInfo.hasNotch();
export const pixelRatio = PixelRatio.get();
