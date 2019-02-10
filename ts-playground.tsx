import { LayoutAnimation, Platform } from 'react-native';

type AnimationConfig = {
  duration: number;
  type: string;
  property: string;
};

export const layoutAnimations: { [key: string]: AnimationConfig } = {
  default: {
    duration: 750,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export function startLayoutAnimation(
  config: AnimationConfig,
  onConfigured: () => void = () => {}
) {
  const { duration, type, property } = config;
  const animation = LayoutAnimation.create(duration, type, property);

  const promise = new Promise(resolve => {
    // Workaround for missing LayoutAnimation callback support on Android
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(animation);
      setTimeout(resolve, duration);
    } else {
      LayoutAnimation.configureNext(animation, resolve);
    }
  });

  onConfigured();

  return promise;
}
