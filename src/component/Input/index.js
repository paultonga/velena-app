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
}) {
  const [visible, toggle] = useState(false);

  const handleTextChange = text => {
    toggle(Boolean(text));
  };
  return (
    <View style={[styles.container, customContainerStyle]}>
      {visible && <Text style={styles.floatingLabel}>{placeholder}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.lightGreyText}
        secureTextEntry={isSecure}
        onChangeText={handleTextChange}
        style={styles.input}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        autoCompleteType="off"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(80),
    height: hp(5.5),
    borderBottomColor: Colors.headerGreyText,
    borderBottomWidth: 1,
  },
  input: {
    width: wp(80),
    fontFamily: Fonts.regular,
    fontSize: wp(4),
    color: Colors.headerGreyText,
    ...Platform.select({
      android: {
        height: hp(5.2),
        marginTop: hp(1),
      },
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
});
