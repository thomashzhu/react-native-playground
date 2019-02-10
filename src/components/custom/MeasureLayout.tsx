import React, { ReactNode } from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Constants } from 'expo';

interface Props {
  children: (layout: LayoutRectangle) => ReactNode;
}

interface State {
  layout?: LayoutRectangle;
}

export class MeasureLayout extends React.Component<Props, State> {
  state = {
    layout: null,
  };

  handleLayout = (event: LayoutChangeEvent) => {
    const {
      nativeEvent: { layout },
    } = event;

    this.setState({
      layout: {
        ...layout,
        y:
          layout.y +
          (Platform.OS === 'android' ? Constants.statusBarHeight : 0),
      },
    });
  };

  render() {
    const { children } = this.props;
    const { layout } = this.state;

    // Measure the available space with a placeholder view set to flex 1
    if (!layout) {
      return <View onLayout={this.handleLayout} style={styles.container} />;
    }

    return children(layout);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
