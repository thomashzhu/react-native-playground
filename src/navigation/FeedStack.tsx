import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { FeedScreen } from '../screens/FeedScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: FeedScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Feed',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      headerTintColor: '#DD0000',
    },
  }
);
