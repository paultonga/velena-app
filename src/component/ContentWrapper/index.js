import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function ContentWrapper({
  rightButtonText,
  rightButtonPressed,
  subTitle,
  title,
  children,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {(!!subTitle || !!rightButtonText) && (
        <View style={styles.subheaderContainer}>
          {!!subTitle && <Text style={styles.subheader}>{subTitle}</Text>}
          {!!rightButtonText && (
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={rightButtonPressed}>
              <Text style={styles.viewAllText}>{rightButtonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {children}
    </View>
  );
}
