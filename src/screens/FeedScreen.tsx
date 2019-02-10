import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';

export const FeedScreen = () => (
  <SafeAreaView style={styles.safeAreaView}>
    <Text>FeedScreen</Text>
  </SafeAreaView>
);

const statusBarHeight =
  Platform.OS === 'ios' && Number(Platform.Version) >= 11
    ? 0
    : Constants.statusBarHeight;

const styles = StyleSheet.create({
  safeAreaView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: statusBarHeight,
  },
});
