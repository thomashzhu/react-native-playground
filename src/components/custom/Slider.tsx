import React from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Color from 'color';

import { Draggable } from './Draggable';

const FULL_SLIDER_QUALIFICATION_RATIO = 0.95;

type Props = {
  loadingIndicatorColor: Color;
  loadingIndicatorVisible?: boolean;
  loadingText?: string;
  isLoading: boolean;
  onSlideToEnd: () => boolean;
  size: number;
  sliderBackgroundColor: Color;
  sliderColor: Color;
  sliderHint?: string;
  sliderHintColor: Color;
  style?: StyleProp<ViewStyle>;
};

export class Slider extends React.Component<Props> {
  static defaultProps = {
    loadingIndicatorVisible: true,
    loadingText: '',
    sliderHint: '',
    style: {},
  };

  containerWidth: number;
  left = new Animated.Value(0);

  state = {
    isLoading: this.props.isLoading,
  };

  componentWillReceiveProps(nextProps: Props) {
    const { isLoading } = this.state;
    if (nextProps.isLoading !== isLoading) {
      if (!nextProps.isLoading) this.left.setValue(0);

      this.setState({ isLoading: nextProps.isLoading });
    }
  }

  handleLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    this.containerWidth = width;
  };

  handleTouchStart = () => {};

  handleTouchMove = (left: number) => {
    const { size } = this.props;
    // Make sure 0 <= left <= this.containerWidth - size
    this.left.setValue(Math.max(0, Math.min(left, this.containerWidth - size)));
  };

  handleTouchEnd = (left: number) => {
    const { onSlideToEnd, size } = this.props;

    if (left < this.containerWidth * FULL_SLIDER_QUALIFICATION_RATIO - size) {
      Animated.timing(this.left, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(this.left, {
        toValue: this.containerWidth - size,
        useNativeDriver: true,
      }).start();

      this.setState({ isLoading: true }, async () => {
        const successful = onSlideToEnd();
        if (!successful) {
          this.resetSlider();
        } else {
          this.setState({ isLoading: true });
        }
      });
    }
  };

  resetSlider = () => {
    Animated.timing(this.left, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    this.setState({ isLoading: false });
  };

  render() {
    const {
      loadingIndicatorColor,
      loadingText,
      loadingIndicatorVisible,
      size,
      sliderBackgroundColor,
      sliderColor,
      sliderHint,
      sliderHintColor,
      style,
    } = this.props;
    const { isLoading } = this.state;

    const containerStyle = {
      backgroundColor: `${sliderBackgroundColor}`,
      borderRadius: size / 2,
      height: size,
    };

    const sliderCircleStyle = {
      backgroundColor: `${sliderColor}`,
      borderRadius: size / 2,
      height: size,
      width: size,
    };

    const sliderTextStyle = {
      color: `${sliderHintColor}`,
    };

    /* prettier-ignore */
    return (
      <View
        onLayout={({nativeEvent: { layout: { width }}}) => this.containerWidth = width}
        style={[containerStyle, style]}
      >
        <View style={styles.sliderTextContainer}>
          <Text style={[styles.sliderText, sliderTextStyle]}>
            {isLoading ? loadingText : sliderHint}
          </Text>
        </View>

        <Draggable
          enabled={!isLoading}
          onTouchStart={this.handleTouchStart}
          onTouchMove={({ left }) => this.handleTouchMove(left)}
          onTouchEnd={({ left }) => this.handleTouchEnd(left)}
        >
          {({ handlers }) => {
            const transformStyle = {
              transform: [{ translateX: this.left }],
            };

            return (
              <Animated.View
                {...(isLoading ? {} : handlers)}
                style={[styles.sliderCircle, sliderCircleStyle, transformStyle]}
              >
                {loadingIndicatorVisible && isLoading && (
                  <ActivityIndicator
                    color={`${loadingIndicatorColor}`}
                    size="small"
                  />
                )}
              </Animated.View>
            );
          }}
        </Draggable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderTextContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderText: {
    fontSize: 16,
  },
});
