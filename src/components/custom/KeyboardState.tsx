import React, { ReactNode } from 'react';
import {
  EmitterSubscription,
  Keyboard,
  LayoutRectangle,
  Platform,
} from 'react-native';

const INITIAL_ANIMATION_DURATION = 250;

interface KeyboardEvent {
  endCoordinates: {
    height: number,
    screenY: number,
  };
  duration: number;
}

interface Props {
  children: (params: ChildrenType) => ReactNode;
  layout: LayoutRectangle;
}

interface State {
  contentHeight: number;
  keyboardAnimationDuration: number;
  keyboardHeight: number;
  keyboardVisible: boolean;
  keyboardWillHide: boolean;
  keyboardWillShow: boolean;
}

export type ChildrenType = State & {
  containerHeight: number,
};

export class KeyboardState extends React.Component<Props, State> {
  keyboardSubscriptions: EmitterSubscription[];

  constructor(props: Props) {
    super(props);
  
    const { layout: { height } } = props;

    this.state = {
      contentHeight: height,
      keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
      keyboardHeight: 0,
      keyboardVisible: false,
      keyboardWillHide: false,
      keyboardWillShow: false,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardSubscriptions = [
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow),
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide),
        Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
      ];
    } else {
      this.keyboardSubscriptions = [
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
        Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
      ];
    }
  }

  componentWillUnmount() {
    this.keyboardSubscriptions.forEach(subscription => subscription.remove());
  }

  keyboardWillShow = (event: KeyboardEvent) => {
    this.setState({ keyboardWillShow: true });
    this.measure(event);
  };

  keyboardDidShow = (event: KeyboardEvent) => {
    this.setState({
      keyboardVisible: true,
      keyboardWillShow: false,
    });
    this.measure(event);
  };

  keyboardWillHide = (event: KeyboardEvent) => {
    this.setState({ keyboardWillHide: true });
    this.measure(event);
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardWillHide: false,
      keyboardVisible: false,
    });
  };

  measure = (event: KeyboardEvent) => {
    const { layout } = this.props;

    const {
      endCoordinates: { height, screenY },
      duration = INITIAL_ANIMATION_DURATION,
    } = event;

    this.setState({
      contentHeight: screenY - layout.y,
      keyboardAnimationDuration: duration,
      keyboardHeight: height,
    });
  };

  render() {
    const { children, layout } = this.props;
    const {
      contentHeight,
      keyboardAnimationDuration,
      keyboardHeight,
      keyboardVisible,
      keyboardWillHide,
      keyboardWillShow,
    } = this.state;

    return children({
      containerHeight: layout.height,
      contentHeight,
      keyboardAnimationDuration,
      keyboardHeight,
      keyboardVisible,
      keyboardWillHide,
      keyboardWillShow,
    });
  }
}
