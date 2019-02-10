import React from 'react';
import { Platform, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Constants } from 'expo';

import { colors } from './src/values/colors';
import { Slider } from './src/components/custom/Slider';

export default class App extends React.Component {
  state = {
    isLoading: false,
  };

  handleSlideToEnd = () => {
    Alert.alert('successful');

    setTimeout(() => this.setState({ isLoading: false }), 5000);

    return true;
  };

  render() {
    const { isLoading } = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Slider
          isLoading={isLoading}
          loadingIndicatorColor={colors.white}
          loadingIndicatorVisible
          loadingText="Loading..."
          onSlideToEnd={this.handleSlideToEnd}
          size={48}
          sliderBackgroundColor={colors.hint}
          sliderColor={colors.secondary}
          sliderHint="Slide to send"
          sliderHintColor={colors.primary}
          style={styles.slider}
        />
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
