import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../ui/Colors';
import Fonts from '../../ui/Fonts';

export default function Input({
  placeholder,
  isSecure,
  onTextChange,
  autoCapitalize,
  customContainerStyle,
  error,
  value,
  keyboardType,
  onFocus,
  maxLength,
}) {
  const [visible, toggle] = useState(false);

  const handleTextChange = text => {
    toggle(Boolean(text));
    onTextChange(text);
  };
  return (
    <View style={[styles.container, customContainerStyle]}>
      {visible && <Text style={styles.floatingLabel}>{placeholder}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGreyText}
        secureTextEntry={!!value && isSecure}
        onChangeText={handleTextChange}
        style={styles.input}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        autoCompleteType="off"
        value={value}
        keyboardType={keyboardType}
        onFocus={onFocus}
        maxLength={maxLength}
        underlineColorAndroid={Colors.black}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(80),
    marginVertical: hp(1),
  },
  input: {
    width: wp(80),
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    color: Colors.headerGreyText,
    ...Platform.select({
      android: {},
      ios: {
        marginTop: hp(2.2),
      },
    }),
  },
  floatingLabel: {
    position: 'absolute',
    fontFamily: Fonts.regular,
    fontSize: wp(2.8),
    color: Colors.lightGreyText,
  },
  errorText: {
    fontFamily: Fonts.bold,
    fontSize: wp(2.8),
    marginTop: hp(-0.6),
    marginLeft: wp(1),
    textTransform: 'lowercase',
    color: 'red',
  },
});
