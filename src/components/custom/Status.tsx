import React from 'react';
import {
  Alert,
  NetInfo,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Constants } from 'expo';
import Color from 'color';

type BubbleTheme = {
  barStyle: 'light-content' | 'dark-content',
  backgroundColor: Color,
};

const BubbleThemes: { [s: string]: BubbleTheme } = {
  active: {
    barStyle: 'light-content',
    backgroundColor: Color('#FF0000') as Color,
  },
  inactive: {
    barStyle: 'dark-content',
    backgroundColor: Color('#FFFFFF') as Color,
  },
};

interface Props {
  message: string;
}

interface State {
  isConnected: boolean;
  message: string;
}

export class Status extends React.Component<Props, State> {
  state: State = {
    isConnected: true,
    message: this.props.message,
  };

  async componentWillMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleIsConnectedChange);
    
    const isConnected = await NetInfo.isConnected.fetch();
    this.setState({ isConnected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleIsConnectedChange);
  }

  handleIsConnectedChange = (isConnected: boolean) => {
    this.setState({ isConnected });
  };

  render() {
    const { isConnected, message } = this.state;

    const backgroundColor = `${(
      isConnected ? BubbleThemes.inactive.backgroundColor : BubbleThemes.active.backgroundColor
    )}`;

    const statusBar = (
      <StatusBar
        animated={false}
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
      />
    );

    const messageContainer = (
      <View
        pointerEvents="none"
        style={styles.messageContainer}
      >
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>{message}</Text>
          </View>
        )}
      </View>
    );

    if (Platform.OS === 'ios') {
      return <View style={[styles.status, { backgroundColor }]}>{messageContainer}</View>;
    }

    return messageContainer;
  }
}

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

const styles = StyleSheet.create({
  status: {
    height: statusHeight,
    zIndex: 1,
  },
  messageContainer: {
    alignItems: 'center',
    height: 80,
    left: 0,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    zIndex: 1,
  },
  bubble: {
    backgroundColor: `${BubbleThemes.active.backgroundColor}`,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: BubbleThemes.inactive.barStyle === 'light-content' ? '#FFFFFF' : '#000000',
  },
});
