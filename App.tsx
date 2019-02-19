import React from 'react';
import { Platform, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Constants } from 'expo';

import { HomeTab } from './src/navigation/HomeTab';

const AppContainer = createAppContainer(HomeTab);

export default class App extends React.Component {
  handleSlideToEnd = () => {
    Alert.alert('successful');

    setTimeout(() => this.setState({ isLoading: false }), 5000);

    return true;
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}

const statusBarHeight =
  Platform.OS === 'ios' && Number(Platform.Version) >= 11
    ? 0
    : Constants.statusBarHeight;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: statusBarHeight,
  },
  slider: {
    margin: 20,
  },
});
